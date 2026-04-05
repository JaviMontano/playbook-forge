# Intake Questions for Ecosystem Playbook (Jarvis P0-P13)

Use these structured questions during the **Clarify** stage when mode is `ecosystem`. Ask them sequentially. If context from `/ingest` already provides answers, pre-fill and ask the user to confirm or adjust.

---

## Q1: Playbook Identity (required)

> "Que playbook del ecosistema Jarvis necesitas?
> P0 (Sistema Archivos), P1 (LaForja), P2 (LaReu), P3 (LaVuelta), P4 (ElRepo),
> P5 (LaInfo), P6 (Deep Research), P7 (Vitaminizar), P8 (NLM Poblar),
> P9 (NLM System Prompt), P10 (Drive Gobernado), P11 (NLM Middleware),
> P12 (Gemini Explorador), P13 (Gems Centro Mando).
> Tambien necesito: nombre del BU, equipo, e iniciativa."

**What to extract:**
- P-number (P0-P13) or custom topic
- BU name (e.g., "BU2", "Operaciones LATAM")
- Team name or context
- Initiative name (e.g., "Adopcion GenAI Q2 2026")

**How this shapes the playbook:**
- Determines which gem is the protagonist
- Sets the hero title, badges, and KPIs
- Positions the playbook in the 14-PB ruta section

---

## Q2: Target Jarvis Tools (required)

> "Que herramientas del ecosistema Jarvis usa o usara el equipo?
> LaForja, LaReu, LaVuelta, ElRepo, LaInfo, NotebookLM, Gemini, Gems,
> Google Drive, Deep Research.
> Tambien incluye herramientas no-Jarvis: Jira, Confluence, Slack, Teams, etc."

**What to extract:**
- Primary Jarvis gems in use
- Supporting tools (PM, comms, docs, dev)
- 3-layer mapping: which tool at each layer (Data/Middleware/Front)

**How this shapes the playbook:**
- Maps tools to the 13 flows
- Customizes jarvis-cards with correct gem icons
- Sets the architecture-box 3-layer visualization

---

## Q3: Use Cases / Flows (required)

> "Cuales de los 13 flujos AI-native son relevantes para este equipo?
> 1. Preparar sesiones  2. Capitalizar decisiones  3. Reportar valor
> 4. Visibilizar impacto  5. Investigar con DR  6. Vitaminizar presentacion
> 7. Poblar NLM  8. System prompt NLM  9. Gobernar Drive
> 10. NLM como middleware  11. Gemini explorador  12. Gems centro mando
> 13. Crear flujo propio
> Default: todos."

**What to extract:**
- Which flows are in scope (default: all 13)
- Which flows are priority (shown first)
- Any custom flows to add

**How this shapes the playbook:**
- Determines flow-card content and modal deep-dives
- Sets empezar cards (top 5 pain-point flows)
- Adjusts the decision-matrix rows

---

## Q4: Mastery Progression (optional — has default)

> "Como quieres personalizar los 5 niveles de maestria (katas)?
> Default: KA-1 Observar, KA-2 Imitar, KA-3 Adaptar, KA-4 Ensenar, KA-5 Crear.
> Puedes ajustar tiempos, criterios de avance, o contexto del equipo."

**Default answer if skipped:**
```
KA-1 (Shu - Observar): 45 min, seguir paso a paso
KA-2 (Shu - Imitar): 30 min, reproducir sin guia
KA-3 (Ha - Adaptar): 25 min, adaptar al contexto
KA-4 (Ha - Ensenar): 20 min, ensenar a un colega
KA-5 (Ri - Crear): 15 min, crear flujo propio
```

**How this shapes the playbook:**
- Sets kata section content and gate checkpoints
- Adjusts time estimates per level
- Customizes advancement criteria

---

## Q5: Anti-patterns (optional — has default)

> "Hay anti-patrones especificos del equipo? Default: 13 anti-patrones estandar del golden reference.
> Ejemplo: 'Copiar prompts sin contexto', 'Saltar el middleware NLM', 'No gobernar Drive'."

**Default answer if skipped:** Use 13 standard anti-patterns from the golden reference.

**How this shapes the playbook:**
- Populates the anti-pattern table and modals
- Each anti-pattern gets: symptom, detection, 3 remediation steps, accountability

---

## Q6: Crosslink Position (required for ruta section)

> "Donde se ubica este playbook en el ecosistema?
> P-number ya definido en Q1. Cuales son los playbooks hermanos mas relacionados?
> Ejemplo: 'P4 ElRepo, relacionado con P2 LaReu y P5 LaInfo'."

**What to extract:**
- Current P-number (from Q1)
- 2-4 sibling playbook references
- Layer classification (foundation/data/middleware/front)

**How this shapes the playbook:**
- Marks `.ruta-card.current` in the ruta section
- Populates gem-bar with priority siblings
- Sets crosslink gem-links in flow modals

---

## Q7: Constraints (optional — has defaults)

> "Hay restricciones? Timeline, compliance, presupuesto (FTE-meses), limitaciones tecnicas."

**Default:** No specific constraints.

**How this shapes the playbook:**
- Adjusts adoption timeline realism
- Adds compliance callouts if needed
- Frames recommendations within constraints

---

## Q8: Language (optional — default: es)

> "Idioma del playbook? Default: es. Opciones: es, en, pt."

**Default:** `es`

---

## Building the Brief

```json
{
  "mode": "ecosystem",
  "playbook": {
    "id": "<Q1 P-number>",
    "gem": "<Q1 gem name>",
    "bu": "<Q1 BU>",
    "team": "<Q1 team>",
    "initiative": "<Q1 initiative>"
  },
  "language": "<Q8>",
  "tools": {
    "jarvis_gems": ["<Q2 gems>"],
    "supporting": ["<Q2 tools>"],
    "architecture": {
      "data": "<Q2 data layer>",
      "middleware": "<Q2 middleware>",
      "front": "<Q2 front>"
    }
  },
  "flows": {
    "in_scope": ["<Q3 flow numbers>"],
    "priority": ["<Q3 priority flows>"]
  },
  "katas": "<Q4 customization or 'default'>",
  "antipatterns": "<Q5 custom list or 'default'>",
  "crosslinks": {
    "current_id": "<Q6 P-number>",
    "siblings": ["<Q6 related P-numbers>"],
    "layer": "<Q6 layer>"
  },
  "constraints": {
    "timeline": "<Q7>",
    "compliance": "<Q7>",
    "budget_fte_months": "<Q7>"
  },
  "context_file": "<path to .playbook-context.json if exists>"
}
```

Pass this brief to the content generation stage (`prompts/content-generation-ecosystem.md`).
