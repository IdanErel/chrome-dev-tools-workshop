# Network Panel Exercise

## Objective
Use the Network panel to monitor HTTP requests, analyze response times, and debug API issues.

---

## Getting Started

1. Open `index.html` in Chrome
2. Open DevTools: `F12` → **Network** tab
3. Make sure recording is on (red ⚫ dot in top left)
4. You may want to click 🚫 to clear old requests first

---

## Tasks

### 1. Monitor a Network Request
1. Click the **"Fetch Posts"** button
2. Watch the Network panel - a new request appears!
3. Look at the columns:
   - **Name**: The URL endpoint (`posts`)
   - **Status**: HTTP status code (`200` = success)
   - **Type**: Response type (`fetch` or `xhr`)
   - **Size**: Response size in bytes
   - **Time**: How long the request took

---

### 2. Inspect Request Details
Click on the `posts` request to see details:

| Tab | What it shows |
|-----|---------------|
| **Headers** | Request/response headers, status code |
| **Preview** | Formatted response (pretty JSON) |
| **Response** | Raw response body |
| **Initiator** | What code triggered this request |
| **Timing** | Detailed timing breakdown |

**Try this:**
- Look at the **Response Headers** - find `content-type`
- Check the **Preview** tab - how many posts are there?

---

### 3. Simulate Slow Network
1. Find the **"No throttling"** dropdown (near the top)
2. Select **"Slow 3G"**
3. Click "Fetch Posts" again
4. Notice how much longer it takes!

**Questions to consider:**
- How does this affect user experience?
- What could you do to improve performance on slow networks?

---

### 4. Test Error Handling
Let's see what happens when an API request fails.

**Option 1: Wrong endpoint**
- Open `script.js`
- Change `/posts` to `/wrong-endpoint`
- Reload and click "Fetch Posts"
- Look for a red request (404 error)

**Option 2: Block the request**
- Right-click any request → **"Block request domain"**
- Or go to Network panel → three dots → **"Request blocking"**
- Add pattern: `jsonplaceholder`
- Try fetching again - it should fail!

---

### 5. Analyze Timing
Click on a request, then go to the **Timing** tab:

| Phase | What it means |
|-------|---------------|
| **Queueing** | Waiting for browser to process |
| **Stalled** | Waiting for connection slot |
| **DNS Lookup** | Resolving domain to IP |
| **Initial connection** | TCP handshake |
| **SSL** | TLS/HTTPS negotiation |
| **Waiting (TTFB)** | Time to First Byte - server processing |
| **Content Download** | Receiving the response |

**Tip:** Long TTFB = slow server. Long download = large response.

---

### 6. Copy Request for Sharing
Right-click any request and try:

- **Copy as cURL**: Paste in terminal to replay
- **Copy as fetch**: Paste in Console or code
- **Copy response**: Get the response body

---

### 7. Try Different Endpoints
The API has other endpoints you can try:

```javascript
// In Console, try:
fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()).then(console.log)
fetch('https://jsonplaceholder.typicode.com/comments?postId=1').then(r => r.json()).then(console.log)
```

Watch the Network panel as these run!

---

## Success Criteria

| Check | Expected Result |
|-------|-----------------|
| ✓ See request | Can see `posts` request in Network panel |
| ✓ Read status | Can identify 200 OK vs 404 Not Found |
| ✓ View response | Can see the JSON data in Preview tab |
| ✓ Understand timing | Can read the Timing breakdown |
| ✓ Handle errors | Error message shows when request fails |

---

## Useful Network Panel Features

| Feature | How to use it |
|---------|---------------|
| **Preserve log** | Keep requests across page reloads |
| **Disable cache** | Force fresh requests (no caching) |
| **Filter** | Type to filter requests by URL |
| **XHR filter** | Show only AJAX requests |
| **Hide data URLs** | Remove inline resources from list |

---

## Filter Examples

Type these in the filter box:

```
posts                    # URLs containing "posts"
-status-code:200         # Exclude successful requests
larger-than:10k          # Large responses only
method:POST              # Only POST requests
mime-type:application/json  # Only JSON responses
```

---

## Tips

- **Red requests** = errors (check status code)
- **Hold Shift + hover** = see request dependencies
- **Right-click column headers** = add/remove columns
- **Waterfall column** = visual timeline of all requests

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open Network | `Ctrl+Shift+P` → "Network" | `Cmd+Shift+P` → "Network" |
| Clear requests | `Ctrl+L` | `Cmd+K` |
| Search in requests | `Ctrl+F` | `Cmd+F` |
