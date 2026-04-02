import fs from "fs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "12LuA";

async function fetchStats() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      {
        user(login: "${USERNAME}") {
          followers { totalCount }
          repositories(first: 100) {
            totalCount
            nodes {
              stargazerCount
            }
          }
          pullRequests { totalCount }
          issues { totalCount }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
      `
    }),
  });

  const json = await res.json();
  const user = json.data.user;

  const totalStars = user.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0
  );

  return {
    followers: user.followers.totalCount,
    repos: user.repositories.totalCount,
    stars: totalStars,
    contributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    pullRequests: user.pullRequests.totalCount,
    issues: user.issues.totalCount,
    updatedAt: new Date().toISOString(),
  };
}

async function main() {
  const stats = await fetchStats();

  fs.writeFileSync(
    "./public/stats.json",
    JSON.stringify(stats, null, 2)
  );

  console.log("✅ stats.json updated");
}

main();
