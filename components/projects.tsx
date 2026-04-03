import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { FaGithub, FaDiscord } from "react-icons/fa6"
import { Eye, Star, Server } from "lucide-react"

export function Projects() {
  const statButtonClass =
    "h-auto flex-1 gap-1.5 py-2.5 text-xs font-medium text-muted-foreground/70"

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="mx-auto w-full max-w-sm bg-white/4 transition-colors hover:bg-white/5">
        <CardHeader>
          <CardTitle>12lua.github.io</CardTitle>
          <CardDescription>
            My personal website showcasing projects and portfolio
          </CardDescription>
          <CardAction className="flex items-center gap-1 text-muted-foreground/80">
            <Star className="size-3.5 text-muted-foreground/60" />
            <span>0</span>
          </CardAction>
        </CardHeader>
        <CardFooter className="p-0">
          <Button asChild variant="ghost" className={statButtonClass}>
            <a
              href="https://github.com/12LuA/12lua.github.io"
              target="_blank"
              rel="noopener"
            >
              <FaGithub aria-hidden="true" className="size-4" />
              <span>GitHub</span>
            </a>
          </Button>
          <Button asChild variant="ghost" className={statButtonClass}>
            <a href="https://12lua.github.io" target="_blank" rel="noopener">
              <Eye className="size-4" />
              <span>View</span>
            </a>
          </Button>
        </CardFooter>
      </Card>

      <Card className="mx-auto w-full max-w-sm bg-white/4 transition-colors hover:bg-white/5">
        <CardHeader>
          <CardTitle>GTA Tools</CardTitle>
          <CardDescription>
            Tools for GTA Online, such as the Cayo Perico Loot Calculator
          </CardDescription>
          <CardAction className="flex items-center gap-1 text-muted-foreground/80">
            <Star className="size-3.5 text-muted-foreground/60" />
            <span>0</span>
          </CardAction>
        </CardHeader>
        <CardFooter className="p-0">
          <Button asChild variant="ghost" className={statButtonClass}>
            <a
              href="https://github.com/12LuA/Cayo-Calculator"
              target="_blank"
              rel="noopener"
            >
              <FaGithub aria-hidden="true" className="size-4" />
              <span>GitHub</span>
            </a>
          </Button>
          <Button asChild variant="ghost" className={statButtonClass}>
            <a href="https://gta-tools.vercel.app/" target="_blank" rel="noopener">
              <Eye className="size-4" />
              <span>View</span>
            </a>
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-white/4 transition-colors hover:bg-white/5">
        <CardHeader>
          <CardTitle>Minigames</CardTitle>
          <CardDescription>
            Minigames is a Discord bot that allows you to play minigames such as emojiquiz, counting and much more.
          </CardDescription>
          <CardAction className="flex items-center gap-1 text-muted-foreground/80">
            <Server className="size-3.5 text-muted-foreground/60" />
            <span>8k</span>
          </CardAction>
        </CardHeader>
        <CardFooter className="p-0">
          <Button asChild variant="ghost" className={statButtonClass}>
            <a
              href="https://discord.com/discovery/applications/957020295246528512"
              target="_blank"
              rel="noopener"
            >
              <FaDiscord aria-hidden="true" className="size-4" />
              <span>Discord</span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
