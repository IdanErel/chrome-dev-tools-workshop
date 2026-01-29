# Chrome DevTools Workshop

A hands-on workshop to master Google Chrome DevTools. Each section contains exercises that challenge you to debug real issues using DevTools.

## 📽️ Presentation Slides

This workshop includes a complete slide deck for instructors or self-guided learning:

```bash
# View slides (requires Marp VS Code extension or Marp CLI)
marp slides.md
```

See [SLIDES_README.md](./SLIDES_README.md) for export options (PDF, HTML, PPTX).

## Structure

Each section contains:
- **Basic Exercise**: `index.html` + `exercise.md` - Foundational skills for the DevTools panel
- **Advanced Exercise**: `advanced/` folder - In-depth techniques and real-world debugging scenarios

### Sections

| Folder | Panel | What You'll Learn |
|--------|-------|-------------------|
| **elements/** | Elements | Inspect/modify HTML & CSS, debug layout issues |
| **console/** | Console | Debug JavaScript, interact with DOM, error handling |
| **source/** | Sources | Breakpoints, stepping, debugging async code |
| **network/** | Network | API requests, throttling, error handling |
| **performance/** | Performance | Event loop, DOM reflows, optimization |

### Advanced Exercises

Each section includes an `advanced/` subfolder with more challenging exercises:

| Section | Advanced Topics |
|---------|-----------------|
| **elements/advanced/** | CSS Grid/Flexbox debugging, Force states, Animations panel, Layers |
| **console/advanced/** | Live Expressions, Console Utilities API (`$0`, `monitor`, `queryObjects`) |
| **source/advanced/** | Conditional breakpoints, Logpoints, XHR breakpoints, Blackboxing |
| **network/advanced/** | WebSocket debugging, Request blocking, Local overrides, HAR analysis |
| **performance/advanced/** | Memory leaks, Heap snapshots, Allocation timeline, Performance Monitor |

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/IdanErel/chrome-dev-tools-workshop.git
   ```

2. Navigate to a folder and open `index.html` in your browser.

3. Follow the instructions in the `exercise.md` file inside each folder.

4. For advanced exercises, navigate to the `advanced/` subfolder within each section.

## Recommended Order

**Beginners:**
1. elements/
2. console/
3. source/
4. network/
5. performance/

**After completing basics, try the advanced exercises in the same order.**

Happy debugging!
