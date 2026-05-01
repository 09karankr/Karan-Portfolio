import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { extractToc, formatDate, readingTimeMinutes } from "@/lib/utils";
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
      modifiedTime: post.lastEditedAt ?? undefined,
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

  const minutes = readingTimeMinutes(post.markdown);
  const toc = extractToc(post.markdown);
  const showUpdated =
    post.lastEditedAt &&
    post.publishedAt &&
    new Date(post.lastEditedAt).getTime() - new Date(post.publishedAt).getTime() >
      24 * 60 * 60 * 1000;

  return (
    <>
      <ReadingProgress />
      <Container className="py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" /> All posts
        </Link>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
          <article>
            <header className="mb-10">
              <h1 className="text-4xl font-semibold tracking-tight text-balance mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="font-mono text-xs"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                )}
                <span className="inline-flex items-center gap-1 font-mono text-xs">
                  <Clock className="size-3" /> {minutes} min read
                </span>
                {showUpdated && (
                  <span className="font-mono text-xs">
                    · updated {formatDate(post.lastEditedAt!)}
                  </span>
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

          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </Container>
    </>
  );
}
