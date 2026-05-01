export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  avatarUrl: string;
  htmlUrl: string;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  language: string | null;
  pushedAt: string;
};

const HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export async function getGitHubUser(
  username: string,
): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: HEADERS,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      login: data.login,
      name: data.name ?? null,
      bio: data.bio ?? null,
      publicRepos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
      avatarUrl: data.avatar_url,
      htmlUrl: data.html_url,
    };
  } catch (err) {
    console.error("[github] getGitHubUser failed:", err);
    return null;
  }
}

export async function getTopRepos(
  username: string,
  limit = 4,
): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      {
        headers: HEADERS,
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const data: any[] = await res.json();
    return data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, limit)
      .map((r) => ({
        name: r.name,
        description: r.description ?? null,
        htmlUrl: r.html_url,
        stars: r.stargazers_count ?? 0,
        language: r.language ?? null,
        pushedAt: r.pushed_at,
      }));
  } catch (err) {
    console.error("[github] getTopRepos failed:", err);
    return [];
  }
}
