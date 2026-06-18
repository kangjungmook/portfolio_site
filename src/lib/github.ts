const USERNAME = "kangjungmook";

export interface ContribDay {
  date: string;
  count: number;
}

export interface GitHubData {
  repos: number;
  totalCommits: number;
  streak: number;
  contributions: ContribDay[] | null; // null이면 토큰 없음, 랜덤으로 대체
}

const FALLBACK: GitHubData = {
  repos: 13,
  totalCommits: 0,
  streak: 0,
  contributions: null,
};

export async function fetchGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    // REST: 공개 유저 정보 (토큰 불필요)
    const userRes = await fetch(
      `https://api.github.com/users/${USERNAME}`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!userRes.ok) return FALLBACK;
    const user = await userRes.json();
    const repos: number = user.public_repos ?? FALLBACK.repos;

    if (!token) return { ...FALLBACK, repos };

    // GraphQL: 잔디 데이터 (토큰 필요)
    const gqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          user(login: "${USERNAME}") {
            contributionsCollection {
              totalCommitContributions
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    if (!gqlRes.ok) return { ...FALLBACK, repos };
    const gql = await gqlRes.json();
    const cc = gql.data?.user?.contributionsCollection;
    if (!cc) return { ...FALLBACK, repos };

    const totalCommits: number = cc.totalCommitContributions;

    // 주 단위 → 일 단위로 펼치고 마지막 133개만 사용 (19주, 그리드 맞춤)
    const allDays: ContribDay[] = cc.contributionCalendar.weeks
      .flatMap(
        (w: { contributionDays: { contributionCount: number; date: string }[] }) =>
          w.contributionDays
      )
      .map((d: { contributionCount: number; date: string }) => ({
        date: d.date,
        count: d.contributionCount,
      }));

    const contributions = allDays.slice(-133);

    // 연속 커밋: 오늘 커밋 0이면 건너뛰고 역순으로 계산
    const sorted = [...allDays].reverse();
    const today = new Date().toISOString().split("T")[0];
    let streak = 0;
    const startIdx = sorted[0]?.date === today && sorted[0].count === 0 ? 1 : 0;
    for (let i = startIdx; i < sorted.length; i++) {
      if (sorted[i].count > 0) streak++;
      else break;
    }

    return { repos, totalCommits, streak, contributions };
  } catch {
    return FALLBACK;
  }
}
