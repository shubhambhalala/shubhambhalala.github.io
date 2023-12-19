document.addEventListener('DOMContentLoaded', function() {
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            // Example: Update content for Home page
            if (window.location.pathname.endsWith("index.html")) {
                document.getElementById('main-content').innerHTML = `
                    <h1>${data.home.title}</h1>
                    <p>${data.home.description}</p>
                `;
            }
            // Similar logic for other pages
        })
        .catch(error => console.error('Error loading content:', error));
});



