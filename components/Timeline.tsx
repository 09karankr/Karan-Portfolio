import { profile } from "@/content/profile";

export function Timeline() {
  return (
    <ol className="relative border-l border-border ml-3">
      {profile.experience.map((exp, i) => (
        <li key={i} className="ml-6 pb-10 last:pb-0">
          <span className="absolute -left-[5px] flex size-2.5 items-center justify-center rounded-full bg-accent" />
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
            <h3 className="text-base font-medium">
              {exp.role}{" "}
              <span className="text-muted">· {exp.company}</span>
            </h3>
            <span className="font-mono text-xs text-muted">{exp.period}</span>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed list-disc pl-4 marker:text-accent/60">
            {exp.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
