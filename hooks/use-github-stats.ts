import { useEffect, useState } from "react"

export type GithubStats = {
  repositories: number
  totalStars: number
  contributions: number
  pullRequests: number
}

type UseGithubStatsResult = {
  stats: GithubStats | null
  loading: boolean
  error: string | null
}

export function useGithubStats(username: string): UseGithubStatsResult {
  const [stats, setStats] = useState<GithubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const statsResponse = await fetch("/github-stats.json", {
          signal: controller.signal,
        })

        if (!statsResponse.ok) {
          throw new Error("GitHub stats could not be loaded")
        }

        const statsData = (await statsResponse.json()) as GithubStats

        if (!controller.signal.aborted) {
          setStats(statsData)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Statistiken konnten nicht geladen werden")
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadStats()

    return () => {
      controller.abort()
    }
  }, [username])

  return {
    stats,
    loading,
    error,
  }
}
