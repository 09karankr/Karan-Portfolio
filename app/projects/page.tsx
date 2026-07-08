import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Projects</h1>
      <p className="text-muted mb-12 max-w-prose">
        A selection of things I&apos;ve built — full-stack, DevOps, and AI/ML.
        Click any card for the full case study.
      </p>

      {featured.length > 0 && (
        <section className="mb-12">
          <p className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
            Featured
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <p className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
            More
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} variant="featured" />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
