/**
 * Network Panel - Advanced Exercise
 * 
 * This file demonstrates:
 * - WebSocket connections and message debugging
 * - REST API calls for comparison
 * - Error handling and fallbacks
 * - Multiple parallel requests for waterfall analysis
 */

// ===========================================
// WebSocket Connection
// ===========================================

let websocket = null;
let messageCount = 0;

/**
 * Connect to WebSocket server
 * 
 * EXERCISE: 
 * 1. Open Network panel → Filter by "WS"
 * 2. Click the WebSocket connection
 * 3. Go to "Messages" tab to see sent/received messages
 */
function connectWebSocket() {
    const statusDot = document.getElementById('ws-status');
    const chatMessages = document.getElementById('chat-messages');
    
    // Using Postman's public WebSocket echo server
    // This server echoes back any message you send
    const wsUrl = 'wss://ws.postman-echo.com/raw';
    
    logApi('Connecting to WebSocket...', 'info');
    addChatMessage('Connecting to server...', 'system');
    
    try {
        websocket = new WebSocket(wsUrl);
        
        websocket.onopen = () => {
            statusDot.classList.add('connected');
            logApi('WebSocket connected!', 'success');
            addChatMessage('Connected to chat server', 'system');
            
            // Enable input
            document.getElementById('message-input').disabled = false;
            document.getElementById('send-message').disabled = false;
            
            // Send a hello message
            sendWebSocketMessage({ 
                type: 'join', 
                data: 'User joined the chat' 
            });
        };
        
        websocket.onmessage = (event) => {
            messageCount++;
            logApi(`Received message #${messageCount}`, 'info');
            
            // Parse and display the message
            try {
                const data = JSON.parse(event.data);
                addChatMessage(`Echo: ${data.data || event.data}`, 'received');
            } catch {
                addChatMessage(`Echo: ${event.data}`, 'received');
            }
        };
        
        websocket.onerror = (error) => {
            logApi('WebSocket error! Check if request was blocked.', 'error');
            addChatMessage('Connection error - falling back to REST', 'system');
            
            // Demonstrate fallback to REST
            startRESTPolling();
        };
        
        websocket.onclose = () => {
            statusDot.classList.remove('connected');
            logApi('WebSocket disconnected', 'info');
            addChatMessage('Disconnected from server', 'system');
            
            // Disable input
            document.getElementById('message-input').disabled = true;
            document.getElementById('send-message').disabled = true;
        };
        
    } catch (error) {
        logApi(`Failed to connect: ${error.message}`, 'error');
        addChatMessage('Failed to connect - check console', 'system');
    }
}

/**
 * Send a message via WebSocket
 * 
 * EXERCISE: Watch the Messages tab in Network panel
 * Green arrow (↑) = sent, Red arrow (↓) = received
 */
function sendWebSocketMessage(data) {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
        const message = typeof data === 'string' ? data : JSON.stringify(data);
        websocket.send(message);
        
        if (typeof data === 'object' && data.type === 'message') {
            addChatMessage(data.data, 'sent');
        }
        
        logApi(`Sent: ${message.substring(0, 50)}...`, 'success');
    } else {
        logApi('WebSocket not connected', 'error');
    }
}

/**
 * Disconnect WebSocket
 */
function disconnectWebSocket() {
    if (websocket) {
        websocket.close();
        websocket = null;
    }
}

/**
 * Fallback: REST polling when WebSocket fails
 * 
 * EXERCISE: Block the WebSocket URL to trigger this fallback
 */
function startRESTPolling() {
    logApi('Starting REST polling as fallback...', 'info');
    addChatMessage('Using REST API fallback (slower)', 'system');
    
    // In a real app, this would poll the server periodically
    // For demo, we'll just fetch once
    fetchMessages();
}

// ===========================================
// REST API Functions
// ===========================================

/**
 * Fetch messages via REST API
 * 
 * EXERCISE: 
 * 1. Right-click this request → "Copy as cURL"
 * 2. Paste in terminal to replay
 * 3. Try "Override content" to modify the response
 */
async function fetchMessages() {
    logApi('Fetching messages via REST...', 'info');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        logApi(`Received ${data.length} messages`, 'success');
        
        // Display in chat
        data.forEach(comment => {
            addChatMessage(`[REST] ${comment.name}: ${comment.body.substring(0, 50)}...`, 'received');
        });
        
    } catch (error) {
        logApi(`REST fetch failed: ${error.message}`, 'error');
    }
}

/**
 * Fetch users from API
 */
async function fetchUsers() {
    logApi('Fetching users...', 'info');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        logApi(`Fetched ${data.length} users`, 'success');
        
        data.slice(0, 3).forEach(user => {
            logApi(`  - ${user.name} (${user.email})`, 'info');
        });
    } catch (error) {
        logApi(`Failed: ${error.message}`, 'error');
    }
}

/**
 * Fetch posts from API
 */
async function fetchPosts() {
    logApi('Fetching posts...', 'info');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await response.json();
        logApi(`Fetched ${data.length} posts`, 'success');
    } catch (error) {
        logApi(`Failed: ${error.message}`, 'error');
    }
}

/**
 * Trigger a 404 error
 * 
 * EXERCISE: See how the Network panel displays errors (red)
 */
async function trigger404() {
    logApi('Requesting non-existent endpoint...', 'info');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/this-does-not-exist');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        logApi(`Expected error: ${error.message}`, 'error');
    }
}

/**
 * Trigger a 500 error (simulated)
 * 
 * Note: We can't actually trigger a 500 from jsonplaceholder,
 * but this demonstrates error handling
 */
async function trigger500() {
    logApi('Simulating server error...', 'info');
    
    try {
        // This endpoint returns 500
        const response = await fetch('https://httpstat.us/500');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Server Error`);
        }
    } catch (error) {
        logApi(`Server error: ${error.message}`, 'error');
    }
}

// ===========================================
// Waterfall Analysis Functions
// ===========================================

/**
 * Load multiple resources to analyze waterfall
 * 
 * EXERCISE:
 * 1. Click this button
 * 2. Look at the Waterfall column in Network panel
 * 3. Hover over bars to see DNS, Connection, TTFB, Download times
 */
async function loadHeavyResources() {
    const resources = [
        { name: 'Large Image', url: 'https://picsum.photos/1200/800', type: 'image' },
        { name: 'JSON Data', url: 'https://jsonplaceholder.typicode.com/posts', type: 'json' },
        { name: 'User Data', url: 'https://jsonplaceholder.typicode.com/users', type: 'json' },
        { name: 'Comments', url: 'https://jsonplaceholder.typicode.com/comments?_limit=100', type: 'json' },
    ];
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    logApi('Loading heavy resources...', 'info');
    
    for (const resource of resources) {
        // Add pending item
        const item = document.createElement('div');
        item.className = 'resource-item';
        item.innerHTML = `
            <span>${resource.name}</span>
            <span class="status pending">Loading...</span>
        `;
        resourceList.appendChild(item);
        
        try {
            const startTime = performance.now();
            const response = await fetch(resource.url);
            const data = resource.type === 'image' ? await response.blob() : await response.json();
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);
            
            const size = resource.type === 'image' 
                ? `${Math.round(data.size / 1024)}KB` 
                : `${JSON.stringify(data).length} bytes`;
            
            item.innerHTML = `
                <span>${resource.name}</span>
                <span class="size">${size} (${duration}ms)</span>
                <span class="status loaded">✓</span>
            `;
            
            logApi(`Loaded ${resource.name}: ${size} in ${duration}ms`, 'success');
            
        } catch (error) {
            item.innerHTML = `
                <span>${resource.name}</span>
                <span class="status" style="background: rgba(255,71,87,0.2); color: #ff4757;">Failed</span>
            `;
            logApi(`Failed to load ${resource.name}: ${error.message}`, 'error');
        }
    }
}

/**
 * Make parallel requests
 * 
 * EXERCISE: Watch how parallel requests appear in the waterfall
 * They should start at similar times, not sequentially
 */
async function makeParallelRequests() {
    logApi('Making 5 parallel requests...', 'info');
    
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/posts/4',
        'https://jsonplaceholder.typicode.com/posts/5',
    ];
    
    const startTime = performance.now();
    
    try {
        // All requests start simultaneously
        const results = await Promise.all(urls.map(url => fetch(url)));
        const endTime = performance.now();
        
        logApi(`All 5 requests completed in ${Math.round(endTime - startTime)}ms`, 'success');
        logApi('(Check waterfall - they should overlap)', 'info');
        
    } catch (error) {
        logApi(`Parallel requests failed: ${error.message}`, 'error');
    }
}

// ===========================================
// UI Helper Functions
// ===========================================

function addChatMessage(text, type) {
    const container = document.getElementById('chat-messages');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.innerHTML = `
        ${text}
        <div class="time">${new Date().toLocaleTimeString()}</div>
    `;
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

function logApi(message, type = 'info') {
    const container = document.getElementById('api-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
    
    // Also log to console
    console.log(`[Network Exercise] ${message}`);
}

// ===========================================
// Event Listeners
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // WebSocket controls
    document.getElementById('connect-ws').addEventListener('click', connectWebSocket);
    document.getElementById('disconnect-ws').addEventListener('click', disconnectWebSocket);
    
    // Send message
    document.getElementById('send-message').addEventListener('click', () => {
        const input = document.getElementById('message-input');
        if (input.value.trim()) {
            sendWebSocketMessage({ type: 'message', data: input.value });
            input.value = '';
        }
    });
    
    // Enter key to send
    document.getElementById('message-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('send-message').click();
        }
    });
    
    // REST API buttons
    document.getElementById('fetch-rest').addEventListener('click', fetchMessages);
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-posts').addEventListener('click', fetchPosts);
    document.getElementById('trigger-404').addEventListener('click', trigger404);
    document.getElementById('trigger-500').addEventListener('click', trigger500);
    
    // Resource loading buttons
    document.getElementById('load-heavy').addEventListener('click', loadHeavyResources);
    document.getElementById('parallel-requests').addEventListener('click', makeParallelRequests);
});

// ===========================================
// Console startup message
// ===========================================

console.log('%c🌐 Network Panel Advanced Exercise', 'font-size: 18px; font-weight: bold; color: #00ff88;');
console.log('%c────────────────────────────────────', 'color: #00ff88;');
console.log('');
console.log('%cThings to try:', 'font-weight: bold;');
console.log('');
console.log('1. WebSocket debugging: Filter by "WS", click connection → Messages tab');
console.log('2. Block requests: Right-click → Block request URL/domain');
console.log('3. Copy as cURL: Right-click → Copy → Copy as cURL');
console.log('4. Export HAR: Click export icon to save all requests');
console.log('5. Local Overrides: Sources → Overrides → Override content');
console.log('6. Throttling: Use dropdown to simulate slow networks');
console.log('');
console.log('%c────────────────────────────────────', 'color: #00ff88;');

