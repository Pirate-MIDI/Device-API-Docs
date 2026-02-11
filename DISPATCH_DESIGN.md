# Dispatch-Based Device Docs Update System

## Overview

A Raspberry Pi "firmware station" analyzes Pirate MIDI device firmware on each release and generates Device API documentation artifacts. These are pushed into this docs repo automatically via GitHub's repository_dispatch mechanism.

## Chosen Approach: Repository Dispatch + GitHub Actions

### Flow
1. **Pi analyzes firmware** → generates docs artifacts (index.md + JSON templates)
2. **Pi pushes artifacts** as a release artifact to the firmware analysis repo
3. **Pi fires `repository_dispatch`** to this docs repo with metadata (device, firmware version, artifact URL)
4. **GitHub Actions workflow in this repo** downloads artifacts, places files, commits, and pushes
5. **Existing deploy workflow** triggers on the push, builds and deploys the site

### Why This Approach
- Pi only needs to make a single curl call (lightweight)
- All git logic runs on GitHub's infrastructure, not the Pi
- Clean separation of concerns
- Existing deploy workflow handles the rest automatically

### Pi-Side Trigger (curl call)
```bash
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Pirate-MIDI/Device-API-Docs/dispatches \
  -d '{
    "event_type": "docs-update",
    "client_payload": {
      "firmware_version": "2.1.0",
      "device": "bridge6",
      "docs_url": "https://url-to-artifact/bridge6-docs.tar.gz"
    }
  }'
```

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

## Firmware Version Page Structure (`index.md`)

Single page per firmware version with three sections:

1. **Device Properties** — JSON object from the `CHCK` command response describing hardware capabilities and firmware structure
2. **Device Schema** — JSON schema defining the complete structure of `globalSettings` and `bankSettings` including value types, constraints, and enums
3. **Templates** — Auto-rendered by `{{ render_templates() }}` macro. Discovers all `.json` files in the directory and renders each with a collapsible JSON viewer and download button. Template display name is derived from filename (e.g., `factory-default.json` → "Factory Default")

## Artifact Format

The tar.gz/zip produced by the Pi for each firmware version should contain:

```
{major}.{minor}.x/
├── index.md                  # Firmware version page with populated Device Properties and Schema
├── factory-default.json      # Full factory default configuration
├── blank.json                # Blank/empty configuration
└── (any additional .json)    # Additional templates are auto-discovered
```

The dispatch workflow places this directory at:
`docs/devices/{device-path}/{major}.{minor}.x/`

No need to update any other files — the `render_templates()` macro handles template display, and `awesome-pages` handles sidebar ordering.

## Device-to-Path Mapping

The workflow maps device identifiers from `client_payload.device` to directory paths:

| Device ID  | Directory Path                      |
|------------|-------------------------------------|
| `bridge4`  | `docs/devices/bridge/bridge4/`      |
| `bridge6`  | `docs/devices/bridge/bridge6/`      |
| `aero`     | `docs/devices/bridge/aero/`         |
| `click`    | `docs/devices/click/click/`         |
| `scribble` | `docs/devices/scribble/scribble/`   |

## Next Steps (TODO)

### 1. Create the GitHub Actions Dispatch Workflow
- File: `.github/workflows/update-device-docs.yml`
- Trigger: `repository_dispatch` with type `docs-update`
- Should:
  - Download artifacts from `client_payload.docs_url`
  - Extract `{major}.{minor}.x/` directory from the artifact
  - Map `client_payload.device` to the correct directory path
  - Place the firmware version directory (index.md + JSON files)
  - Commit and push (the deploy workflow handles the rest)

### 2. Add Automated Validation Checks
- The dispatch workflow should validate artifacts before committing:
  - JSON files are valid JSON
  - Required sections exist in firmware version index.md (Device Properties, Device Schema, Templates)
  - The `{{ render_templates() }}` macro call is present in the markdown
  - `mkdocs build --strict` passes after placing files
- This prevents broken artifacts from being auto-deployed

### 3. Pi-Side Implementation
- Script to analyze firmware and generate:
  - `index.md` with populated Device Properties and Device Schema sections
  - Template `.json` files (factory-default.json, blank.json, and any additional templates)
- Script to package artifacts in the expected directory format
- Script to upload artifacts and fire the `repository_dispatch` event

## Alternatives Considered But Not Chosen

- **GitHub Contents API**: Lightweight HTTP calls, no clone needed. Good for simple cases but multi-file atomic commits require multiple API calls (blobs → tree → commit → update ref).
- **Shallow sparse clone**: `git clone --depth 1 --sparse` is lighter than full clone but still more overhead than pure API calls.
- **Direct push from Pi**: Works but puts git logic on the Pi unnecessarily.
- **Separate template pages**: Template viewer pages as standalone `.md` files caused unwanted sidebar expansion under firmware versions. Embedding via the `render_templates()` macro keeps templates on the firmware page without extra nav entries.
- **Per-device index.md with version table**: Added clutter to the sidebar. Removing it lets the sidebar show firmware versions directly under each device.
