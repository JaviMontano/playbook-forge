# Content Generation Router

This file routes to the mode-specific content generation prompt based on the mode detected during INTAKE.

## Mode Routing

- **ElRepo mode**: Read `content-generation-elrepo.md`
- **Ecosystem mode**: Read `content-generation-ecosystem.md`
- **Forensic mode**: Read `content-generation-forensic.md`

## Files

| Mode | File | Sections | Skeleton |
|------|------|----------|----------|
| ElRepo | `content-generation-elrepo.md` | 9 sections (preamble, ledger, facts, readings, vraid, semaphore, gaps, questions, route) | `elrepo-head.html` + `elrepo-radar.html` or `elrepo-analyst-report.html` |
| Ecosystem | `content-generation-ecosystem.md` | 14 sections (hero, contexto, ciclo, flujos, katas, semaforo, antipatrones, decision-matrix, glosario, empezar, ruta, ritmo, cierre) | `head.html` + standard snippets |
| Forensic | `content-generation-forensic.md` | 8 sections (contexto, executive-summary, dimensions, findings, risk-map, maturity, recommendations, next-steps) | `head.html` + forensic snippets |
