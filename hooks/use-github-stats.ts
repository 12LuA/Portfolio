import statsData from "@/public/stats.json"

export type GithubStats = {
  followers: number
  repos: number
  stars: number
  contributions: number
  pullRequests: number
  issues: number
  updatedAt: string
}

type UseGithubStatsResult = {
  stats: GithubStats
  loading: boolean
  error: string | null
}

export function useGithubStats(): UseGithubStatsResult {
  return {
    stats: statsData as GithubStats,
    loading: false,
    error: null,
  }
}
