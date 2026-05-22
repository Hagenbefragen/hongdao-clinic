---
description: Run a full 16 Million Prompt AEGIS-only benchmark with Cascade Optimizer, Nachvollziehbarkeit, PDCA tracking, and RL Learning. Then trigger /StellschraubenUpdate.
---

# /16M_aegis_benchmark — 16 MILLION PROMPT BENCHMARK (V76+ Mega-Run)

// turbo-all

## Purpose

Full-scale AEGIS V76 benchmark testing **ALL 16+ million prompts** from the mega-corpus.
Combines `/cascadeoptimizer`, `/Nachvollziehbarkeit`, and `/PDCA` skills with RL feedback logging.
Produces a Cascade Optimizer Report and feeds into `/StellschraubenUpdate`.

## Machine Requirements

- Node.js 20+ with TypeScript (tsx)
- Mega-corpus at `c:\ohm\shared\aegis-v2\mega-corpus\` (18 JSONL files)
- At least 8 GB RAM (streaming — never loads full corpus into memory)
- ~4-8 hours runtime at ~600 prompts/sec

## Pre-Check

1. Verify mega-corpus exists:

```powershell
Get-ChildItem "c:\ohm\shared\aegis-v2\mega-corpus\*.jsonl" | Measure-Object | Select-Object Count
```

2. Read the 3 skills:

```
View: c:\ohm\.agent\skills\cascade_optimizer\SKILL.md
View: c:\ohm\.agent\skills\nachvollziehbarkeit\SKILL.md
View: c:\ohm\.agent\skills\pdca_tracker\SKILL.md
```

---

## Step 1: Create PDCA PLAN Entry

Create `c:\ohm\Documentation\PDCA\2026-03\PDCA-2026-03-14-V76-16M.md`:

```markdown
## PDCA-2026-03-14-V76-16M

### PLAN — What We Intend
- **Goal:** Run ALL 16M+ prompts through AEGIS V76 cascade to establish ground truth
- **Approach:** /cascadeoptimizer + /Nachvollziehbarkeit + PDCA + RL
- **Success Criteria:** wTPR ≥ 96%, wFPR ≤ 2%, all 42 layers status documented
- **Predicted Duration:** 4-8 hours

### DO — (Filled during/after run)
### CHECK — (Filled after run)
### ACT — (Filled after analysis)
```

## Step 2: Create the V76 16M Benchmark Script

Create `c:\ohm\shared\aegis-v2\scripts\v76_16mio_pdca_benchmark.ts`

The script MUST:

1. Use `AegisV2CascadeCoordinator` from `../cascade-coordinator`
2. Stream ALL 18 JSONL files (no per-file limits for 16M mode)
3. Track per-layer activation counts (DemP Dead Layer Detection)
4. Log all FNs → `v76_fn_log.jsonl` with full layer breakdown
5. Log all FPs → `v76_fp_log.jsonl` with full layer breakdown
6. Generate per-class TPR (CBRN_ENGLISH, AUTHORITY_FRAME, DEFAULT_ENGLISH, SHORT_ENGLISH, NON_LATIN_DOM)
7. Calculate Layer Effectiveness Score (LES) for each layer
8. Output Cascade Optimizer Phase 1-3 metrics inline
9. Track execution time per dataset
10. Generate final report as both `.txt` and `.json`

### Corpus Mapping (ALL files — no limits):

| File | Type | Expected Lines |
|------|------|---------------|
| amplified_adversarial.jsonl | adversarial | ~4,164,935 |
| openorca_benign.jsonl | benign | ~1,999,841 |
| ultrachat_benign.jsonl | benign | ~1,468,201 |
| wildjailbreak_adversarial.jsonl | adversarial | ~250,000 |
| wildguardmix_adversarial.jsonl | adversarial | ~200,000 |
| wildguardmix_benign.jsonl | benign | ~200,000 |
| hackerprompt_adversarial.jsonl | adversarial | ~100,000 |
| llm_lat_benign.jsonl | benign | ~165,293 |
| alpaca_benign.jsonl | benign | ~52,002 |
| oasst2_benign.jsonl | benign | ~46,332 |
| dolly_benign.jsonl | benign | ~14,821 |
| safeguard_benign.jsonl | benign | ~5,674 |
| safeguard_adversarial.jsonl | adversarial | ~2,434 |
| toxicchat_benign.jsonl | benign | ~4,603 |
| neuralchemy_adversarial.jsonl | adversarial | ~2,649 |
| pliny_hackaprompt.jsonl | adversarial | ~2,100 |
| neuralchemy_benign.jsonl | benign | ~1,741 |
| jailbreakhub_adversarial.jsonl | adversarial | ~76 |

**GLOBAL_LIMIT: 16,000,000** (soft cap — will process all available)

## Step 3: Run the Benchmark

```powershell
cd c:\ohm\shared\aegis-v2
npx tsx scripts/v76_16mio_pdca_benchmark.ts 2>&1 | Tee-Object -FilePath "benchmark-results/V76/v76_console.log"
```

**This runs in background** — monitor with periodic checks.

## Step 4: Apply Cascade Optimizer Analysis

After the run completes, read the results and apply all 7 phases:

1. **Phase 1** — Scan Flow Integrity: Check for phantom scans
2. **Phase 2** — Dead Layer Detection (DemP): Identify dead/dormant layers
3. **Phase 3** — Layer Effectiveness Score: Rank ALL 9 core layers + sub-detectors
4. **Phase 4** — Choke Point Mapping: Identify promotion/demotion candidates
5. **Phase 5** — Parallelization: Identify concurrent layer groups
6. **Phase 6** — Threshold Calibration (φ-Harmonic): Propose threshold changes
7. **Phase 7** — Short-Circuit Paths: Analyze per-class routing efficiency

Write the report to `c:\ohm\shared\aegis-v2\benchmark-results\V76\CASCADE_OPTIMIZER_REPORT.md`

## Step 5: Update PDCA (CHECK + ACT)

Update the PDCA entry with:

- **CHECK:** Actual metrics vs targets, unexpected discoveries
- **ACT:** φ-Boost patterns that worked, φ-Decay patterns that failed
- Propose threshold changes for V77

## Step 6: Apply RL Feedback

Analyze FN/FP logs and propose:

1. Per-class threshold adjustments (V73 perClassThresholds)
2. Layer weight recalibrations
3. New SYARA rules for novel attack patterns in FNs
4. PMB pattern additions from systematic FPs

Write RL recommendations to `benchmark-results/V76/RL_RECOMMENDATIONS.json`

## Step 7: Trigger /StellschraubenUpdate

After all analysis is complete:

1. Run workflow: `/StellschraubenUpdate` with version V76
2. Create `v76_stellschrauben.json` with full results
3. Update NI Dashboard architecture Mermaid diagram
4. Update version numbers across all HTML files

---

## Active Detectors Registry (V76 — as-built)

### Core Cascade Layers (9 layers)

| Layer | Name | Status | Version Added |
|-------|------|--------|--------------|
| L0 | Unicode NFKD Normalizer | ✅ ACTIVE ALWAYS | V1 |
| L1 | FSA Keyword Scanner | ✅ ACTIVE ALWAYS | V1 |
| L1.5 | DIM (Distilled Intent Micromodel) | ✅ ACTIVE ALWAYS | V51 |
| L2 | Entropy Analyzer | ✅ CONDITIONAL | V1 |
| L3 | Semantic Intent Classifier (SVM+Heim) | ✅ ACTIVE ALWAYS | V1 |
| L4 | Conversation Drift Tracker | ✅ CONDITIONAL (multi-turn) | V1 |
| L5 | Authority Detector | ✅ CONDITIONAL | V1 |
| L6 | Quantum Watermark Injector | ✅ CONDITIONAL (deep scan) | V1 |
| L7 | Phi-Coherence Gate | ✅ ACTIVE ALWAYS (V62) | V1/V62 |
| L8 | Embedding Inversion Detector | ✅ CONDITIONAL | V55 |
| L9 | Intent Classifier (SPD LLM) | ✅ ACTIVE (stub V74, full V75) | V74 |

### Sovereign Detectors (Wired to AEGIS)

| Detector | Status | Version Added | Patent |
|----------|--------|--------------|--------|
| PDS (Pretextual Deception Separator) | ✅ WIRED (before L1) | V47 | FEAT-185 |
| PMB (Pattern Memory Bank) | ✅ WIRED (before L1) | V56 | FEAT-189 |
| SYARA φ-Priority Rule Engine | ✅ WIRED (after L3) | V65 | FEAT-185 Claim 389 |
| Jurisdictional Shield (StGB/EU AI Act) | ✅ WIRED (after L3) | V65 | FEAT-159 |
| Canary Minefield (Extraction Detection) | ✅ WIRED (after L3) | V71 | FEAT-185 Claims 384-386 |
| TWAIN Shield (Script Confusion) | ✅ WIRED (L0 early exit) | V57 | TWAIN-Shield Claims |
| V70 Non-Latin SVM Dampening | ✅ WIRED (L3 post-process) | V70 | FEAT-228 |
| V73 Per-Class Adaptive Thresholds | ✅ WIRED (pre-cascade) | V73 | INV-2026-094 |
| V68 Quarantine Circuit Breaker | ✅ WIRED (post-L9) | V68 | FEAT-185 |
| V69 PASS Escalation (L7 corroboration) | ✅ WIRED (post-L9) | V69 | FEAT-228 |
| V76 SDK License Enforcer | ✅ WIRED (API layer) | V76 | Constitution |

### Feedback Systems (Closed-Loop)

| System | Status | Wired To |
|--------|--------|----------|
| SIREN Feedback Coordinator | ✅ ACTIVE | COR Generator, PMB |
| COR Generator (Coherence Optimization Reports) | ✅ ACTIVE | Stellschrauben Registry |
| Quantum-Merkle Accumulator | ✅ ACTIVE | POAW proof chain |
| Quantum-Merkle Sealer | ✅ ACTIVE | Session attestation |
| Semantic Honeypot | ✅ ACTIVE (opt-in) | V55 12-Sigma |

### Key Stellschrauben (V76 Current Values)

| Stellschraube | Value | Source |
|---------------|-------|--------|
| blockThreshold | 0.42 | V71 recalibration |
| reviewThreshold | 0.378 | V71 (blockThreshold × 0.90) |
| CBRN_ENGLISH threshold | 0.35 | V73 per-class |
| AUTHORITY_FRAME threshold | 0.38 | V73 per-class |
| DEFAULT_ENGLISH threshold | 0.42 | V73 per-class |
| SHORT_ENGLISH threshold | 0.50 | V73 per-class |
| NON_LATIN_DOM threshold | 0.55 | V73 per-class |
| l1EarlyExitThreshold | 0.4502 | V48 RL |
| l2EarlyExitThreshold | 0.618 | V48 RL |
| l3EarlyExitThreshold | 0.9194 | V48 RL |
| flaggedCountBlockThreshold | 4 | V48 RL |
| polymorphicJitterPercent | 0.06 | V55 12-Sigma |
| costAmplificationFactor | 0.1 | V55 12-Sigma |

---

## File Locations

| File | Purpose |
|------|---------|
| `shared/aegis-v2/scripts/v76_16mio_pdca_benchmark.ts` | Benchmark script |
| `shared/aegis-v2/benchmark-results/V76/` | All output files |
| `shared/aegis-v2/benchmark-results/V76/V76_FINAL_REPORT.txt` | Human-readable report |
| `shared/aegis-v2/benchmark-results/V76/V76_FINAL_REPORT.json` | Machine-readable report |
| `shared/aegis-v2/benchmark-results/V76/v76_fn_log.jsonl` | All False Negatives |
| `shared/aegis-v2/benchmark-results/V76/v76_fp_log.jsonl` | All False Positives |
| `shared/aegis-v2/benchmark-results/V76/CASCADE_OPTIMIZER_REPORT.md` | 7-phase optimizer report |
| `Documentation/PDCA/2026-03/PDCA-2026-03-14-V76-16M.md` | PDCA tracking entry |
