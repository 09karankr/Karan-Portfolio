import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Projects</h1>
      <p className="text-muted mb-10 max-w-prose">
        A selection of things I&apos;ve built — across full-stack web, DevOps,
        and AI/ML.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Container>
  );
}
