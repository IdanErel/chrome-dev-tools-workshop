# Console Panel Exercise

## Objective
Use the Console panel to view logs, debug JavaScript errors, and interact with the page.

---

## Getting Started

1. Open `index.html` in Chrome
2. Open DevTools: `F12` (or `Cmd+Option+I` on Mac)
3. Click the **Console** tab
4. You should see a welcome message and some logged values!

---

## Tasks

### 1. View Logged Messages
When the page loads, you'll see:
- A welcome message
- The value of `number` (10)
- The value of `object` ({ name: "John", age: 30 })

**Try this:**
- Click the arrow next to the object to expand it
- Notice how objects and primitives are displayed differently

---

### 2. Find the Calculation Bug
Look for the line that says "Calculated sum: -15"

**What's wrong:**
- The sum of `[1, 2, 3, 4, 5]` should be **15**, not **-15**
- Open `script.js` in the Sources panel to find the bug
- The `reduce` function is using subtraction instead of addition!

**How to verify:**
Run this in the Console:
```javascript
[1, 2, 3, 4, 5].reduce((acc, num) => acc + num, 0)
```

---

### 3. Debug the Async Function
Click the **"Start Async Task"** button.

**What to observe:**
- Does an error appear in the Console?
- Is the error handled or unhandled?

**Try this:**
Run the function directly in Console:
```javascript
faultyAsyncFunction()
```

Look for "Uncaught (in promise)" errors - these are unhandled promise rejections!

---

### 4. Interact with the DOM
You can manipulate the page directly from the Console!

**Try these commands:**
```javascript
// Change the heading
document.querySelector('h1').textContent = "Console Exercise Updated"

// Change the background color
document.body.style.backgroundColor = "#f0f0f0"

// Count all paragraphs
document.querySelectorAll('p').length

// Get a specific element
document.getElementById('start-task')
```

---

### 5. Test Error Handling
Run this in the Console to test error scenarios:

```javascript
// This should throw an error - observe how it's handled
faultyAsyncFunction().then(() => {
    console.log("Success!");
}).catch((error) => {
    console.error("Caught:", error.message);
});
```

---

### 6. Use Console Features

**Preserving logs:**
- Check "Preserve log" to keep messages after page refresh

**Filtering:**
- Click the filter buttons (Errors, Warnings, Info, etc.)
- Or type in the filter box

**Clearing:**
- Click the 🚫 button or type `clear()` to clear the console

---

## Success Criteria

| Check | Expected Result |
|-------|-----------------|
| ✓ Sum calculation | Should be 15, currently shows -15 (bug found!) |
| ✓ Async task | Should show caught error, not unhandled rejection |
| ✓ DOM interaction | Can change page content from Console |
| ✓ Understand logs | Can read and interpret console.log output |

---

## Console Commands Reference

| Command | Description |
|---------|-------------|
| `console.log()` | Output a message |
| `console.error()` | Output an error (red) |
| `console.warn()` | Output a warning (yellow) |
| `console.table()` | Display data as a table |
| `console.dir()` | Display object properties |
| `console.clear()` | Clear the console |
| `$0` | Currently selected element in Elements panel |
| `$_` | Result of last expression |

---

## Tips

- **Click file:line links** - Jump directly to the code that generated the log
- **Right-click values** - Copy, store as global variable, or expand
- **Arrow keys** - Navigate through command history
- **Tab** - Auto-complete commands and properties
- **Shift+Enter** - Multi-line input without executing

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open Console | `Ctrl+Shift+J` | `Cmd+Option+J` |
| Clear Console | `Ctrl+L` | `Cmd+K` |
| Focus Console | `Esc` (when in other panels) | `Esc` |
