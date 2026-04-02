import { writeFile } from "node:fs/promises"
import path from "node:path"

const username = process.env.GITHUB_USERNAME ?? process.env.GITHUB_REPOSITORY_OWNER

if (!username) {
  throw new Error("GITHUB_USERNAME or GITHUB_REPOSITORY_OWNER is required")
}

const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN
const headers = {
  Accept: "application/vnd.github+json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

async function fetchJson(url) {
  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`)
  }

  return response.json()
}

const user = await fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}`)

let totalStars = 0
let page = 1
let hasMoreRepos = true

while (hasMoreRepos) {
  const repos = await fetchJson(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=updated`,
  )

  totalStars += repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  hasMoreRepos = repos.length === 100
  page += 1
}

const contributionsData = await fetchJson(
  `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=all`,
)

const contributions = Object.values(contributionsData.total).reduce(
  (sum, value) => sum + value,
  0,
)

const pullRequestsData = await fetchJson(
  `https://api.github.com/search/issues?q=type:pr+author:${encodeURIComponent(username)}&per_page=1`,
)

const stats = {
  repositories: user.public_repos,
  totalStars,
  contributions,
  pullRequests: pullRequestsData.total_count,
  updatedAt: new Date().toISOString(),
}

await writeFile(
  path.join(process.cwd(), "public", "github-stats.json"),
  `${JSON.stringify(stats, null, 2)}\n`,
)
