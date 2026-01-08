# Sources Panel Exercise

## Objective
Use the Sources panel to set breakpoints, step through code, and debug JavaScript issues.

---

## Getting Started

1. Open `index.html` in Chrome
2. Open DevTools: `F12` → **Sources** tab
3. In the left sidebar, find `script.js` under the page's domain
4. Click on `script.js` to view the code

---

## Tasks

### 1. Set Your First Breakpoint
- Find line 47 in `script.js` (inside `complexAsyncFunction`)
- Click on the line number **47** - a blue marker appears
- This is a breakpoint - code will pause here!

**Now test it:**
1. Click the **"Trigger Debug"** button on the page
2. The page should pause, and DevTools shows "Paused on breakpoint"
3. Look at the **Scope** panel on the right - it shows variable values

---

### 2. Step Through Code
While paused, use these controls:

| Button | Shortcut | Action |
|--------|----------|--------|
| ▶️ Resume | `F8` | Continue to next breakpoint |
| ⏭️ Step Over | `F10` | Execute line, move to next |
| ⬇️ Step Into | `F11` | Go inside function call |
| ⬆️ Step Out | `Shift+F11` | Exit current function |

**Try this:**
1. Press `F11` to step into `faultyPromise()`
2. Press `F10` to step through each line
3. Watch the **Call Stack** panel to see where you are

---

### 3. Find the Promise Bug
The `faultyPromise` function has a logic error:

```javascript
reject(new Error("...")); // This runs
resolve("Success!");       // This is ignored
```

**What's wrong:**
- A Promise should either resolve OR reject, not both
- After `reject()` is called, `resolve()` has no effect
- This is confusing and likely a bug

**How to fix:**
Use conditional logic to choose one outcome:
```javascript
if (shouldSucceed) {
    resolve("Success!");
} else {
    reject(new Error("Failed!"));
}
```

---

### 4. Debug the Scope Error
When you click "Trigger Debug", eventually `processData()` is called.

**What's wrong:**
- `processData()` tries to use `outOfScopeVariable`
- But that variable is defined in `triggerError()`, not here!
- This causes a `ReferenceError`

**How to find it:**
1. Set a breakpoint inside `processData()`
2. When paused, check the **Scope** panel
3. Notice `outOfScopeVariable` is NOT listed
4. This proves it's not accessible in this scope

---

### 5. Use the debugger Statement
The code contains:
```javascript
debugger;
```

This works like an automatic breakpoint - when DevTools is open, execution pauses here. Look for it in the code and observe when it triggers.

---

### 6. Use Watch Expressions
While paused at a breakpoint:

1. Find the **Watch** panel on the right
2. Click **+** to add an expression
3. Try watching: `result`, `error`, `user`
4. Values update as you step through code

---

## Success Criteria

| Check | Expected Result |
|-------|-----------------|
| ✓ Set breakpoints | Blue markers appear on line numbers |
| ✓ Pause execution | Page freezes, DevTools shows "Paused" |
| ✓ Inspect variables | Can see values in Scope panel |
| ✓ Identify Promise bug | Understand why resolve after reject is wrong |
| ✓ Identify scope bug | Found the ReferenceError cause |

---

## The Scope Panel Explained

When paused, the Scope panel shows:

| Scope | Description |
|-------|-------------|
| **Local** | Variables in the current function |
| **Closure** | Variables from outer functions |
| **Global** | Window/global variables |

If a variable isn't listed, it's not accessible in the current scope!

---

## Tips

- **Conditional breakpoints**: Right-click a line number → "Add conditional breakpoint"
- **Logpoints**: Right-click → "Add logpoint" to log without pausing
- **Deactivate breakpoints**: Click the ⏸️ button to temporarily disable all
- **Exception breakpoints**: Click ⏸️ dropdown → "Pause on exceptions"

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open Sources | `Ctrl+Shift+P` → "Sources" | `Cmd+Shift+P` → "Sources" |
| Step Over | `F10` | `F10` |
| Step Into | `F11` | `F11` |
| Step Out | `Shift+F11` | `Shift+F11` |
| Resume | `F8` | `F8` |
| Toggle Breakpoint | Click line number | Click line number |
