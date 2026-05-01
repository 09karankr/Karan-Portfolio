import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export type BlogPostMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tags: string[];
  publishedAt: string | null;
  lastEditedAt: string | null;
  cover: string | null;
};

export type BlogPost = BlogPostMeta & {
  markdown: string;
};

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_BLOG_DB_ID;

const enabled = Boolean(token && databaseId);

const notion = enabled ? new Client({ auth: token }) : null;
const n2m = notion ? new NotionToMarkdown({ notionClient: notion }) : null;

function getProp<T = unknown>(
  page: any,
  name: string,
  fallback: T | null = null,
): T | null {
  return (page?.properties?.[name] ?? fallback) as T | null;
}

function plainText(rich: any[] | undefined): string {
  if (!Array.isArray(rich)) return "";
  return rich.map((r) => r?.plain_text ?? "").join("").trim();
}

function pageToMeta(page: any): BlogPostMeta | null {
  const titleProp: any = getProp(page, "Name") ?? getProp(page, "Title");
  const slugProp: any = getProp(page, "Slug");
  const excerptProp: any = getProp(page, "Excerpt");
  const tagsProp: any = getProp(page, "Tags");
  const publishedProp: any = getProp(page, "Published");
  const coverProp: any = getProp(page, "Cover");

  const title = plainText(titleProp?.title);
  const slug = plainText(slugProp?.rich_text);
  if (!title || !slug) return null;

  const excerpt = plainText(excerptProp?.rich_text) || null;
  const tags = (tagsProp?.multi_select ?? [])
    .map((t: any) => t?.name)
    .filter(Boolean);
  const publishedAt = publishedProp?.date?.start ?? null;

  let cover: string | null = null;
  if (coverProp?.files?.length) {
    const f = coverProp.files[0];
    cover = f?.file?.url ?? f?.external?.url ?? null;
  } else if (page.cover) {
    cover = page.cover.file?.url ?? page.cover.external?.url ?? null;
  }

  const lastEditedAt: string | null = page.last_edited_time ?? null;

  return {
    id: page.id,
    slug,
    title,
    excerpt,
    tags,
    publishedAt,
    lastEditedAt,
    cover,
  };
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!notion || !databaseId) return [];

  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [{ property: "Published", direction: "descending" }],
      page_size: 100,
    });
    return res.results.map(pageToMeta).filter((p): p is BlogPostMeta => p !== null);
  } catch (err) {
    console.error("[notion] getAllPosts failed:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!notion || !n2m || !databaseId) return null;

  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Status", select: { equals: "Published" } },
        ],
      },
      page_size: 1,
    });

    const page = res.results[0];
    if (!page) return null;

    const meta = pageToMeta(page);
    if (!meta) return null;

    const blocks = await n2m.pageToMarkdown(page.id);
    const { parent } = n2m.toMarkdownString(blocks);

    return { ...meta, markdown: parent ?? "" };
  } catch (err) {
    console.error(`[notion] getPostBySlug(${slug}) failed:`, err);
    return null;
  }
}

export const notionEnabled = enabled;
