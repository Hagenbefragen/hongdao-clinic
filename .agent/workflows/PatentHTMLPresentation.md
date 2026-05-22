---
description: Generate a static HTML Patent Evidence Presentation from real NI benchmark data
---

# /PatentHTMLPresentation — Patent Evidence Presentation Generator

// turbo-all

## Overview

Generates a professionally designed, self-contained HTML presentation that proves patent claims with real benchmark measurement data. The presentation includes mermaid architecture diagrams, downloadable evidence files (JSON, CSV), and per-patent result cards.

## Prerequisites

- Backend running at `http://localhost:3000` with NI benchmark module
- Static file server for the output: `npx -y serve . -l 5555` in `Documentation/VC-EXIT`
- At least 1 completed benchmark run in PostgreSQL

## Steps

### 1. Export Benchmark Data

```bash
node c:\ohm\export_benchmark.cjs
```

This exports all benchmark data from the API to `Documentation/VC-EXIT/patent-evidence/`:

- `all_runs.json` — Complete run database
- `benchmark_runs.csv` — Spreadsheet-ready CSV
- `model_summary.json` — Per-model averages
- `run_results_detail.json` — Per-prompt granular results
- `dashboard_summary.json` — BPC scores snapshot
- `hardware_capabilities.json` — CPU/GPU/NPU detection
- `phi_router_benchmark.json` — φ-Router energy comparisons
- `phi_devices.json` — Device profiles
- `bpc_timeline.json` — Quality progression over time
- `export_metadata.json` — Timestamp and machine info

### 2. Verify Export

```bash
dir c:\ohm\Documentation\VC-EXIT\patent-evidence\
```

Should show 10 files. Check `export_metadata.json` for timestamp and run counts.

### 3. Generate/Update Presentation HTML

Read the latest data from `model_summary.json` and `hardware_capabilities.json`, then update `PATENT_EVIDENCE_PRESENTATION.html` with:

- **KPI numbers** from actual measurements (tokens saved, attacks blocked, TPS, coherence)
- **Model comparison table** with real TPS values from each completed model
- **Per-patent result cards** with bar charts using real data
- **Mermaid diagram** showing the A/B/C/D pipeline architecture
- **Download links** pointing to `patent-evidence/*.json` and `patent-evidence/*.csv`

The presentation file lives at:

```
c:\ohm\Documentation\VC-EXIT\PATENT_EVIDENCE_PRESENTATION.html
```

### 4. View in Browser

Open `http://localhost:5555/PATENT_EVIDENCE_PRESENTATION.html` in the browser.
Verify:

- All mermaid diagrams render correctly
- All download links work (click each one)
- All numbers match the exported data
- Patent codes (SP1, SP5, SP6, SP7, SP11, SP13) have results

### 5. Optional: Screenshot for Records

Take browser screenshots of:

- Hero + KPI section
- Architecture mermaid diagram
- Each patent result card
- Downloads section

### 6. Commit

```bash
cd c:\ohm
git add Documentation/VC-EXIT/PATENT_EVIDENCE_PRESENTATION.html Documentation/VC-EXIT/patent-evidence/
git commit -m "Patent Evidence Presentation — [DATE] benchmark results ([N] runs, [MODELS])"
```

## File Map

| File                                                      | Purpose                             |
| --------------------------------------------------------- | ----------------------------------- |
| `export_benchmark.cjs`                                    | Data export script (API → JSON/CSV) |
| `Documentation/VC-EXIT/PATENT_EVIDENCE_PRESENTATION.html` | The presentation                    |
| `Documentation/VC-EXIT/patent-evidence/`                  | All evidence data files             |

## Patent → Code → Data Traceability

| Patent        | Code File                 | Key Function              | Data Field                |
| ------------- | ------------------------- | ------------------------- | ------------------------- |
| SP1 AEGIS     | `aegis-fsa.ts`            | `AegisFSA.scan()`         | `attacksBlocked`          |
| SP5 SIREN     | `siren-claims.ts`         | `computeSirenCoherence()` | `avgCoherence`            |
| SP6 NI-MW     | `ni-benchmark.service.ts` | `executeStageD()`         | `avgTpsD`, `deltaPercent` |
| SP7 QFAI-C    | `ni-benchmark.service.ts` | `fibonacciCompress()`     | `totalTokensSaved`        |
| SP13 φ-Router | `phi-router.ts`           | `phiRoute()`              | `energySavingsPercent`    |
| SP11 NFI      | All above combined        | Composite                 | All fields                |
