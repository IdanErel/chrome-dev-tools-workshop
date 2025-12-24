# Sources Panel - Advanced Exercise

## Objective
Master advanced debugging techniques including conditional breakpoints, logpoints, blackboxing, XHR breakpoints, and Event Listener Breakpoints.

---

## What You'll Learn
- **Conditional Breakpoints** that only pause when a condition is true
- **Logpoints** to log values without modifying source code
- **Blackboxing** to skip over library/framework code when stepping
- **XHR/Fetch Breakpoints** to pause when specific API calls are made
- **Event Listener Breakpoints** to find which code handles an event
- **DOM Breakpoints** to pause when the DOM is modified

---

## The Scenario
You're debugging a user management system with:
1. API calls that sometimes fail for specific users
2. Third-party utility functions you want to skip over
3. Mysterious DOM changes happening somewhere in the code
4. Event handlers that you can't locate in the codebase

---

## Tasks

### 1. Conditional Breakpoints
The app loads users, but one specific user (ID: 5) causes issues.

**Steps:**
1. Open DevTools → Sources → Find `script.js`
2. Find the `processUser` function (around line 40)
3. Right-click on the line number where processing happens
4. Select **"Add conditional breakpoint..."**
5. Enter the condition: `user.id === 5`
6. Click "Load Users" and watch - it only pauses for user ID 5!

**Try these conditions:**
```javascript
user.role === 'admin'           // Pause for admins only
user.score > 100                // Pause for high scorers
user.name.includes('Error')     // Pause for specific names
```

### 2. Logpoints (Non-Breaking Logs)
Sometimes you want to log values without pausing or modifying code.

**Steps:**
1. Find the `calculateBonus` function
2. Right-click on a line number → **"Add logpoint..."**
3. Enter: `"Processing user:", user.name, "Score:", user.score`
4. Run the code - logs appear in Console without pausing!

**Benefits:**
- No need to add `console.log` to source code
- Easy to add/remove without editing files
- Works on minified code where editing is hard

### 3. XHR/Fetch Breakpoints
Pause execution whenever a specific API endpoint is called.

**Steps:**
1. Go to Sources → Right panel → **"XHR/fetch Breakpoints"**
2. Click the **+** button
3. Enter: `users` (partial URL match)
4. Click "Load Users" - debugger pauses when the fetch is made
5. You can now inspect the call stack to see what triggered the request

**Try:**
- Add breakpoint for `fail` to catch failing requests
- Use empty string to break on ALL XHR/fetch requests

### 4. Event Listener Breakpoints
Find which code handles an event without knowing where to look.

**Steps:**
1. Go to Sources → Right panel → **"Event Listener Breakpoints"**
2. Expand **"Mouse"** → Check **"click"**
3. Click the "Secret Action" button
4. Debugger pauses - now you can see exactly which function handles the click!
5. Use the Call Stack to trace back to the event registration

**Try:**
- Enable "keydown" breakpoints and type in the search box
- Enable "submit" breakpoints and submit the form

### 5. Blackboxing Third-Party Code
The `utils.js` file simulates a third-party library. Skip over it when debugging.

**Steps:**
1. Open `utils.js` in Sources panel
2. Right-click in the editor → **"Add script to ignore list"** (or "Blackbox script")
3. Now when you step through code, it will skip over `utils.js` functions

**Alternative:**
- Go to Settings (F1) → **"Ignore List"**
- Add pattern: `/utils\.js$/`
- You can also blackbox entire folders: `/node_modules/`

### 6. DOM Breakpoints
Find which code is modifying the DOM.

**Steps:**
1. Go to Elements panel
2. Find the `#user-list` element
3. Right-click → **"Break on..."** → **"subtree modifications"**
4. Click "Load Users" - debugger pauses when the DOM is modified
5. Look at the Call Stack to see which function made the change

**Options:**
- **Subtree modifications**: Pauses when children change
- **Attribute modifications**: Pauses when attributes change
- **Node removal**: Pauses when element is removed

### 7. Watch Expressions
Track specific values as you step through code.

**Steps:**
1. Set a breakpoint in `processUser`
2. In the right panel, find **"Watch"**
3. Click **+** and add: `user.score * 2`
4. Add another: `users.filter(u => u.processed).length`
5. Step through code and watch the values update

### 8. Debug the Hidden Bug
Using all the techniques above, find and fix the bug where:
- Admin users with ID > 10 get the wrong bonus calculation
- Hint: Use a conditional breakpoint with `user.role === 'admin' && user.id > 10`

---

## Breakpoint Types Reference

| Type | How to Add | Use Case |
|------|------------|----------|
| Line Breakpoint | Click line number | Basic debugging |
| Conditional | Right-click → Conditional | Break only when condition is true |
| Logpoint | Right-click → Logpoint | Log without pausing |
| XHR/Fetch | XHR Breakpoints panel → + | Break on API calls |
| Event Listener | Event Listener Breakpoints | Find event handlers |
| DOM | Elements → Right-click → Break on | Find DOM modifications |
| Exception | Pause on exceptions button | Break on errors |

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Step Over | F10 | F10 |
| Step Into | F11 | F11 |
| Step Out | Shift+F11 | Shift+F11 |
| Continue | F8 | F8 |
| Toggle Breakpoint | Ctrl+B | Cmd+B |
| Disable Breakpoint | Right-click → Disable | Right-click → Disable |

---

## Tips
- Conditional breakpoints are evaluated in the context of the current scope
- Logpoints support template literals: `` `User ${user.name} has score ${user.score}` ``
- You can edit breakpoint conditions by right-clicking the breakpoint
- Blackboxing persists across page reloads
- Event Listener Breakpoints slow down the page - disable when not needed

---

## Solution
See the comments in `script.js` marked with `/* BUG: */` and `/* SOLUTION: */` for the fixes.

