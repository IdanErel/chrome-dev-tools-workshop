# Performance Panel - Advanced Exercise

## Objective
Master memory profiling and advanced performance analysis including finding memory leaks, analyzing heap snapshots, and using the Memory panel.

---

## What You'll Learn
- Taking and comparing **Heap Snapshots** to find memory leaks
- Using **Allocation Timeline** to see what's allocating memory
- Finding **Detached DOM nodes** that should have been garbage collected
- Identifying **event listener leaks**
- Using **Performance Monitor** for real-time metrics
- Analyzing **Coverage** to find unused JavaScript/CSS

---

## The Scenario
You're debugging a dashboard application with several memory issues:
1. Event listeners that aren't being cleaned up
2. Detached DOM nodes held in memory
3. Growing arrays that are never cleared
4. Closures holding references to large objects

---

## Tasks

### 1. Take a Heap Snapshot
Get a baseline of memory usage.

**Steps:**
1. Open `index.html` in your browser
2. Open DevTools → **Memory** panel
3. Select **"Heap snapshot"** radio button
4. Click **"Take snapshot"**
5. Wait for the snapshot to complete
6. Explore the snapshot:
   - **Summary** view: Objects grouped by constructor
   - **Containment** view: Object hierarchy
   - **Statistics**: Memory breakdown by type

**What to look for:**
- Large objects (sort by Retained Size)
- Many instances of the same object
- Objects that seem out of place

### 2. Compare Heap Snapshots (Find Memory Leaks)
The key technique for finding leaks: compare before and after.

**Steps:**
1. Take **Snapshot 1** (baseline)
2. Click "Add Items" button 5 times
3. Click "Clear Items" button (should release memory)
4. Take **Snapshot 2**
5. In Snapshot 2, use the dropdown to select **"Objects allocated between Snapshot 1 and Snapshot 2"**
6. Look for objects that should have been garbage collected

**Red flags:**
- `LeakyItem` objects still in memory after clearing
- Detached DOM elements
- Growing array sizes

### 3. Find Detached DOM Nodes
DOM nodes removed from the page but still referenced in JavaScript.

**Steps:**
1. Click "Create Cards" button
2. Click "Remove Cards" button
3. Take a Heap Snapshot
4. In the filter box, type: `Detached`
5. Look for `Detached HTMLDivElement` or similar
6. Click on one to see what's retaining it in the **Retainers** panel

**The fix:**
- The code stores references to DOM elements
- These references must be cleared when elements are removed

### 4. Find Event Listener Leaks
Event listeners that aren't removed keep objects alive.

**Steps:**
1. Click "Add Listener Leak" button 5 times
2. Open **Performance Monitor** (Ctrl+Shift+P → "Performance Monitor")
3. Watch the **"JS event listeners"** count grow
4. The listeners are never removed!
5. Take a Heap Snapshot and search for the callbacks

**How to find in heap:**
1. Search for `() =>` or `function` in the snapshot
2. Look at the Retainers to see what's holding the function
3. Check if event listeners are the retainer

### 5. Use Allocation Timeline
See exactly when and what allocates memory.

**Steps:**
1. Go to Memory panel
2. Select **"Allocation instrumentation on timeline"**
3. Click **"Start"**
4. Click "Start Continuous Leak" button
5. Wait a few seconds, then click **"Stop"**
6. Blue bars show allocations that are still in memory
7. Gray bars show allocations that were garbage collected
8. Click on blue bars to see what was allocated

**Key insight:**
- If blue bars keep appearing but nothing is freed, that's a leak!

### 6. Real-Time Performance Monitor
Monitor metrics without taking snapshots.

**Steps:**
1. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
2. Type "Performance Monitor" and select it
3. A panel appears showing real-time metrics:
   - **CPU usage**
   - **JS heap size** (watch for growth)
   - **DOM Nodes** (watch for growth)
   - **JS event listeners** (should stay stable)
   - **Documents**
   - **Layouts/sec** (high = too many reflows)

**Exercise:**
1. Watch the metrics at rest
2. Click various "leak" buttons
3. Observe which metrics change

### 7. Coverage Analysis
Find unused JavaScript and CSS.

**Steps:**
1. Press Ctrl+Shift+P → "Coverage"
2. Click the **reload button** in the Coverage panel
3. Interact with the page
4. Look at the results:
   - **Red** = unused code
   - **Green** = used code
   - Percentage shows how much of each file is unused

**Use cases:**
- Identify dead code
- Find opportunities for code splitting
- Reduce initial bundle size

### 8. Fix the Memory Leaks
Using the techniques above, find and understand these leaks:

1. **LeakyItem Array Leak** (Task: Find why items aren't freed)
2. **Detached DOM Leak** (Task: Find the retained references)  
3. **Event Listener Leak** (Task: Find the unreleased listeners)
4. **Closure Leak** (Task: Find the closure holding large data)

---

## Memory Panel Reference

| Feature | Purpose |
|---------|---------|
| Heap Snapshot | Point-in-time memory state |
| Allocation Timeline | See allocations over time |
| Allocation Sampling | Low-overhead profiling |
| Comparison View | Find differences between snapshots |
| Retainers Panel | See what's keeping an object alive |
| Detached filter | Find orphaned DOM nodes |

---

## Common Memory Leak Patterns

### 1. Forgotten Event Listeners
```javascript
// LEAK: Listener never removed
element.addEventListener('click', handler);

// FIX: Remove when done
element.removeEventListener('click', handler);

// BETTER: Use AbortController
const controller = new AbortController();
element.addEventListener('click', handler, { signal: controller.signal });
controller.abort(); // Removes the listener
```

### 2. Detached DOM References
```javascript
// LEAK: Reference kept after removal
let elements = document.querySelectorAll('.card');
container.innerHTML = ''; // DOM removed, but 'elements' still references them

// FIX: Clear references
elements = null;
```

### 3. Closures Holding Large Data
```javascript
// LEAK: Closure keeps 'hugeData' alive forever
function setup() {
    const hugeData = new Array(1000000);
    return function() {
        console.log(hugeData.length);
    };
}

// FIX: Don't capture unnecessary data
function setup() {
    const length = new Array(1000000).length; // Just capture what you need
    return function() {
        console.log(length);
    };
}
```

### 4. Growing Collections
```javascript
// LEAK: Array grows forever
const cache = [];
function addItem(item) {
    cache.push(item); // Never cleaned up
}

// FIX: Limit size or clear periodically
function addItem(item) {
    if (cache.length > 100) cache.shift();
    cache.push(item);
}
```

---

## Tips
- Always take a **baseline snapshot** before testing
- **Force garbage collection** before snapshots (click trash icon)
- Use **"Objects allocated between snapshots"** comparison
- **Retainers** panel shows WHY an object is alive
- Look for **Detached** prefix in DOM elements
- High **JS heap size** that never decreases = leak

---

## Solution
See the comments in `script.js` marked with `/* MEMORY LEAK: */` and `/* FIX: */` for the issues and solutions.

