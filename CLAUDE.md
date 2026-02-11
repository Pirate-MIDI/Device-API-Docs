# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MkDocs-based documentation site for the **Pirate MIDI Device API**, providing protocol documentation for interacting with Pirate MIDI hardware devices. The site is built with Material for MkDocs theme and includes custom branding with gradient headers, social card generation, and git-based revision dates.

**Live site:** https://developer.piratemidi.com

## Development Commands

### Local Development
```bash
# Start local development server with live reload
mkdocs serve

# The site will be available at http://127.0.0.1:8000
```

### Building
```bash
# Build the site (outputs to site/ directory)
mkdocs build

# Build with strict mode (fails on warnings, used in CI)
mkdocs build --strict
```

### Deployment
```bash
# Manual deploy to GitHub Pages (normally handled by CI)
mkdocs gh-deploy --force
```

## Python Environment Setup

The project requires Python 3.11+ and dependencies are managed via [requirements.txt](requirements.txt).

### Initial Setup
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt
```

### Key Dependencies
- `mkdocs` - Core documentation generator
- `mkdocs-material[imaging]` - Material theme with social card generation
- `mkdocs-git-revision-date-localized-plugin` - Automatic revision dates
- `mkdocs-awesome-pages-plugin` - Directory-level navigation control (sort order, hiding)
- `mkdocs-macros-plugin` - Jinja2 macros in markdown (powers template rendering)

**Note:** The `mkdocs-material[imaging]` extra requires CairoSVG system libraries for social card generation. These are only needed in CI (Ubuntu) — local dev will show Cairo warnings which are safe to ignore.

## Architecture & Structure

### Configuration
- **[mkdocs.yml](mkdocs.yml)** - Main site configuration including theme settings, plugins, markdown extensions, and social links. Navigation is auto-generated from directory structure (no explicit `nav:` key).

### Macros
- **[main.py](main.py)** - mkdocs-macros plugin entry point. Defines the `render_templates()` macro used in firmware version pages to auto-discover and display `.json` template files.

### Content
- **docs/** - All documentation markdown files
- **docs/index.md** - Homepage
- **docs/devices/** - Device-specific documentation (see Device Documentation Structure below)
- **docs/assets/** - Static assets:
  - `branding.css` - Custom CSS for Pirate MIDI gradient headers (blue gradient for light theme, pink for dark theme)
  - `print.css` - Print-specific styles
  - `favicon.png` - Site favicon
  - `logo-white.png` - Header logo

### Deployment
- **[.github/workflows/deploy.yml](.github/workflows/deploy.yml)** - Automated deployment to GitHub Pages on push to main branch

### Design Documents
- **[DISPATCH_DESIGN.md](DISPATCH_DESIGN.md)** - Design doc for the firmware dispatch workflow that auto-generates device documentation from firmware analysis

## Device Documentation Structure

Device docs are organized by device family and model, with firmware versions as subdirectories. The structure is designed for automated population by the firmware station dispatch workflow.

### Directory Layout
```
docs/devices/
├── index.md                          # Lists all device models
├── bridge/
│   ├── aero/
│   │   ├── .pages                    # order: desc (latest firmware first)
│   │   └── {major}.{minor}.x/        # e.g., 1.2.x, 2.0.x
│   │       ├── index.md              # Firmware version page
│   │       ├── factory-default.json  # Template: full factory config
│   │       └── blank.json            # Template: blank starting config
│   ├── bridge4/
│   │   └── (same pattern)
│   └── bridge6/
│       └── (same pattern)
├── click/
│   └── click/
│       └── (same pattern)
└── scribble/
    └── scribble/
        └── (same pattern)
```

### Firmware Version Naming
Only major or minor firmware increments change the Device API model. Patch versions (e.g., v1.0.0 vs v1.0.1) share the same API structure. Therefore, firmware version directories use the format `{major}.{minor}.x` (e.g., `1.0.x`, `1.1.x`, `2.0.x`).

### Firmware Version Page (`index.md`)
Each firmware version page has three sections:
1. **Device Properties** — JSON from the `CHCK` command response describing hardware capabilities
2. **Device Schema** — JSON schema defining `globalSettings` and `bankSettings` structure
3. **Templates** — Auto-rendered from `.json` files in the same directory via `{{ render_templates() }}`

### Template Rendering (`render_templates()` macro)
The `render_templates()` Jinja2 macro (defined in [main.py](main.py)) automatically:
- Scans the current page's directory for `.json` files
- Derives the display name from the filename (e.g., `factory-default.json` → "Factory Default")
- Renders each as an `h3` heading with a download button and collapsible JSON code block

This means the dispatch workflow only needs to drop `.json` files into a firmware version directory — they appear on the page automatically with no markdown changes needed.

### Navigation Control (`.pages` files)
The `mkdocs-awesome-pages-plugin` uses `.pages` files for navigation:
- **Device directories** (e.g., `aero/.pages`): `order: desc` — sorts firmware versions latest-first in the sidebar
- **Template directories** (e.g., `x.x.x/.pages`): `hide: true` — hides base template directories from navigation

New firmware version directories added by the dispatch workflow automatically sort into the correct position.

## Markdown Extensions

The site uses these markdown extensions (configured in `mkdocs.yml`):
- `admonition` + `pymdownx.details` — Collapsible admonition blocks (`???+ info "Title"`)
- `pymdownx.superfences` — Fenced code blocks inside admonitions
- `attr_list` — Attribute lists for styling (e.g., `{ .md-button }` on links)

## Theme Customization

The site uses Material for MkDocs with extensive customization:
- **Gradient headers**: Blue gradient (light mode), pink gradient (dark mode)
- **Navigation features**: Tabs, instant navigation, search with suggestions, code copy buttons
- **Social cards**: Auto-generated with custom layout (blue background, white text)
- **Typography**: Inter for text, Google Sans Code for code blocks

## Deployment Process

Deployment is automatic on push to main:
1. GitHub Actions workflow triggers
2. Sets up Python 3.11 environment
3. Installs system dependencies for imaging/social cards (Cairo)
4. Installs Python dependencies from `requirements.txt`
5. Runs `mkdocs build --strict` (fails if configuration is invalid)
6. Deploys to GitHub Pages via `mkdocs gh-deploy --force`

The site is published to https://developer.piratemidi.com.
