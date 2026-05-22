---
description: How to switch context and reduce RAM usage by using Focus Workspaces.
---

# Focus Mode Workflow

This workflow allows you to switch between different development contexts (Core, Twin, Retreats) to save RAM and reduce noise.

## 1. Choose your Focus
Decide what you are working on:
- **Core**: The main App, Streaming, VC, Backend.
- **Twin**: The Digital Twin Unity/Web stack.
- **Retreats**: The Retreats marketplace and marketing websites.

## 2. Open the Workspace
Close your current VS Code window (`File > Close Folder/Workspace`).
Open the relevant workspace file from the `c:\OHM` root:
- `OHM-Core.code-workspace`
- `OHM-Twin.code-workspace`
- `OHM-Retreats.code-workspace`

## 3. Activate Antigravity Focus (Optional)
Run the maintenance script to stop unrelated services and update agent context:

```powershell
./scripts/maintenance.ps1 -Action Focus -Scope Core
# or Twin, Retreats
```

## 4. Verify RAM
Check Task Manager. Your `language_server` usage should drop significantly because irrelevant folders are excluded from indexing.
