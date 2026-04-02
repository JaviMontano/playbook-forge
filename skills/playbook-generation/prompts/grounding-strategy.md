# Grounding Strategy: 3-Layer Information Architecture

## Purpose

This prompt defines the default data centralization strategy that every playbook promotes. The 3-layer architecture is the backbone of all 13 AI-native flows — it ensures that AI operates on verified, governed data instead of hallucinating from thin air.

---

## The 3-Layer Architecture

### Capa de Datos (Data Layer)

**Default**: Google Drive con unidades gobernadas por seguridad de la informacion.

**Naming convention**: `[CLIENTE]/[PROYECTO]/[TIPO]`

**Standard document types (TIPO)**:
- `Minutas` — Meeting notes, decisions, action items
- `Reportes` — Status reports, metrics, dashboards
- `Decisiones` — Decision logs, ADRs, trade-off matrices
- `OKRs` — Objectives, key results, progress tracking
- `Contratos` — SOWs, agreements, SLAs

**Governance rules**:
- Every document has an owner and a review date.
- Folder structure mirrors the organizational hierarchy.
- Access is role-based: project team = edit, stakeholders = view.
- No orphan files — every document lives in a governed folder.
- Naming includes date and version: `[TIPO]-[Descripcion]-[YYYYMMDD]-v[N]`

**Why it matters**: Without a governed data layer, the AI consumes fragmented, outdated, or contradictory information. Garbage in, garbage out — but with citations.

### Middleware

**Default**: NotebookLM.

**Core principle**: Anti-alucinacion. NotebookLM only answers based on the sources you provide. It does not invent data, does not access the internet, and always cites where each answer comes from.

**Key capabilities**:
- Upload Drive documents directly as sources.
- Generate content grounded exclusively in your data: summaries, FAQs, study guides, audio overviews.
- Produce graphic content: infographics, presentation decks, audio briefings.
- Connect the Data Layer with the AI Front without risk of inventing data.

**Usage pattern**:
1. Create a notebook per project or topic.
2. Add governed documents from the Data Layer as sources.
3. Ask questions — every answer includes source citations.
4. Generate derivative content (reports, summaries, briefings) from verified data.

**Why it matters**: The middleware is the trust boundary. Everything that passes through it is traceable and verifiable. Skip it, and you lose the ability to audit AI outputs.

### Front

**Default**: Gemini + Gems.

**Core principle**: Espacio de exploracion y experimentacion, grounded by the middleware layer.

**Key capabilities**:
- **Gemini**: General-purpose AI for exploration, brainstorming, drafting, and analysis.
- **Gems**: Custom AI agents that become the team's command center. A Gem can invoke notebooks, resolve specific workflow types, and build custom workflows on demand.

**Usage pattern**:
1. Create Gems per workflow domain (Project Management Gem, QA Gem, Reporting Gem).
2. Each Gem knows which NotebookLM notebooks to reference.
3. Team members interact with Gems for daily tasks — the Gem handles the middleware call.
4. Exploration happens in open Gemini; execution happens through purpose-built Gems.

**Why it matters**: The front layer is where productivity happens. But without grounding through the middleware, it is just a fancy autocomplete.

---

## Adaptaciones por Stack

The 3-layer architecture adapts to whatever tools the team actually uses. The principle stays constant — only the implementations change.

### Si Confluence (Atlassian stack)

- **Data Layer**: Confluence spaces con permisos gobernados. Naming: `[SPACE]/[PROJECT]/[TYPE]`. Use page labels for document classification.
- **Middleware**: NotebookLM (export Confluence pages as PDF sources) or Atlassian Intelligence with Rovo.
- **Front**: Gemini + Gems, or Atlassian Rovo agents.

### Si SharePoint (Microsoft stack)

- **Data Layer**: SharePoint document libraries con metadata columns y vistas. Naming: `[Site]/[Library]/[Folder]`. Use content types for governance.
- **Middleware**: NotebookLM (export as PDF) or Microsoft Copilot with Graph grounding.
- **Front**: Microsoft Copilot (M365) or Gemini + Gems.

### Si Notion

- **Data Layer**: Notion databases con properties tipadas (select, relation, formula). Use database views as governance layers.
- **Middleware**: NotebookLM (export as PDF/Markdown) or Notion AI with workspace grounding.
- **Front**: Notion AI for in-context queries, Gemini + Gems for cross-domain exploration.

### Si Custom RAG

- **Data Layer**: Same governance principles, any storage backend (S3, GCS, database).
- **Middleware**: Custom RAG pipeline (LangChain, LlamaIndex, Vertex AI Search, etc.) with citation tracking and source attribution.
- **Front**: Custom chat interface or standard LLM front-end with RAG integration.

### Si ChatGPT / Claude (en lugar de Gemini)

- **Data Layer**: Same — governance is tool-agnostic.
- **Middleware**: Same — NotebookLM or custom RAG.
- **Front**: ChatGPT Custom GPTs (with file upload for grounding) or Claude Projects (with project knowledge base). The key is that the front-end must reference middleware outputs, not raw data.

---

## Why This Matters

Sin centralizacion, la IA trabaja con informacion fragmentada. Cada miembro del equipo alimenta la IA con su version parcial de la realidad — diferentes versiones de documentos, notas sueltas, memoria selectiva.

Con grounding:
- Cada flujo AI-native opera sobre datos verificados.
- Cada respuesta incluye citas rastreables a documentos gobernados.
- No hay alucinacion porque el middleware solo responde con lo que tiene.
- El equipo construye confianza incremental en la IA porque puede auditar cada output.

La arquitectura de 3 capas no es una preferencia tecnica — es la diferencia entre "usamos IA" y "la IA nos hace mejores."
