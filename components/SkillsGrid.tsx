import { profile } from "@/content/profile";

export function SkillsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Object.entries(profile.skills).map(([category, items]) => (
        <div
          key={category}
          className="rounded-lg border border-border bg-card/50 p-4"
        >
          <h3 className="text-sm font-medium text-accent mb-3 font-mono">
            {category}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
              <span
                key={item}
                className="text-xs px-2 py-1 rounded-md bg-bg border border-border text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
