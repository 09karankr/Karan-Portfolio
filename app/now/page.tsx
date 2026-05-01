import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { formatDate } from "@/lib/utils";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Now",
  description: `What ${profile.name} is currently working on, learning, and reading.`,
};

export default function NowPage() {
  const { now } = profile;

  return (
    <Container className="py-16 max-w-2xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Now</h1>
      <p className="text-muted mb-8">
        What I&apos;m focused on this month — last updated{" "}
        <time dateTime={now.updatedAt} className="font-mono text-xs">
          {formatDate(now.updatedAt)}
        </time>
        .
      </p>

      <Section title="Working on">
        {now.workingOn.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      <Section title="Learning">
        {now.learning.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      {now.reading.length > 0 && (
        <Section title="Reading">
          {now.reading.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Section>
      )}

      <Section title="Location">
        <li>{now.location}</li>
      </Section>

      <p className="mt-12 text-sm text-muted">
        This is a{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          /now page
        </a>{" "}
        — short snapshot of current focus, not a full activity log.
      </p>
    </Container>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">{title}</h2>
      <ul className="space-y-2 text-sm text-muted leading-relaxed list-disc pl-5 marker:text-accent/60">
        {children}
      </ul>
    </section>
  );
}
