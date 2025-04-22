// src/hooks/useGitHubProjects.ts
import { useQuery } from '@tanstack/react-query';

interface GithubRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  languages: {
    edges: Array<{
      node: {
        name: string;
        color: string;
      };
      size: number;
    }>;
    totalSize: number;
  };
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  stargazerCount: number;
  updatedAt: string;
}

interface ProcessedRepo {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  languages: Array<{
    name: string;
    color: string;
    percentage: string;
  }>;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
}

export const useGitHubProjects = (username: string) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    'Content-Type': 'application/json',
  };

  return useQuery({
    queryKey: ['github-projects', username],
    queryFn: async () => {
      // Get user's pinned repositories first
      const pinnedReposQuery = `
        query {
          user(login: "${username}") {
            pinnedItems(first: 3, types: REPOSITORY) {  
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  homepageUrl
                  languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                      node {
                        name
                        color
                      }
                      size
                    }
                    totalSize
                  }
                  repositoryTopics(first: 10) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                  stargazerCount
                  updatedAt
                }
              }
            }
          }
        }
      `;

      try {
        const graphqlResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers,
          body: JSON.stringify({ query: pinnedReposQuery }),
        });

        if (!graphqlResponse.ok) {
          throw new Error('GraphQL query failed');
        }

        const data = await graphqlResponse.json();
        return data.data.user.pinnedItems.nodes.map((repo: GithubRepo): ProcessedRepo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.url,
          homepage: repo.homepageUrl,
          languages: repo.languages.edges.map(edge => ({
            name: edge.node.name,
            color: edge.node.color,
            percentage: (edge.size / repo.languages.totalSize * 100).toFixed(1)
          })),
          topics: repo.repositoryTopics.nodes.map(topic => topic.topic.name),
          stargazers_count: repo.stargazerCount,
          updated_at: repo.updatedAt
        }));
      } catch {
        // Fallback to REST API if GraphQL fails
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`,  
          { headers }
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.statusText}`);
        }

        const repos = await reposResponse.json();

        // Fetch languages for each repository
        const reposWithLanguages = await Promise.all(
          repos.map(async (repo: any) => {
            const languagesResponse = await fetch(repo.languages_url, { headers });
            const languages = await languagesResponse.json();
            return { ...repo, languages };
          })
        );

        return reposWithLanguages;
      }
    },
    retry: 2,
  });
};