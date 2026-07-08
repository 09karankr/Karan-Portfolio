import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Boxes,
  Brain,
  Code2,
  Github,
  Radio,
  Server,
} from "lucide-react";
import { Container } from "@/components/Container";
import { projects } from "@/content/projects";
import type { ProjectCategory } from "@/content/projects";

const categoryIcon: Record<ProjectCategory, typeof Brain> = {
  "AI/ML": Brain,
  DevOps: Server,
  "Full-Stack": Code2,
  "Real-Time": Radio,
};

const categoryTone: Record<
  ProjectCategory,
  { text: string; ring: string; bg: string }
> = {
  "AI/ML": {
    text: "text-fuchsia-300",
    ring: "ring-fuchsia-500/20",
    bg: "bg-fuchsia-500/5",
  },
  DevOps: {
    text: "text-sky-300",
    ring: "ring-sky-500/20",
    bg: "bg-sky-500/5",
  },
  "Full-Stack": {
    text: "text-emerald-300",
    ring: "ring-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
  "Real-Time": {
    text: "text-amber-300",
    ring: "ring-amber-500/20",
    bg: "bg-amber-500/5",
  },
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const Icon = categoryIcon[project.category] ?? Boxes;
  const tone = categoryTone[project.category];

  return (
    <Container className="py-16 max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg transition-colors mb-8"
      >
        <ArrowLeft className="size-3.5" /> All projects
      </Link>

      <header className="mb-10">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-mono uppercase tracking-wider ring-1 ${tone.text} ${tone.ring} ${tone.bg} mb-4`}
        >
          <Icon className="size-3" />
          {project.category}
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-balance mb-3">
          {project.title}
        </h1>
        <p className="font-mono text-sm text-muted mb-4">{project.period}</p>
        <p className="text-lg text-muted leading-relaxed mb-6 max-w-2xl">
          {project.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[11px] px-2 py-0.5 rounded-md bg-card border border-border font-mono text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
              >
                <Github className="size-4" /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
              >
                <ArrowUpRight className="size-4" /> Demo
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Impact metric strip */}
      <section className="grid grid-cols-3 gap-3 mb-14">
        {project.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-border bg-card/40 p-5"
          >
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {m.value}
            </p>
            <p className="mt-1 text-[11px] font-mono text-muted uppercase tracking-wider leading-tight">
              {m.label}
            </p>
          </div>
        ))}
      </section>

      {project.caseStudy ? (
        <article className="space-y-12">
          <Section title="Problem">
            <p className="text-muted leading-relaxed text-base">
              {project.caseStudy.problem}
            </p>
          </Section>

          <Section title="Approach">
            <ol className="space-y-4">
              {project.caseStudy.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className={`shrink-0 grid place-items-center size-7 rounded-full font-mono text-xs ring-1 ${tone.text} ${tone.ring} ${tone.bg}`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-muted leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Outcomes">
            <ul className="space-y-2 text-muted leading-relaxed list-disc pl-5 marker:text-accent/60">
              {project.caseStudy.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </Section>

          {project.caseStudy.learnings && (
            <Section title="Learnings">
              <blockquote className="border-l-2 border-border pl-4 italic text-muted leading-relaxed">
                {project.caseStudy.learnings}
              </blockquote>
            </Section>
          )}
        </article>
      ) : (
        <article>
          <Section title="Highlights">
            <ul className="space-y-2 text-muted leading-relaxed list-disc pl-5 marker:text-accent/60">
              {project.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Section>
        </article>
      )}
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
    <section>
      <h2 className="text-xs font-mono text-muted mb-4 uppercase tracking-wider">
        {title}
      </h2>
      {children}
    </section>
  );
}
