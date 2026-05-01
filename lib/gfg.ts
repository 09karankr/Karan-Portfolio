export type GfgStats = {
  username: string;
  fullName: string | null;
  totalSolved: number | null;
  easy: number | null;
  medium: number | null;
  hard: number | null;
  codingScore: number | null;
  profileUrl: string;
};

export async function getGfgStats(
  username: string,
): Promise<GfgStats | null> {
  try {
    const res = await fetch(
      `https://geeks-for-geeks-api.vercel.app/${encodeURIComponent(username)}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data: any = await res.json();
    if (!data || data.error) return null;

    const solved = data.solvedStats ?? data.solved_stats ?? {};
    const info = data.info ?? {};
    const total =
      typeof solved.total === "number"
        ? solved.total
        : (solved.easy?.count ?? 0) +
          (solved.medium?.count ?? 0) +
          (solved.hard?.count ?? 0) +
          (solved.basic?.count ?? 0);

    return {
      username,
      fullName: info.fullName ?? info.full_name ?? null,
      totalSolved: total || null,
      easy: solved.easy?.count ?? solved.easy ?? null,
      medium: solved.medium?.count ?? solved.medium ?? null,
      hard: solved.hard?.count ?? solved.hard ?? null,
      codingScore:
        info.codingScore ?? info.coding_score ?? info.totalScore ?? null,
      profileUrl: `https://www.geeksforgeeks.org/user/${username}/`,
    };
  } catch (err) {
    console.error("[gfg] failed:", err);
    return null;
  }
}
