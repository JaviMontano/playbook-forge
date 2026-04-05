# Intake Questions for Forensic Analysis Playbook

Use these structured questions during the **Clarify** stage of the playbook pipeline. Ask them sequentially. If context from `/ingest` already provides answers, pre-fill the answer and ask the user to confirm or adjust.

---

## Q1: Contexto del Engagement (required)

> "Describe el engagement: cliente, industria, alcance del assessment, y duracion.
> Ejemplo: Assessment de modernizacion para banco retail, 3 semanas, equipo de 4."

**What to extract:**
- Client name or anonymized identifier
- Industry/sector
- Engagement type (discovery, assessment, due diligence, modernization roadmap)
- Duration and team size
- Any previous engagements or context

**How this shapes the playbook:**
- Sets the hero section framing and executive summary tone
- Determines industry-specific terminology and compliance considerations
- Calibrates depth of analysis per dimension

---

## Q2: Stakeholders Entrevistados (required)

> "Quienes fueron los stakeholders entrevistados? Incluye roles y areas.
> Ejemplo: CTO, VP Engineering, Tech Lead Backend, DBA, DevOps Lead, PM Senior."

**What to extract:**
- Names and roles of interviewees (or role-only if anonymized)
- Areas/departments represented
- Seniority distribution
- Any stakeholders who were NOT available but should have been

**How this shapes the playbook:**
- Populates the stakeholder table in S1
- Determines which conversational evidence is available per dimension
- Identifies blind spots where no stakeholder input exists

---

## Q3: Dimensiones en Alcance (required)

> "Cuales de las 13 dimensiones de analisis estan en alcance?
> 1. Software Architecture  2. Cloud & Infrastructure  3. Data & Analytics
> 4. Security & Compliance  5. DevOps & CI/CD  6. Performance & Scalability
> 7. UX & Accessibility  8. Organizational Readiness  9. Technical Debt
> 10. Integration & APIs  11. Quality Engineering  12. Business Alignment
> 13. Innovation & AI Readiness
> Default: todas."

**What to extract:**
- Which dimensions were formally assessed
- Which dimensions have partial data
- Which dimensions are explicitly out of scope

**How this shapes the playbook:**
- Determines which dimension cards and deep-dive modals to generate
- Controls the radar chart data structure
- Scopes the findings and recommendations sections

---

## Q4: Hallazgos Principales (required)

> "Cuales son los 5-8 hallazgos principales del assessment? Para cada uno indica:
> severidad (Critico/Alto/Medio/Bajo), dimension, y la evidencia que lo soporta.
> Ejemplo: Critico — Arquitectura monolitica sin capacidad de escalado horizontal [CODIGO]"

**What to extract:**
- 5-8 prioritized findings with severity
- Evidence tag per finding
- Dimension mapping
- Impact description
- Any cross-cutting findings that span multiple dimensions

**How this shapes the playbook:**
- Drives the Executive Summary top findings
- Populates the detailed findings section (S4)
- Seeds the risk map (S5)
- Informs the recommendation priorities (S7)

---

## Q5: Restricciones y Contexto (optional — has defaults)

> "Hay restricciones especificas? Regulatorias, presupuestarias, de timeline, o tecnicas.
> Ejemplo: PCI-DSS compliance requerida, presupuesto limitado a 6 FTE-meses,
> no se puede migrar de Oracle a corto plazo."

**Default answer if skipped:**
```
No specific regulatory constraints identified.
Timeline: Standard 6-12 month roadmap.
Budget: To be determined by client.
```

**What to extract:**
- Regulatory/compliance requirements (GDPR, PCI-DSS, SOX, HIPAA)
- Budget constraints (in FTE-months, NEVER in prices)
- Timeline constraints (hard deadlines, release windows)
- Technical constraints (locked vendors, legacy dependencies, team skills)

**How this shapes the playbook:**
- Gates the recommendations — nothing impossible gets recommended
- Adjusts the roadmap timeline to respect constraints
- Adds compliance considerations to relevant dimension analyses
- Flags constraint-driven risks in the risk map

---

## Q6: Idioma (optional — default: es)

> "En que idioma debe estar el playbook? Default: espanol (es).
> Opciones: es (espanol), en (english), pt (portugues)."

**Default answer if skipped:** `es` (espanol)

**How this shapes the playbook:**
- All section titles, body text, and UI labels in the chosen language
- Bilingual content always generated (primary + secondary language)
- Date formats adapted

---

## Building the Brief

After collecting answers, assemble the structured brief:

```json
{
  "engagement": {
    "topic": "<from /forge argument>",
    "client": "<Q1 client>",
    "industry": "<Q1 industry>",
    "type": "<Q1 engagement type>",
    "duration": "<Q1 duration>",
    "team_size": "<Q1 team>"
  },
  "language": "<Q6 answer>",
  "stakeholders": [
    { "name": "<Q2>", "role": "<Q2>", "area": "<Q2>" }
  ],
  "scope": {
    "dimensions_in_scope": ["<Q3 list>"],
    "dimensions_partial": ["<Q3 partial>"],
    "dimensions_excluded": ["<Q3 excluded>"]
  },
  "findings": [
    {
      "title": "<Q4>",
      "severity": "<Q4>",
      "dimension": "<Q4>",
      "evidence_tag": "<Q4>",
      "description": "<Q4>"
    }
  ],
  "constraints": {
    "regulatory": ["<Q5>"],
    "budget_fte_months": "<Q5>",
    "timeline": "<Q5>",
    "technical": ["<Q5>"]
  },
  "context_file": "<path to .playbook-context.json if exists>"
}
```

Pass this brief to the content generation stage (`prompts/content-generation.md`).
