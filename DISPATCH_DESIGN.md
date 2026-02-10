# Dispatch-Based Device Docs Update System

## Overview

A Raspberry Pi "firmware station" analyzes Pirate MIDI device firmware on each release and generates Device API documentation artifacts. These are pushed into this docs repo automatically via GitHub's repository_dispatch mechanism.

## Chosen Approach: Repository Dispatch + GitHub Actions

### Flow
1. **Pi analyzes firmware** → generates docs artifacts (markdown + JSON templates)
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
├── index.md                              # Lists all models directly (no family-level pages)
├── bridge/
│   ├── bridge4/
│   │   ├── index.md                      # Firmware version listing table (latest first)
│   │   ├── x.x.x.md                     # Template: firmware version page
│   │   └── templates/x.x.x/
│   │       ├── globalSettings.json
│   │       └── bankSettings.json
│   ├── bridge6/
│   │   ├── index.md
│   │   ├── x.x.x.md
│   │   └── templates/x.x.x/
│   │       ├── globalSettings.json
│   │       └── bankSettings.json
│   └── aero/
│       ├── index.md
│       ├── x.x.x.md
│       └── templates/x.x.x/
│           ├── globalSettings.json
│           └── bankSettings.json
├── click/
│   └── click/
│       ├── index.md
│       ├── x.x.x.md
│       └── templates/x.x.x/
│           ├── globalSettings.json
│           └── bankSettings.json
└── scribble/
    └── scribble/
        ├── index.md
        ├── x.x.x.md
        └── templates/x.x.x/
            ├── globalSettings.json
            └── bankSettings.json
```

## Firmware Version Page Structure (x.x.x.md)

Single page per firmware version with three anchor-linked sections:

1. **Device Properties** — Short description + JSON (CHCK response data)
2. **Device Schema** — Short description + JSON (globalSettings/bankSettings schema)
3. **Basic Templates** — Short description + links to template .json files

## Model Index Page (index.md)

Table listing firmware versions sorted latest-first:

| Version | Release Date | Links |
|---------|-------------|-------|
| [2.1.0](2.1.0.md) | 2025-01-15 | [Templates](templates/2.1.0/) |

The dispatch workflow needs to prepend new rows to this table.

## Next Steps (TODO)

### 1. Create the GitHub Actions Dispatch Workflow
- File: `.github/workflows/update-device-docs.yml`
- Trigger: `repository_dispatch` with type `docs-update`
- Should:
  - Download artifacts from `client_payload.docs_url`
  - Map `client_payload.device` to the correct directory path (e.g., `bridge6` → `docs/devices/bridge/bridge6/`)
  - Place the firmware version .md file and template .json files
  - Prepend a row to the model's index.md firmware version table
  - Commit and push

### 2. Add Automated Validation Checks
- The dispatch workflow should validate artifacts before committing:
  - Markdown files are well-formed
  - JSON files are valid JSON
  - Required sections exist in firmware version .md (Device Properties, Device Schema, Basic Templates)
  - Template .json files are referenced correctly
  - `mkdocs build --strict` passes after placing files
- This prevents broken artifacts from being auto-deployed

### 3. Define Artifact Format
- Decide the exact structure of the tar.gz/zip the Pi produces
- Should contain:
  - `{version}.md` — The firmware version documentation page
  - `templates/{version}/globalSettings.json`
  - `templates/{version}/bankSettings.json`
  - Possibly a manifest.json with metadata (device model, version, release date)

### 4. Device-to-Path Mapping
- The workflow needs to map device identifiers to directory paths:
  - `bridge4` → `docs/devices/bridge/bridge4/`
  - `bridge6` → `docs/devices/bridge/bridge6/`
  - `aero` → `docs/devices/bridge/aero/`
  - `click` → `docs/devices/click/click/`
  - `scribble` → `docs/devices/scribble/scribble/`

### 5. Pi-Side Implementation
- Script to package artifacts in the expected format
- Script to upload artifacts (GitHub release on firmware repo, or other hosting)
- Script to fire the repository_dispatch event

## Alternatives Considered But Not Chosen

- **GitHub Contents API**: Lightweight HTTP calls, no clone needed. Good for simple cases but multi-file atomic commits require multiple API calls (blobs → tree → commit → update ref).
- **Shallow sparse clone**: `git clone --depth 1 --sparse` is lighter than full clone but still more overhead than pure API calls.
- **Direct push from Pi**: Works but puts git logic on the Pi unnecessarily.
