"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { BlogCard } from "./BlogCard";
import type { BlogPostMeta } from "@/lib/notion";
import { cn } from "@/lib/utils";

export function TagFilter({ posts }: { posts: BlogPostMeta[] }) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? posts.filter((p) => p.tags.includes(active))
    : posts;

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-muted mr-1">Filter:</span>
          {allTags.map((tag) => {
            const isActive = active === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(isActive ? null : tag)}
                className={cn(
                  "text-[11px] px-2 py-1 rounded-md border font-mono transition-colors",
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-muted hover:text-fg hover:border-muted",
                )}
              >
                {tag}
              </button>
            );
          })}
          {active && (
            <button
              type="button"
              onClick={() => setActive(null)}
              className="text-[11px] inline-flex items-center gap-1 text-muted hover:text-fg"
            >
              <X className="size-3" /> clear
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">No posts tagged "{active}".</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
