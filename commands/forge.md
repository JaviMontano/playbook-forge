---
description: "Genera un playbook HTML completo con 13 flujos AI-native, 5 katas y adopcion progresiva"
user-invocable: true
argument-hint: "<topic> [--source=path]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "AskUserQuestion", "TodoWrite"]
---

# /playbook:forge — Generate Complete Playbook

## What This Command Does

Generates a complete, self-contained HTML playbook with 13 AI-native workflows, 5 katas (Shu-Ha-Ri), 65+ interactive modals, bilingual ES/EN content, and full Sofka DS v5.1 branding.

## How It Works

1. Parse the topic from arguments. If `--source=path` is provided, run `/playbook:ingest` on that path first.
2. **Launch the `forge-orchestrator` agent** with the parsed topic and any source context.
3. The orchestrator executes the **V4 Deterministic Pipeline** (11 steps):

| Step | Phase | Method | Script/Agent |
|------|-------|--------|-------------|
| 1 | INTAKE | Parse topic | — |
| 2 | INGEST | Extract context (optional) | `context-ingester` agent |
| 3 | CLARIFY | Ask 5-6 questions | `AskUserQuestion` |
| 4 | COMPOSE | Template-based manifest | `compose-manifest.js` (deterministic) |
| 5 | VALIDATE-PRE | Content density check | `verify-content.js` (deterministic) |
| 6 | ENRICH | Fill _generate fields only | `content-strategist` agent (LLM) |
| 7 | VALIDATE-POST | Re-check density | `verify-content.js` (deterministic) |
| 8 | ASSEMBLE | Manifest → HTML | `assemble.js` (deterministic) |
| 9 | ROBUSTIFY | Spec compliance fix | `robustify.js` (deterministic) |
| 10 | VERIFY | 28-gate check | `verify-spec.js` (BLOCKING) |
| 11 | DELIVER | Report + preview | — |

**Steps 4, 5, 7, 8, 9, 10 are SCRIPTS** — 90% deterministic. Only step 6 uses LLM.

## Blocking Gate

`verify-spec.js` must return **28/28 PASS** before delivery. If it fails, the orchestrator runs `robustify.js` and re-verifies. If still failing, the playbook is NOT delivered.

## Artifacts Produced

| File | When | Purpose |
|------|------|---------|
| `outputs/.playbook-brief.json` | Step 3 | Structured user responses |
| `outputs/.playbook-context.json` | Step 2 | Extracted source context |
| `outputs/.playbook-manifest.json` | Step 4 | Template-composed manifest |
| `outputs/.playbook-manifest-enriched.json` | Step 6 | LLM-enriched manifest |
| `outputs/playbook_{unit}_{slug}_v{ver}.html` | Step 8 | Final HTML playbook |
| `outputs/.playbook-verification.json` | Step 10 | 28-gate report |

## Reference Specs

- `references/PLAYBOOK-SPEC.md` — HTML structure (28 gates)
- `references/CONTENT-SPEC.md` — Content density per section
- `references/CHECKLIST.md` — 78 checks across 4 gates
