import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Container } from "@/components/Container";
import { profile } from "@/content/profile";
import type { ReadingItem, ReadingStatus } from "@/content/profile";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "Courses, papers, books, and articles I've been working through. A learning log.",
};

export default function ReadingPage() {
  const { courses, papers, books, articles } = profile.reading;
  const sections: { title: string; items: ReadingItem[] }[] = [
    { title: "Courses", items: courses },
    { title: "Papers", items: papers },
    { title: "Books", items: books },
    { title: "Articles", items: articles },
  ].filter((s) => s.items.length > 0);

  return (
    <Container className="py-16 max-w-2xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Reading</h1>
      <p className="text-muted mb-12">
        A running list of what I&apos;ve been learning — courses, papers, books,
        and articles. Updated as I go.
      </p>

      {sections.length === 0 ? (
        <p className="text-muted">Nothing here yet.</p>
      ) : (
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <ReadingRow key={i} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Container>
  );
}

function ReadingRow({ item }: { item: ReadingItem }) {
  const Wrapper = item.url
    ? ({ children }: { children: React.ReactNode }) => (
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg border border-border bg-card/50 p-4 hover:border-muted transition-colors"
        >
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="rounded-lg border border-border bg-card/50 p-4">
          {children}
        </div>
      );

  return (
    <li>
      <Wrapper>
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-sm font-medium leading-snug">
            {item.title}
            {item.url && (
              <ArrowUpRight className="inline-block size-3.5 ml-1 text-muted" />
            )}
          </h3>
          <StatusBadge status={item.status} />
        </div>
        <p className="text-xs text-muted font-mono mb-2">{item.source}</p>
        {item.note && (
          <p className="text-sm text-muted leading-relaxed">{item.note}</p>
        )}
      </Wrapper>
    </li>
  );
}

function StatusBadge({ status }: { status: ReadingStatus }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted shrink-0">
        <CheckCircle2 className="size-3" /> done
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted shrink-0">
        <Loader2 className="size-3" /> in progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted shrink-0">
      <Circle className="size-3" /> queued
    </span>
  );
}
