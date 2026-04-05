# playbook-forge v6.0.0

Claude Code plugin that generates branded HTML playbooks with a lived methodology. Uses a 3-layer deterministic architecture: specs define the standard, templates compose 90% of content, scripts assemble and verify. Only ~10% requires LLM generation.

## V6 Highlights

- **Dual-mode**: ecosystem (P0-P13) + forensic (assessment)
- **38 verification gates** (was 28) via verify-spec.js
- **Copyable prompts** with EXITO criteria in every prompt-copyable block
- **Google Calendar auto-deploy links** for adoption workflows
- **/playbook:suite** for batch generation of 14 secondary playbooks
- **/playbook:certify** for 38-gate certification
- **6 production bug fixes**: bilingual CSS, modal scroll, nav sync, window exports, AP IDs, prompt-copyable

## Installation

```bash
# Plugin auto-detected from ~/.claude/plugins/playbook-forge/
```

## Usage

```
/playbook:forge "Workflows agénticos para equipos de QA en BU3"
/playbook:suite outputs/golden-ref.html
/playbook:certify outputs/playbook_bu2_pb4-elrepo_v1.html
```

## V6 Architecture: 3-Layer Determinism

### Layer 1: Specs (6 entrusted standards)
| Spec | Governs |
|------|---------|
| PLAYBOOK-SPEC.md | HTML structure (38 automated gates) |
| CONTENT-SPEC.md | Content density per section |
| MODAL-SPEC.md | Modal internal patterns (10 categories) |
| FLOW-SPEC.md | 13 flow definitions |
| KATA-SPEC.md | 5 kata levels (Shu-Ha-Ri) |
| CHECKLIST.md | 78 checks across 4 gates |

### Layer 2: Templates (8 composable blocks)
| Template | Purpose |
|----------|---------|
| golden-manifest.json | Reference manifest (source of truth) |
| section-blocks/*.json | 7 pre-written section templates (including prompts-by-flow) |
| modal-templates/*.json | Modal body patterns |

### Layer 3: Engine (7 scripts)
| Script | Purpose |
|--------|---------|
| compose-manifest.js | 90% deterministic manifest composition |
| verify-content.js | Content density validation |
| assemble.js | Manifest → HTML builder |
| robustify.js | Spec compliance auto-fixer |
| verify-spec.js | 38-gate HTML validator |
| validate-manifest.js | JSON schema validator |
| placeholder-map.js | Placeholder coverage checker |

## What It Generates

- 13 AI-native workflows with interactive flow modals
- 5 progressive katas (Shu-Ha-Ri: Observe → Imitate → Adapt → Teach → Create)
- 65+ interactive modals (flows, anti-patterns, glossary, katas, profiles)
- Bilingual ES/EN with instant toggle
- 13 anti-patterns with 3-step remediation
- 15+ glossary terms with deep-dive modals
- 13 copyable prompts with EXITO criteria (one per flow)
- VR-AID framework + value traffic light
- Sofka DS v5.1 branded, responsive, print-ready

## Commands

| Command | Description |
|---------|-------------|
| `/playbook:forge "<topic>"` | Generate complete playbook (11-step pipeline) |
| `/playbook:suite <golden.html>` | Batch-generate 14 secondary playbooks from golden reference |
| `/playbook:certify <playbook.html>` | Run 38-gate certification checks |
| `/playbook:ingest [path]` | Ingest source files for context |
| `/playbook:preview` | Open latest playbook in browser |
| `/playbook:section "<type>"` | Generate a single section |
| `/playbook:status` | Pipeline status |
| `/playbook:export [path]` | Export to specific path |

## Quality Gate

Every playbook must pass `verify-spec.js` with **38/38** on blocking gates (G0-G5) before delivery. Gate G6 is soft (informational). No exceptions.

## License

All Rights Reserved - Sofka Technologies
