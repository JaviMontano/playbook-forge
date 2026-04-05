# Intake Questions Router

This file routes to the mode-specific intake questions based on the mode detected during INTAKE.

## Mode Routing

- **Ecosystem mode** (P0-P13 / Jarvis / gems): Read `intake-questions-ecosystem.md`
- **Forensic mode** (assessment / discovery): Read `intake-questions-forensic.md`

The mode is determined by the forge-orchestrator during INTAKE based on:
1. Explicit `--mode=ecosystem|forensic` flag in the user command
2. Auto-detection from topic keywords (see SKILL.md for heuristic)
3. Default: ecosystem

## Files

| Mode | File | Questions |
|------|------|-----------|
| Ecosystem | `intake-questions-ecosystem.md` | 8 questions: playbook identity, tools, flows, katas, anti-patterns, crosslinks, constraints, language |
| Forensic | `intake-questions-forensic.md` | 6 questions: engagement context, stakeholders, dimensions, findings, constraints, language |
