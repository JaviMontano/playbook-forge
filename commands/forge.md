---
description: "Genera un playbook HTML completo con 13 flujos AI-native, 4 katas y adopcion progresiva"
user-invocable: true
argument-hint: "<topic> [--source=path]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "AskUserQuestion", "TodoWrite"]
---

# /forge — Main Playbook Generation Command

## Execution Steps

### 1. Parse Arguments

Extract the `<topic>` from the first positional argument. Check for the optional `--source=<path>` flag. If no topic is provided, ask the user with AskUserQuestion.

### 2. Resolve Source Context

- If `--source=<path>` is provided, use that path as the context source directory.
- If no `--source` flag, scan the current working directory for context files: `.md`, `.txt`, `.json`, `.yaml`, `.csv`, `.docx` files that could inform the playbook.
- If context files are found, summarize what was discovered and confirm with the user before proceeding.

### 3. Launch the Forge Pipeline

Execute the full playbook generation pipeline in order:

1. **Ingest**: Read and extract context from source files. Write structured context to `outputs/.playbook-context.json`.
2. **Clarify**: Run the intake questions from `prompts/intake-questions.md` to gather audience, tools, problems, centralization strategy, and language. If context files already answer some questions, pre-fill and confirm.
3. **Generate Manifest**: Using the structured brief from intake + context, generate the complete playbook manifest (JSON) following `prompts/content-generation.md`. Write to `outputs/.playbook-manifest.json`.
4. **Assemble HTML**: Transform the manifest into a self-contained HTML playbook using Sofka DS v5.1 design system. The HTML must include all CSS inline, be 80-200KB, responsive, and print-friendly. Write to `outputs/playbook-<slugified-topic>-<YYYYMMDD>.html`.
5. **Validate**: Check the assembled HTML for: no unreplaced `{{placeholders}}`, file size within 80-200KB, all 13 sections present, valid HTML structure, consistent terminology.
6. **Deliver**: Report the output file path and key metrics (sections, file size, word count).

### 4. Post-Generation

- Report the output file path: `outputs/playbook-<topic>-<date>.html`
- Offer to open the playbook in the browser with: `open <path>`
- Offer to export to a custom location with `/export`

### Error Handling

- If any pipeline stage fails, report which stage failed and why.
- Partial results are preserved in `outputs/` so the user can resume.
- Use TodoWrite to track pipeline progress across stages.
