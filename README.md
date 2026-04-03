# playbook-forge v2.0.0

Claude Code plugin that generates branded HTML playbooks with a lived methodology: 13 AI-native workflows, 5 progressive katas (Shu-Ha-Ri), 65 interactive modals, bilingual content (ES/EN with toggle), 13 anti-patterns with remediation, glossary, manager profiles, 11 sections, VR-AID framework, and value traffic light system.

## Installation

```bash
# Plugin auto-detected from ~/.claude/plugins/playbook-forge/
```

## Usage

```
/playbook:forge "Workflows agénticos para equipos de QA en BU3"
```

The plugin will:
1. Ask 3-6 clarifying questions about your team, tools, problems, and bilingual preference
2. Generate a bilingual content manifest adapted to your context
3. Assemble a self-contained HTML playbook (120-400KB) with 65 interactive modals
4. Validate quality against 19-point v2 checklist and deliver

## V2 Highlights

- **65 Modals**: 13 flow deep-dives, 13 anti-pattern details, 15 glossary terms, 5 kata details, 7 decision matrix, 3 learning layers, 3 manager profiles, 1 impact
- **Bilingual**: Native ES/EN toggle for all content fields
- **5 Katas**: Shu-Ha-Ri progression (Observe, Imitate, Adapt, Teach, Create)
- **13 Anti-patterns**: Each with symptoms, detection, 3 remediation steps, accountability
- **11 Sections**: Organized in 4 groups (Foundation, Flows, Learning, Governance)
- **Manager Profiles**: 3 maturity levels (novato/Shu, practicante/Ha, autonomo/Ri)
- **Kata x Flow Matrix**: Activation matrix showing which flows activate at each kata level

## Commands

- `/playbook:forge "<topic>"` -- Generate complete playbook
- `/playbook:ingest [path]` -- Ingest source files for context
- `/playbook:preview` -- Open latest playbook in browser
- `/playbook:section "<type>"` -- Generate a single section
- `/playbook:status` -- Pipeline status
- `/playbook:export [path]` -- Export to specific path

## Design System

Sofka DS v5.1 -- 42 CSS tokens, 33 reusable components, responsive + print, modal system, bilingual CSS.

## Architecture

Every playbook promotes a 3-layer information grounding strategy:
- **Data**: Google Drive (governed units)
- **Middleware**: NotebookLM (anti-hallucination)
- **Front**: Gemini + Gems (command center)

## License

All Rights Reserved - Sofka Technologies
