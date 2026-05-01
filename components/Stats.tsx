import Image from "next/image";
import { ArrowUpRight, GitFork, Star, Users } from "lucide-react";
import { profile } from "@/content/profile";
import { getGitHubUser, getTopRepos } from "@/lib/github";
import { getGfgStats } from "@/lib/gfg";

export async function Stats() {
  const {
    githubUsername,
    leetcodeUsername,
    codechefUsername,
    gfgUsername,
    dsaProblemsSolved,
  } = profile.stats;

  const cards: { label: string; value: string }[] = [
    { label: "DSA problems solved", value: dsaProblemsSolved },
    { label: "Years writing code", value: "5+" },
    { label: "Cloud platforms", value: "AWS · GCP" },
  ];

  const [user, repos, gfg] = await Promise.all([
    githubUsername ? getGitHubUser(githubUsername) : Promise.resolve(null),
    githubUsername ? getTopRepos(githubUsername, 4) : Promise.resolve([]),
    gfgUsername ? getGfgStats(gfgUsername) : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-border bg-card/50 p-4"
          >
            <p className="text-2xl font-semibold tracking-tight">{c.value}</p>
            <p className="mt-1 text-xs font-mono text-muted">{c.label}</p>
          </div>
        ))}
      </div>

      {githubUsername && (
        <div className="rounded-lg border border-border bg-card/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-muted uppercase tracking-wider">GitHub</p>
            <a
              href={user?.htmlUrl ?? `https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted hover:text-fg inline-flex items-center gap-1"
            >
              @{githubUsername} <ArrowUpRight className="size-3" />
            </a>
          </div>

          {user ? (
            <>
              <div className="flex items-start gap-4 mb-5">
                <Image
                  src={user.avatarUrl}
                  alt={user.name ?? user.login}
                  width={56}
                  height={56}
                  className="rounded-full border border-border"
                  unoptimized
                />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-medium">
                    {user.name ?? user.login}
                  </p>
                  {user.bio && (
                    <p className="text-sm text-muted leading-snug mt-0.5">
                      {user.bio}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted font-mono">
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="size-3" /> {user.publicRepos} repos
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3" /> {user.followers} followers
                    </span>
                  </div>
                </div>
              </div>

              {repos.length > 0 && (
                <>
                  <p className="text-xs font-mono text-muted mb-2">
                    Pinned by stars
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {repos.map((r) => (
                      <a
                        key={r.name}
                        href={r.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-md border border-border bg-bg/40 p-3 hover:border-accent/60 transition-colors"
                      >
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="text-sm font-medium truncate">
                            {r.name}
                          </span>
                          <span className="font-mono text-[11px] text-muted inline-flex items-center gap-1 shrink-0">
                            <Star className="size-3" /> {r.stars}
                          </span>
                        </div>
                        {r.description && (
                          <p className="text-xs text-muted line-clamp-2 mb-2">
                            {r.description}
                          </p>
                        )}
                        {r.language && (
                          <span className="text-[10px] font-mono text-muted">
                            {r.language}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">
              GitHub data unavailable — visit{" "}
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                @{githubUsername}
              </a>{" "}
              directly.
            </p>
          )}
        </div>
      )}

      {leetcodeUsername && (
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">LeetCode</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=JetBrains%20Mono&ext=heatmap`}
            alt="LeetCode stats"
            loading="lazy"
            className="w-full max-w-md rounded"
          />
        </div>
      )}

      {codechefUsername && (
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">CodeChef</p>
          <a
            href={`https://www.codechef.com/users/${codechefUsername}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-fg hover:text-accent inline-flex items-center gap-1"
          >
            @{codechefUsername} <ArrowUpRight className="size-3" />
          </a>
        </div>
      )}

      {gfgUsername && (
        <div className="rounded-lg border border-border bg-card/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-muted uppercase tracking-wider">GeeksforGeeks</p>
            <a
              href={
                gfg?.profileUrl ??
                `https://www.geeksforgeeks.org/user/${gfgUsername}/`
              }
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted hover:text-fg inline-flex items-center gap-1"
            >
              @{gfgUsername} <ArrowUpRight className="size-3" />
            </a>
          </div>

          {gfg ? (
            <>
              {gfg.fullName && (
                <p className="text-base font-medium mb-3">{gfg.fullName}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {typeof gfg.totalSolved === "number" && (
                  <DiffCell label="Solved" value={gfg.totalSolved} />
                )}
                {typeof gfg.easy === "number" && (
                  <DiffCell label="Easy" value={gfg.easy} tone="easy" />
                )}
                {typeof gfg.medium === "number" && (
                  <DiffCell label="Medium" value={gfg.medium} tone="medium" />
                )}
                {typeof gfg.hard === "number" && (
                  <DiffCell label="Hard" value={gfg.hard} tone="hard" />
                )}
              </div>
              {typeof gfg.codingScore === "number" && (
                <p className="mt-3 text-xs font-mono text-muted">
                  Coding score:{" "}
                  <span className="text-fg">{gfg.codingScore}</span>
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">
              GFG data unavailable right now — visit{" "}
              <a
                href={`https://www.geeksforgeeks.org/user/${gfgUsername}/`}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                @{gfgUsername}
              </a>{" "}
              directly.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function DiffCell({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?: "default" | "easy" | "medium" | "hard";
}) {
  const toneClass =
    tone === "easy"
      ? "text-emerald-400"
      : tone === "medium"
        ? "text-amber-400"
        : tone === "hard"
          ? "text-red-400"
          : "text-fg";
  return (
    <div className="rounded-md border border-border bg-bg/40 p-3">
      <p className={`text-xl font-semibold tracking-tight ${toneClass}`}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] font-mono text-muted">{label}</p>
    </div>
  );
}
