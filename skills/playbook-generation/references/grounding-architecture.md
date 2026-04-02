# 3-Layer Information Architecture -- Grounding Strategy

> Knowledge base for playbook-forge agents.
> Defines the data centralization strategy that underpins all 13 AI-native flows.

---

## 1. The 3-Layer Model

The architecture ensures that AI operates on verified, governed data instead of hallucinating from thin air. Every playbook must establish this foundation before the 13 flows can work reliably.

```
+-------------------+     +-------------------+     +-------------------+
|   CAPA DE DATOS   | --> |    MIDDLEWARE      | --> |      FRONT        |
|   (Data Layer)    |     |  (Trust Boundary)  |     | (Productivity)    |
+-------------------+     +-------------------+     +-------------------+
| Google Drive      |     | NotebookLM        |     | Gemini + Gems     |
| Governed units    |     | Anti-hallucination |     | Exploration       |
| Role-based access |     | Citation tracking  |     | Command center    |
+-------------------+     +-------------------+     +-------------------+
```

### Default Stack: Drive --> NotebookLM --> Gemini

This is the recommended starting stack because:
- All three tools are available with Google Workspace
- Zero additional cost for corporate accounts
- Native integration between Drive and NotebookLM
- Gems provide customizable agent layer

---

## 2. Layer 1: Capa de Datos (Data Layer)

### Default: Google Drive with Governed Units

**Purpose**: Single source of truth for all project information.

**Naming convention**: `[CLIENTE]/[PROYECTO]/[TIPO]`

**Standard document types (TIPO)**:

| Type | Content | Example |
|------|---------|---------|
| `Minutas` | Meeting notes, decisions, action items | `ACME/ERP-Migration/Minutas` |
| `Reportes` | Status reports, metrics, dashboards | `ACME/ERP-Migration/Reportes` |
| `Decisiones` | Decision logs, ADRs, trade-off matrices | `ACME/ERP-Migration/Decisiones` |
| `OKRs` | Objectives, key results, progress tracking | `ACME/ERP-Migration/OKRs` |
| `Contratos` | SOWs, agreements, SLAs | `ACME/ERP-Migration/Contratos` |

**File naming includes date and version**: `[TIPO]-[Descripcion]-[YYYYMMDD]-v[N]`

Example: `Minutas-Kickoff-Planning-20260315-v1`

**Governance rules**:
1. Every document has an owner and a review date
2. Folder structure mirrors the organizational hierarchy
3. Access is role-based: project team = edit, stakeholders = view
4. No orphan files -- every document lives in a governed folder

**Why it matters**: Without a governed data layer, the AI consumes fragmented, outdated, or contradictory information. The garbage-in-garbage-out problem is amplified by AI because it processes bad data confidently and cites it authoritatively.

---

## 3. Layer 2: Middleware (Trust Boundary)

### Default: NotebookLM

**Purpose**: Anti-hallucination layer. NotebookLM only answers based on the sources you provide. It does not invent data, does not access the internet, and always cites where each answer comes from.

**Core capabilities**:
- Upload Drive documents directly as sources
- Generate content grounded exclusively in your data: summaries, FAQs, study guides, audio overviews
- Produce graphic content: infographics, presentation decks, audio briefings
- Connect the Data Layer with the AI Front without risk of inventing data

**Setup pattern**:

1. **Create a notebook per project or topic**
   - Naming: `[CLIENT]-[PROJECT]-[Domain]`
   - Example: `ACME-ERP-Technical`, `ACME-ERP-Management`

2. **Add governed documents from the Data Layer as sources**
   - Only upload from governed Drive folders
   - Verify document freshness before upload

3. **Ask questions -- every answer includes source citations**
   - Citations are traceable to specific documents and pages
   - If NLM cannot answer, it says so (does not fabricate)

4. **Generate derivative content from verified data**
   - Reports, summaries, briefings, FAQ documents
   - All outputs include citation chains

**Why it matters**: The middleware is the trust boundary. Everything that passes through it is traceable and verifiable. Skip it, and you lose the ability to audit AI outputs.

### NotebookLM Setup Guide

**Step 1: Create notebooks**

Create one notebook per project domain:
- `[Client]-[Project]-Operational` -- for daily management
- `[Client]-[Project]-Technical` -- for architecture and technical decisions
- `[Client]-[Project]-Commercial` -- for SOWs, pricing, negotiations

**Step 2: Populate with governed sources**

What to load:
- Meeting minutes from the last 4 weeks
- Current status reports
- Active decision logs
- OKR documents
- SOW / contract summaries

What NOT to load:
- Personal notes or drafts
- Sensitive credentials or passwords
- Documents from other projects (cross-contamination)
- Outdated versions (only load latest)

**Step 3: Configure system prompt (Flow 8)**

Use the Notes feature in NotebookLM to set behavior:
```
You are the operational memory for [PROJECT].
Answer ONLY from the uploaded sources.
Always cite the source document and page.
If you don't have information, say "No tengo datos sobre esto."
Format responses as: Finding + Source + Recommendation.
```

**Step 4: Test with known-answer questions**

Before relying on the notebook, test with questions whose answers you already know. Verify the citations are correct and the answers are accurate.

---

## 4. Layer 3: Front (Productivity Layer)

### Default: Gemini + Gems

**Purpose**: Exploration and experimentation space, grounded by the middleware layer.

**Gemini (general)**: General-purpose AI for exploration, brainstorming, drafting, and analysis. This is where team members go for open-ended questions and creative work.

**Gems (specialized)**: Custom AI agents that become the team's command center. A Gem can invoke notebooks, resolve specific workflow types, and build custom workflows on demand.

**Gem setup pattern**:

1. Create Gems per workflow domain (Project Management Gem, QA Gem, Reporting Gem)
2. Each Gem knows which NotebookLM notebooks to reference
3. Team members interact with Gems for daily tasks -- the Gem handles the middleware call
4. Exploration happens in open Gemini; execution happens through purpose-built Gems

### Gemini Gems as Command Center

The 5 default Jarvis Gems form the command center:

| Gem | Domain | Primary Flow |
|-----|--------|-------------|
| LaForja | Prompt generation, meeting prep | Flow 1, 5 |
| LaReu | Meeting analysis, forensics | Flow 1 |
| LaVuelta | Decision capitalization, Quad-Doc | Flow 2 |
| ElRepo | Evidence-based reporting, VR-AID | Flow 3 |
| LaInfo | HTML infographic generation | Flow 4 |

**Creating new Gems (Flow 12)**:
- Only after mastering flows 1-11
- Each new Gem should have a clear domain and NotebookLM reference
- Name convention: descriptive, team-recognizable

**Why it matters**: The front layer is where productivity happens. But without grounding through the middleware, it is just a fancy autocomplete.

---

## 5. Stack Adaptations

The 3-layer architecture adapts to whatever tools the team actually uses. The principle stays constant -- only the implementations change.

### Confluence (Atlassian Stack)

| Layer | Tool | Adaptation Notes |
|-------|------|-----------------|
| Data | Confluence spaces | Governed permissions per space. Naming: `[SPACE]/[PROJECT]/[TYPE]`. Use page labels for classification. |
| Middleware | NotebookLM (export as PDF) or Atlassian Rovo | Export Confluence pages as PDF sources for NLM. Rovo provides native AI grounding. |
| Front | Gemini + Gems or Rovo agents | Rovo agents can replace Gems for Atlassian-native teams. |

### SharePoint (Microsoft Stack)

| Layer | Tool | Adaptation Notes |
|-------|------|-----------------|
| Data | SharePoint document libraries | Metadata columns + views. Naming: `[Site]/[Library]/[Folder]`. Use content types for governance. |
| Middleware | NotebookLM (export as PDF) or Microsoft Copilot | Copilot with Graph grounding provides native Microsoft integration. |
| Front | Microsoft Copilot (M365) or Gemini + Gems | Copilot for in-context, Gemini for cross-domain exploration. |

### Notion

| Layer | Tool | Adaptation Notes |
|-------|------|-----------------|
| Data | Notion databases | Typed properties (select, relation, formula). Use database views as governance layers. |
| Middleware | NotebookLM (export as PDF/Markdown) or Notion AI | Notion AI provides workspace grounding for in-context queries. |
| Front | Notion AI or Gemini + Gems | Notion AI for in-context, Gemini for cross-domain. |

### Custom RAG Pipeline

| Layer | Tool | Adaptation Notes |
|-------|------|-----------------|
| Data | Any storage (S3, GCS, database) | Same governance principles apply regardless of backend. |
| Middleware | LangChain, LlamaIndex, Vertex AI Search, etc. | Must include citation tracking and source attribution. |
| Front | Custom chat interface or standard LLM | Must reference middleware outputs, not raw data. |

### ChatGPT / Claude (instead of Gemini)

| Layer | Tool | Adaptation Notes |
|-------|------|-----------------|
| Data | Same (tool-agnostic) | Governance is independent of the AI front. |
| Middleware | Same (NotebookLM or custom RAG) | Trust boundary remains. |
| Front | ChatGPT Custom GPTs or Claude Projects | GPTs with file upload; Claude with project knowledge base. Key: front must reference middleware outputs. |

---

## 6. Connection to the 13 Flows

### Flows by Architecture Dependency

**Flows 1-4 (Core)**: Stack-agnostic. These use AI agents directly and work with any front-end tool. The only requirement is that input data comes from governed sources.

**Flows 5-6 (Research)**: Partially architecture-dependent. Deep Research (Flow 5) requires Gemini. Vitaminize (Flow 6) requires NotebookLM for grounding.

**Flows 7-8 (NotebookLM Setup)**: Architecture-dependent. These are specifically about setting up the middleware layer.
- Flow 7: Populate NotebookLM -- adapts to whichever middleware tool is selected
- Flow 8: Configure system prompt -- adapts based on middleware capabilities

**Flows 9-11 (Architecture)**: Fully architecture-dependent. These define and implement the 3-layer model itself.
- Flow 9: Govern Drive -- adapts to any data layer
- Flow 10: NLM as middleware -- adapts to any middleware
- Flow 11: Gemini as front -- adapts to any front-end

**Flows 12-13 (Mastery)**: Architecture-dependent. Building custom Gems/agents requires understanding the full stack.
- Flow 12: Gems as command center -- adapts to equivalent agent-building tools
- Flow 13: Create own flow -- uses the full stack

### Adaptation Matrix

| Flow | Drive Required? | NLM Required? | Gemini Required? | Adaptable? |
|------|----------------|---------------|------------------|-----------|
| 1-4 | No | No | No | Fully |
| 5 | No | No | Yes (Deep Research) | Partially |
| 6 | No | Yes | No | Partially |
| 7 | Yes (or equivalent) | Yes | No | Yes (swap tools) |
| 8 | No | Yes | No | Yes (swap middleware) |
| 9 | Yes (or equivalent) | No | No | Yes (swap data layer) |
| 10 | No | Yes (or equivalent) | No | Yes (swap middleware) |
| 11 | No | No | Yes (or equivalent) | Yes (swap front) |
| 12-13 | No | Yes (recommended) | Yes (or equivalent) | Yes (swap front) |

---

## 7. Drive Unit Naming Conventions

### Folder Hierarchy

```
[CLIENTE]/
  [PROYECTO]/
    Minutas/
      Minutas-[Descripcion]-[YYYYMMDD]-v[N].gdoc
    Reportes/
      Reportes-[Descripcion]-[YYYYMMDD]-v[N].gdoc
    Decisiones/
      Decisiones-[Descripcion]-[YYYYMMDD]-v[N].gdoc
    OKRs/
      OKRs-[Periodo]-[YYYYMMDD]-v[N].gdoc
    Contratos/
      Contratos-[Descripcion]-[YYYYMMDD]-v[N].gdoc
```

### Naming Rules

| Rule | Example |
|------|---------|
| Client name = official legal name or agreed short code | `ACME`, `DeUna`, `BancoX` |
| Project name = official project code | `ERP-Migration`, `Scale-Up-2026` |
| Type = one of the 5 standard types | `Minutas`, `Reportes`, `Decisiones`, `OKRs`, `Contratos` |
| Date = ISO format | `20260315` |
| Version = incremental integer | `v1`, `v2`, `v3` |
| No spaces in folder names | Use hyphens: `ERP-Migration` |
| Description = brief, lowercase | `kickoff-planning`, `sprint-review-w12` |

---

## 8. Why Grounding Matters

Without centralization, AI operates on fragmented information. Each team member feeds the AI their partial version of reality -- different document versions, loose notes, selective memory.

With grounding:
- Every AI-native flow operates on verified data
- Every response includes citations traceable to governed documents
- There is no hallucination because the middleware only responds with what it has
- The team builds incremental trust in AI because they can audit every output

The 3-layer architecture is not a technical preference -- it is the operational difference between an organization that claims it uses AI and one where AI actually delivers measurable value.

---

## 9. Playbook Integration Checklist

When generating a playbook, verify these grounding elements are present:

- [ ] Section S12 includes the 3-layer architecture box (vraid-box variant with info-blue theme)
- [ ] The 13-flow map table has background color coding for the 4 tiers
- [ ] Flows 7-8 detail NotebookLM setup (or middleware equivalent)
- [ ] Flows 9-11 detail each architecture layer
- [ ] Flow 13 references all three layers
- [ ] Drive naming convention is documented (or equivalent for the client's stack)
- [ ] NotebookLM setup guide is included (or middleware equivalent)
- [ ] Stack adaptation section addresses the client's actual tools
- [ ] Anti-pattern table includes "skipping the middleware" as an anti-pattern
- [ ] Checkpoint gates reference grounded data as evidence requirement
