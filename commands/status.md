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

#### c. Brief File: `outputs/.playbook-brief.json`

- If exists: Read and report clarification timestamp, number of questions answered, and key decisions captured (roles, tools, problems, stack, language).
- If missing: Report "Brief: NOT CREATED — run `/forge <topic>` to trigger clarification."

#### d. Playbook HTML: `outputs/playbook-*.html`

- If exists: Report filename, file size (KB), last modified timestamp.
- If multiple exist: List all with dates, highlight the most recent.
- If missing: Report "Playbook: NOT ASSEMBLED — run `/forge <topic>` to generate."

### 2. Determine Pipeline State

Based on which artifacts exist, report the current pipeline state:

```
NOT_STARTED  — No artifacts found in outputs/
INGESTED     — Context file exists, no brief, manifest, or HTML
CLARIFIED    — Context + brief exist, no manifest or HTML
MANIFEST_READY — Context + brief + manifest exist, no HTML
ASSEMBLED    — HTML playbook exists
VALIDATED    — HTML playbook exists and passes all checks
```

### 3. Display Status Report

Determine state by checking artifacts in order:

1. Check for `.playbook-context.json` → if missing, state is NOT_STARTED
2. Check for `.playbook-context.json` only → state is INGESTED
3. Check for `.playbook-brief.json` → if exists, state is CLARIFIED
4. Check for `.playbook-manifest.json` → if exists, state is MANIFEST_READY
5. Check for `playbook-*.html` → if exists, state is ASSEMBLED or VALIDATED

Format as a clear status table:

```
Pipeline Status: <STATE>
─────────────────────────────
Context    [OK/MISSING]  <details>
Brief      [OK/MISSING]  <details>
Manifest   [OK/MISSING]  <details>
Playbook   [OK/MISSING]  <details>
─────────────────────────────
Next step: <recommendation>
```

### 4. Recommend Next Action

Based on current state, suggest the logical next command:
- `NOT_STARTED` → "Run `/ingest [path]` or `/forge <topic>`"
- `INGESTED` → "Run `/forge <topic>` to clarify requirements and generate the playbook"
- `CLARIFIED` → "Run `/forge <topic>` to generate the manifest"
- `MANIFEST_READY` → "Run `/forge <topic>` to assemble the HTML"
- `ASSEMBLED` → "Run `/preview` to open in browser or `/export` to copy elsewhere"
