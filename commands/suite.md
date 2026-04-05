---
description: "Batch-generate 14 secondary playbooks from a golden reference playbook"
user-invocable: true
argument-hint: "<golden-ref.html>"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "TodoWrite"]
---

# /playbook:suite — Batch Generate Playbook Ecosystem

## What This Command Does

Takes a golden reference playbook HTML and generates 14 secondary playbooks (P0-P13), each focused on a specific tool or workflow from the golden reference.

## How It Works

1. Read the golden reference HTML
2. Extract: 13 flows, tools, architecture, katas, anti-patterns
3. For each of 14 playbooks:
   a. Create brief.json with tool-specific context
   b. Run compose-manifest.js (deterministic)
   c. Launch content-strategist to fill _generate fields
   d. Run assemble.js → robustify.js → verify-spec.js
4. Generate crosslinks (route table in each playbook)
5. Run /playbook:certify on each output
6. Report batch results

## Output

14 HTML files in outputs/ following naming: `playbook_{unit}_pb{N}-{slug}_v1.html`
