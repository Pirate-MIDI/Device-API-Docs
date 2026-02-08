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

**Note:** The `mkdocs-material[imaging]` extra requires system libraries (Pillow, CairoSVG) which are automatically handled on macOS/Windows but may need manual installation on Linux. CI uses Ubuntu and installs these in the workflow.

## Architecture & Structure

### Configuration
- **[mkdocs.yml](mkdocs.yml)** - Main site configuration including theme settings, plugins, navigation structure, and social links

### Content
- **docs/** - All documentation markdown files
- **docs/index.md** - Homepage (currently placeholder MkDocs content)
- **docs/assets/** - Static assets:
  - `branding.css` - Custom CSS for Pirate MIDI gradient headers (blue gradient for light theme, pink for dark theme)
  - `print.css` - Print-specific styles
  - `favicon.png` - Site favicon
  - `logo-white.png` - Header logo

### Deployment
- **[.github/workflows/deploy.yml](.github/workflows/deploy.yml)** - Automated deployment to GitHub Pages on push to main branch
  - Installs system dependencies for PDF rendering (via WeasyPrint)
  - Runs `mkdocs build --strict` to catch configuration errors
  - Deploys via `mkdocs gh-deploy --force`

## Theme Customization

The site uses Material for MkDocs with extensive customization:
- **Gradient headers**: Blue gradient (light mode), pink gradient (dark mode)
- **Navigation features**: Tabs, instant navigation, search with suggestions, code copy buttons
- **Social cards**: Auto-generated with custom layout (blue background, white text)
- **Typography**: Inter for text, Google Sans Code for code blocks

## Working with Content

- All documentation pages go in the `docs/` directory as markdown files
- Add new pages to the navigation in `mkdocs.yml` (the config doesn't currently define a nav structure, so pages will auto-generate from directory structure)
- Use standard markdown with Material for MkDocs extensions
- Images and assets should be placed in `docs/assets/`

## Deployment Process

Deployment is automatic on push to main:
1. GitHub Actions workflow triggers
2. Sets up Python 3.11 environment
3. Installs system dependencies for PDF/imaging support
4. Installs Python dependencies
5. Runs `mkdocs build --strict` (fails if configuration is invalid)
6. Deploys to GitHub Pages via `mkdocs gh-deploy --force`

The site is published to https://developer.piratemidi.com.
