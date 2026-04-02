---
description: "Exporta el ultimo playbook a una ruta especifica"
user-invocable: true
argument-hint: "[destination-path]"
allowed-tools: ["Read", "Write", "Bash"]
---

# /export — Export Playbook to Custom Location

## Execution Steps

### 1. Find Latest Playbook

Locate the most recent playbook HTML in `outputs/`:

```bash
ls -t outputs/playbook-*.html | head -1
```

If no playbook is found, inform the user: "No playbook found. Run `/forge <topic>` first."

### 2. Resolve Destination

- If `[destination-path]` is provided, use it as the export target.
  - If the path is a directory, copy the file into that directory keeping its original name.
  - If the path includes a filename, use that as the target filename.
- If no destination is provided, ask the user with: "Where should I export the playbook? Provide a destination path (directory or full file path)."

### 3. Validate Destination

- Check that the destination directory exists. If not, ask the user if it should be created.
- Check for write permissions by verifying the parent directory is writable.
- If a file already exists at the destination, warn the user and ask for confirmation before overwriting.

### 4. Copy File

Use Bash to copy the playbook:

```bash
cp <source-path> <destination-path>
```

### 5. Report

Print:
- Source: `<original path>`
- Exported to: `<destination path>`
- File size: `<size>`
- Suggest: "Open with `open <destination-path>` or share the file directly."
