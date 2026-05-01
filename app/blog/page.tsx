import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { TagFilter } from "@/components/TagFilter";
import { getAllPosts, notionEnabled } from "@/lib/notion";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Blog</h1>
      <p className="text-muted mb-10 max-w-prose">
        Notes on what I&apos;m building and learning — full-stack, DevOps, and
        AI/ML.
      </p>

      {!notionEnabled ? (
        <EmptyState
          title="Notion not configured yet"
          body="Add NOTION_TOKEN and NOTION_BLOG_DB_ID to .env.local to start pulling posts from your Notion database."
        />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          body="Add a row to your Notion blog database with Status = Published, then redeploy or hit /api/revalidate."
        />
      ) : (
        <TagFilter posts={posts} />
      )}
    </Container>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card/30 p-8 text-center">
      <p className="text-sm font-medium mb-1">{title}</p>
      <p className="text-sm text-muted max-w-md mx-auto">{body}</p>
    </div>
  );
}
