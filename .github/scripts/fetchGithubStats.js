import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "12LuA";
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN fehlt. Bitte Secret setzen.");
}

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API Fehler: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    const messages = payload.errors.map((error) => error.message).join(" | ");
    throw new Error(`GraphQL Fehler: ${messages}`);
  }

  return payload.data;
}

async function fetchUserBaseData() {
  const query = `
    query UserBase($username: String!, $prQuery: String!, $issueQuery: String!) {
      user(login: $username) {
        followers {
          totalCount
        }
        createdAt
      }
      pullRequests: search(type: ISSUE, query: $prQuery) {
        issueCount
      }
      issues: search(type: ISSUE, query: $issueQuery) {
        issueCount
      }
    }
  `;

  const data = await graphqlRequest(query, {
    username: USERNAME,
    prQuery: `author:${USERNAME} is:pr is:public`,
    issueQuery: `author:${USERNAME} is:issue is:public`,
  });

  return {
    followers: data.user.followers.totalCount,
    createdAt: data.user.createdAt,
    pullRequests: data.pullRequests.issueCount,
    issues: data.issues.issueCount,
  };
}

async function fetchRepoStats() {
  const query = `
    query RepoPage($username: String!, $cursor: String) {
      user(login: $username) {
        repositories(
          first: 100
          after: $cursor
          ownerAffiliations: OWNER
        ) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            stargazerCount
          }
        }
      }
    }
  `;

  let cursor = null;
  let totalStars = 0;
  let totalRepos = 0;

  do {
    const data = await graphqlRequest(query, {
      username: USERNAME,
      cursor,
    });

    const repositories = data.user.repositories;

    totalRepos = repositories.totalCount;
    totalStars += repositories.nodes.reduce(
      (sum, repo) => sum + repo.stargazerCount,
      0
    );

    cursor = repositories.pageInfo.hasNextPage
      ? repositories.pageInfo.endCursor
      : null;
  } while (cursor);

  return {
    repos: totalRepos,
    stars: totalStars,
  };
}

async function fetchContributions(createdAtIso) {
  const query = `
    query Contributions($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const startYear = new Date(createdAtIso).getUTCFullYear();
  const endYear = new Date().getUTCFullYear();

  let totalContributions = 0;

  for (let year = startYear; year <= endYear; year += 1) {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;

    const data = await graphqlRequest(query, {
      username: USERNAME,
      from,
      to,
    });

    totalContributions +=
      data.user.contributionsCollection.contributionCalendar.totalContributions;
  }

  return totalContributions;
}

async function fetchStats() {
  const baseData = await fetchUserBaseData();
  const repoData = await fetchRepoStats();
  const contributions = await fetchContributions(baseData.createdAt);

  return {
    followers: baseData.followers,
    repos: repoData.repos,
    stars: repoData.stars,
    contributions,
    pullRequests: baseData.pullRequests,
    issues: baseData.issues,
    updatedAt: new Date().toISOString(),
  };
}

async function main() {
  const stats = await fetchStats();
  const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
  const outputPath = path.resolve(scriptDirectory, "../../public/stats.json");

  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
  console.log("stats.json updated", stats);
}

main().catch((error) => {
  console.error("Failed to update stats.json", error);
  process.exitCode = 1;
});
