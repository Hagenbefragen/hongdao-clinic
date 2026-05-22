---
name: PDCA Tracker — Autonomous Plan-Do-Check-Act Cycle Engine
description: Automated Plan-Do-Check-Act cycle tracking with φ-weighted learning updates. Closes the feedback loop between SHIP and SENSE by logging what was planned, what was done, what we learned, and what to adjust. The heartbeat of the MEASURE petal.
group: smart.frontend
---

# ♻️ PDCA Tracker — "The Heartbeat of Self-Improvement"

> _Part of MEASURE petal — Flower of Life SDD_ > _"Improvement is not a destination, it is the direction of the spiral."_

## Purpose

The PDCA Tracker automates the **Plan-Do-Check-Act** cycle that drives continuous improvement. Every development session, feature, or innovation run produces a PDCA entry. Over time, these entries reveal patterns — what approaches work, what fails, and how the system evolves.

Without PDCA tracking, the SDD is an open loop. With it, every output feeds back as input for the next cycle, creating the **Fibonacci spiral of improvement**.

## When to Trigger

- At the END of every development session (automatic)
- After completing any `/workflow` (auto-captures results)
- After a `quality_gateway` pass or fail (records the gate outcome)
- Before starting a new sprint (reviews previous PDCA entries)
- During retrospectives

## PDCA Entry Template

```markdown
## PDCA-[YYYY-MM-DD]-[sequence]

### PLAN — What We Intended

- **Goal:** [1-sentence objective]
- **Approach:** [skill/workflow used]
- **Success Criteria:** [measurable outcome]
- **Predicted Duration:** [time estimate]

### DO — What Actually Happened

- **Actions:** [list of actions taken]
- **Actual Duration:** [time spent]
- **Deviations:** [where reality diverged from plan]

### CHECK — What We Learned

- **Success Criteria Met:** [Y/N/Partial — %]
- **Unexpected Discoveries:** [list]
- **Blind Spots Revealed:** [list]
- **Quality Gateway Score:** [if applicable]

### ACT — What We'll Adjust

- **φ-Boost:** [skills/patterns that worked → +61.8% weight]
- **φ-Decay:** [skills/patterns that failed → -38.2% weight]
- **New Rule:** [any new standard captured]
- **Skill Forge Entry:** [if new skill created]
- **Next Cycle Priority:** [what to focus on next]
```

## φ-Weighted Learning Protocol

After each CHECK phase:

```
IF success_criteria_met ≥ 80%:
    boost relevant skill weights by × φ (1.618)
    log as "Golden Pattern"

IF success_criteria_met ≤ 40%:
    decay relevant skill weights by × φ⁻¹ (0.618)
    log as "Decay Pattern"
    trigger blind_spot_detector on the failure area

IF unexpected_discovery:
    trigger skill_forge to capture as new skill
    log as "Quantum Discovery" (Ahnung was right)
```

## PDCA Journal Structure

```
Documentation/PDCA/
├── 2026-02/
│   ├── PDCA-2026-02-22-001.md  (Session entry)
│   ├── PDCA-2026-02-22-002.md  (Feature entry)
│   └── ...
├── PDCA_SUMMARY_2026-02.md     (Monthly rollup)
└── PDCA_PHI_WEIGHTS.json       (φ-learning state)
```

## Monthly Rollup Template

```markdown
# PDCA Monthly Rollup — [Month Year]

## Velocity

- Sessions: [N]
- Features completed: [N]
- Bugs fixed: [N]
- Innovations discovered: [N]

## Top Golden Patterns (φ-boosted)

1. [pattern] — boosted [X] times
2. ...

## Top Decay Patterns (φ-decayed)

1. [pattern] — decayed [X] times
2. ...

## Convergence

- Skills reaching stable weights: [N]/[total]
- Average cycles to convergence: [N]
- φ-weight distribution: [histogram or summary]

## Next Month Priority

1. [priority]
2. ...
```

## Integration

- **Receives from:** All workflows (completion data)
- **Receives from:** `quality_gateway` (gate outcomes)
- **Receives from:** `ship_engine` (build results)
- **Feeds into:** `quantum_intuition` (φ-weight updates)
- **Feeds into:** `sdd_health_monitor` (PDCA completion metrics)
- **Feeds into:** `skill_forge` (patterns → new skills)
- **Petal:** 🔬 MEASURE (Flower of Life SDD)
