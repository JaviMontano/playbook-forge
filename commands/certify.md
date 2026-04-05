---
description: "Run 10 v6 certification checks on a playbook HTML file"
user-invocable: true
argument-hint: "<playbook.html>"
allowed-tools: ["Read", "Bash", "Grep"]
---

# /playbook:certify — Playbook Certification

## What This Command Does

Runs the verify-spec.js script (38 gates) on a playbook HTML file and reports pass/fail.

## How It Works

1. Run: `node verify-spec.js <playbook.html>`
2. Parse JSON output
3. Report:
   - Score: X/38
   - Per-gate results (G0-G5, G6)
   - Failures with actual vs required
   - PASS or FAIL verdict

## Blocking

A playbook with score < 38/38 on blocking gates (G0-G5) is NOT certified.
Gate G6 is soft (informational only).
