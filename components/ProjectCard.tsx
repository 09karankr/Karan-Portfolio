import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-lg border border-border bg-card/50 p-6 hover:border-accent/60 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-fg transition-colors"
            >
              <Github className="size-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label="Demo"
              className="text-muted hover:text-fg transition-colors"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>

      <p className="font-mono text-xs text-muted mb-3">{project.period}</p>
      <p className="text-sm text-muted leading-relaxed mb-4">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2 py-0.5 rounded-md bg-bg border border-border text-muted font-mono"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}
