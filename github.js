const GITHUB_API_URL = 'https://api.github.com/users/oumaimaaitsaid/repos';

async function fetchGitHubProjects() {
    const response = await fetch(GITHUB_API_URL);
    const repos = await response.json();
    
    return repos.map(repo => ({
        title: repo.name,
        description: repo.description,
        technologies: [repo.language],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        githubLink: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics
    }));
}