# Dispatch-Based Device Docs Update System

## Overview

A Raspberry Pi "firmware station" analyzes Pirate MIDI device firmware on each release and generates Device API documentation artifacts. These are pushed into this docs repo automatically via GitHub's repository_dispatch mechanism.

## System Flow

1. **Pi analyzes firmware** → generates docs artifacts (index.md + JSON templates)
2. **Pi packages artifacts** into a tar.gz archive
3. **Pi creates a GitHub Release** on the Firmware-Build-Station repo with the tar.gz as an asset
4. **Pi fires `repository_dispatch`** to this docs repo with device metadata and the release asset URL
5. **Dispatch workflow** (`update-device-docs.yml`) downloads, validates, places files, commits, and pushes
6. **Deploy workflow** (`deploy.yml`) triggers on the push, builds and deploys the site to GitHub Pages

## Docs Folder Structure

```
docs/devices/
├── index.md                              # Lists all device models with links
├── bridge/
│   ├── aero/
│   │   ├── .pages                        # order: desc (latest firmware first in sidebar)
│   │   └── {major}.{minor}.x/            # e.g., 1.2.x, 2.0.x
│   │       ├── index.md                  # Firmware version page (properties, schema, templates)
│   │       ├── factory-default.json      # Template: complete factory config
│   │       └── blank.json               # Template: blank starting config
│   ├── bridge4/
│   │   ├── .pages
│   │   └── (same pattern)
│   └── bridge6/
│       ├── .pages
│       └── (same pattern)
├── click/
│   └── click/
│       ├── .pages
│       └── (same pattern)
└── scribble/
    └── scribble/
        ├── .pages
        └── (same pattern)
```

### Key Design Decisions

- **No per-device index page** — Devices show only their firmware versions in the sidebar (no separate landing page that clutters navigation)
- **Firmware versions as directories** — Each version is a directory with `index.md` so templates are nested underneath, not in a separate tree
- **Version format: `{major}.{minor}.x`** — Only major/minor increments change the Device API model, so patch versions share the same docs (e.g., `1.0.x` covers v1.0.0, v1.0.1, etc.)
- **Templates are just `.json` files** — Any `.json` file in a firmware version directory is automatically rendered as a template on the page via the `render_templates()` macro (defined in `main.py`)
- **Navigation sorted latest-first** — `.pages` files with `order: desc` in each device directory ensure newest firmware versions appear at the top of the sidebar

## Device-to-Path Mapping

The dispatch workflow maps device identifiers from `client_payload.device` to directory paths:

| Device ID  | Directory Path                      |
|------------|-------------------------------------|
| `bridge4`  | `docs/devices/bridge/bridge4/`      |
| `bridge6`  | `docs/devices/bridge/bridge6/`      |
| `aero`     | `docs/devices/bridge/aero/`         |
| `click`    | `docs/devices/click/click/`         |
| `scribble` | `docs/devices/scribble/scribble/`   |

---

## Dispatch Workflow (Docs Repo Side) — IMPLEMENTED

File: `.github/workflows/update-device-docs.yml`

Triggers on `repository_dispatch` with type `docs-update`. The workflow:

1. **Validates** the dispatch payload (device, firmware_version, docs_url are present)
2. **Resolves** device ID to the correct directory path
3. **Parses** the firmware version into a `{major}.{minor}.x` directory name
4. **Downloads** the tar.gz artifact from the provided URL
5. **Extracts** into the target directory (strip top-level directory from archive)
6. **Ensures** the `.pages` file exists for sidebar ordering
7. **Validates** the artifact contents:
   - `index.md` exists
   - Required sections are present (`## Device Properties`, `## Device Schema`, `## Templates`)
   - `render_templates()` macro call is present
   - All `.json` files are valid JSON
8. **Build check** — runs `mkdocs build --strict` to catch any config issues
9. **Commits and pushes** — triggers the deploy workflow automatically

---

## Pi-Side Implementation Guide

### What the Pi Must Produce

For each firmware analysis, the Pi generates a directory containing:

```
{major}.{minor}.x/
├── index.md
├── factory-default.json
├── blank.json
└── (any additional template .json files)
```

### index.md Format

The `index.md` file must follow this exact structure. The heading, description text, and JSON content are populated by the Pi's firmware analysis. The `render_templates()` macro call must be included verbatim.

```markdown
# {Model} - Firmware {major}.{minor}.x

## Device Properties

Device properties define the capabilities of the hardware device for key hardware features and firmware according to this version.
An examples of hardware properties are the number of MIDI interfaces (made up of USB, standard MIDI IO, and Flexiports where applicable).
Most keys relate to firmware structure such as the maximum size of message stacks, the maximum size of names etc...

​```json
{DEVICE_PROPERTIES_JSON}
​```

## Device Schema

The device schema defines the complete structure of `globalSettings` and `bankSettings` for this firmware version, including all available configuration keys, value types, constraints, and enumerated options.

​```json
{DEVICE_SCHEMA_JSON}
​```

## Templates

Starter templates for this device and firmware version. Load into the editor or transfer manually to your device using the `DTXR` command as described in the [Protocol Overview](../../../../device-api/index.md).

{{ render_templates() }}
```

**Important notes:**
- The `{Model}` in the heading should be the display name (e.g., "Aero", "Bridge6", "Click")
- JSON blocks must be pretty-printed with 4-space indentation
- The `render_templates()` macro call must be exactly `{{ render_templates() }}` — the macro auto-discovers all `.json` files in the same directory
- The Protocol Overview relative link `../../../../device-api/index.md` is correct for all devices (4 levels up from `{family}/{model}/{version}/index.md`)

### Template JSON Files

Each `.json` file in the directory is automatically rendered on the page:
- **Filename becomes the display name**: `factory-default.json` → "Factory Default", `blank.json` → "Blank"
- Files are rendered alphabetically
- Each template appears as an `h3` heading with a download button and collapsible JSON viewer
- JSON files must be valid JSON (the dispatch workflow validates this)

### Artifact Packaging

Package the firmware version directory as a flat tar.gz:

```bash
# From the Pi's output directory
# Given: output/bridge/docs/aero/2.1.x/ contains index.md + .json files

PRODUCT="bridge"
DEVICE="aero"
VERSION="2.1.x"
OUTPUT_DIR="output/${PRODUCT}/docs/$DEVICE/$VERSION"

# Create tar.gz with the version directory as the top-level entry
tar -czf "${PRODUCT}-${DEVICE}-${VERSION}.tar.gz" -C "output/${PRODUCT}/docs/$DEVICE" "$VERSION"
```

The resulting archive structure must be:
```
2.1.x/
├── index.md
├── factory-default.json
├── blank.json
└── ...
```

The dispatch workflow uses `--strip-components=1` to extract the contents directly into the target directory, so the archive **must** have exactly one top-level directory.

### Artifact Naming Convention

```
{product}-{model}-{major}.{minor}.x.tar.gz
```

Examples:
- `bridge-aero-2.1.x.tar.gz`
- `bridge-bridge6-1.0.x.tar.gz`
- `click-click-1.0.x.tar.gz`

### Uploading via GitHub Release

Use `gh` CLI or the GitHub API to create a release on the Firmware-Build-Station repo and attach the tar.gz as an asset. The release tag should be unique per device/version.

```bash
REPO="Pirate-MIDI/Firmware-Build-Station"
PRODUCT="bridge"
DEVICE="aero"
VERSION="2.1.x"
FILE="${PRODUCT}-${DEVICE}-${VERSION}.tar.gz"
TAG="docs-${DEVICE}-${VERSION}"

# Create release with asset (or update existing)
gh release create "$TAG" \
  --repo "$REPO" \
  --title "Docs: ${DEVICE} ${VERSION}" \
  --notes "Auto-generated docs artifacts for ${DEVICE} firmware ${VERSION}" \
  --latest=false \
  "$FILE" \
  2>/dev/null || \
gh release upload "$TAG" "$FILE" --repo "$REPO" --clobber
```

The asset download URL follows the pattern:
```
https://github.com/{REPO}/releases/download/{TAG}/{FILENAME}
```

### Firing the Dispatch

After uploading the release asset, fire a `repository_dispatch` event to the docs repo:

```bash
DOCS_REPO="Pirate-MIDI/Device-API-Docs"
PRODUCT="bridge"
DEVICE="aero"
FW_VERSION="2.1.0"           # Full firmware version (e.g., 2.1.0, 2.1.1)
VERSION="2.1.x"
ASSET_URL="https://github.com/Pirate-MIDI/Firmware-Build-Station/releases/download/docs-${DEVICE}-${VERSION}/${PRODUCT}-${DEVICE}-${VERSION}.tar.gz"

curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${DOCS_REPO}/dispatches" \
  -d "{
    \"event_type\": \"docs-update\",
    \"client_payload\": {
      \"device\": \"${DEVICE}\",
      \"firmware_version\": \"${FW_VERSION}\",
      \"docs_url\": \"${ASSET_URL}\"
    }
  }"
```

### Dispatch Payload Reference

| Field              | Type   | Description                                         | Example          |
|--------------------|--------|-----------------------------------------------------|------------------|
| `device`           | string | Device identifier (must match device-to-path table) | `"aero"`         |
| `firmware_version` | string | Full firmware version (major.minor.patch)            | `"2.1.0"`        |
| `docs_url`         | string | Direct download URL for the tar.gz artifact          | `"https://..."` |

### GitHub Token Requirements

The `GITHUB_TOKEN` used by the Pi needs:
- **`repo` scope** on `Pirate-MIDI/Firmware-Build-Station` — to create releases and upload assets
- **`repo` scope** on `Pirate-MIDI/Device-API-Docs` — to fire `repository_dispatch` events

A single Personal Access Token (classic) with `repo` scope covers both. Store it as an environment variable or secret on the Pi.

### Complete Pi-Side Script Outline

```bash
#!/bin/bash
# Run after firmware analysis completes
set -euo pipefail

# --- Configuration ---
GITHUB_TOKEN="${GITHUB_TOKEN}"
BUILD_REPO="Pirate-MIDI/Firmware-Build-Station"
DOCS_REPO="Pirate-MIDI/Device-API-Docs"

# --- From firmware analysis ---
DEVICE="aero"              # Device identifier
PRODUCT="bridge"           # Product family
FW_VERSION="2.1.0"         # Full firmware version from analysis
VERSION_DIR="2.1.x"        # Derived: major.minor.x
OUTPUT_DIR="output/${PRODUCT}/docs/${DEVICE}/${VERSION_DIR}"

# --- 1. Verify output exists ---
[ -f "$OUTPUT_DIR/index.md" ] || { echo "Missing index.md"; exit 1; }

# --- 2. Package ---
ARCHIVE="${PRODUCT}-${DEVICE}-${VERSION_DIR}.tar.gz"
tar -czf "$ARCHIVE" -C "output/${PRODUCT}/docs/${DEVICE}" "$VERSION_DIR"

# --- 3. Upload to GitHub Release ---
TAG="docs-${DEVICE}-${VERSION_DIR}"
gh release create "$TAG" \
  --repo "$BUILD_REPO" \
  --title "Docs: ${DEVICE} ${VERSION_DIR}" \
  --notes "Auto-generated docs for ${DEVICE} firmware ${FW_VERSION}" \
  --latest=false \
  "$ARCHIVE" \
  2>/dev/null || \
gh release upload "$TAG" "$ARCHIVE" --repo "$BUILD_REPO" --clobber

# --- 4. Fire dispatch ---
ASSET_URL="https://github.com/${BUILD_REPO}/releases/download/${TAG}/${ARCHIVE}"
curl -fsSL -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${DOCS_REPO}/dispatches" \
  -d "{
    \"event_type\": \"docs-update\",
    \"client_payload\": {
      \"device\": \"${DEVICE}\",
      \"firmware_version\": \"${FW_VERSION}\",
      \"docs_url\": \"${ASSET_URL}\"
    }
  }"

echo "Dispatch sent for ${DEVICE} ${FW_VERSION}"
```

### JSON Viewer Behaviour

All JSON code blocks on the page (Device Properties, Device Schema, and Templates) are automatically converted to interactive tree viewers by the `renderjson.js` library at render time. No special markup is needed — any valid JSON inside a `` ```json `` code block is converted.

- Level 1 keys are expanded by default; deeper levels are collapsed
- Users can click disclosure arrows to expand/collapse any level
- A copy button appears on hover to copy the raw JSON

---

## Alternatives Considered But Not Chosen

- **GitHub Contents API**: Lightweight HTTP calls, no clone needed. Good for simple cases but multi-file atomic commits require multiple API calls (blobs → tree → commit → update ref).
- **Shallow sparse clone**: `git clone --depth 1 --sparse` is lighter than full clone but still more overhead than pure API calls.
- **Direct push from Pi**: Works but puts git logic on the Pi unnecessarily.
- **Separate template pages**: Template viewer pages as standalone `.md` files caused unwanted sidebar expansion under firmware versions. Embedding via the `render_templates()` macro keeps templates on the firmware page without extra nav entries.
- **Per-device index.md with version table**: Added clutter to the sidebar. Removing it lets the sidebar show firmware versions directly under each device.
