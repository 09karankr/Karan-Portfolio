import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const WORDS_PER_MINUTE = 225;

export function readingTimeMinutes(markdown: string): number {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_~\-]+/g, " ");
  const words = stripped.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export type TocItem = { depth: 2 | 3; text: string; slug: string };

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = markdown.split("\n");
  let inFence = false;
  for (const raw of lines) {
    const line = raw.trimStart();
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1]!.length as 2 | 3;
    const text = m[2]!.trim();
    items.push({ depth, text, slug: slugifyHeading(text) });
  }
  return items;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
