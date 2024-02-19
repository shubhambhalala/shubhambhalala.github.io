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
    const title = "Data Dreams, Delivered \u{1F4A1}"
    const titleWords = title.split(' '); // Split title into words
    let titleDisplay = ''; // Initialize empty string for the animated title

    mainContent.innerHTML = `
        <div id="welcome">
            <h2 id="animated-title"></h2> <!-- Placeholder for the animated title -->
            <div id="intro-container" style="width: 800px; padding-top: 20px;" >
                <p id="dynamic-text" style="font-size: 20px; opacity: 0;">
                    Curious <span class='highlight'>Data Science grad</span> with 3 years experience as a <span class='highlight'>Quant Researcher & Data Scientist</span> in Finance and Healthcare. Developed and managed <span class='highlight'>ML & DevOps pipelines</span> that process 300,000 images bi-weekly, benefiting over 100 cancer patients by providing early results. Proven track record of <span class='highlight'>deploying LLM applications</span> that optimize research process for <span class='highlight'>hedge funds</span> and annotate submissions ensuring compliance with guidelines to <span class='highlight'>enhance decision-making</span> for reviewers at Elsevier.
                </p>
            </div>
        </div>
        <div id="bitmoji-container">
            <img src="images/profile_2.png" alt="Shubham's Bitmoji" />
        </div>
        <div id="social-media-icons">
            <a href="https://www.linkedin.com/in/shubhambhalala/" class="social-icon" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://www.youtube.com/@shubhambhalala" class="social-icon" target="_blank"><i class="fab fa-youtube"></i></a>
            <a href="https://github.com/shubhambhalala" class="social-icon" target="_blank"><i class="fab fa-github"></i></a>
        </div>
    `;

    // Function to animate the title
    const animateTitle = (wordIndex) => {
        if (wordIndex < titleWords.length) {
            titleDisplay += titleWords[wordIndex] + ' ';
            document.getElementById('animated-title').textContent = titleDisplay;
            setTimeout(() => animateTitle(wordIndex + 1), 500); // Adjust time as needed
        }
    };

    // Fade in the main content and start title animation
    mainContent.style.opacity = 1;
    setTimeout(() => {
        document.getElementById('dynamic-text').style.opacity = 1;
        document.getElementById('dynamic-text').style.transition = 'opacity 2s ease';
        animateTitle(0); // Start animating the title
    }, 500);

    // Sequentially underline the keywords, adjusted to start after title animation
    setTimeout(() => {
        const highlights = mainContent.querySelectorAll('.highlight');
        let count = 0;
        const underlineNextWord = () => {
            if (count < highlights.length) {
                highlights[count].classList.add('highlighted');
                count++;
                if (count < highlights.length) {
                    setTimeout(underlineNextWord, 2000); // Schedule the next underline
                }
            }
        };
        underlineNextWord();
    }, titleWords.length * 500 + 1000); // Adjust based on title animation duration
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

document.addEventListener('DOMContentLoaded', (event) => {
    // Make the content appear
    const content = document.getElementById('intro-container');
    content.style.opacity = 1;

    // Function to highlight words
    function highlightWords() {
        const highlights = document.querySelectorAll('.highlight');
        let count = 0;

        // Function to add highlighted class
        function addHighlight() {
            if (count < highlights.length) {
                const order = highlights[count].getAttribute('data-highlight-order');
                if (order - 1 === count) {
                    highlights[count].classList.add('highlighted');
                    count++;
                }
            } else {
                clearInterval(interval); // Clear interval once all words are highlighted
            }
        }

        // Start interval to highlight each word every 2 seconds
        let interval = setInterval(addHighlight, 2000);
    }

    // Start highlighting after the text appears
    setTimeout(highlightWords, 2000); // Adjust time as needed for when to start highlighting
});