import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  Brain,
  Code2,
  Github,
  Radio,
  Server,
} from "lucide-react";
import type { Project, ProjectCategory } from "@/content/projects";

const categoryIcon: Record<ProjectCategory, typeof Brain> = {
  "AI/ML": Brain,
  DevOps: Server,
  "Full-Stack": Code2,
  "Real-Time": Radio,
};

const categoryTone: Record<ProjectCategory, { text: string; ring: string; bg: string }> = {
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

export function ProjectCard({
  project,
  variant = "default",
}: {
  project: Project;
  variant?: "default" | "featured";
}) {
  const Icon = categoryIcon[project.category] ?? Boxes;
  const tone = categoryTone[project.category];
  const isFeatured = variant === "featured";

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-border bg-card/40 transition-all
        hover:border-muted hover:bg-card/70
        ${isFeatured ? "p-7 sm:p-8" : "p-6"}`}
    >
      {/* Subtle glow in top-right, tinted by category */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-24 -right-24 size-48 rounded-full blur-3xl opacity-40 ${tone.bg}`}
      />

      <div className="relative">
        {/* Category chip + external link icons */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-mono uppercase tracking-wider ring-1 ${tone.text} ${tone.ring} ${tone.bg}`}
          >
            <Icon className="size-3" />
            {project.category}
          </span>
          <div className="relative z-10 flex items-center gap-2 shrink-0">
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

        <h3
          className={`font-semibold tracking-tight text-balance ${
            isFeatured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 group-hover:text-fg transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-1 font-mono text-xs text-muted">{project.period}</p>

        <p
          className={`mt-3 text-muted leading-relaxed ${
            isFeatured ? "text-base sm:text-lg max-w-2xl" : "text-sm"
          }`}
        >
          {project.summary}
        </p>

        {/* Metrics strip */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-border/60 bg-bg/40 p-3"
            >
              <p
                className={`font-semibold tracking-tight ${
                  isFeatured ? "text-xl" : "text-base"
                }`}
              >
                {m.value}
              </p>
              <p className="mt-0.5 text-[10px] font-mono text-muted uppercase tracking-wider leading-tight line-clamp-2">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Stack pills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-md bg-bg/60 border border-border text-muted font-mono"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Case study CTA */}
        <div className="mt-5 flex items-center gap-1 text-xs font-mono text-muted group-hover:text-fg transition-colors">
          Read case study
          <ArrowUpRight className="size-3 -translate-x-0.5 group-hover:translate-x-0 transition-transform" />
        </div>
      </div>
    </article>
  );
}
