document.addEventListener('DOMContentLoaded', function() {
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            // Load content based on the current page
            const pathname = window.location.pathname;

            if (pathname.endsWith("index.html") || pathname === '/') {
                loadHomePage(data);
            } else if (pathname.endsWith("projects.html")) {
                loadProjectsPage(data);
            } else if (pathname.endsWith("contact.html")) {
                loadContactPage(data);
            } else if (pathname.endsWith("resume.html")) {
                loadResumePage(data);
            }
        })
        .catch(error => console.error('Error loading content:', error));
});

function loadHomePage(data) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="card">
            <h1>${data.home.title}</h1>
            <p>${data.home.description}</p>
        </div>
    `;
}

function loadProjectsPage(data) {
    const projectContent = document.getElementById('project-content');
    let projectsHtml = data.projects.map(project => `
        <div class="card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        </div>
    `).join('');
    projectContent.innerHTML = projectsHtml;
}

function loadContactPage(data) {
    const contactContent = document.getElementById('contact-content');
    contactContent.innerHTML = `
        <div class="card">
            <h3>Contact Information</h3>
            <p>Email: ${data.contact.email}</p>
            <p>Phone: ${data.contact.phone}</p>
            <p>LinkedIn: <a href="${data.contact.linkedin}" target="_blank">${data.contact.linkedin}</a></p>
        </div>
    `;
}

function loadResumePage(data) {
    const resumeContent = document.getElementById('resume-content');
    resumeContent.innerHTML = `
        <div class="card">
            <h3>Resume</h3>
            <p><a href="${data.resume}" target="_blank">Download my Resume</a></p>
        </div>
    `;
}
