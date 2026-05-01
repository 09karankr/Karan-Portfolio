import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/notion";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-card/50 p-6 hover:border-accent/60 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h3 className="text-lg font-medium tracking-tight group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <ArrowRight className="size-4 text-muted shrink-0 group-hover:text-accent transition-colors" />
      </div>
      <p className="font-mono text-xs text-muted mb-3">
        {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
      </p>
      {post.excerpt && (
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-md bg-bg border border-border text-muted font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
