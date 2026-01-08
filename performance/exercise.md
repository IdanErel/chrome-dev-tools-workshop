# Performance Panel Exercise

## Objective
Use the Performance panel to identify and fix code that blocks the main thread and causes slow rendering.

---

## Getting Started

1. Open `index.html` in Chrome
2. Open DevTools: `F12` → **Performance** tab
3. **Before clicking "Start Test"**: Try interacting with the page!
   - Hover over the button
   - Type in the input field
   - Notice how responsive everything is

---

## Tasks

### 1. Experience the Performance Issues

**Before recording:**
1. Hover over the "Start Test" button - it highlights immediately
2. Type in the input field - text appears instantly
3. The page feels responsive!

**Now click "Start Test" and try the same things:**
- Can you hover? Can you type?
- The page is completely frozen!

This is what we need to diagnose.

---

### 2. Record a Performance Profile

1. Click the **Record** button (⚫) in the Performance panel
2. Click **"Start Test"** on the page
3. Wait for it to complete (page will freeze)
4. Click **Stop** when done
5. You'll see a detailed timeline!

---

### 3. Read the Flame Chart

The main visualization is the **Flame Chart**:

| Color | Meaning |
|-------|---------|
| 🟨 Yellow | JavaScript execution |
| 🟪 Purple | Layout/Rendering |
| 🟩 Green | Painting |
| ⬜ Gray | Idle time |

**What to look for:**
- A HUGE yellow block = JavaScript blocking the main thread
- Many small purple blocks = layout thrashing (many reflows)

---

### 4. Identify the Blocking Code

In the flame chart, you'll see a massive yellow block. Click on it!

**The Summary tab shows:**
- Which function is running
- How long it took
- What file it's in

**You should find:**
- A loop running 500,000,000 iterations
- This blocks the UI thread completely

---

### 5. Find the Layout Thrashing

After the big yellow block, you'll see many small operations. These are:
- 100,000 `appendChild()` calls
- Each one triggers a layout recalculation (reflow)
- This is extremely slow!

---

### 6. Use the Summary View

At the bottom of the Performance panel:

| Tab | Shows |
|-----|-------|
| **Summary** | Time breakdown by category |
| **Bottom-Up** | Functions sorted by time spent |
| **Call Tree** | Hierarchical function calls |
| **Event Log** | Chronological list of events |

**Try Bottom-Up** to see which functions took the most time!

---

### 7. Understand the Solutions

Open `script.js` and read the commented solutions:

**Solution 1: Break up long tasks**
```javascript
// Instead of one huge loop, use setTimeout to process in chunks
function computeChunk() {
    // Process 1M iterations
    if (!done) {
        setTimeout(computeChunk, 0); // Let UI update between chunks
    }
}
```

**Solution 2: Batch DOM updates**
```javascript
// Instead of 100k appendChild calls:
const fragment = document.createDocumentFragment();
for (...) {
    fragment.appendChild(element); // No reflow yet
}
container.appendChild(fragment);   // ONE reflow total
```

---

## Success Criteria

| Check | Expected Result |
|-------|-----------------|
| ✓ Record profile | Can capture a performance recording |
| ✓ Read flame chart | Can identify the large yellow block |
| ✓ Find blocking code | Identified the loop as the culprit |
| ✓ Spot layout thrashing | See many purple layout events |
| ✓ Understand solutions | Know how to fix both issues |

---

## Performance Panel Features

| Feature | What it does |
|---------|--------------|
| **Screenshots** | Enable to see visual state over time |
| **Memory** | Show memory usage graph |
| **Web Vitals** | Highlight key metrics (LCP, FID, CLS) |
| **Main** | The main thread timeline |
| **Frames** | Frame rate visualization |

---

## Key Performance Metrics

| Metric | Good | Poor |
|--------|------|------|
| **Long Task** | < 50ms | > 50ms blocks UI |
| **Frame Rate** | 60 fps | < 30 fps = janky |
| **Time to Interactive** | < 3.8s | > 7.3s |

---

## Tips

- **Zoom**: Scroll to zoom in/out on the timeline
- **Pan**: Click and drag to move around
- **Select range**: Click and drag to select a time range
- **Trash icon**: Force garbage collection before recording
- **CPU throttling**: Simulate slow devices with 4x/6x slowdown

---

## Red Flags in Recordings

🚩 **Large yellow blocks** = JavaScript blocking the main thread
🚩 **Many purple blocks** = Layout thrashing / forced reflows
🚩 **Red corners on frames** = Dropped frames (janky UI)
🚩 **Long "Recalculate Style"** = Complex CSS or many elements

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open Performance | `Ctrl+Shift+P` → "Performance" | `Cmd+Shift+P` → "Performance" |
| Start/Stop recording | `Ctrl+E` | `Cmd+E` |
| Save profile | `Ctrl+S` | `Cmd+S` |
