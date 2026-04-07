# Intake Questions for ElRepo Mode (Jarvis ElRepo Artifacts)

Use these structured questions during the **Clarify** stage when mode is `elrepo`. Ask them sequentially. If context from `/ingest` already provides answers, pre-fill and ask the user to confirm.

---

## Q1: Evidence Type (required)

> "Que tipo de evidencia operativa necesitas analizar?
> weekly (status semanal), sprint (cierre de sprint), plan (plan o comite),
> okr (revision OKR), auto (dejar que Jarvis lo infiera del contenido)."

**What to extract:**
- Reporting context type: `weekly`, `sprint`, `plan`, `okr`, `auto`
- Optional subtype (e.g., `sprint-close`, `sprint-review`, `plan-steering`)

**How this shapes the output:**
- Determines VR-AID emphasis (weekly = balanced, sprint = achieved vs pending, plan = budget/timeline, okr = KR evidence)
- Sets the control preamble `Contexto inferido` chip
- Adjusts confidence calibration

---

## Q2: Sources Available (required)

> "Que fuentes tienes? Jira, Confluence, Sheets, PDFs, DOCX, screenshots,
> minutas de reunion, tableros, reportes previos.
> Describe brevemente que contiene cada fuente."

**What to extract:**
- Source list with type and content description
- Access state per source: `legible`, `parcial`, `no accesible`
- Which source is the primary operational signal

**How this shapes the output:**
- Populates the `Inventario de referencias` table
- Sets `Cobertura de acceso: x/y fuentes legibles`
- Determines confidence floor
- Identifies critical gaps for `Preguntas Clave`

---

## Q3: Target Artifact (required)

> "Que artefacto necesitas?
> repo-doc (analisis completo + Draft VR-AID — default),
> analyst-report (trazabilidad maxima),
> radar (diagrama ejecutivo: exec, avance, o riesgo),
> html-brand (migracion de texto existente a HTML branded)."

**What to extract:**
- Primary artifact: `repo-doc` (default), `analyst-report`, `radar`, `html-brand`
- Radar variant if applicable: `exec`, `avance`, `riesgo`
- Whether HTML export is needed after the primary artifact

**How this shapes the output:**
- Selects the HTML skeleton: `elrepo-radar.html` or `elrepo-analyst-report.html`
- Determines section structure (Radar has 9 data-jer sections, Analyst Report has 8 data-jer-report sections)
- Sets VR-AID depth (Repo-Doc = Draft, Analyst Report = full trace)

---

## Q4: Audience (optional — default: equipo)

> "Para quien es este reporte?
> equipo (detalle operativo), gerencia (sintesis ejecutiva),
> steering/comite (decisiones y escalaciones), cliente (anonimizado)."

**Default:** `equipo`

**How this shapes the output:**
- `equipo`: full detail, all evidence lanes, technical language
- `gerencia`: executive synthesis, VR-AID emphasis, compact
- `steering`: decisions + escalations + dependencies focus
- `cliente`: anonymized names, external-safe language

---

## Q5: Language (optional — default: es)

> "Idioma? Default: es. Opciones: es, en."

**Default:** `es`

---

## Building the Brief

```json
{
  "mode": "elrepo",
  "evidence": {
    "type": "<Q1 type>",
    "subtype": "<Q1 subtype or null>"
  },
  "sources": [
    {
      "name": "<Q2 source>",
      "tipo": "<reporting|foreign_pack|attachment|web>",
      "estado": "<legible|parcial|no accesible>",
      "uso": "<base|support|contrast|pending>",
      "description": "<Q2 content description>"
    }
  ],
  "artifact": {
    "primary": "<Q3 artifact>",
    "radar_variant": "<Q3 radar variant or null>",
    "html_export": "<Q3 boolean>"
  },
  "audience": "<Q4>",
  "language": "<Q5>",
  "context_file": "<path to .playbook-context.json if exists>"
}
```

Pass this brief to the content generation stage (`prompts/content-generation-elrepo.md`).
