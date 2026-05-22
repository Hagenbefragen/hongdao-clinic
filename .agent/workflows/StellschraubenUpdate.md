---
description: Update Stellschrauben version files, Architecture Mermaid diagram, and version numbers after cascade changes. Ensures full Nachvollziehbarkeit.
---

# /StellschraubenUpdate — Version Update & Nachvollziehbarkeit Workflow

// turbo-all

## Prerequisites

- Read the **Nachvollziehbarkeit Expert** skill first: `c:\ohm\.agent\skills\nachvollziehbarkeit\SKILL.md`
- This workflow is the SSOT updater for cascade versions

## When to Run

- After ANY cascade code change (threshold, new layer, new detector, fix)
- After running the Cascade Optimizer
- After a regression is found and fixed
- Before presenting results to stakeholders ("Big Bosses")

## Inputs Required

1. **New version number** (e.g., V34)
2. **Changelog** — what changed from previous version
3. **Test results** — at minimum JailbreakBench + external-db-full scenario results
4. **Root cause** — if fixing a regression, document what broke and why

---

## Step 1: Read Previous Stellschrauben (SSOT)

Read the latest stellschrauben JSON to understand the current state:

```
View: c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\data\v{PREVIOUS}_stellschrauben.json
```

## Step 2: Read Latest Test Results

Check the test-results directory for the most recent scenario runs:

```
Get-ChildItem "c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\test-results\*.json" | Sort-Object LastWriteTime -Descending | Select-Object -First 20 Name, LastWriteTime
```

Parse each result for TPR, FPR, totalPrompts, and flowCounts.

## Step 3: Create New Stellschrauben JSON

Create `c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\data\v{NEW}_stellschrauben.json` containing:

1. **version** — e.g., "V34"
2. **date** — ISO 8601 timestamp
3. **description** — one-line summary of what changed
4. **changelog** — array of changes from previous version
5. **regression_analysis** (if applicable) — symptom, root_cause, contributing_factors, fix
6. **results** — headline metrics: wTPR, wFPR, scenariosAt100, totalPrompts
7. **previous_best** — comparison to previous version with deltas
8. **stellschrauben** — ALL tunable parameters:
   - **thresholds** — every threshold with value, code_constant, source_file, line number, range, impact, patent claim, and status (UNCHANGED/NEW/MODIFIED)
   - **dissolution_layers** — all D-layers with description, status, and patent
   - **kaiostic_modules** — all modules with status
   - **pmb_pattern_memory** — pattern count and learning status
   - **tla_transparent_layer_authority** — thermal threshold and ratchet status
9. **scenario_results** — array of all scenarios with id, tpr, fpr, prompts, status, notes
10. **v{NEXT}\_roadmap** — known issues and planned improvements

## Step 4: Apply Nachvollziehbarkeit Skill

Read the Nachvollziehbarkeit skill:

```
View: c:\ohm\.agent\skills\nachvollziehbarkeit\SKILL.md
```

Apply the following from the skill to the Architecture tab Mermaid diagram:

### 4a. Color-Code the Mermaid Diagram

Use the standard colors from the skill:

- 🟢 Green `#00ff88` — Blocked (caught adversarial)
- 🔴 Red `#ff4444` — Passed adversarial (false negative)
- 🟣 Violet `#aa44ff` — Caught by SIREN (output defense)
- ⬜ White `#ffffff` — Stellschrauben values from THIS test
- 🟡 Yellow `#ffdd00` — Stellschrauben values from LATEST version
- 🟢 Dark Green `#006633` — Benign passed correctly
- 🟠 Orange `#ff8800` — False positives (benign blocked)
- 🔵 Blue `#4488ff` — New layers/detectors added in this version

### 4b. Add Flow Counts to Every Node

Each node in the Mermaid diagram MUST show:

- How many prompts entered
- How many were caught/blocked
- How many passed through
- The threshold value used (Stellschraube)

### 4c. Add Legend

Add a subgraph legend explaining every color.

### 4d. Add Explainer Popups

For every node and every Stellschraube, add a clickable `?` icon that shows:

- What this layer does (1-sentence)
- Stellschraube values (current + latest version)
- Prompt counts (caught/passed)
- Patent claim reference
- Source code file:line

## Step 5: Update Architecture Tab Mermaid in index.html

Open `c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\index.html` and find the Architecture tab content. Update the Mermaid diagram with:

1. Flow counts from the latest test run
2. Color-coded nodes per the Nachvollziehbarkeit standard
3. Stellschrauben values at each decision point
4. Legend subgraph
5. Version-comparison markers (yellow for latest, white for current)
6. Feedback channel arrows with actual flow counts

## Step 5b: Update Stellschrauben Tab KPI Boxes & Scenario Results Table ⚠️ CRITICAL

This step is **mandatory** — without it the dashboard shows stale data.

### 5b-1. Update the Stellschrauben Tab Header

Search for `AEGIS V{OLD} — All Stellschrauben` (around line 8280) and replace with:

```
⚙️ AEGIS V{NEW} — All Stellschrauben (Tuning Parameters)
```

### 5b-2. Update KPI Boxes (6 values)

Search for the `<!-- Overview KPIs -->` section (around line 8302). Update ALL 6 boxes from `v{NEW}_stellschrauben.json`:

| KPI Box        | JSON Field                       | Example |
| -------------- | -------------------------------- | ------- |
| Version        | `version`                        | V41     |
| wTPR           | `results.wTPR`                   | 98.7%   |
| wFPR           | `results.wFPR`                   | 6.4%    |
| 100% Scenarios | `results.scenariosAt100` / total | 2/3     |
| Total Prompts  | `results.totalPrompts`           | 526     |
| PMB Patterns   | (from PMB data or previous)      | 928     |

### 5b-3. Update Scenario Results Table

Search for `V{OLD} Scenario Results` (around line 9110). Update:

1. **Table title** — `📊 V{NEW} Scenario Results ({totalPrompts} prompts)`
2. **Column headers** — Change `V{BASELINE} TPR` / `V{OLD} TPR` to `V{PREVIOUS} TPR` / `V{NEW} TPR`
3. **All data rows** — Replace with actual results from `v{NEW}_stellschrauben.json`:
   - Delete ALL rows for scenarios below V36 (they are invalid)
   - Add rows for each scenario in the JSON `results` section
   - Each row needs: scenario name, V{PREVIOUS} TPR, V{NEW} TPR, Δ, FPR, status
4. **Preserve Big Tech Failure rows** (🆕 section) — these are pending benchmark runs

### 5b-4. Delete Stale Version References

Search the ENTIRE Stellschrauben tab (lines 8270-9350) for any remaining V{OLD} references and update them.

## Step 5c: Update NI Flythrough Agent Connections ⚠️ MANDATORY

The `AGENT_CONNECTIONS` map in `flythrough-layers.js` drives the **hover-connection visualization** in the NI Flythrough.
It MUST reflect the real cascade wiring from `run_live_websocket_test.ts` — **NEVER hallucinate connections.**

### 5c-1. Verify Connection Map

Open `c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\js\flythrough-layers.js` and find the `AGENT_CONNECTIONS` object.

Cross-reference every connection against the actual scan order in `run_live_websocket_test.ts`:
- Agent A feeds Agent B → `agentA: ["agentB"]`
- SIREN feedback loops → `siren_feedback: ["pmb", "aetl", "ics"]`

### 5c-2. Add New Connections

If new detectors were wired in this version:
1. Add their downstream connections to `AGENT_CONNECTIONS`
2. Add the "Last verified" date comment at the top of the map
3. Verify SIREN → AEGIS feedback arcs are up to date

### 5c-3. Remove Dead Connections

If detectors were unwired or removed:
1. Remove their entries from `AGENT_CONNECTIONS`
2. Remove references to them from other agents' connection arrays

## Step 6: Update Version Numbers

Update the version string in these files:

### 6a. Dashboard (index.html)

Find the `<title>` and header version display in:

```
c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\index.html
```

Update `V33` → `V{NEW}` in:

- `<title>` tag
- Header display (usually in the `#header` or status bar)
- Any inline version references

### 6b. Competition Benchmark

```
c:\ohm\Documentation\VC-EXIT\NI_BENCHMARK_COMPETITION.html
```

Update version number in title, header, and OG meta tags.

### 6c. TAB Version Label (Stellschrauben Button)

In `index.html`, find the Stellschrauben tab button and update its label:

```
⚙️ Stellschrauben V{OLD} → ⚙️ Stellschrauben V{NEW}
```

Search for `Stellschrauben V` in the tab bar area (approx line 100-110) and update.

### 6d. OG Image / Thumbnail

Ensure both HTML pages have proper OG image meta tags pointing to:

```
/Documentation/VC-EXIT/images/kd_master_all.png
```

Verify these meta tags exist in the `<head>`:

- `<meta property="og:image" ...>`
- `<meta property="og:title" ...>`
- `<meta name="twitter:card" content="summary_large_image">`
- `<meta name="twitter:image" ...>`

### 6e. AGENTS.md SSOT Table ⚠️ MANDATORY — NEVER SKIP

Update the **AEGIS Cascade Architecture SSOT** table in `c:\ohm\AGENTS.md`:

1. Update **Stellschrauben Version** row → new version (e.g., V87 → V88)
2. Update **Total Agents** → count `ALL_LAYERS` in `flythrough-layers.js`
3. Update **CPU Agents** → Total minus NPU agents
4. Update **NPU Agents** → count entries with `npu` in their id
5. Update **Last Updated** dates → today
6. If CPU/NPU worker count changed, update those rows too

**Verification command (run to confirm count):**

```powershell
$c = Get-Content "c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\js\flythrough-layers.js" -Raw; $allLayersSection = $c.Substring($c.IndexOf('var ALL_LAYERS')); $ids = [regex]::Matches($allLayersSection, 'id:\s*"([^"]+)"'); Write-Output "Total: $($ids.Count)"; $npu = ($ids | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -match 'npu' }).Count; Write-Output "NPU: $npu CPU: $($ids.Count - $npu)"
```

> **WHY THIS EXISTS:** On 2026-03-17, the AGENTS.md file said "105-agent cascade" while the actual codebase had 105 agents. This caused AI agents to hallucinate wrong numbers. This step prevents that from EVER happening again.

### 6f. Marketing Material Sweep ⚠️ MANDATORY — NEVER SKIP

Search ALL marketing/landing HTML files for stale agent counts and update them:

```powershell
Get-ChildItem -Path "c:\ohm\Documentation\VC-EXIT" -Filter "*.html" -Recurse | Select-String -Pattern "105-agent|42 layer|42 agent" -CaseSensitive:$false | Select-Object -First 30 Filename, LineNumber
```

Update every occurrence of "105-agent cascade" → "{N}-agent cascade" where {N} is the TOTAL from flythrough-layers.js.

**Files that commonly contain the count:**
- `destill-landing/rosetta.html`
- `destill-landing/redteam.html`
- `destill-landing/owasp.html`
- `destill-landing/mcp.html`
- `destill-landing/insurance.html`
- `destill-landing/impact.html`
- `destill-landing/index_backup.html`

### 6g. KNOWLEDGE_DOMAINS.md SSOT ⚠️ MANDATORY — NEVER SKIP

Update `c:\ohm\Documentation\SSOT\KNOWLEDGE_DOMAINS.md`:

1. Update **Sovereign Agents** count in summary table
2. Update **Operational Groups** count (if new KD_GROUPS added)
3. Update **Scientific Disciplines** count (if new science domains added)
4. Update **CPU/NPU split** in description
5. If a new group was added → add row to Taxonomy 1 table
6. If a new science discipline was added → add to Taxonomy 2 list + mapping table
7. Update the ASCII diagram counts

> **WHY THIS EXISTS:** On 2026-03-20, KNOWLEDGE_DOMAINS.md said "109 agents / 18 groups / 42 disciplines" while the code had 114 agents / 19 groups / 43 disciplines. This caused 5 agents to be invisible in all SSOT-derived documentation. Added to the cascade per AGENTS.md §SSOT Cascade rule.

## Step 7: Verify Nachvollziehbarkeit Checklist

Run through the audit checklist from the skill:

- [ ] Every threshold value is visible and labeled
- [ ] Every flow count is shown (input → output per node)
- [ ] Every color has a defined meaning in a visible legend
- [ ] Every interactive element has a `?` explainer popup
- [ ] Version number is prominently displayed
- [ ] Comparison to previous version is available
- [ ] Stellschrauben JSON is downloadable
- [ ] Source code references are provided for each layer
- [ ] Patent claims are linked to each innovation
- [ ] Regression markers are visible for any dropped metric
- [ ] Feedback loops show actual flow counts
- [ ] Timeline of version history is accessible
- [ ] **AGENTS.md SSOT table matches flythrough-layers.js count** ← NEW
- [ ] **KNOWLEDGE_DOMAINS.md counts match AGENTS.md and flythrough-layers.js** ← V98

## Step 8: Commit and Document

```powershell
cd c:\ohm
git add Documentation/VC-EXIT/live-NI-Dashboard/data/v{NEW}_stellschrauben.json
git add Documentation/VC-EXIT/live-NI-Dashboard/index.html
git add Documentation/VC-EXIT/live-NI-Dashboard/js/flythrough-layers.js
git add Documentation/VC-EXIT/live-NI-Dashboard/ni-flythrough.html
git add Documentation/VC-EXIT/NI_BENCHMARK_COMPETITION.html
git add AGENTS.md
git add Documentation/SSOT/KNOWLEDGE_DOMAINS.md
git commit -m "V{NEW} Stellschrauben: {one-line summary of changes}"
```

## Output

- ✅ New `v{NEW}_stellschrauben.json` in `data/` directory
- ✅ Updated Mermaid architecture diagram with Nachvollziehbarkeit colors + counts
- ✅ Updated version numbers in all HTML files
- ✅ **AGENTS.md SSOT table updated** (agent counts + version)
- ✅ **Marketing materials swept** (no stale "105-agent" references)
- ✅ **KNOWLEDGE_DOMAINS.md updated** (agent counts, groups, disciplines)
- ✅ Nachvollziehbarkeit checklist verified
- ✅ Changes committed

## File Locations (SSOT)

| File                                                      | Purpose                          |
| --------------------------------------------------------- | -------------------------------- |
| `VC-EXIT/live-NI-Dashboard/data/v{N}_stellschrauben.json` | Stellschrauben SSOT per version  |
| `VC-EXIT/live-NI-Dashboard/index.html`                    | Dashboard + Architecture Mermaid |
| `VC-EXIT/live-NI-Dashboard/js/flythrough-layers.js`       | Canonical agent list (PRIMARY)   |
| `VC-EXIT/NI_BENCHMARK_COMPETITION.html`                   | Competition benchmark page       |
| `AGENTS.md`                                               | **Agent count SSOT (governance)**|
| `Documentation/SSOT/KNOWLEDGE_DOMAINS.md`                 | **KD counts, groups, science taxonomy** |
| `backend/src/aegis/aegis.service.ts`                      | Runtime cascade wiring           |
| `backend/src/aegis/intention-field/types.ts`              | ICS thresholds source            |
| `.agent/skills/nachvollziehbarkeit/SKILL.md`              | Nachvollziehbarkeit standard     |

