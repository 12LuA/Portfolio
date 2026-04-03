"use client"

import { Button } from "@/components/ui/button"
import { GithubStatsCard } from "@/components/github-stats"
import { Projects } from "@/components/projects"
import { ModeToggle } from "@/components/theme-button"
import { Separator } from "@/components/ui/separator"
import { usePlausible } from "next-plausible"
import { FaGithub } from "react-icons/fa6"

export default function Page() {
  const plausible = usePlausible()

  const handleClick = () => {
    plausible("Button clicked", {
      props: {
        btnText: "GitHub",
        btnLocation: "Homepage",
      },
    })
  }

  return (
    <div className="min-h-svh p-15">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-15 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-4 text-sm leading-loose">
          <div className="flex items-center justify-between text-2xl font-bold md:text-4xl">
            12LuA
            <div className="flex items-center gap-2">
              <Button asChild>
                <a
                  href="https://discord.com/users/602846728147959808"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Me
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" onClick={handleClick}>
                <a
                  href="https://github.com/12LuA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub profile"
                >
                  <FaGithub />
                </a>
              </Button>
            </div>
          </div>
          <Separator />
          <div>
            <h1 className="text-2xl">Projects</h1>
          </div>
          <Projects />
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
