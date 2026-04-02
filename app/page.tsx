import { Button } from "@/components/ui/button"
import { GithubStatsCard } from "@/components/github-stats"
import { ModeToggle } from "@/components/theme-button"

export default function Page() {
  return (
    <div className="min-h-svh p-15">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the button component for you.</p>
            <Button className="mt-2">Button</Button>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>

        <div className="w-full max-w-md">
          <h2 className="mb-3 text-lg font-semibold">GitHub Stats</h2>
          <GithubStatsCard />
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6">
        <ModeToggle />
      </div>
    </div>
  )
}
