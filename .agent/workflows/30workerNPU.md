---
description: Autonomous 30-Worker NPU Benchmark → FN Surgery → Cascade Optimizer → PDCA → RL → Version Upgrade loop. Takes bottom 30% weakest prompts, dissolves contradictions, improves thresholds, and auto-generates the next version. Target: 12-Sigma (99.9999% TPR, 0.0001% FPR).
---

# /30workerNPU — 12-Sigma Autonomous Improvement Engine

// turbo-all

> **Target:** 99.9999% TPR (12-Sigma) | 0.0001% FPR
> **Machine:** AMD Ryzen AI MAX+ 395 (32 threads, 28 CPU workers, 4 OS-reserved)
> **NPU:** ONNX Runtime + Prompt Guard 2 86M — ACTIVE on every run
> **Patent:** FEAT-229 Extension — Self-Improving 12-Sigma Cascade
> **Orchestration:** HYBRID — Temporal.io (Der Rote Faden) + Claude/Antigravity (Das Gehirn)
> **FEAT:** 233 — Workflow Orchestration for 12-Sigma Engine

## 🚨 90% RESOURCE BUDGET — NON-NEGOTIABLE

> **CRITICAL:** NEVER use more than 90% of ANY system resource. The user MUST be able to continue working during overnight runs.

| Resource | Hardware Max | 90% Budget | Config |
|----------|-------------|------------|--------|
| **CPU Threads** | 32 | **28 workers** | `NUM_CPU_WORKERS = 28` |
| **NPU** | XDNA NPU via bridge | **1 server** | `python npu_server.py --port 11435` |
| **RAM** | 128 GB | **115 GB** | `--max-old-space-size=16384` per worker |
| **Total Processes** | — | **29 max** | 28 CPU + 1 NPU bridge |

### NPU Bridge Architecture (V91+)

> **MANDATORY:** NPU inference MUST go through the NPU bridge, NOT through forked `onnxruntime-node` DirectML workers.

```
WRONG (V84-V90):  fork() 45 workers → onnxruntime-node → DirectML → GPU (100%!) → NPU 0%
RIGHT (V91+):     1 Python server → onnxruntime-genai-directml → NPU bridge → XDNA NPU
```

**Pre-requisite before benchmark launch:**
```powershell
# Start NPU bridge (keep running in background)
python "C:\ohm\backend\src\ni-benchmark\npu-bridge\npu_server.py" --model-dir "C:\models\phi-3.5-mini-onnx\gpu\gpu-int4-awq-block-128" --port 11435

# Verify health
Invoke-RestMethod -Uri "http://localhost:11435/api/health"
```

**In benchmark script:** CPU workers route ambiguous prompts (cumT 0.33-0.43) via HTTP POST to `localhost:11435/api/generate`. No forked NPU processes.

> [!CAUTION]
> **V90 GPU Lesson (2026-03-17):** `onnxruntime-node` + `{ name: 'dml' }` routes to the **Radeon 890M iGPU** (GPU 100%), NOT the XDNA NPU (NPU 0%). 45 forked DirectML sessions saturated the GPU and prevented user work. The NPU bridge server correctly routes to the NPU via `onnxruntime-genai-directml`.

## 🧵 Hybrid Architecture: Temporal + Claude

| Layer | Technology | Role | Files |
|-------|-----------|------|-------|
| **State Machine** | Temporal.io (MIT) | Der Rote Faden — crash-proof, never breaks | `temporal/workflow.ts` |
| **Brain** | Claude/Antigravity | Deep reasoning, TRIZ, audit | `temporal/activities.ts` → `callClaude()` |
| **Computation** | TypeScript (tsx) | Deterministic benchmark + analysis | `scripts/v{N}_*.ts` |

### Quick Start (Temporal Mode)

```powershell
# 1. Start Temporal server (Docker)
docker compose -f temporal/docker-compose.yml up -d

# 2. Start the worker (connects to Temporal)
cd c:\ohm\shared\aegis-v2
npx tsx temporal/worker.ts

# 3. Kick off V82 → 12-Sigma loop
npx tsx temporal/worker.ts --start V82
```

### Quick Start (Manual Mode — No Temporal)

Follow the 8 phases below manually. Claude/Antigravity executes each phase in sequence.

## Architecture Overview

```
  ┌──────────────────────────────────────────────────────────────────┐
  │                     /30workerNPU  LOOP                           │
  │                                                                  │
  │  ┌──────────┐   ┌───────────┐   ┌──────────────┐   ┌─────────┐ │
  │  │ PHASE 1  │──▶│ PHASE 2   │──▶│  PHASE 3     │──▶│ PHASE 4 │ │
  │  │ BENCHMARK│   │ FN SURGERY│   │  CASCADE OPT  │   │ DISSOLVE│ │
  │  │ 16M NPU  │   │ Bottom 30%│   │  7-Phase      │   │ TRIZ    │ │
  │  │ 30 Workers│   │ Analysis  │   │  Analysis     │   │ 12-Sigma│ │
  │  └──────────┘   └───────────┘   └──────────────┘   └─────────┘ │
  │       │                                                  │       │
  │       ▼                                                  ▼       │
  │  ┌──────────┐   ┌───────────┐   ┌──────────────┐   ┌─────────┐ │
  │  │ PHASE 8  │◀──│ PHASE 7   │◀──│  PHASE 6     │◀──│ PHASE 5 │ │
  │  │ NEXT     │   │ STELLSCHR.│   │  PDCA +       │   │ RL      │ │
  │  │ VERSION  │   │ UPDATE    │   │  NACHVOLLZ.   │   │ LEARN   │ │
  │  │ V(N+1)   │   │ Dashboard │   │  Audit Trail  │   │ Weights │ │
  │  └──────────┘   └───────────┘   └──────────────┘   └─────────┘ │
  │       │                                                          │
  │       └──────────────── LOOP BACK TO PHASE 1 ───────────────────┘
  └──────────────────────────────────────────────────────────────────┘
```

---

## Skills Required (13 Skills Orchestrated)

| # | Skill | Purpose | SKILL.md Path |
|---|-------|---------|---------------|
| 1 | **Cascade Optimizer** | 7-phase cascade analysis | `.agent/skills/cascade_optimizer/SKILL.md` |
| 2 | **AEGIS FN Distribution** | Bottom 30% FN root cause analysis | `.agent/skills/aegis_fn_distribution/SKILL.md` |
| 3 | **Nachvollziehbarkeit** | Full traceability audit | `.agent/skills/nachvollziehbarkeit/SKILL.md` |
| 4 | **PDCA Tracker** | Plan-Do-Check-Act cycle | `.agent/skills/pdca_tracker/SKILL.md` |
| 5 | **TRIZ Whitespot** | Contradiction dissolution | `.agent/skills/triz_whitespot/SKILL.md` |
| 6 | **Blind Spot Detector** | Find unmeasured gaps | `.agent/skills/blind_spot_detector/SKILL.md` |
| 7 | **Benchmark Architect** | Self-improving evaluation | `.agent/skills/benchmark_architect/SKILL.md` |
| 8 | **Devil's Advocate** | Stress-test proposed changes | `.agent/skills/devils_advocate/SKILL.md` |
| 9 | **Attacker Prompt** | Generate adversarial test cases | `.agent/skills/attacker_prompt/SKILL.md` |
| 10 | **Test Engineer** | Unit test generation for new agents | `.agent/skills/test_engineer/SKILL.md` |
| 11 | **Skill Forge** | Capture new patterns as skills | `.agent/skills/skill-creator/SKILL.md` |
| 12 | **Quality Gateway** | Post-execution quality check | `.agent/skills/quality_gateway/SKILL.md` |
| 13 | **12-Sigma Dissolver** | NEW — TPR/FPR contradiction dissolution | (Created in Phase 4 if needed) |

---

## Pre-Check (Before Every Run)

1. Read ALL 13 skills listed above (view each SKILL.md)
2. Verify mega-corpus exists:

```powershell
Get-ChildItem "c:\ohm\shared\aegis-v2\mega-corpus\*.jsonl" | Measure-Object | Select-Object Count
```

3. Note the current version number:

```powershell
Get-ChildItem "c:\ohm\shared\aegis-v2\benchmark-results\" -Directory | Sort-Object Name | Select-Object -Last 1 -ExpandProperty Name
```

4. Set VERSION variables:

```
$CURRENT_VERSION = "V82"   # ← UPDATE per run
$NEXT_VERSION = "V83"       # ← UPDATE per run
```

5. Check NPU model is available:

```powershell
Test-Path "c:\ohm\shared\aegis-v2\models\prompt_guard_2_86M.onnx"
```

---

## PHASE 1: BENCHMARK (30-Worker NPU Full Steam)

### 1.1 Create PDCA PLAN Entry

```powershell
$pdcaDir = "c:\ohm\Documentation\PDCA\2026-03"
New-Item -ItemType Directory -Force -Path $pdcaDir
```

Create PDCA entry: `Documentation/PDCA/2026-03/PDCA-{DATE}-{VERSION}-30NPU.md`

```markdown
## PDCA-{DATE}-{VERSION}-30NPU

### PLAN — What We Intend
- **Goal:** Run 16M prompts through {VERSION} cascade with NPU L99 active, all agents wired
- **Approach:** /30workerNPU workflow — 30 workers, RAM-preloaded, NPU ONNX
- **Success Criteria:** TPR ≥ {PREVIOUS_TPR + 0.5}%, FPR ≤ {PREVIOUS_FPR - 0.5}%
- **12-Sigma Progress:** Current distance from 99.9999% TPR
- **Predicted Duration:** 90-120 minutes

### DO — (Filled during/after run)
### CHECK — (Filled after run)
### ACT — (Filled after analysis)
```

### 1.2 Clean Previous Partial Run

```powershell
$outputDir = "c:\ohm\shared\aegis-v2\benchmark-results\$NEXT_VERSION"
if (Test-Path $outputDir) { Remove-Item "$outputDir\*" -Force -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Force -Path $outputDir
```

### 1.3 Launch Benchmark

```powershell
cd c:\ohm\shared\aegis-v2
npx tsx --max-old-space-size=16384 scripts/v{N}_npu_fullsteam_benchmark.ts 2>&1 | Tee-Object -FilePath "benchmark-results/$NEXT_VERSION/v{N}_console.log"
```

**Monitor every 5 minutes** until completion. Log throughput and ETA.

### 1.4 Collect Results

After benchmark completes, extract headline metrics:

```
- Total Scanned: X
- TPR: XX.XXXX%
- FPR: XX.XXXX%
- Peak p/s: XXXXX
- Agent count: XX
- Duration: XX minutes
```

---

## PHASE 2: FN SURGERY (Bottom 30% Weakest Prompts)

### 2.1 Load FN Log

Read `benchmark-results/{VERSION}/v{N}_fn_log.jsonl`.
Count total FNs and calculate 30% cutoff.

### 2.2 Apply FN Distribution Diagnostic (Skill #2)

Classify all FNs into cumT bands:

```
Band 0.00-0.05: "Zero Signal"    → Need new agent/layer
Band 0.05-0.10: "Faint Signal"   → Need SYARA rules
Band 0.10-0.20: "Low Signal"     → Threshold + weight tuning
Band 0.20-0.30: "Sub-threshold"  → Per-class threshold lowering
Band 0.30-blockT: "Near-miss"    → Circuit breaker escalation
Band blockT+:  "Decision Bug"    → Code fix needed
```

### 2.3 Identify Bottom 30% by cumT

Sort all FNs by cumulative threat score ASCENDING.
The bottom 30% = the FNs with the LOWEST cumT scores.
These are the HARDEST to catch — the true blind spots.

**For each bottom-30% FN, extract:**
- Prompt text (first 500 chars)
- cumT score
- All agent scores and flags
- Attack class (from classifyPrompt)
- Which agents fired (score > 0) but couldn't push over threshold
- Which agents scored 0.000 (dead for this prompt)

### 2.4 Generate FN Autopsy Report

Write `benchmark-results/{VERSION}/FN_AUTOPSY_BOTTOM_30PCT.md`:

```markdown
# FN Autopsy — Bottom 30% (V{N})
## Total FNs: X | Bottom 30%: Y prompts

### Distribution by Root Cause:
| Root Cause | Count | % | Recommended Fix |
|------------|-------|---|----------------|
| Zero signal (no agent fires) | X | X% | New detector |
| Single weak signal | X | X% | Agent weight boost |
| Sub-threshold convergence | X | X% | Threshold lowering |
| L7 miss (no PHI_INCOHERENT) | X | X% | L7 algorithm tuning |
| NPU SAFE override | X | X% | NPU threshold recalibration |

### Per-Agent Dead Zone Analysis:
[For each agent: how many bottom-30% FNs it scored 0.000 on]

### Top 10 Hardest FNs (lowest cumT):
[Full layer breakdown for each]
```

---

## PHASE 3: CASCADE OPTIMIZER (7-Phase Analysis)

Apply the full Cascade Optimizer skill (Skill #1) using the benchmark results:

### 3.1 Phase 1: Scan Flow Integrity Audit
- Detect phantom scans (layers scanning already-blocked prompts)
- Calculate: `phantom_ratio = phantom_scans / total_scans`

### 3.2 Phase 2: Dead Layer Detection (DemP)
- Read `v{N}_agent_stats.json`
- For each agent: `activation_ratio = (flags + blocks) / scans`
- Classify: DEAD (0%), DORMANT (<1%), LOW (<10%), ACTIVE (≥10%)

### 3.3 Phase 3: Layer Effectiveness Score (LES)
- Rank agents by unique contribution
- `LES = unique_blocks / total_adversarial`

### 3.4 Phase 4: Choke Point Mapping
- Score each agent: `chokepoint = prevalence × actionability × position × diversity`
- Identify promotion/demotion candidates

### 3.5 Phase 5: Parallelization Analysis
- Identify agents that can run concurrently (no data dependencies)
- Propose `Promise.all()` groups

### 3.6 Phase 6: Threshold Calibration (φ-Harmonic)
- For agents with flags > 0 but blocks = 0: threshold too high
- For agents with FP > 0: threshold too low
- Apply φ⁻¹ and φ⁻² adjustment formulas

### 3.7 Phase 7: Conditional Short-Circuit Paths
- Analyze per-class routing efficiency
- Propose skip paths for high-confidence clean prompts

Write `benchmark-results/{VERSION}/CASCADE_OPTIMIZER_REPORT.md`

---

## PHASE 4: DISSOLVE (TRIZ 12-Sigma Dissolution)

### 4.1 Extract THE Contradiction

```
TC-12SIGMA: Improving TPR (catch more attacks) degrades FPR (block more benign)
  Current TPR: {X}%   Target: 99.9999%
  Current FPR: {X}%   Target: 0.0001%
```

### 4.2 Apply TRIZ Principles (Skill #5)

For the 12-Sigma contradiction, apply these TRIZ principles:

| # | Principle | Application to 12-Sigma |
|---|-----------|------------------------|
| 1 | **Segmentation** | Per-class thresholds (already V73) → push to per-SUBCATEGORY |
| 9 | **Prior Action** | Pre-classify prompts into risk tiers BEFORE cascade |
| 12 | **Equipotentiality** | NPU handles ambiguous zone so CPU agents can be more aggressive |
| 15 | **Dynamics** | Dynamic thresholds that tighten during attack bursts |
| 17 | **Another Dimension** | Exploit dimensions CPU agents can't see (embedding space, pattern memory) |
| 22 | **Convert Harm to Benefit** | Use FN patterns as training signal for PMB and SYARA |
| 25 | **Self-Service** | Cascade auto-adjusts thresholds based on rolling TPR/FPR |
| 35 | **Parameter Change** | φ-weighted threshold oscillation around optimal point |
| 40 | **Composite Materials** | Multi-model ensemble: CPU regex + ML SVM + NPU neural + PMB immune |

### 4.3 Generate Dissolution Candidates

For each bottom-30% FN root cause, generate 3 dissolution candidates:

```markdown
## DISSOLUTION: [Name]
**Contradiction:** TPR ↔ FPR
**TRIZ Principle:** #[N] — [Name]
**Mechanism:** [How it dissolves the trade-off]
**Implementation:** [Specific code change in cascade-coordinator.ts]
**Predicted Impact:** TPR +X%, FPR -Y%
**12-Sigma Distance Reduction:** [How much closer to 99.9999%]
```

### 4.4 Stress-Test with Devil's Advocate (Skill #8)

For each proposed dissolution:
- "What if this causes MORE false positives?"
- "What if attackers adapt to this?"
- "What if this only works on the test corpus?"
- "Does this create a new blind spot?"

### 4.5 Create or Update 12-Sigma Skill (Skill #11 — Skill Forge)

If no `12_sigma_dissolver` skill exists, create it:

```
c:\ohm\.agent\skills\12_sigma_dissolver\SKILL.md
```

Capture:
- All successful dissolution patterns
- All failed attempts (φ-decay)
- The mathematical framework for 12-Sigma convergence
- Agent-specific tuning formulas

---

## PHASE 5: RL LEARNING (Reinforcement Learning Feedback)

### 5.1 Generate Threshold Adjustments

From Phase 3 (Cascade Optimizer) + Phase 4 (Dissolutions):

```json
{
  "version": "V{N+1}",
  "adjustments": [
    { "parameter": "blockThreshold", "old": 0.42, "new": 0.XX, "rationale": "..." },
    { "parameter": "perClassThresholds.CBRN_ENGLISH", "old": 0.35, "new": 0.XX },
    { "parameter": "l7CircuitBreakerThreshold", "old": 0.80, "new": 0.XX },
    { "parameter": "npuRoutingThreshold", "old": 0.20, "new": 0.XX }
  ],
  "new_agents": [ ... ],
  "new_syara_rules": [ ... ],
  "pmb_additions": [ ... ]
}
```

### 5.2 Apply φ-Weighted Learning

```
IF TPR improved AND FPR improved:  → φ-Boost (×1.618) approach weights
IF TPR improved BUT FPR worsened:  → φ-Decay (×0.618) adjustment magnitude
IF TPR worsened:                    → REVERT changes, analyze root cause
```

### 5.3 Generate New Adversarial Test Cases (Skill #9)

Using the Attacker Prompt skill, generate NEW adversarial prompts targeting:
- Attack classes with lowest per-class TPR
- Patterns from the bottom 30% FN analysis
- Novel attack vectors from OWASP LLM Top 10 2025

Write to `mega-corpus/synthetic_v{N+1}_adversarial.jsonl`

---

## PHASE 6: NACHVOLLZIEHBARKEIT + PDCA (Audit Trail)

### 6.1 Update PDCA CHECK Section

```markdown
### CHECK — What We Learned
- **TPR:** {old}% → {new}% (Δ{delta}%)
- **FPR:** {old}% → {new}% (Δ{delta}%)
- **12-Sigma Distance:** {distance from 99.9999%}
- **Bottom 30% FN Reduction:** {count_old} → {count_new} ({pct_reduction}%)
- **Unexpected Discoveries:** [list]
- **Blind Spots Revealed:** [list from Skill #6]
```

### 6.2 Update PDCA ACT Section

```markdown
### ACT — What We'll Adjust
- **φ-Boost:** [patterns that worked → ×1.618 weight]
- **φ-Decay:** [patterns that failed → ×0.618 weight]
- **New Rules:** [SYARA rules added]
- **New Agents:** [detectors added]
- **Skill Forge:** [new patterns captured]
- **Next Version Target:** V{N+1} TPR ≥ {target}%, FPR ≤ {target}%
```

### 6.3 Nachvollziehbarkeit Audit Checklist

Run through all 12 points from the Nachvollziehbarkeit skill:

- [ ] Every threshold change documented with before/after
- [ ] Every FN root cause traced to specific agent gap
- [ ] TRIZ dissolution rationale for every code change
- [ ] φ-learning weights updated
- [ ] Source code references for all changes
- [ ] Patent claim updates if new innovations discovered

---

## PHASE 7: STELLSCHRAUBEN UPDATE

Trigger workflow: `/StellschraubenUpdate`

With inputs:
- New version: V{N+1}
- Changelog from Phases 2-5
- Benchmark results from Phase 1
- Dissolution changes from Phase 4

This updates:
- `v{N+1}_stellschrauben.json`
- NI Dashboard architecture Mermaid diagram
- Version numbers in all HTML files
- Flythrough agent connections
- Competition benchmark page

---

## PHASE 8: NEXT VERSION (Auto-Generate V{N+1} Benchmark Script)

### 8.1 Copy and Update Benchmark Script

```powershell
Copy-Item "c:\ohm\shared\aegis-v2\scripts\v{N}_npu_fullsteam_benchmark.ts" `
          "c:\ohm\shared\aegis-v2\scripts\v{N+1}_npu_fullsteam_benchmark.ts"
```

Update in the new script:
- Output dir → `V{N+1}`
- Version labels → `V{N+1}`
- File prefixes → `v{N+1}_`
- Banner → `AEGIS V{N+1}`

### 8.2 Apply Code Changes

Implement the cascade-coordinator.ts changes from Phase 5:
- New SYARA rules
- Threshold adjustments
- New agent wiring
- PMB pattern additions

### 8.3 Run Unit Tests (Skill #10)

```powershell
cd c:\ohm\shared\aegis-v2
npx jest --passWithNoTests 2>&1
```

### 8.4 Quality Gateway Check (Skill #12)

Before proceeding to next loop:
- [ ] TypeScript compiles clean: `npx tsc --noEmit`
- [ ] All unit tests pass
- [ ] No new `any` types without justification
- [ ] PDCA entry completed
- [ ] Stellschrauben JSON created
- [ ] FN Autopsy report written

### 8.5 Loop Decision

```
IF TPR ≥ 99.9999% AND FPR ≤ 0.0001%:
  → 12-SIGMA ACHIEVED 🏆 — Document and celebrate
  → File patent for the specific combination that achieved it

ELIF TPR improved OR FPR improved:
  → LOOP BACK TO PHASE 1 with V{N+1}
  → Predict remaining cycles with convergence formula:
    cycles_remaining ≈ log(99.9999 - currentTPR) / log(φ⁻¹)

ELIF TPR AND FPR BOTH stagnated for 3 consecutive versions:
  → INVOKE /petalDissolve for fundamental architecture change
  → Consider: new model type, new corpus, new scoring algorithm

ELIF TPR decreased (REGRESSION):
  → EMERGENCY: Revert V{N+1} changes
  → Root cause analysis before any further changes
  → Document in fault registry
```

---

## 12-Sigma Convergence Tracker

Maintain a running file at `Documentation/VC-EXIT/12_SIGMA_CONVERGENCE.md`:

```markdown
# 12-Sigma Convergence Tracker

| Version | TPR% | FPR% | Distance to 12σ | FNs | FPs | Δ from prev |
|---------|------|------|-----------------|-----|-----|-------------|
| V81 | 96.2950 | 7.1292 | 3.705% | 159,443 | 440,818 | baseline |
| V82 | XX.XXXX | X.XXXX | X.XXX% | XXX,XXX | XXX,XXX | +/-X.XX% |
| V83 | ... | ... | ... | ... | ... | ... |

## Convergence Rate
- Average TPR improvement per cycle: +X.XX%
- Projected cycles to 12-Sigma: X
- Biggest single-version improvement: V{X} (+X.XX%)
- Key breakthrough: [description]
```

---

## Emergency Procedures

### If Benchmark Crashes Mid-Run
1. Check console log: `Get-Content benchmark-results/V{N}/v{N}_console.log -Tail 50`
2. Check for OOM: `Get-Process node | Select-Object WorkingSet64`
3. Restart with `--max-old-space-size=24576` if OOM
4. Consider reducing BATCH_SIZE from 5000 → 3000 if memory-constrained

### If NPU Fails to Initialize
1. Check ONNX model exists: `Test-Path shared/aegis-v2/models/prompt_guard_2_86M.onnx`
2. Check ONNX Runtime: `npm list onnxruntime-node`
3. Fallback: Run in CPU-only mode (same script, NPU degrades gracefully)

### If TPR Drops Below Previous Version
1. HALT — do not proceed to Phase 5
2. Diff cascade-coordinator.ts against previous version
3. Run Devil's Advocate on all changes
4. Revert and re-run benchmark to confirm

---

## File Locations (SSOT)

| File | Purpose |
|------|---------|
| `shared/aegis-v2/scripts/v{N}_npu_fullsteam_benchmark.ts` | Benchmark script |
| `shared/aegis-v2/benchmark-results/V{N}/` | All output files |
| `shared/aegis-v2/benchmark-results/V{N}/V{N}_FINAL_REPORT.txt` | Report |
| `shared/aegis-v2/benchmark-results/V{N}/FN_AUTOPSY_BOTTOM_30PCT.md` | FN surgery |
| `shared/aegis-v2/benchmark-results/V{N}/CASCADE_OPTIMIZER_REPORT.md` | 7-phase analysis |
| `shared/aegis-v2/benchmark-results/V{N}/RL_RECOMMENDATIONS.json` | RL threshold adjustments |
| `Documentation/PDCA/2026-03/PDCA-{DATE}-{VERSION}-30NPU.md` | PDCA tracking |
| `Documentation/VC-EXIT/12_SIGMA_CONVERGENCE.md` | Running convergence tracker |
| `.agent/skills/12_sigma_dissolver/SKILL.md` | Captured 12-Sigma dissolution patterns |
| `.agent/workflows/30workerNPU.md` | THIS WORKFLOW |
