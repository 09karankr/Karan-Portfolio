import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Container } from "@/components/Container";
import { projects } from "@/content/projects";

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
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <Container className="py-16 max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg transition-colors mb-8"
      >
        <ArrowLeft className="size-3.5" /> All projects
      </Link>

      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-balance mb-3">
          {project.title}
        </h1>
        <p className="font-mono text-sm text-muted mb-4">{project.period}</p>
        <p className="text-lg text-muted leading-relaxed mb-5">
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

      {project.caseStudy ? (
        <article className="space-y-10">
          <Section title="Problem">
            <p className="text-muted leading-relaxed">
              {project.caseStudy.problem}
            </p>
          </Section>

          <Section title="Approach">
            <ol className="space-y-3 text-muted leading-relaxed list-decimal pl-5 marker:text-accent/60 marker:font-mono">
              {project.caseStudy.approach.map((step, i) => (
                <li key={i}>{step}</li>
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
              <p className="text-muted leading-relaxed italic">
                {project.caseStudy.learnings}
              </p>
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
      <h2 className="text-xs font-mono text-muted mb-3 uppercase tracking-wider">
        {title}
      </h2>
      {children}
    </section>
  );
}
