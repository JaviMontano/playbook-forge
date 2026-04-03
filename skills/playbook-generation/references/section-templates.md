# Section Templates -- V3 Playbook (12 Sections)

> Knowledge base for playbook-forge agents (v3.0.0).
> Documents the composition of each section in the v3 Sofka playbook reference.
> V3 adds: bilingual content, 69 modals, 5 katas (Shu-Ha-Ri), 13 anti-patterns, glossary, manager profiles, empezar onboarding, role variants, metric modals, impact modal.

---

## V3 Sections (12 total, 5 groups)

### Group 1: Foundation
- S1: Glosario (id="glosario") -- glossary-grid + glossary modals (15 terms)
- S2: Perfil PM (id="agile-pm") -- apm-equation + profile-section (3 levels) + gem-bar

### Group 2: 13 Flows
- S3: Mapa de Flujos (id="flujos") -- map-table (13 flows, clickable rows -> modals) + katas table
- S4: Nucleo F1-F4 (id="nucleo") -- flow-cards (4, clickable) + timeline + DoD table
- S5: Investigacion F5-F6 (id="investigacion") -- flow-cards (2) + callouts
- S6: Infraestructura F7-F10 (id="infra") -- flow-cards (4) + architecture-box (3 layers)
- S7: Avanzado F11-F13 (id="avanzado") -- flow-cards (3) + gem-bar

### Group 3: Learning
- S8: Katas (id="katas") -- 5 kata cards (Shu-Ha-Ri) + kata x flow matrix + learning traps callouts

### Group 4: Governance
- S9: Anti-patrones (id="antipatrones") -- antipattern-table (13 rows, clickable) + callouts
- S10: Tu Ritmo (id="ritmo") -- timeline (adoption) + vraid-box + metrics-row + acceptance-list

### Group 5: Onboarding
- S11: Empezar (id="empezar") -- empezar-grid (6 empathy cards: 5 clickable + 1 static tip)
- S12: Cierre (id="cierre") -- case-highlight + testimonial-grid + callout (acknowledgments) + decision-table (metadata)

---

## Section Details

### S1: Glosario (id="glosario")

**Purpose**: Bilingual glossary with 15+ interactive term cards that open detail modals.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **glossary-grid**: 15+ clickable term cards
   - Each card: name, subtitleEs/En, onclick -> modal with conceptEs/En, whyEs/En, exampleEs/En
3. **glossary modals**: 15 modal overlays (one per term)

---

### S2: Perfil PM (id="agile-pm")

**Purpose**: Define the Agile PM equation, 3 manager maturity levels, and gem bar.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **apm-equation**: Visual equation block
3. **profile-section**: 3 manager profile cards
   - Novato (Shu): nameEs/En, descEs/En, characteristics
   - Practicante (Ha): nameEs/En, descEs/En, characteristics
   - Autonomo (Ri): nameEs/En, descEs/En, characteristics
4. **gem-bar**: Links to relevant gems

---

### S3: Mapa de Flujos (id="flujos")

**Purpose**: Complete 13-flow reference table with clickable rows opening flow modals.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **map-table**: 13-flow reference table (clickable rows -> modals)
   - Color-coded by tier: core, research, architecture, mastery
3. **katas table**: Summary of 5 katas mapped to flows
4. **flow modals**: 13 modal overlays with deep-dive content

---

### S4: Nucleo F1-F4 (id="nucleo")

**Purpose**: Core workflow cards with timeline and Definition of Done.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **flow-cards**: 4 clickable cards (F1-F4) with onclick modal triggers
3. **timeline**: Adoption timeline items
4. **decision-table**: DoD (Definition of Done) table

---

### S5: Investigacion F5-F6 (id="investigacion")

**Purpose**: Research flows with Deep Research and Vitaminize.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **flow-cards**: 2 clickable cards (F5-F6)
3. **callouts**: Research methodology guidance

---

### S6: Infraestructura F7-F10 (id="infra")

**Purpose**: Infrastructure and architecture layer flows.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **flow-cards**: 4 clickable cards (F7-F10)
3. **architecture-box**: 3-layer architecture visualization (vraid-letter)

---

### S7: Avanzado F11-F13 (id="avanzado")

**Purpose**: Mastery-level flows for custom workflows.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **flow-cards**: 3 clickable cards (F11-F13)
3. **gem-bar**: Links to mastery gems

---

### S8: Katas (id="katas")

**Purpose**: 5 progressive katas with Shu-Ha-Ri badges and activation matrix.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **kata-cards**: 5 kata cards with Shu-Ha-Ri level badges
   - KA-1 Observar (Shu), KA-2 Imitar (Shu), KA-3 Adaptar (Ha), KA-4 Ensenar (Ri), KA-5 Crear (Ri)
3. **kata x flow matrix**: Activation matrix showing which flows activate at each kata level
4. **learning traps callouts**: Common pitfalls and how to avoid them
5. **kata modals**: 5 modal overlays with detailed exercise content

---

### S9: Anti-patrones (id="antipatrones")

**Purpose**: 13 anti-patterns with clickable rows opening remediation modals.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **antipattern-table**: 13 clickable rows
   - Each row: num, nameEs/En, subtitleEs/En, symptomEs/En
   - onclick -> modal with whyEs/En, detectEs/En, 3 remediation steps, accountabilityEs/En
3. **antipattern modals**: 13 modal overlays
4. **callouts**: Summary guidance

---

### S10: Tu Ritmo (id="ritmo")

**Purpose**: Adoption timeline, VR-AID framework, metrics, and acceptance criteria.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **timeline**: Adoption phase items
3. **vraid-box**: VR-AID breakdown (5 letters + 3x3 rule + signature test)
4. **metrics-row**: KPI metric cards
5. **acceptance-list**: Acceptance criteria

---

### S11: Empezar (id="empezar") -- Group: Onboarding

**Purpose**: Empathy-driven onboarding section with cards that link users directly to relevant flow modals based on their pain points.

**Component composition**:

1. **section-header**: Bilingual h2 with span highlight
2. **empezar-grid** (problem-grid): 6 empathy cards (5 clickable -> flow modals, 1 static tip)

**Card pattern:** Each card has:
- Emoji icon in h4
- Pain point title (bilingual)
- Description pointing to specific flow (bilingual)
- onclick -> openModal(flowNum) for the 5 clickable cards
- 1 static card with tool guidance (no onclick)

---

### S12: Cierre (id="cierre")

**Purpose**: Case study, testimonials, acknowledgments, and metadata.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **case-highlight**: Hero metric box
3. **testimonial-grid**: 3 testimonial cards
4. **callout (orange)**: Acknowledgments/credits
5. **decision-table**: Metadata table (author, version, date, etc.)

---

## Modal Inventory (69 total)

| Category | Count | Trigger |
|----------|-------|---------|
| Flow deep-dives | 13 | Flow card/row click |
| Anti-pattern details | 13 | Anti-pattern row click |
| Glossary terms | 17 | Glossary card click |
| Kata details | 5 | Kata card click |
| Decision matrix | 7 | Decision cell click |
| Learning layers | 3 | Layer card click |
| Manager profiles | 3 | Profile card click |
| Role variants | 3 | Role variant card click |
| Metric details | 4 | Metric card click |
| Impact | 1 | Impact card click |
| **Total** | **69** | |
