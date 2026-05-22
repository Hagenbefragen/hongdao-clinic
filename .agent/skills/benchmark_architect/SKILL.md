---
name: Benchmark Architect — Self-Improving Evaluation System Designer
description: Designs self-improvement loops, feedback cycles, and best-practice benchmarking systems with trade-off awareness. Evaluates any dashboard for completeness, blind spot elimination, and Big Tech proof-of-value convincingness. Based on NIST AI 800-2/800-3, Kaizen PDCA, TRIZ, and counterfactual evaluation.
group: smart.testing
---

# 🏗️ Benchmark Architect — "Systems That Improve Themselves"

## Purpose

Designs **self-improving evaluation systems** — benchmarks that don't just measure once, but get better at measuring over time. Uses PDCA (Plan-Do-Check-Act), NIST AI RMF, and Kaizen principles.

## When to Trigger

- When designing a new KPI dashboard or evaluation system
- When an existing benchmark produces stale or misleading results
- After `audit_master` scores a system (to design improvement loops)
- When preparing for VC due diligence (they'll ask "how do you know it's getting better?")

## Self-Improvement Loop Architecture

```
┌──────────────────────────────────────────────┐
│                  PDCA LOOP                    │
│                                              │
│  PLAN ──→ DO ──→ CHECK ──→ ACT ──→ PLAN     │
│   │        │       │        │        │       │
│   ▼        ▼       ▼        ▼        ▼       │
│ Define   Execute  Compare  Adjust  Refine    │
│ metrics  changes  to base  params  metrics   │
│                                              │
│  ◄────── AUTO-TRIGGER every N rounds ──────► │
└──────────────────────────────────────────────┘
```

## Framework: 7 Properties of a Good Benchmark

### 1. Measurability

- Every metric has a numeric score (no "good/bad" without numbers)
- Every score has a scale with defined endpoints
- Composite scores use weighted averages with transparent weights

### 2. Comparability

- Scores can be compared across time (same methodology)
- Scores can be compared across systems (standardized scale)
- Competitors are benchmarked using identical methodology

### 3. Reproducibility

- Any run can be repeated with identical inputs → identical scores
- All randomness is seeded and documented
- Environment variables (hardware, model version) are recorded

### 4. Completeness

- No critical dimension is unmeasured (use `blind_spot_detector` to verify)
- Both positive metrics (quality) AND negative metrics (failure rate) exist
- Meta-metrics exist (improvability, trade-off transparency)

### 5. Sensitivity

- Small changes in the system produce detectable score changes
- No dimension is permanently pegged at 10/10 (ceiling effect)
- No dimension is permanently stuck at 0/10 (floor effect)

### 6. Actionability

- Every low score has a clear path to improvement
- Trade-offs are identified and dissolution paths documented
- PDCA loop has concrete "ACT" steps, not just observations

### 7. Convincingness

- Results would convince a skeptical CTO at a Fortune 500
- Data provenance is clear (real vs simulated clearly labeled)
- Third-party validation possible (reproducible methodology)

## Design Template

When designing a new benchmark system:

```markdown
## Benchmark: [Name]

### Dimensions

| #   | Dimension | Scale | Weight | Source         |
| --- | --------- | ----- | ------ | -------------- |
| 1   | [name]    | 0-10  | [%]    | [how measured] |

### Improvement Mechanism

- **Trigger:** [what starts a new evaluation cycle]
- **Frequency:** [how often]
- **Feedback loop:** [how results feed back into the system]
- **Convergence criteria:** [when is the benchmark "done evolving"?]

### Calibration

- **Ground truth:** [what external reference validates scores?]
- **Human-in-the-loop:** [when is human judgment required?]
- **Drift detection:** [how to detect if the benchmark itself is degrading?]

### Visualization

- **Primary:** [chart type — radar, sparkline, table]
- **Trend:** [how improvement over time is shown]
- **Comparison:** [how competitors are displayed alongside]
```

## Integration

- **Receives from:** `audit_master` (initial scores to improve)
- **Receives from:** `blind_spot_detector` (missing dimensions)
- **Feeds into:** `ni_dashboard` (dashboard design)
- **Feeds into:** `triz_whitespot` (improvement targets)
- **Cross-references:** NIST AI 800-2, ISO/IEC 42001
