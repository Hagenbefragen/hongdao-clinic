---
description: Generate & Update the FEAT-077 Ecosystem Process Map
---

# /processMAP — Code-Verified Interactive Process Map Generator

> _"Es ist STRAFBAR etwas anderes anzuzeigen, als den IST-Zustand."_

This workflow generates **multi-level interactive process maps** from actual implemented code. Every process node is verified against the codebase. Loose ends are highlighted.

## Architecture (Modular — avoids token limits)

```
Documentation/VC-EXIT/process-map/
├── index.html              ← Main shell (tabs, mermaid, render logic)
├── styles.css              ← All CSS (OHM dark theme)
└── process-registry.js     ← SINGLE SOURCE OF TRUTH (all process data)
```

## 4 Zoom Levels

| Level  | Name           | Content                                                          |
| ------ | -------------- | ---------------------------------------------------------------- |
| **L0** | Constellation  | Mermaid diagram: AEGIS, QFAI-C, SIREN, POAW, STENO boxes         |
| **L1** | Subsystem      | Per-subsystem tab with process cards (click any tab)             |
| **L2** | Process Detail | Each card shows: Input type, Output type, Description, Code file |
| **L3** | Code Link      | `file:///` link to the exact source file                         |

## Process Status Colors

| Status       | Badge  | Meaning                                          |
| ------------ | ------ | ------------------------------------------------ |
| ✅ WIRED     | Green  | Connected to real data, code exists and executes |
| ⏳ SIMULATED | Yellow | Code exists but uses mock/simulated data         |
| ⚠ LOOSE      | Red    | Process defined but NOT implemented — LOOSE END  |

## How to Run

### Step 1: Open the Process Map

// turbo

```powershell
Start-Process "c:\ohm\Documentation\VC-EXIT\process-map\index.html"
```

### Step 2: Verify Against Codebase (Manual or Automated)

To verify a specific process node exists in code:
// turbo

```powershell
node -e "const R = require('./Documentation/VC-EXIT/process-map/process-registry.js'); const loose = R.processes.filter(p => p.status === 'LOOSE'); console.log('LOOSE ENDS:', loose.length); loose.forEach(l => console.log('  -', l.id, ':', l.name));"
```

### Step 3: Update Process Registry

When implementing a new process:

1. Edit `Documentation/VC-EXIT/process-map/process-registry.js`
2. Change `status: "LOOSE"` → `status: "WIRED"`
3. Update `code` and `line` fields with real file paths
4. Remove from `looseEnds` array
5. Refresh the HTML in browser

### Step 4: Add New Process

Add a new entry to the `processes` array in `process-registry.js`:

```javascript
{ id: "NEW_PROCESS", subsystem: "AEGIS",
  name: "New Process Name",
  desc: "What this process does",
  input: { type: "InputType", desc: "Description", format: "JSON" },
  output: { type: "OutputType", desc: "Description", format: "JSON" },
  code: "backend/src/path/to/file.ts", line: "functionName()",
  status: "WIRED",
  patent: "SP1 Claim X" }
```

## Skill Reference

Full skill documentation: `.agent/skills/process_map_architect/SKILL.md`

## Related

- `live_test_stream.html` — The actual NI benchmark dashboard this maps
- `live-dashboard/` — Refactored modular version of the dashboard
- FEAT-139 — Feature request for this process map system

## Future: Bidirectional Editing (Phase 2)

> **Vision:** Edit a business process in the diagram → generate a code diff → apply to codebase.

Current status: **Phase 1 (Read-Only)** is implemented. Phase 2 requires:

1. `PROCESS_REGISTRY.json` as machine-readable registry
2. Template-based code generation per process type
3. Git integration for safe diff application
