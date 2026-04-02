"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGithubStats } from "@/hooks/use-github-stats"
import { ChartLine, Folder, GitPullRequest, Star, CircleDot, Users } from "lucide-react"

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("de-DE").format(value)
}

export function GithubStatsCard() {
  const { stats } = useGithubStats()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="bg-white/2 hover:bg-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
            <Folder className="h-4 w-4" />
            Repositories
          </CardTitle>
          <CardDescription className="text-3xl font-semibold text-primary">
            {formatNumber(stats.repos)}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/2 hover:bg-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4" />
            Total Stars
          </CardTitle>
          <CardDescription className="text-3xl font-semibold text-primary">
            {formatNumber(stats.stars)}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/2 hover:bg-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChartLine className="h-4 w-4" />
            Contributions
          </CardTitle>
          <CardDescription className="text-3xl font-semibold text-primary">
            {formatNumber(stats.contributions)}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/2 hover:bg-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
            <GitPullRequest className="h-4 w-4" />
            Pull Requests
          </CardTitle>
          <CardDescription className="text-3xl font-semibold text-primary">
            {formatNumber(stats.pullRequests)}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/2 hover:bg-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
            <CircleDot className="h-4 w-4" />
            Issues
          </CardTitle>
          <CardDescription className="text-3xl font-semibold text-primary">
            {formatNumber(stats.issues)}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/2 hover:bg-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Followers
          </CardTitle>
          <CardDescription className="text-3xl font-semibold text-primary">
            {formatNumber(stats.followers)}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
