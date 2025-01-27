// GitHub API Configuration
const GITHUB_USERNAME = 'oumaimaaitsaid';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;// Fetch GitHub Projects
async function fetchGitHubProjects() {
    try {
        const response = await fetch(GITHUB_API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const repos = await response.json();
        return repos.map(repo => ({
            title: repo.name,
            description: repo.description,
            technologies: [repo.language].filter(Boolean),
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            githubLink: repo.html_url,
            homepage: repo.homepage,
            topics: repo.topics || []
        }));
    } catch (error) {
        console.log('Error fetching projects:', error);
        return [];
    }
}

// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Tech stack orbit
const techStack = [
    { name: 'React', icon: 'react.svg' },
    { name: 'Node.js', icon: 'nodejs.svg' },
    { name: 'TypeScript', icon: 'typescript.svg' },
    { name: 'MongoDB', icon: 'mongodb.svg' },
    { name: 'Next.js', icon: 'nextjs.svg' },
    { name: 'PostgreSQL', icon: 'postgresql.svg' }
];

const techItems = document.querySelector('.tech-items');
const radius = 180;

techStack.forEach((tech, index) => {
    const angle = (index / techStack.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    const techItem = document.createElement('div');
    techItem.className = 'tech-item';
    techItem.style.transform = `translate(${x}px, ${y}px)`;
    
    const img = document.createElement('img');
    img.src = `assets/icons/${tech.icon}`;
    img.alt = tech.name;
    
    techItem.appendChild(img);
    techItems.appendChild(techItem);
});

// Static Projects Data
const staticProjects = [
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce platform built with Next.js and Node.js",
        image: "ecommerce.jpg",
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
        liveLink: "https://project.com",
        githubLink: "https://github.com/username/project"
    }
];

// Render Static Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    staticProjects.forEach(project => {
        const projectCard = `
            <div class="project-card" data-aos="fade-up">
                <div class="project-image">
                    <img src="assets/projects/${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="technologies">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveLink}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.githubLink}" target="_blank">
                            <i class="fab fa-github"></i> Source Code
                        </a>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.innerHTML += projectCard;
    });
}

// Display GitHub Projects
async function displayGitHubProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const projects = await fetchGitHubProjects();
    
    projects.forEach(project => {
        const projectCard = `
            <div class="project-card" data-aos="fade-up">
                <div class="project-image">
                    <img src="assets/projects/${project.title}.png" 
                         alt="${project.title}"
                         onerror="this.src='assets/projects/default.png'">
                </div>
                <div class="project-header">
                    <i class="fab fa-github"></i>
                    <div class="project-stats">
                        <span><i class="fas fa-star"></i> ${project.stars}</span>
                        <span><i class="fas fa-code-branch"></i> ${project.forks}</span>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description || 'No description available'}</p>
                    <div class="project-tech-stack">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="project-topics">
                        ${project.topics.map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                    </div>
                    <div class="project-links">
                        ${project.homepage ? 
                            `<a href="${project.homepage}" target="_blank" class="demo-link">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>` : ''
                        }
                        <a href="${project.githubLink}" target="_blank" class="github-link">
                            <i class="fab fa-github"></i> Source Code
                        </a>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.innerHTML += projectCard;
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    }
});

// GSAP Animations
gsap.from('.text-content h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

gsap.from('.text-content p', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power4.out'
});

gsap.from('.cta-buttons', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: 'power4.out'
});

// Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    renderProjects();
    await displayGitHubProjects();
});
