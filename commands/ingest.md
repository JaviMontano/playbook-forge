---
description: "Ingesta archivos de contexto para enriquecer el proximo playbook"
user-invocable: true
argument-hint: "[path-to-files]"
allowed-tools: ["Read", "Glob", "Grep", "Write"]
---

# /ingest — Context Ingestion Command

## Execution Steps

### 1. Resolve Target Path

- If `[path-to-files]` is provided, use that as the scan root.
- If no argument, use the current working directory.
- Validate the path exists before proceeding.

### 2. Scan for Context Files

Use Glob to find relevant files in the target path:

- `**/*.md` — Markdown documentation
- `**/*.txt` — Plain text notes
- `**/*.json` — Structured data
- `**/*.yaml` / `**/*.yml` — Configuration and structured data
- `**/*.csv` — Tabular data (roles, tools, metrics)

Exclude: `node_modules/`, `.git/`, `outputs/`, files larger than 500KB.

### 3. Extract Context

For each discovered file, read and extract:

- **Roles & Audiences**: Any mentions of team roles, personas, or target audiences.
- **Tools & Platforms**: Software tools, platforms, services mentioned (Jira, Confluence, Drive, Slack, etc.).
- **Problems & Pain Points**: Challenges, issues, bottlenecks described.
- **Processes & Workflows**: Existing workflows, ceremonies, or processes.
- **Metrics & KPIs**: Any quantitative measures or goals mentioned.
- **Organization Info**: Company name, team names, department structure.

### 4. Write Context File

Write the extracted context to `outputs/.playbook-context.json` with this structure:

```json
{
  "ingested_at": "<ISO timestamp>",
  "source_path": "<path scanned>",
  "files_processed": ["<list of files>"],
  "context": {
    "roles": [],
    "tools": [],
    "problems": [],
    "processes": [],
    "metrics": [],
    "organization": {}
  },
  "raw_excerpts": ["<relevant excerpts>"]
}
```

### 5. Report

Print a summary:
- Number of files scanned
- Number of files with relevant content
- Key findings per category (roles, tools, problems)
- Path to the context file
- Suggest running `/forge <topic>` next
