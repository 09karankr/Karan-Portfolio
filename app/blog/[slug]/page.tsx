import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { formatDate } from "@/lib/utils";
import { getAllPosts, getPostBySlug } from "@/lib/notion";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg transition-colors mb-8"
      >
        <ArrowLeft className="size-3.5" /> All posts
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-balance mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="font-mono text-xs">
                {formatDate(post.publishedAt)}
              </time>
            )}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-card border border-border font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <MarkdownRenderer markdown={post.markdown} />
      </article>
    </Container>
  );
}
