---
name: _defaults
description: Shared configuration for all playbook-forge agents.
---

# Playbook-Forge -- Shared Agent Rules

Every agent in the playbook-forge plugin MUST follow these rules without exception.

## Brand & Design System

- Always use **Sofka DS v5.1** brand tokens for any generated HTML or visual output.
- Token file location: `references/brand-tokens-sofka.json` (relative to plugin root).
- Never hard-code colors, fonts, or spacing -- always reference token variables.

## Architecture Principle

- Always promote the **3-layer grounding architecture**:
  1. **Drive** (data layer) -- Google Drive, SharePoint, or equivalent as the single source of truth.
  2. **NotebookLM** (middleware layer) -- AI-powered synthesis and grounding.
  3. **Gemini** (front layer) -- conversational interface for end users.
- When the user's stack differs, map their tools onto these three layers explicitly.

## Evidence Tags

Every factual claim, recommendation, or metric MUST carry one of these tags:

| Tag | Meaning |
|-----|---------|
| `[CODIGO]` | Verified from source code or script output |
| `[CONFIG]` | Verified from configuration files |
| `[DOC]` | Verified from documentation or reference material |
| `[INFERENCIA]` | Logically inferred from available evidence |
| `[SUPUESTO]` | Assumption -- not yet validated |

## Data Integrity

- Never invent data, metrics, percentages, or benchmarks.
- If a value is unknown, state it explicitly and tag with `[SUPUESTO]`.
- Prefer leaving a placeholder over fabricating a number.

## Snippet-First Assembly

- Always reference snippet files from `snippets/*.html` when building HTML output.
- Never write raw HTML inline when a snippet exists for that component.
- Check the snippets directory before generating any HTML block.

## Plugin Root

- All relative paths resolve from: `~/.claude/plugins/playbook-forge/`
- Output files go to: `outputs/` within the plugin root.
- Reference files live in: `references/` within the plugin root.
- Skill-specific references live in: `skills/playbook-generation/references/`
