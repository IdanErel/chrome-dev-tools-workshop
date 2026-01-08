# Elements Panel Exercise

## Objective
Learn to inspect and modify HTML and CSS using the Elements panel, identify layout issues, and correct them in real-time.

---

## Getting Started

1. Open `index.html` in Chrome
2. Right-click anywhere on the page → Select **"Inspect"** (or press `F12`)
3. The Elements panel shows the HTML structure on the left, CSS styles on the right

---

## Tasks

### 1. Inspect HTML Structure
- Locate the `<h2>` tag inside the `.hero` section
- Double-click the text to edit it
- Change it to "Welcome to the Cool DevTools Exercise"

**How to find it:**
- Use `Ctrl+F` (or `Cmd+F`) in the Elements panel to search for "hero"
- Or expand the `<main>` → `<section class="hero">` → `<h2>`

---

### 2. Fix the Color Bug
The design spec says the hero section should be **green**, but someone made it blue!

- Find the CSS rule for `.hero` in the Styles panel
- Change `background-color` from `#007bff` (blue) to `#4CAF50` (green)
- Also fix the `.form-section` border color the same way

**Tip:** Click on the color square to open the color picker!

---

### 3. Fix the Layout Misalignment
The three `.feature` boxes are misaligned - they have different margins causing them to not line up properly.

**What's wrong:**
- The first `.feature` has extra left margin (50px) and top margin (30px)
- The last `.feature` has extra right margin (50px) and top margin (20px)
- This makes them uneven both horizontally and vertically

**How to fix:**
1. Inspect one of the `.feature` elements
2. Look at the Box Model diagram (shows margin in orange)
3. Find and remove the margin overrides in `.feature:first-child` and `.feature:last-child`
4. Add `gap: 20px;` to the `.features` container instead

---

### 4. Fix Overlapping Elements
The "New!" badge on each feature might overlap with content on smaller screens.

- Toggle responsive design mode: `Ctrl+Shift+M` (or `Cmd+Shift+M`)
- Try different screen widths
- Adjust the `right` position of `.feature::after` to prevent overlap

---

### 5. Modify the Warning Icon
The `.callout .important::before` pseudo-element adds a "Warning" label.

- Change the icon color to green (`#4CAF50`)
- Increase the `font-size` slightly

**Tip:** Pseudo-elements appear in the Elements panel under the element with `::before` or `::after`

---

### 6. Edit HTML Structure
- Add a new nav item: `<li><a href="#">Blog</a></li>`
- Try dragging the `.features` section above `.hero` in the Elements panel

**Tip:** You can drag and drop elements in the Elements panel to reorder them!

---

### 7. Test Responsive Design
- Toggle responsive design mode: `Ctrl+Shift+M`
- Try iPhone, iPad, and various widths
- Notice how the layout breaks on small screens
- The `.features` should stack vertically on mobile

---

## Success Criteria

When you're done, verify:

| Check | Expected Result |
|-------|-----------------|
| ✓ Hero background | Green (`#4CAF50`), not blue |
| ✓ Form border | Green (`#4CAF50`), not blue |
| ✓ Feature boxes | All three aligned horizontally and vertically |
| ✓ New! badges | Don't overlap other content |
| ✓ Mobile layout | Features stack vertically on small screens |

---

## Tips

- **Computed tab**: Shows the final calculated styles after all rules are applied
- **Box Model**: Visual diagram showing margin → border → padding → content
- **Filter styles**: Type in the filter box to find specific CSS properties
- **Toggle classes**: Click `.cls` to add/remove classes on an element
- **Force state**: Right-click → "Force state" to test `:hover`, `:focus`, etc.

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open DevTools | `F12` or `Ctrl+Shift+I` | `Cmd+Option+I` |
| Inspect Element | `Ctrl+Shift+C` | `Cmd+Shift+C` |
| Toggle Device Mode | `Ctrl+Shift+M` | `Cmd+Shift+M` |
| Search Elements | `Ctrl+F` | `Cmd+F` |
