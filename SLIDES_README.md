# Presentation Slides

The `slides.md` file is a complete slide deck for the Chrome DevTools Workshop, created in [Marp](https://marp.app/) format.

## Quick Start Options

### Option 1: VS Code with Marp Extension (Recommended)

1. Install the [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) extension
2. Open `slides.md` in VS Code
3. Click the preview icon (or `Cmd+K V` / `Ctrl+K V`)
4. To export: Open Command Palette → "Marp: Export Slide Deck"

### Option 2: Marp CLI

```bash
# Install Marp CLI
npm install -g @marp-team/marp-cli

# Convert to HTML
marp slides.md -o slides.html

# Convert to PDF
marp slides.md -o slides.pdf

# Convert to PowerPoint
marp slides.md -o slides.pptx

# Watch mode (auto-refresh)
marp -w slides.md
```

### Option 3: Online Viewer

1. Go to [marp.app](https://web.marp.app/)
2. Paste the content of `slides.md`
3. View and export from there

## Slide Count

The presentation contains approximately **67 slides**:

| Section | Slides |
|---------|--------|
| Intro & Setup | 5 |
| Elements Panel | 12 |
| Console Panel | 10 |
| Sources Panel | 12 |
| Network Panel | 10 |
| Performance Panel | 10 |
| Advanced Overview | 3 |
| Wrap-up & Resources | 5 |

## Customization

### Changing the Theme

Edit the frontmatter at the top of `slides.md`:

```yaml
---
marp: true
theme: default  # Try: default, gaia, uncover
backgroundColor: #1a1a2e
color: #eee
---
```

### Adding Screenshots

Replace the text-based diagrams with actual screenshots:

```markdown
![DevTools Screenshot](./images/devtools-elements.png)
```

Create an `images/` folder and add your screenshots.

### Speaker Notes

Add notes that only you see during presentation:

```markdown
<!-- 
Speaker notes go here.
These won't appear on the slides.
-->
```

## Presentation Tips

1. **Practice with the exercises** before presenting
2. **Open DevTools** on a second monitor for live demos
3. **Use the workshop files** for demonstrations
4. **Pause at exercise slides** to let attendees practice
5. **Check timing**: ~2-3 minutes per slide average

## Exporting for Different Uses

| Format | Best For |
|--------|----------|
| HTML | Online sharing, interactive |
| PDF | Printing, offline viewing |
| PPTX | Further editing in PowerPoint |

## Theme Colors Used

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#1a1a2e` | Main slide background |
| Primary | `#00d9ff` | Headings, links |
| Secondary | `#ff6b6b` | Subheadings, warnings |
| Accent | `#00ff88` | Code, highlights |
| Dark BG | `#0f0f23` | Code blocks, tables |

