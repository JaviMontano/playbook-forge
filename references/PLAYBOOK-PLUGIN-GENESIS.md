# PLAYBOOK-PLUGIN-GENESIS v1.0

> Genera un plugin completo de Claude Code que produce playbooks HTML branded
> para cualquier metodologia, desde 3-5 inputs.
> Arquitectura: playbook-forge v6.0.0 (3 capas: specs, templates, engine).

## INPUTS

| # | Input | Formato | Ejemplo | Req |
|---|-------|---------|---------|-----|
| 1 | Brand + Color | "Nombre, #HEX" | "Acme Corp, #2563EB" | SI |
| 2 | Metodologia | String | "APEX Framework" | SI |
| 3 | N Workflows (3-13) | Lista numerada | "1. Sprint Planning, 2. Retro..." | SI |
| 4 | Audiencia | Rol(es) | "Engineering leads, QA managers" | SI |
| 5 | HTML referencia | Path o "ninguno" | "./golden-ref.html" | no |

## ARQUITECTURA (3 capas)

### Capa 1: SPECS (references/)
- `brand-tokens-{slug}.json` [GEN] tokens derivados del color primario
- `PLAYBOOK-SPEC.md` [GEN] gates HTML adaptados a N workflows
- `FLOW-SPEC.md` [GEN] N workflow definitions del Input #3
- `KATA-SPEC.md` [GEN] modelo de aprendizaje (3-5 niveles segun N)
- `CONTENT-SPEC.md` [GEN] densidad de contenido por seccion
- `CHECKLIST.md` [GEN] quality checks across 4 gates
- `content-manifest-schema.json` [GEN] JSON Schema con N flows

### Capa 2: TEMPLATES (templates/)
- `golden-manifest.json` [GEN] manifest de referencia (source of truth)
- `section-blocks/*.json` (6+) [GEN] empezar, katas, antipatrones, cierre, glosario, ritmo
- `modal-templates/flow-modal.json` [GEN] pattern de modal body

### Capa 3: ENGINE (scripts/ - REUSE de playbook-forge)
- `compose-manifest.js` 90% template composition
- `assemble.js` manifest a HTML self-contained
- `robustify.js` spec compliance auto-fixer
- `verify-spec.js` gate validator
- `verify-content.js` density check
- `validate-manifest.js` schema check
- Ajustar: CSS prefix (--sofka- a --{slug}-), thresholds de gates, paths de tokens

## DERIVACION DE TOKENS

Del Input #1 ("Brand, #HEX"):
1. slug = nombre.toLowerCase().replace(/\s+/g, '-')
2. Compute HSL del primary_hex
3. primaryLight = HSL(h, s, min(l+15, 95))
4. primaryDark = HSL(h, s, max(l-15, 10))
5. primaryDim = rgba(r, g, b, 0.10)
6. Semanticos fijos: positive=#22C55E, warning=#F59E0B, critical=#DC2626, info=#3B82F6
7. Grays: warm-tinted hacia el hue primario
8. CSS prefix: --{slug}-primary, --{slug}-primary-light, etc.

## KATAS (segun N workflows)

| N | Niveles | Nombres |
|---|---------|---------|
| 3-5 | 3 | Aprende, Practica, Domina |
| 6-9 | 4 | Observa, Imita, Adapta, Crea |
| 10-13 | 5 | Observa, Imita, Adapta, Ensena, Crea (Shu-Ha-Ri) |

Anti-patrones: N anti-patrones (1 por workflow) + 3 cross-cutting.
Empezar cards: top min(5, N) workflows como entry points.

## QUALITY GATES (verify-spec.js)

| Gate | Checks | Blocking |
|------|--------|----------|
| G0 | sections >= N+4, modals >= N*3, body lang class, JS runtime, 0 placeholders | SI |
| G1 | flow-cards >= N, kata-cards >= niveles, callouts >= N*2, gem-links >= 3 | SI |
| G2 | bilingual balance ±5, h2 pares, modal h3 pares, lang toggle | SI |
| G3 | skip-link, role=button >= N*2, aria-label en modals, :focus-visible | SI |
| G4 | CSS custom props presentes, 0 colores hardcoded, logo renderizado | SI |
| G5 | prompt-copyable >= 1, EXITO criteria >= 1, tool descriptions auto-contenido | SI |
| G6 | 150-600KB, >= 200 pares bilingues | no (soft) |

## PLUGIN OUTPUT (file tree)

```
{slug}-playbook/
  .claude-plugin/plugin.json
  CLAUDE.md
  README.md
  agents/ (5):
    _defaults.md
    forge-orchestrator.md
    context-ingester.md
    content-strategist.md
    html-assembler.md
    playbook-reviewer.md
  commands/ (7):
    forge.md, ingest.md, preview.md, section.md, status.md, export.md, certify.md
  references/ (7):
    brand-tokens-{slug}.json
    PLAYBOOK-SPEC.md, FLOW-SPEC.md, KATA-SPEC.md, CONTENT-SPEC.md, CHECKLIST.md
    content-manifest-schema.json
  templates/ (8+):
    golden-manifest.json
    section-blocks/*.json (6+)
    modal-templates/*.json
  skills/playbook-generation/
    SKILL.md
    prompts/ (3+): intake-questions, content-generation, grounding-strategy
    scripts/ (7) [REUSE]
    snippets/ (20-47) [GEN con tokens del brand]
```

## EJECUCION

1. Validar 5 inputs
2. Generar `brand-tokens-{slug}.json`
3. Generar specs (PLAYBOOK-SPEC, FLOW-SPEC, KATA-SPEC, CONTENT-SPEC, CHECKLIST)
4. Generar templates (golden-manifest, section-blocks, modal-templates)
5. Generar snippets (adaptar de playbook-forge, reemplazar tokens)
6. Copiar y ajustar engine scripts
7. Generar agents + commands + SKILL.md + prompts
8. Generar CLAUDE.md + plugin.json + README.md
9. Verificar primer playbook con verify-spec.js
10. Entregar plugin completo

## BILINGUE

`<span class="es">...</span><span class="en">...</span>` + `body.lang-es .en{display:none!important}`

---

## VERSION CHAT-LIGHT (para pegar en chat con agente)

```
Necesito que generes un plugin completo de Claude Code para producir
playbooks HTML branded. Usa la arquitectura de playbook-forge v6.0.0
como template (3 capas: specs + templates + engine scripts, 90%
deterministico, HTML self-contained).

Mis inputs:
1. Brand: [NOMBRE], color primario [#HEX]
2. Metodologia: [NOMBRE]
3. Workflows:
   - 1. [workflow 1]
   - 2. [workflow 2]
   - ... (3 a 13 workflows)
4. Audiencia: [roles que usan los playbooks]
5. HTML referencia: [path o "ninguno"]

Genera: plugin.json, CLAUDE.md, README.md, 5 agents (orchestrator,
ingester, strategist, assembler, reviewer), 7 commands (forge, ingest,
preview, section, status, export, certify), SKILL.md con prompts,
brand-tokens derivados del color primario, 6 specs (PLAYBOOK-SPEC,
CONTENT-SPEC, FLOW-SPEC, KATA-SPEC, CHECKLIST, manifest schema),
golden-manifest.json, 6+ section-block templates, snippets HTML con
tokens del brand, y engine scripts adaptados de playbook-forge.

Adapta las katas al modelo de aprendizaje de la metodologia.
Genera N anti-patrones (1 por workflow) + 3 cross-cutting.
Soporte bilingue ES/EN con toggle.
Verifica que el primer playbook pase todos los gates antes de entregar.
```
