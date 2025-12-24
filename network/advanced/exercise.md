# Network Panel - Advanced Exercise

## Objective
Master advanced Network panel features including WebSocket debugging, request blocking, local overrides, HAR file analysis, and waterfall optimization.

---

## What You'll Learn
- Debugging **WebSocket connections** and messages
- **Blocking requests** to test fallback behavior
- Using **Local Overrides** to modify responses without changing the server
- Exporting/importing **HAR files** for sharing network issues
- Analyzing the **Waterfall chart** for performance optimization
- Using **Copy as cURL/fetch** to reproduce requests

---

## The Scenario
You're debugging a real-time chat application with:
1. WebSocket connection for live messages
2. REST API fallback when WebSocket fails
3. Performance issues from slow requests
4. Need to test various error scenarios

---

## Tasks

### 1. Debug WebSocket Messages
The chat uses WebSockets for real-time communication.

**Steps:**
1. Open `index.html` in your browser
2. Open DevTools → Network panel
3. Click the **"WS"** filter button (or type `is:websocket` in the filter)
4. Click "Connect WebSocket" button
5. Click the WebSocket connection in the list
6. Go to the **"Messages"** tab
7. Send a message using the input field
8. Observe the sent (↑ green) and received (↓ red) messages

**Explore:**
- The message format (JSON with type and data)
- Timing of each message
- Connection close events

### 2. Block Requests to Test Error Handling
Test what happens when API requests fail.

**Steps:**
1. Click "Fetch Users" to make a request first
2. Right-click the request → **"Block request URL"** or **"Block request domain"**
3. Or go to Network panel → Right panel → **"Request blocking"**
4. Click **+** and add pattern: `jsonplaceholder`
5. Enable the checkbox
6. Click "Fetch Users" again - it should fail!
7. Observe the error handling in the log

**Try blocking:**
- `posts` - blocks only posts endpoint
- `users` - blocks only users endpoint
- `httpstat.us` - blocks the error simulation endpoints

### 3. Local Overrides (Mock API Responses)
Modify API responses without changing server code.

**Steps:**
1. Open Sources panel → **"Overrides"** tab (in left sidebar)
2. Click **"+ Select folder for overrides"**
3. Choose or create a folder (e.g., `devtools-overrides`)
4. Allow DevTools to access the folder
5. Go back to Network panel
6. Make a request (click "Fetch Messages via REST")
7. Right-click the request → **"Override content"**
8. Modify the JSON response in the editor
9. Refresh - the modified response is used!

**Use cases:**
- Test error responses
- Test edge cases with specific data
- Develop frontend before API is ready

### 4. Analyze the Waterfall Chart
Understand request timing for optimization.

**Steps:**
1. Click "Load Heavy Resources" button
2. Look at the **Waterfall** column in the Network panel
3. Hover over the colored bars to see breakdown:
   - **Queueing**: Waiting for browser to process
   - **Stalled**: Waiting for connection
   - **DNS Lookup**: Resolving domain name
   - **Initial connection**: TCP handshake
   - **SSL**: TLS negotiation
   - **Waiting (TTFB)**: Time to First Byte - server processing
   - **Content Download**: Receiving the response

**Optimize:**
- Long DNS? → Consider DNS prefetch
- Long TTFB? → Server-side performance issue
- Long Content Download? → Compress responses, use CDN

### 5. Copy Requests for Reproduction
Share requests with backend team or reproduce in terminal.

**Steps:**
1. Make any request
2. Right-click the request
3. Choose **"Copy"** →
   - **"Copy as cURL"** - Run in terminal
   - **"Copy as fetch"** - Paste in Console or code
   - **"Copy as PowerShell"** - For Windows
   - **"Copy request headers"** - Just the headers
   - **"Copy response"** - The response body

**Try it:**
```bash
# Paste the cURL command in terminal to replay the request
curl 'https://jsonplaceholder.typicode.com/posts' \
  -H 'Accept: application/json'
```

### 6. Export and Import HAR Files
Share network captures with your team.

**Steps:**
1. Make several requests
2. Click the **export icon** (↓) or right-click → **"Save all as HAR with content"**
3. Save the `.har` file
4. Clear the Network panel
5. Drag the `.har` file back into the Network panel (or use import)
6. All requests are restored for analysis!

**Use cases:**
- Share reproduction steps for bugs
- Analyze production issues offline
- Compare performance between deployments

### 7. Inspect Request/Response Details
Deep dive into a request.

**Steps:**
1. Click any request in the Network panel
2. Explore the tabs:
   - **Headers**: Request/response headers, status code
   - **Payload**: Request body (for POST/PUT)
   - **Preview**: Formatted response (JSON, images, etc.)
   - **Response**: Raw response text
   - **Initiator**: What triggered this request (call stack)
   - **Timing**: Detailed waterfall breakdown
   - **Cookies**: Sent and received cookies

### 8. Filter and Search Requests
Find specific requests quickly.

**Filter types:**
- `XHR` - AJAX requests
- `JS` - JavaScript files
- `CSS` - Stylesheets
- `Img` - Images
- `WS` - WebSockets
- `Doc` - HTML documents

**Advanced filters:**
```
domain:jsonplaceholder.com     # Filter by domain
has-response-header:set-cookie # Requests with cookies
larger-than:100k               # Large responses
method:POST                    # Only POST requests
status-code:404                # Only 404 errors
-status-code:200               # Exclude 200 OK
mime-type:application/json     # JSON responses
```

---

## Network Panel Features Reference

| Feature | Location | Use Case |
|---------|----------|----------|
| Request Blocking | Right panel → Request blocking | Test fallbacks |
| Local Overrides | Sources → Overrides | Mock responses |
| HAR Export | Export button or right-click | Share issues |
| WebSocket Messages | Click WS → Messages tab | Debug real-time |
| Copy as cURL | Right-click → Copy | Reproduce requests |
| Throttling | Throttling dropdown | Test slow networks |
| Preserve Log | Checkbox | Keep logs on navigation |
| Disable Cache | Checkbox | Force fresh requests |

---

## Tips
- Enable **"Preserve log"** to keep requests across page navigations
- Enable **"Disable cache"** when debugging to ensure fresh responses
- Use **"Hide data URLs"** to reduce noise from inline resources
- The **Initiator** column shows what triggered each request
- **Red** requests indicate errors (check status code)
- Hold **Shift** and hover over a request to see its dependencies

---

## Solution
The exercise focuses on exploration and tool usage. There's no specific "bug" to fix, but practice all the techniques above to become proficient with the Network panel.

Key Observations:
1. WebSocket messages show bidirectional communication
2. Blocking requests helps test error handling
3. Local Overrides let you modify responses without backend changes
4. HAR files are essential for sharing network issues
5. Waterfall analysis reveals performance bottlenecks

