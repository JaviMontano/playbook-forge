---
description: "Abre el ultimo playbook generado en el browser"
user-invocable: true
allowed-tools: ["Bash", "Glob"]
---

# /preview — Open Latest Playbook in Browser

## Execution Steps

### 1. Find Latest Playbook

Use Glob to find all `.html` files in the `outputs/` directory:

```
outputs/playbook-*.html
```

If multiple files are found, sort by modification time (most recent first) using Bash:

```bash
ls -t outputs/playbook-*.html | head -1
```

### 2. Validate

- Check that the file exists and is non-empty.
- If no playbook HTML files are found in `outputs/`, inform the user: "No playbook found in outputs/. Run `/forge <topic>` to generate one."

### 3. Open in Browser

On macOS, run:

```bash
open <path-to-latest-playbook>
```

### 4. Report

Print:
- File opened: `<filename>`
- File size: `<size>`
- Last modified: `<timestamp>`
