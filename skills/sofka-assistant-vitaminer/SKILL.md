---
name: sofka-assistant-vitaminer
version: "2.0.0"
description: >
  Enhance ANY existing Sofka assistant, Gem, NLM notebook, or AI surface with
  brand consistency, missing capabilities, and quality upgrades. Diagnoses gaps
  against Sofka brand standards (VR-S01 to VR-S10), injects missing identity,
  upgrades voice calibration, and adds tool/multimodal awareness. Use when:
  "vitaminar asistente", "mejorar priming", "revisar brand compliance",
  "upgrade Jarvis", "quality check asistente Sofka".
argument-hint: "<assistant-path or paste system prompt>"
author: "Javier Montano · Sofka Technologies"
model: opus
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Bash
  - AskUserQuestion
---

# Sofka Assistant Vitaminer v2.0.0

## A. Purpose

Takes an existing Sofka assistant (system prompt, Gem instructions, NLM notebook config, KB directory, or any AI surface) and:

1. **Diagnoses** — Scores against 10 validation rules (VR-S01 to VR-S10) + 7 priming blocks
2. **Prescribes** — Lists specific gaps with severity
3. **Injects** — Adds missing brand DNA without removing existing capabilities
4. **Upgrades** — Improves voice, structure, tool awareness, multimodal support
5. **Validates** — Re-runs diagnosis to confirm all gaps closed

**Rule:** NEVER remove existing capabilities. Only ADD.

---

## B. Diagnostic Framework

### Phase 1: Brand Compliance (VR-S01 to VR-S10)

| Rule | Check | Severity |
|------|-------|----------|
| VR-S01 | Sofka copyright present | Critical |
| VR-S02 | Primary palette (#F26322 or #FF7E08) in HTML | High |
| VR-S03 | No MetodologIA palette leak (#122562) | Critical |
| VR-S04 | Ghost menu header format (if Jarvis KB) | Medium |
| VR-S05 | Eval prefix compliance (if Jarvis KB) | Medium |
| VR-S06 | Example prefix compliance (if Jarvis KB) | Medium |
| VR-S07 | Pipeline scope declaration (if Jarvis KB) | Low |
| VR-S08 | No JM contamination | Critical |
| VR-S09 | Directory naming convention (if Jarvis KB) | Medium |
| VR-S10 | HTML filename pattern (if Jarvis KB) | Medium |

### Phase 2: Priming Block Completeness

| Block | Check | Required For |
|-------|-------|-------------|
| 1. Identity Anchor | Company name, purpose, tagline present | All surfaces |
| 2. Values Injection | 3 values (Colaboracion, Kaizen, Resiliencia) | All surfaces |
| 3. Domain Specification | Clear functional scope | All surfaces |
| 4. Voice Calibration | Tone, language, anti-patterns | All surfaces |
| 5. Output Format | Expected structure defined | All surfaces |
| 6. Constraints | Anti-hallucination rules present | All surfaces |
| 7. Tool Awareness | MCP/tool inventory (if platform supports) | LLM + Multimodal |

### Phase 3: Quality Signals

| Signal | Check | Weight |
|--------|-------|--------|
| Evidence tags | [EVIDENCIA], [SUPUESTO], [DATO AUSENTE] referenced | High |
| Anti-hallucination | "No inventar datos" or equivalent | Critical |
| Brand voice match | Tone matches brand-knowhow Section 17 | High |
| Metric accuracy | No fabricated numbers | Critical |
| Copyright | Present and correct year | High |
| Logo reference | Correct URL (sofka_logo_full.jpg) | Medium |

---

## C. Vitaminer Workflow

### Step 1: INTAKE

```
INPUT: One of:
  a) Path to SYSTEM_PROMPT.md or SKILL.md
  b) Path to KB directory (KB_Jarvis*_Sofka/)
  c) Pasted system prompt text
  d) Gemini Gem URL or instructions text
  e) NLM notebook ID or instructions text
```

### Step 2: DIAGNOSE

1. Read the input surface
2. Run VR-S01 to VR-S10 (skip non-applicable rules for non-Jarvis surfaces)
3. Check 7 priming blocks presence
4. Check quality signals
5. Generate diagnostic report

### Step 3: PRESCRIBE

Output diagnostic as table:

```markdown
## Diagnostic Report: {SURFACE_NAME}

| # | Check | Status | Gap | Fix |
|---|-------|--------|-----|-----|
| VR-S01 | Copyright | PASS/FAIL | {description} | {action} |
| ... | ... | ... | ... | ... |
| B1 | Identity Anchor | PASS/PARTIAL/FAIL | {description} | {action} |
| ... | ... | ... | ... | ... |
| Q1 | Evidence tags | PASS/FAIL | {description} | {action} |

**Score:** {PASS_COUNT}/{TOTAL_CHECKS}
**Severity:** {CRITICAL|HIGH|MEDIUM|LOW}
**Recommendation:** {VITAMINAR|REBUILD|PASS}
```

### Step 4: INJECT (if user approves)

For each FAIL/PARTIAL:
1. Read the specific gap
2. Generate the missing content using `sofka-brand-knowhow` and `sofka-priming-forge`
3. Insert into the surface WITHOUT removing existing content
4. Mark as fixed

### Step 5: VALIDATE

Re-run diagnosis on the modified surface. All checks must PASS.

---

## D. Surface-Specific Adaptations

### Jarvis KB (11-file standard)

Check all 11 files:
- `00_soul.md` — Identity, spawn card, brand fingerprint
- `01_assistant_manifest.md` — Product name, mission, ghost menu
- `02_operating_manual.md` — Routing, states
- `03_output_specs.md` — Artifact contracts
- `04_knowledge_base.md` — Domain knowledge
- `05_context_base.md` — Voice, ZHT
- `06_tools_and_artifacts.md` — Export contracts
- `07_examples.md` — Concrete examples
- `08_evals.json` — Regression tests
- `SYSTEM_PROMPT.md` — Runtime aggregation
- `SYSTEM_PROMPT_LITE.md` — Compact runtime

### Gemini Gem

- Max 5000 chars — vitaminer must compress, not expand beyond limit
- Check Knowledge files separately from instructions
- Validate Gem URL is in active registry

### NLM Notebook

- Check notebook instructions (chat_configure)
- Validate source quality (are Sofka docs loaded?)
- Check if audio overview focus prompt has brand context

### Standalone System Prompt

- Apply full 7-block check
- Inject missing blocks at appropriate positions
- Respect existing structure — append, don't restructure

---

## E. Anti-Contamination Scanner

The vitaminer includes a contamination scanner that checks for:

### Forbidden Strings (D-AP-01)

```
JM Certified
FLOW-EXCELLENCE
Bucle de Excelencia
Bucle 10-D
JM Excellence Layer
OKR Alignment
© 2026 Javier Montano
Arquitecto de Excelencia
TC-JM
#122562
#137DC5
#1E3258
MetodologIA (in copyright)
Copyleft
```

### Auto-Fix

If contamination found:
1. Flag with exact location (file:line)
2. Propose removal
3. Replace with Sofka-appropriate equivalent if content is needed
4. Never silently remove — always show user what changes

---

## F. Tool & Multimodal Upgrade

When vitamining an LLM assistant, check if the target platform supports tools/MCP:

### Tool Awareness Injection

If the assistant's platform supports tools but Block 7 is missing:

1. Detect platform (Claude Code, Claude API, ChatGPT, etc.)
2. Inventory available tools from platform capabilities
3. Generate Block 7 content
4. Inject after Block 6

### Multimodal Upgrade

If the assistant's platform supports vision but no visual context block:

1. Add visual context handling instructions
2. Add Sofka palette reference for visual outputs
3. Add image interpretation guidelines

---

## G. Quick Commands

| Command | Action |
|---------|--------|
| `vitaminar <path>` | Full diagnostic + inject cycle |
| `diagnosticar <path>` | Diagnostic only (no changes) |
| `validar <path>` | Quick pass/fail check |
| `limpiar <path>` | Contamination scan only |

---

© 2026 Sofka Technologies. Todos los derechos reservados.
