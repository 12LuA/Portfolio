import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Eye, Star } from "lucide-react"
import { siGithub } from "simple-icons"

export function Projects() {
  const statButtonClass =
    "h-auto flex-1 gap-1.5 py-2.5 text-xs font-medium text-muted-foreground/70"

  return (
    <Card className="mx-auto w-full max-w-sm bg-white/4 transition-colors hover:bg-white/5">
      <CardHeader className="pb-0">
        <CardTitle>12lua.github.io</CardTitle>
        <CardAction>
          <div className="flex items-center gap-1">
            <Star className="size-3.5 text-muted-foreground/60" />
            <span className="text-muted-foreground/80">0</span>
          </div>
        </CardAction>
        <CardDescription>
          My personal website showcasing projects and portfolio
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-0">
        <Button asChild variant="ghost" className={statButtonClass}>
          <a
            href="https://github.com/12LuA/12lua.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 fill-current"
            >
              <path d={siGithub.path} />
            </svg>
            <span>GitHub</span>
          </a>
        </Button>
        <Button variant="ghost" className={statButtonClass}>
          <Eye className="size-4" />
          <span>View</span>
        </Button>
      </CardFooter>
    </Card>
    
  )
}
