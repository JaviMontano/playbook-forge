# playbook-forge

Claude Code plugin that generates branded HTML playbooks with a lived methodology: 13 AI-native workflows, 4 progressive katas, 4-week adoption timeline, VR-AID framework, and value traffic light system.

## Installation

```bash
# Plugin auto-detected from ~/.claude/plugins/playbook-forge/
```

## Usage

```
/playbook:forge "Workflows agénticos para equipos de QA en BU3"
```

The plugin will:
1. Ask 3-5 clarifying questions about your team, tools, and problems
2. Generate a content manifest adapted to your context
3. Assemble a self-contained HTML playbook (80-200KB)
4. Validate quality and deliver

## Commands

- `/playbook:forge "<topic>"` — Generate complete playbook
- `/playbook:ingest [path]` — Ingest source files for context
- `/playbook:preview` — Open latest playbook in browser
- `/playbook:section "<type>"` — Generate a single section
- `/playbook:status` — Pipeline status
- `/playbook:export [path]` — Export to specific path

## Design System

Sofka DS v5.1 — 42 CSS tokens, 22 reusable components, responsive + print.

## Architecture

Every playbook promotes a 3-layer information grounding strategy:
- **Data**: Google Drive (governed units)
- **Middleware**: NotebookLM (anti-hallucination)
- **Front**: Gemini + Gems (command center)

## License

All Rights Reserved - Sofka Technologies
