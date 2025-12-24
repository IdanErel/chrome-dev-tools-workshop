# Elements Panel - Advanced Exercise

## Objective
Master advanced DevTools features including CSS Grid/Flexbox debugging, forced element states, and the Animations panel.

---

## What You'll Learn
- Using the **Grid overlay** to visualize grid tracks, gaps, and item placement
- Using the **Flexbox overlay** to debug alignment issues
- **Forcing element states** (`:hover`, `:focus`, `:active`) without mouse interaction
- Using the **Animations panel** to slow down, replay, and debug CSS animations
- Finding **accessibility issues** with the CSS Overview panel

---

## The Scenario
You've inherited a dashboard layout that has several visual bugs:
1. Grid items are spanning incorrect columns
2. A sidebar is collapsing unexpectedly
3. Hover states aren't working properly
4. An animation is too fast to debug
5. Z-index stacking issues cause overlapping

---

## Tasks

### 1. Debug the CSS Grid Layout
- Open `index.html` in your browser
- Open DevTools → Elements panel
- Click on the `.dashboard` element
- Look for the **"grid"** badge next to the element → Click it to enable the Grid overlay
- Observe that `.widget-large` should span 2 columns but doesn't
- Find and fix the CSS rule causing this issue

**Hint:** Look at the `grid-column` property. The overlay will show you exactly which cells each item occupies.

### 2. Debug the Flexbox Navigation
- Click on the `.sidebar-nav` element
- Look for the **"flex"** badge → Click to enable the Flexbox overlay
- The nav items are overflowing horizontally with a scrollbar instead of stacking vertically
- Use the overlay to understand the current `flex-direction` value
- Fix the layout by changing `flex-direction` to `column`

### 3. Force Element States
- The `.card` elements have a hover effect that reveals a "Quick Actions" menu
- Without using your mouse to hover, force the `:hover` state:
  - Right-click on a `.card` element → Select **"Force state"** → Check **":hover"**
- Now you can inspect and modify the hover styles without needing to keep your mouse there
- Fix the issue where the hover background color is too dark to read the text

### 4. Debug the Animation
- Notice the `.notification-badge` has a pulsing animation that's too fast
- Open DevTools → **More tools** → **Animations** panel (or press Cmd+Shift+P → "Animations")
- Trigger the animation by clicking the "Simulate Notification" button
- In the Animations panel:
  - Slow down the animation to 25% speed
  - Scrub through the timeline to see each keyframe
  - Identify which property is causing the "flicker"
- Fix the animation timing in the CSS

### 5. Fix Z-Index Stacking
- The modal overlay should appear above everything, but part of the header is showing through
- Use the **Layers panel** (More tools → Layers) or inspect the `z-index` values
- Right-click elements and use **"Scroll into view"** to locate the problematic element
- Fix the stacking context issue

### 6. CSS Overview (Bonus)
- Open DevTools → **More tools** → **CSS Overview**
- Click "Capture overview"
- Review:
  - **Colors**: Find any low-contrast color combinations
  - **Unused declarations**: Identify CSS that isn't being applied
  - **Media queries**: See all breakpoints at a glance

---

## Tips
- The Grid/Flexbox badges only appear when those display modes are active
- You can customize overlay colors in DevTools Settings for better visibility
- Forced states persist even when you switch between elements
- The Animations panel can modify timing on-the-fly for experimentation

---

## Solution
See the comments in `style.css` marked with `/* SOLUTION: */` for the fixes.

