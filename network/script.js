/**
 * Network Panel - Basic Exercise
 * ===============================
 * 
 * This file makes API requests that you'll monitor in the Network panel.
 * Open DevTools (F12) → Network tab to see all requests.
 * 
 * LEARNING GOALS:
 * - Monitor HTTP requests in the Network panel
 * - Understand request/response headers
 * - Simulate slow network conditions (throttling)
 * - Handle API errors gracefully
 * 
 * EXERCISES:
 * 1. Click "Fetch Posts" and watch the request appear in Network panel
 * 2. Click on the request to see Headers, Response, Timing tabs
 * 3. Try "Slow 3G" throttling to see how it affects load time
 * 4. Change the URL to a wrong endpoint to see error handling
 * 
 * SUCCESS CRITERIA:
 * ✓ You can identify the HTTP method (GET) and status code (200)
 * ✓ You can see how long the request took in the Timing tab
 * ✓ Error messages display when the API fails
 */

// ===========================================
// Welcome message
// ===========================================
console.log('%c🌐 Network Exercise - Welcome!', 'font-size: 18px; font-weight: bold; color: #FF9800;');
console.log('%c─────────────────────────────', 'color: #FF9800;');
console.log('');
console.log('Before clicking "Fetch Posts":');
console.log('  1. Open DevTools → Network panel');
console.log('  2. Make sure recording is on (red dot)');
console.log('  3. Clear existing requests (🚫 button)');
console.log('');
console.log('After clicking:');
console.log('  - Look for the "posts" request in the list');
console.log('  - Click it to see Headers, Response, Timing');
console.log('');
console.log('%c─────────────────────────────', 'color: #FF9800;');

// ===========================================
// Fetch Posts - Main Exercise
// ===========================================
document.getElementById('fetch-posts').addEventListener('click', () => {
    console.log('Fetching posts from API...');
    
    /*
     * This makes a GET request to a free testing API.
     * 
     * EXERCISE: Watch the Network panel when this runs!
     * You'll see:
     *   - Request URL
     *   - Request Method: GET
     *   - Status Code: 200 (success)
     *   - Response: JSON array of posts
     * 
     * TRY THIS: Change 'posts' to 'wrong-endpoint' to see a 404 error
     */
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            /*
             * IMPORTANT: fetch() only rejects on network errors, not HTTP errors!
             * A 404 response is still a "successful" fetch.
             * We need to check response.ok to handle HTTP errors.
             */
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Received ${data.length} posts`);
            
            /*
             * Display the data on the page.
             * 
             * EXERCISE: In Network panel, click the request and go to:
             *   - "Preview" tab to see formatted JSON
             *   - "Response" tab to see raw JSON
             *   - "Headers" tab to see Content-Type: application/json
             */
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            /*
             * This catches both network errors and our thrown HTTP errors.
             * 
             * EXERCISE: Try these to trigger errors:
             *   1. Enable "Offline" mode in Network panel
             *   2. Change URL to /wrong-endpoint
             *   3. Block the domain using Request blocking
             */
            console.error('Error fetching posts:', error);
            document.getElementById('output').textContent = 'Failed to fetch posts: ' + error.message;
        });
});

/*
 * ===========================================
 * THINGS TO TRY IN NETWORK PANEL
 * ===========================================
 * 
 * 1. THROTTLING:
 *    - Click the "No throttling" dropdown
 *    - Select "Slow 3G"
 *    - Fetch posts again and notice the longer load time
 * 
 * 2. REQUEST DETAILS:
 *    - Click on the request row
 *    - Headers tab: See request/response headers
 *    - Response tab: See the raw JSON
 *    - Timing tab: See DNS, connection, waiting times
 * 
 * 3. COPY AS CURL:
 *    - Right-click the request
 *    - Select "Copy" → "Copy as cURL"
 *    - Paste in terminal to replay the request
 * 
 * 4. DISABLE CACHE:
 *    - Check "Disable cache" checkbox
 *    - Now every request fetches fresh data
 * 
 * 5. PRESERVE LOG:
 *    - Check "Preserve log" checkbox
 *    - Requests stay visible even after page navigation
 */
