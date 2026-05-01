import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Stats } from "@/components/Stats";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-6">About</h1>

      <div className="prose prose-invert max-w-prose mb-12">
        <p className="text-lg text-muted leading-relaxed">{profile.summary}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight mb-4">By the numbers</h2>
        <Stats />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Skills</h2>
        <SkillsGrid />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Education</h2>
        <div className="rounded-lg border border-border bg-card/50 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
            <h3 className="font-medium">{profile.education.degree}</h3>
            <span className="font-mono text-xs text-muted">
              {profile.education.period}
            </span>
          </div>
          <p className="text-sm text-muted">{profile.education.school}</p>
          <p className="text-sm text-muted mt-1">
            CGPA: <span className="text-fg">{profile.education.cgpa}</span>
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          Certifications
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {profile.certifications.map((c) => (
            <li
              key={c}
              className="rounded-md border border-border bg-card/50 px-4 py-3 text-sm"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
