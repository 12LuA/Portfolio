import { Button } from "@/components/ui/button"
import { GithubStatsCard } from "@/components/github-stats"
import { Projects } from "@/components/projects"
import { ModeToggle } from "@/components/theme-button"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa6"

export default function Page() {
  return (
    <div className="min-h-svh p-15">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-15 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-4 text-sm leading-loose">
          <div className="flex items-center justify-between text-2xl font-bold md:text-4xl">
            12LuA
            <Button asChild variant="outline" size="icon">
              <a
                href="https://github.com/12LuA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
              >
                <FaGithub aria-hidden="true" className="size-4" />
              </a>
            </Button>
          </div>
          <Separator />
          <div>
            <h1 className="font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the button component for you.</p>
            <Button className="mt-2">Button</Button>
          </div>
          <Projects />
          <div className="font-mono text-xs text-muted-foreground">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>

        <div className="w-full max-w-md">
          <h2 className="mb-3 text-lg font-semibold">GitHub Stats</h2>
          <GithubStatsCard />
        </div>
      </div>

      <div className="fixed right-6 bottom-6">
        <ModeToggle />
      </div>
    </div>
  )
}
