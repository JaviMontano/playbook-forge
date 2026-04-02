# Intake Questions for Playbook Generation

Use these structured questions during the **Clarify** stage of the playbook pipeline. Ask them sequentially. If context from `/ingest` already provides answers, pre-fill the answer and ask the user to confirm or adjust.

---

## Q1: Audiencia y Roles (required)

> "Para quienes es este playbook? Describe los roles principales que lo usaran.
> Ejemplo: Project Managers, QA Leads, Scrum Masters, Product Owners, Developers."

**What to extract:**
- Primary audience (the main users of the playbook)
- Secondary audience (stakeholders who will see it but not execute daily)
- Seniority level (junior, mid, senior, mixed)
- Team size estimate (small <10, medium 10-50, large 50+)

**How this shapes the playbook:**
- Determines the complexity of language and terminology
- Selects which of the 13 flows are most relevant per role
- Adapts katas to realistic scenarios for those roles
- Sets the tone (tactical for ICs, strategic for leads)

---

## Q2: Herramientas y Plataformas (required)

> "Que herramientas usa el equipo actualmente? Incluye herramientas de gestion, comunicacion, documentacion y desarrollo.
> Ejemplo: Jira, Confluence, Google Drive, Slack, Teams, GitHub, Figma."

**What to extract:**
- Project management tool (Jira, Azure DevOps, Asana, Monday, Trello)
- Communication tool (Slack, Teams, Discord)
- Documentation tool (Confluence, Notion, Google Docs, SharePoint)
- Storage tool (Google Drive, OneDrive, SharePoint, Dropbox)
- Development tools (GitHub, GitLab, Bitbucket)
- Design tools (Figma, Miro, FigJam)
- AI tools already in use (ChatGPT, Gemini, Copilot, Claude)

**How this shapes the playbook:**
- Maps each tool into the 3-layer architecture (Data/Middleware/Front)
- Customizes all 13 flows to reference the user's actual tools
- Adapts katas to use their specific platform
- Builds the decision tree with their tool ecosystem

---

## Q3: Top Problemas (required)

> "Cuales son los 3-4 problemas principales que este playbook debe resolver?
> Ejemplo: reuniones sin capitalizacion, reportes manuales que toman horas, valor invisible del equipo, informacion dispersa en multiples herramientas."

**What to extract:**
- 3-4 concrete problems (not vague "improve productivity")
- Who is affected by each problem (which role)
- Current impact (time wasted, quality issues, visibility gaps)
- Any failed attempts to solve these problems before

**How this shapes the playbook:**
- Defines the S1 Oportunidad section (the 4 problems)
- Determines priority ordering of flows and katas
- Sets the value traffic light metrics (S6 Semaforo)
- Frames the adoption timeline around solving these specific problems

---

## Q4: Centralizacion de Informacion (optional — has default)

> "Donde centraliza el equipo su informacion hoy? Si no hay una estrategia clara, usaremos el stack por defecto: Google Drive (datos) + NotebookLM (middleware anti-alucinacion) + Gemini (front de exploracion).
> Si usan otro stack, describelo."

**Default answer if skipped:**
```
Data Layer: Google Drive con carpetas gobernadas
Middleware: NotebookLM (anti-alucinacion, solo responde con tus fuentes)
Front: Gemini + Gems (exploracion, mando central)
```

**What to extract:**
- Current data centralization (or lack thereof)
- Whether they already use any AI middleware
- Preferred AI front-end (Gemini, ChatGPT, Claude, Copilot)
- Any compliance or security constraints on tool choice

**How this shapes the playbook:**
- Defines the grounding architecture across all 13 flows
- Adapts the middleware layer (NLM vs. custom RAG vs. Copilot)
- Sets the front layer (Gemini vs. ChatGPT vs. Claude)
- Ensures all flows reference a consistent, grounded stack

---

## Q5: Idioma (optional — default: es)

> "En que idioma debe estar el playbook? Default: espanol (es).
> Opciones: es (espanol), en (english), pt (portugues)."

**Default answer if skipped:** `es` (espanol)

**How this shapes the playbook:**
- All section titles, body text, and UI labels in the chosen language
- Kata instructions and flow descriptions localized
- Date formats adapted (DD/MM/YYYY for es/pt, MM/DD/YYYY for en)

---

## Building the Brief

After collecting answers, assemble the structured brief:

```json
{
  "topic": "<from /forge argument>",
  "language": "<Q5 answer>",
  "audience": {
    "primary_roles": ["<Q1 roles>"],
    "seniority": "<Q1 level>",
    "team_size": "<Q1 estimate>"
  },
  "tools": {
    "management": ["<Q2>"],
    "communication": ["<Q2>"],
    "documentation": ["<Q2>"],
    "storage": ["<Q2>"],
    "development": ["<Q2>"],
    "ai": ["<Q2>"]
  },
  "problems": ["<Q3 list>"],
  "grounding": {
    "data_layer": "<Q4>",
    "middleware": "<Q4>",
    "front": "<Q4>"
  },
  "context_file": "<path to .playbook-context.json if exists>"
}
```

Pass this brief to the content generation stage (`prompts/content-generation.md`).
