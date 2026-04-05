# Content Generation Prompt for Forensic Analysis Playbook Manifest

## Context

You are generating the structured content manifest for a **Sofka Technologies forensic analysis playbook**. This playbook documents the findings of a forensic, conversational, and multidimensional assessment engagement. The manifest is a complete JSON document that the HTML assembler will transform into a self-contained, executive-grade playbook. Every finding must be evidence-based and tagged with its source.

## Input

You receive a **structured brief** (JSON) containing:
- `engagement`: The engagement topic and client context
- `language`: Target language (es/en/pt)
- `stakeholders`: Roles interviewed, seniority, team structure
- `scope`: Which of the 13 dimensions are in scope
- `findings`: Key findings from discovery artifacts
- `constraints`: Timeline, budget, regulatory, or technical constraints
- `context_file`: Path to ingested discovery context (optional)

## Output

A complete JSON manifest following the playbook schema. The manifest contains all text content, structured data, and metadata needed to assemble the HTML. No placeholder tokens — every field must have real content.

---

## Evidence Tags

Every finding, claim, or recommendation MUST carry one evidence tag:

| Tag | Meaning | Source |
|-----|---------|--------|
| `[CODIGO]` | Observed in source code or repository | Code review, static analysis |
| `[CONFIG]` | Observed in configuration or infrastructure | IaC, cloud console, CI/CD |
| `[DOC]` | Found in existing documentation | Confluence, wikis, READMEs |
| `[ENTREVISTA]` | Stated by a stakeholder in interview/workshop | Conversational analysis |
| `[INFERENCIA]` | Derived from cross-referencing multiple sources | Multidimensional synthesis |
| `[SUPUESTO]` | Assumed — requires validation | Hypothesis, not yet confirmed |

---

## Section-by-Section Generation Guide

### S1 — Contexto del Engagement

Generate the opening section that frames the engagement:

- **Client Overview**: Organization name, industry, team size, engagement duration.
- **Engagement Scope**: Which dimensions were assessed and why.
- **Methodology**: Brief description of the 3-layer forensic approach (forensic + conversational + multidimensional).
- **Stakeholders Interviewed**: Table of name/role/dimension coverage. If no names provided, use role-based placeholders.
- **Constraints & Assumptions**: Known limitations, access restrictions, timeline boundaries.

### S2 — Executive Summary

Generate a high-level synthesis for C-level readers:

- **Maturity Snapshot**: Overall maturity score (1-5) across all assessed dimensions, visualized as a radar chart data structure.
- **Top 5 Findings**: The most critical findings across all dimensions, each with severity (Critical/High/Medium/Low), dimension, and 1-sentence summary.
- **Risk Heat Map**: 4-6 risks plotted by probability and impact.
- **Key Recommendation**: The single most impactful action to take first.
- **Estimated Investment**: FTE-months (NEVER prices) with disclaimer.

### S3 — Dimension Analysis Cards

Generate a dimension card for each assessed dimension. Each card includes:
- Dimension name and icon reference
- Maturity score (1-5) with justification
- Current state (AS-IS) summary (2-3 sentences)
- Key strengths found (2-3 items)
- Key gaps found (2-3 items)
- Evidence sources used (which tags)
- Priority level (Critical/High/Medium/Low)

### S4 — Hallazgos Detallados (Detailed Findings)

For each dimension in scope, generate 3-6 detailed findings:

- **Finding title** (max 10 words)
- **Severity**: Critical / High / Medium / Low
- **Evidence tag**: `[CODIGO]`, `[CONFIG]`, `[DOC]`, `[ENTREVISTA]`, `[INFERENCIA]`, `[SUPUESTO]`
- **Description**: 2-4 sentences explaining what was found
- **Impact**: What happens if this is not addressed
- **Affected stakeholders**: Which roles are impacted
- **Related dimensions**: Cross-cutting connections to other dimensions

### S5 — Risk Map

Generate a prioritized risk register:

| Risk | Probability | Impact | Dimension | Mitigation |
|------|------------|--------|-----------|------------|

Include 8-12 risks derived from the findings. Each risk must reference its source finding.

### S6 — Maturity Traffic Light

Create the maturity assessment with the RADAR framework:

- **Rojo** (Maturity 1-2): Dimensions with critical gaps. 3-4 indicators per dimension.
- **Amarillo** (Maturity 3): Dimensions with partial maturity. 3-4 indicators.
- **Verde** (Maturity 4-5): Dimensions at target maturity. 3-4 indicators.

RADAR dimensions for each indicator:
- **R** (Robustez): How resilient is the current state
- **A** (Automatizacion): Degree of automation vs. manual processes
- **D** (Documentacion): Quality and currency of documentation
- **A** (Alineamiento): Alignment with business objectives
- **R** (Repetibilidad): Consistency and reproducibility

### S7 — Recommendations & Roadmap

Generate prioritized recommendations grouped by timeline:

- **Quick Wins (0-30 dias)**: 3-5 actions with immediate impact, low effort. Each with: action, owner role, dimension, expected outcome.
- **Short Term (1-3 meses)**: 4-6 medium-effort initiatives. Each with: action, dependencies, FTE-months estimate, expected outcome.
- **Medium Term (3-6 meses)**: 3-5 structural changes. Each with: action, prerequisites, FTE-months estimate, expected outcome.
- **Long Term (6-12 meses)**: 2-3 transformational initiatives. Each with: vision statement, key milestones, FTE-months estimate.

### S8 — Next Steps & Closure

Generate the closing section:
- **Immediate Actions**: 3-5 concrete actions for week 1 after delivery.
- **Validation Needed**: Items tagged `[SUPUESTO]` that require client confirmation.
- **Engagement Continuation**: Suggested follow-up services (deeper assessment, PoC, implementation).
- **Support Channels**: How to reach the Sofka team for questions.

### Dimension Deep-Dives (13 modals)

Generate 13 dimension deep-dive modals, one per analysis dimension:

1. Software Architecture (AS-IS)
2. Cloud & Infrastructure
3. Data & Analytics
4. Security & Compliance
5. DevOps & CI/CD
6. Performance & Scalability
7. UX & Accessibility
8. Organizational Readiness
9. Technical Debt
10. Integration & APIs
11. Quality Engineering
12. Business Alignment
13. Innovation & AI Readiness

Each modal includes: current state assessment, evidence collected, gap analysis, benchmark comparison (industry standard vs. observed), specific recommendations, and cross-references to related dimensions.

---

## Analysis Methodology

In every finding and recommendation, ensure the 3-layer forensic approach is explicit:
- **Forensic evidence** comes from systems: code, configs, logs, infrastructure.
- **Conversational evidence** comes from people: interviews, workshops, surveys.
- **Multidimensional synthesis** comes from cross-referencing forensic + conversational across dimensions.
- Never present an inference without citing its source evidence.

### Glossary (17 terms)

Generate 17 bilingual glossary terms covering all key concepts used in the playbook. Each term requires: id, name, subtitleEs, subtitleEn, conceptEs, conceptEn, whyEs, whyEn, exampleEs, exampleEn. Terms should cover: analysis methodology, dimension names, maturity levels, evidence tags, and assessment frameworks.

### Empezar Cards (6 navigation cards)

Generate 6 navigation cards for the `empezarCards` array:
- 5 clickable cards that link to specific dimension modals via `flowNum` (e.g., "f1", "f5")
- 1 static card with `isStatic: true` (methodology overview, no modal link)

Each card has:
- `emoji`: Relevant emoji icon
- `titleEs`/`titleEn`: Finding-oriented title (e.g., "La deuda tecnica acumulada es critica" / "Technical debt has reached critical levels")
- `descEs`/`descEn`: Description pointing to the specific dimension analysis
- `color`: CSS color variable (e.g., `var(--sofka-critical)`, `var(--sofka-orange)`)
- `flowNum`: Dimension number string for clickable cards (e.g., "f1")

### H2 Title Pattern

All section h2 titles must use the `<span>` highlight pattern for the orange-highlighted word:
- `plain_text <span>highlight</span>` or `<span>highlight</span> plain_text`
- Example: `Hallazgos <span>Criticos</span>` or `<span>Analisis</span> Multidimensional`

### Stakeholder Variants (3 objects)

Generate the `roleVariants` array with exactly 3 stakeholder perspective objects:
1. **Executive Sponsor** (`id: "executive"`): C-level view — business impact, investment, ROI
2. **Technical Lead** (`id: "technical"`): Architecture view — technical depth, implementation path
3. **Operations Lead** (`id: "operations"`): Delivery view — process, team, timeline, capacity

Each variant requires: id, nameEs, nameEn, subtitleEs, subtitleEn, conceptEs, conceptEn, flowsEs, flowsEn. Optional: calloutEs, calloutEn.

### Metric Modals (4 objects)

Generate the `metricModals` array with 4 assessment metric objects:
1. **Maturity** (`id: "madurez"`): Overall maturity score details
2. **Risk** (`id: "riesgo"`): Risk exposure quantification details
3. **Effort** (`id: "esfuerzo"`): Implementation effort (FTE-months) details
4. **Impact** (`id: "impacto"`): Expected business impact details

Each requires: id, titleEs, titleEn, subtitleEs, subtitleEn, detailEs, detailEn. Optional: evidenceEs, evidenceEn.

### Impact Modal (1 object)

Generate the `impactModal` object with an implementation progression timeline:
- `titleEs`/`titleEn`: Impact modal title
- `subtitleEs`/`subtitleEn`: Impact modal subtitle
- `weeks`: Array of 3 milestone objects:
  1. Month 1: Quick wins implemented
  2. Month 3: Short-term initiatives delivered
  3. Month 6: Structural transformation underway

Each week requires: labelEs, labelEn, descEs, descEn.

## Constraints

- **No invented metrics**: Do not fabricate specific percentages or numbers. Use ranges, qualitative indicators, or reference evidence.
- **No prices**: Use FTE-months with disclaimers. NEVER include dollar amounts or hourly rates.
- **Evidence-first**: Every claim must cite its evidence tag. No untagged assertions.
- **Consistent terminology**: Pick one name per system/tool and use it everywhere.
- **Actionable language**: Every recommendation must be executable. "Implement X" not "Consider implementing X."
- **Respectful of existing work**: Acknowledge strengths before gaps. Frame findings as opportunities, not failures.
- **Bilingual**: All content must include both ES and EN versions.
