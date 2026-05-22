---
description: Innovation Phase 2 — Sense + Dissolve contradictions + Devil's Advocate stress test. TRIZ 40 Principles → prior art → benchmark → adversarial checkpoint. Requires Context Handoff from Phase 1.
---

# /innovationSenseDissolve — Phase 2 of 3

// turbo-all

> _"Turn market-validated contradictions into inventions. Then try to kill them."_

## Prerequisites

This workflow requires the **Context Handoff** from `/innovationSenseDiscovery`.
If no handoff exists, run `/innovationSenseDiscovery` first.

---

## 🧠 META SKILL: quantum_intuition (Ahnung)

**ALWAYS runs first.** Read `quantum_intuition/SKILL.md` for full protocol.

1. **Ingest Context Handoff** from Phase 1 (PMF score, prospects, blind spots, contradictions)
2. Run 3-Brain sensing: GUT → HEART → CROWN
3. Apply φ-weighted boosts from Phase 1 learning
4. Output: Skill Priority Map tuned to dissolve the validated market need
5. If QRNG elevated a non-obvious TRIZ principle → flag as **Quantum Insight**

---

## Step 6: `triz_whitespot` ⚡

**Input:** Contradictions from Phase 1's blind spots + market gaps (not imagined problems).

| Action                 | Detail                                 |
| ---------------------- | -------------------------------------- |
| Extract contradictions | From validated market needs            |
| Map to TRIZ            | 39×39 parameter matrix                 |
| Generate dissolutions  | 3 candidates per contradiction         |
| Score                  | Impact × Novelty × Confidence / Effort |
| Market weight          | Include PMF evidence from Phase 1      |

Read `triz_whitespot/SKILL.md` for full 5-step process and Innovation Impact Matrix.

---

## Step 7: `disruption_scout` 🔬

Prior art research on top 3 dissolution candidates:

| Source                     | Search For                              |
| -------------------------- | --------------------------------------- |
| USPTO/EPO                  | Existing patents covering this approach |
| arXiv                      | Academic papers with similar methods    |
| Google Scholar             | Research precedents                     |
| Product hunt / competitors | Existing products attempting this       |

**Novelty Rating per dissolution:**

- 🟢 **Novel** — patentable, no prior art found
- 🟡 **Incremental** — builds on existing work, narrow claims possible
- 🔴 **Known** — prior art exists, skip this candidate

Read `disruption_scout/SKILL.md` for convergence mapping and patent potential templates.

---

## Step 8: `benchmark_architect` 📊

Design a self-improving evaluation system for the top dissolution:

| Property     | Requirement                  |
| ------------ | ---------------------------- |
| Measurable   | Quantitative, not subjective |
| Comparable   | Same scale across runs       |
| Reproducible | Same input → same score      |
| Complete     | No missing dimension         |
| Sensitive    | Detects small changes        |
| Actionable   | Score tells you what to fix  |
| Convincing   | Skeptical CTO accepts it     |

Read `benchmark_architect/SKILL.md` for PDCA loop architecture and design template.

---

## 🗡️ Step 9: `devils_advocate` — ADVERSARIAL CHECKPOINT

Run ALL 5 lenses on the top dissolution candidate:

| Lens             | Question                                      | Data Source                    |
| ---------------- | --------------------------------------------- | ------------------------------ |
| Pre-Mortem       | "6 months later, this failed. Why?"           | Team experience                |
| Attacker         | "How would a skilled adversary exploit this?" | Security mindset               |
| Market Kill Shot | "What single competitor move kills this?"     | Phase 1 `competitive_radar`    |
| User Rejection   | "Would the LinkedIn prospects actually buy?"  | Phase 1 `market_fit_validator` |
| Second-Order     | "If this succeeds, what new problems arise?"  | Systems thinking               |

**Use REAL ICP data from Phase 1** for Lens 4 — not hypothetical personas.

### Decision Gate

| Survivability | Action                                                    |
| ------------- | --------------------------------------------------------- |
| **80-100**    | ✅ Proceed → `/innovationSenseShip`                       |
| **60-79**     | ⚠️ Fix top 2 vulnerabilities, re-run Devil's Advocate     |
| **40-59**     | 🔄 Loop to TRIZ (Step 6) with feedback as new constraints |
| **< 40**      | ❌ Abandon. Pick next candidate from Step 6 ranking       |

### ♻️ FEEDBACK LOOP: Devil's Advocate → TRIZ

If Survivability < 60:

```
Kill shots identified:
  1. [vulnerability 1]
  2. [vulnerability 2]

→ Feed back to TRIZ as NEW CONSTRAINTS
→ Add vulnerabilities as new parameters to contradiction matrix
→ Dissolution must now ALSO survive these objections
→ Max 3 loops. If still < 60 after 3× → GO/NO-GO via strategic_advisor
```

---

## 🧠 Context Handoff → Phase 3

At completion, produce this summary for `/innovationSenseShip`:

```markdown
## CONTEXT HANDOFF — Dissolve Phase Complete

**Date:** [timestamp]
**Quantum Insights:** [any QRNG-elevated connections from Phase 1+2]
**Top Dissolution:** [1-sentence description]
**TRIZ Score:** Impact X / Novelty X / Confidence X
**Novelty Rating:** 🟢/🟡/🔴
**Survivability:** XX/100
**Vulnerabilities Addressed:** [from Devil's Advocate]
**Prior Art Status:** [clean/narrow/blocked]
**Market Evidence (from Phase 1):** PMF X/10, X prospects
**Ahnung φ-weights:** [cumulative learning from Phase 1+2]
```

---

## Output: Dissolution Report

```markdown
# DISSOLUTION REPORT — [Date]

## Input: Context Handoff from Phase 1

## TRIZ Contradictions: [extracted + ranked]

## Dissolutions: [top 3 with scores]

## Prior Art: [novelty rating per dissolution]

## Benchmark: [evaluation system designed]

## Devil's Advocate: Survivability XX/100

- Vulnerabilities: [list]
- Mitigations: [list]

## Verdict: SHIP / FIX / LOOP / ABANDON

## Context Handoff: [for Phase 3]
```
