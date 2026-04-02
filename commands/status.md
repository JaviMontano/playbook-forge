---
description: "Muestra el estado actual del pipeline de generacion"
user-invocable: true
allowed-tools: ["Read", "Glob"]
---

# /status — Pipeline Status Report

## Execution Steps

### 1. Check Pipeline Artifacts

Inspect the `outputs/` directory for the following files and report their status:

#### a. Context File: `outputs/.playbook-context.json`

- If exists: Read and report ingestion timestamp, number of files processed, and key context categories found (roles, tools, problems).
- If missing: Report "Context: NOT INGESTED — run `/ingest` to scan source files."

#### b. Manifest File: `outputs/.playbook-manifest.json`

- If exists: Read and report generation timestamp, number of sections defined, topic, and target audience.
- If missing: Report "Manifest: NOT GENERATED — run `/forge <topic>` to generate."

#### c. Playbook HTML: `outputs/playbook-*.html`

- If exists: Report filename, file size (KB), last modified timestamp.
- If multiple exist: List all with dates, highlight the most recent.
- If missing: Report "Playbook: NOT ASSEMBLED — run `/forge <topic>` to generate."

### 2. Determine Pipeline State

Based on which artifacts exist, report the current pipeline state:

```
NOT_STARTED  — No artifacts found in outputs/
INGESTED     — Context file exists, no manifest or HTML
MANIFEST_READY — Context + manifest exist, no HTML
ASSEMBLED    — HTML playbook exists
VALIDATED    — HTML playbook exists and passes all checks
```

### 3. Display Status Report

Format as a clear status table:

```
Pipeline Status: <STATE>
─────────────────────────────
Context    [OK/MISSING]  <details>
Manifest   [OK/MISSING]  <details>
Playbook   [OK/MISSING]  <details>
─────────────────────────────
Next step: <recommendation>
```

### 4. Recommend Next Action

Based on current state, suggest the logical next command:
- `NOT_STARTED` → "Run `/ingest [path]` or `/forge <topic>`"
- `INGESTED` → "Run `/forge <topic>` to generate the playbook"
- `MANIFEST_READY` → "Run `/forge <topic>` to assemble the HTML"
- `ASSEMBLED` → "Run `/preview` to open in browser or `/export` to copy elsewhere"
