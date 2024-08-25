document.getElementById('fetch-posts').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts')  // Fetching from a known external API
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            document.getElementById('output').textContent = 'Failed to fetch posts: ' + error.message;
        });
});
