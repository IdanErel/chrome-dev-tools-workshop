# Elements Panel Exercise

## Objective
Learn to inspect and modify HTML and CSS using the Elements panel, identify complex layout issues, and correct them.

## Tasks

1. **Inspect HTML Structure**:
   - Open `index.html` in your browser.
   - Right-click on the page and select "Inspect" to open the DevTools Elements panel.
   - Locate the `<h2>` tag inside the `.hero` section and modify its text to "Welcome to the Cool DevTools Exercise".

2. **Modify CSS**:
   - In the Elements panel, find the CSS rule for the `.hero` section.
   - Change the background color from `#007bff` (blue) to `#4CAF50` (green) as intended.
   - Similarly, find the `.form-section` and change its top border color from `#007bff` to `#4CAF50`.

3. **Identify and Fix Layout Issues**:
   - The `.feature` elements are misaligned due to the `margin` settings. Find and correct the CSS rules to ensure they align properly.
   - The last `.feature` has an additional margin at the top, causing it to be misaligned. Correct this to ensure all `.feature` elements are aligned.

4. **Fix Overlapping Elements**:
   - Notice that the "New!" label on `.feature::after` overlaps with other content in certain screen sizes. Adjust the CSS to prevent this overlap.

5. **Debug CSS Issues**:
   - The `.callout .important::before` pseudo-element is adding a warning icon before the text. Modify this pseudo-element to change the icon color to `#4CAF50` and increase its size slightly.

6. **Modify HTML Structure**:
   - Add a new list item in the navigation menu: `<li><a href="#">Blog</a></li>`.
   - Move the entire `.features` section above the `.hero` section by dragging and dropping it in the Elements panel.


7. **Responsive Design**:
   - Toggle the responsive design mode in DevTools (Ctrl + Shift + M or Cmd + Shift + M).
   - Inspect how the layout changes on different screen sizes.
   - Make adjustments to the `.features` section to ensure it stacks vertically on smaller screens and fixes the overlapping issues.

## Tips
- The Elements panel is a powerful tool for live-editing HTML and CSS, debugging layout issues, and improving the accessibility of your web pages.
- Use the computed styles and box model tools to understand how margins, padding, and borders affect layout.
- Responsive design mode is essential for testing how your site behaves on different devices and screen sizes.
