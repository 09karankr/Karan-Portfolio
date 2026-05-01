/**
 * Copies an existing Notion page into the Blog Posts database as a Draft row.
 *
 * Original note is left untouched. The copy lives inside Blog Posts and can
 * be edited freely without affecting your study notes.
 *
 * Prereqs:
 *   1. NOTION_TOKEN, NOTION_BLOG_DB_ID set in .env.local
 *   2. Integration connected to BOTH the source page AND the Blog Posts DB
 *
 * Run:
 *   npm run notion:import -- <notion-page-url-or-id> [slug]
 *
 * Examples:
 *   npm run notion:import -- https://www.notion.so/My-Note-abc123...
 *   npm run notion:import -- abc123def456...  my-note-slug
 */

import { Client, isFullPage } from "@notionhq/client";
import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints.js";

const token = process.env.NOTION_TOKEN;
const dbId = process.env.NOTION_BLOG_DB_ID;

if (!token) {
  console.error("✖ NOTION_TOKEN is not set in .env.local");
  process.exit(1);
}
if (!dbId) {
  console.error("✖ NOTION_BLOG_DB_ID is not set in .env.local");
  console.error("  Run `npm run notion:setup` first.");
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "Usage: npm run notion:import -- <notion-page-url-or-id> [slug]",
  );
  process.exit(1);
}

const sourceArg = args[0]!;
const customSlug = args[1];

const notion = new Client({ auth: token });

function extractPageId(input: string): string {
  const match = input.match(/[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (!match) {
    console.error("✖ Could not extract a Notion page ID from input");
    process.exit(1);
  }
  return match[0];
}

function plainText(rich: any[] | undefined): string {
  if (!Array.isArray(rich)) return "";
  return rich.map((r) => r?.plain_text ?? "").join("").trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function fetchAllBlocks(blockId: string): Promise<any[]> {
  const all: any[] = [];
  let cursor: string | undefined;
  do {
    const res: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    all.push(...res.results);
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);
  return all;
}

function stripBlock(block: any): BlockObjectRequest | null {
  if (!block?.type) return null;
  const t = block.type;
  const inner = block[t];
  if (!inner) return null;

  const allowed = [
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "to_do",
    "toggle",
    "code",
    "quote",
    "callout",
    "divider",
    "bookmark",
    "image",
    "video",
    "file",
    "embed",
    "equation",
  ];
  if (!allowed.includes(t)) return null;

  // Strip Notion-side metadata that the create endpoint rejects
  const { children, is_toggleable, ...rest } = inner;
  return { object: "block", type: t, [t]: rest } as BlockObjectRequest;
}

async function main() {
  const sourceId = extractPageId(sourceArg);
  console.log(`→ Fetching source page ${sourceId}...`);

  const source = await notion.pages.retrieve({ page_id: sourceId });
  if (!isFullPage(source)) {
    console.error("✖ Could not read source page (is integration connected?)");
    process.exit(1);
  }

  const titleProp: any = (source.properties as any).title ?? (source.properties as any).Name;
  const title = plainText(titleProp?.title) || "Untitled";
  const slug = customSlug ?? slugify(title);

  console.log(`→ Title: "${title}"`);
  console.log(`→ Slug:  "${slug}"`);

  console.log("→ Fetching blocks...");
  const sourceBlocks = await fetchAllBlocks(sourceId);
  const children = sourceBlocks
    .map(stripBlock)
    .filter((b): b is BlockObjectRequest => b !== null);

  console.log(`→ Copying ${children.length} block(s) into Blog Posts as Draft...`);
  const created = await notion.pages.create({
    parent: { database_id: dbId! },
    properties: {
      Name: { title: [{ text: { content: title } }] },
      Slug: { rich_text: [{ text: { content: slug } }] },
      Status: { select: { name: "Draft" } },
    },
    children: children.slice(0, 100),
  });

  // Notion API: max 100 children per request — append the rest in batches
  if (children.length > 100 && "id" in created) {
    for (let i = 100; i < children.length; i += 100) {
      await notion.blocks.children.append({
        block_id: created.id,
        children: children.slice(i, i + 100),
      });
    }
  }

  const url = "url" in created ? created.url : "(open the DB to see)";
  console.log("\n✅ Imported as Draft");
  console.log("──────────────────────────────────────────");
  console.log(`URL  : ${url}`);
  console.log(`Slug : ${slug}`);
  console.log("──────────────────────────────────────────");
  console.log("\nNext: open it in Notion, polish, set Status = Published when ready.");
  console.log("Then call /api/revalidate to push it live.");
}

main().catch((err) => {
  console.error("✖ Import failed:", err);
  process.exit(1);
});
