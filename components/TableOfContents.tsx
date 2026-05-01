"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSlug(visible[0]!.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <p className="text-xs font-mono text-muted mb-3 uppercase tracking-wider">
        On this page
      </p>
      <ul className="space-y-1.5 text-sm border-l border-border">
        {items.map((item) => (
          <li
            key={item.slug}
            className={cn(
              item.depth === 3 && "pl-3",
            )}
          >
            <a
              href={`#${item.slug}`}
              className={cn(
                "block -ml-px pl-3 py-0.5 border-l-2 transition-colors text-muted hover:text-fg",
                activeSlug === item.slug
                  ? "border-accent text-fg"
                  : "border-transparent",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
