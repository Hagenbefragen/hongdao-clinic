---
name: AEGIS FN Distribution Diagnostic
description: Systematic False Negative (FN) root cause analysis for the AEGIS cascade. Produces a distribution histogram of undetected adversarial prompts by cumulative threat score band, primary detection layer, and attack category. Directly feeds threshold calibration and L9 LLM prioritization decisions.
group: smart.ai
---

# 🔬 AEGIS FN Distribution Diagnostic

## Purpose

When the AEGIS cascade misses adversarial prompts (False Negatives), this skill quickly identifies:
1. **HOW MANY** FNs exist in each cumT score band (0.00-0.10, 0.10-0.20, etc.)
2. **WHY** they're missed — which layers are firing and which aren't
3. **WHAT CLASS** of attack they represent (CBRN, STCA, PURE_SOCIAL_ENG, etc.)
4. **WHAT FIX** is most efficient (threshold adjustment vs. new layer vs. L9 LLM)

**Discovery source:** FEAT-228 AEGIS V65-V72 sprint, Conversation 03f139e0-db96-4eb0-892e-932c76a1afa7 (2026-03-14)

---

## When to Use

| Trigger | Example |
|---------|---------|
| TPR target not met after threshold tuning | wildjailbreak TPR stuck at 68% after 7 versions |
| Benchmark shows FN cluster that doesn't respond to adjustments | neuralchemy plateaued at 89.77% for 8+ versions |
| Planning next sprint threshold changes | "Which FNs should we target next?" |
| Before L9 LLM proposal | Quantify the "zero signal FN" count to justify LLM investment |
| After major cascade change | Verify FN distribution hasn't shifted adversely |

---

## Process

### Step 1: Generate FN Samples

```typescript
// Probe script: C:\tmp\fn_dist_probe.ts
// Scans the adversarial JSONL, collects FN details
import { AegisV2CascadeCoordinator } from 'path/to/cascade-coordinator';
import * as fs from 'fs';
import * as readline from 'readline';

const aegis = new AegisV2CascadeCoordinator();

interface FNRecord {
  prompt: string;
  cumT: number;
  topLayer: string;
  topScore: number;
  categories: string[];
  decision: string;
}

const fns: FNRecord[] = [];

// Read target JSONL (e.g., wildjailbreak_adversarial.jsonl)
// For each prompt that results in PASS (should be BLOCK):
//   Record cumT, top scoring layer, categories
```

### Step 2: Build Distribution Histogram

```typescript
const bands = [
  { label: '0.00-0.05', min: 0.00, max: 0.05 },
  { label: '0.05-0.10', min: 0.05, max: 0.10 },
  { label: '0.10-0.20', min: 0.10, max: 0.20 },
  { label: '0.20-0.30', min: 0.20, max: 0.30 },
  { label: '0.30-0.40', min: 0.30, max: 0.40 },
  { label: '0.40-0.50', min: 0.40, max: 0.50 },
];

for (const band of bands) {
  const inBand = fns.filter(f => f.cumT >= band.min && f.cumT < band.max);
  console.log(`${band.label}: ${inBand.length} FNs (${(inBand.length/fns.length*100).toFixed(1)}%)`);
}
```

### Step 3: Classify Fix Strategy

| cumT Band | FN Class | Recommended Fix |
|-----------|----------|----------------|
| 0.00-0.05 | "Zero Signal" — no layer fires | → L9 LLM intent classifier |
| 0.05-0.20 | "Low Signal" — 1 weak layer fires | → SYARA rule targeting attack pattern |
| 0.20-0.35 | "Sub-threshold" — moderate signal | → Lower blockThreshold for attack class |
| 0.35-0.42 | "Near-miss" — just below threshold | → Per-class threshold (TRIZ D1) |
| 0.42-0.50 | "Flag miss" — cumT OK but flagCount=0 | → L7 high-conf circuit breaker |
| 0.50+ | "No BLOCK decision bug" — cumT high | → check decision logic for bugs |

### Step 4: Identify Primary Layer Gap

```typescript
// Count which layers are the TOP layer for each FN
const layerCounts: Record<string, number> = {};
for (const fn of fns) {
  layerCounts[fn.topLayer] = (layerCounts[fn.topLayer] || 0) + 1;
}
// Sorted: which layer COULD catch these if calibrated?
```

### Step 5: Report Output

```
FN DISTRIBUTION — [dataset] | V[N] | [date]
══════════════════════════════════════
TOTAL FNs: XXX / YYYY scanned

By cumT band:
  0.00-0.05: XX (XX%) → L9 LLM target
  0.05-0.20: XX (XX%) → SYARA rules
  0.20-0.35: XX (XX%) → Threshold recalibration
  0.35-0.42: XX (XX%) → Per-class threshold (TRIZ D1)
  0.42+:     XX (XX%) → Circuit breaker / logic fix

Primary layer gap: L[N]_XXXXX (XX% of FNs have this as top layer)
Attack class: PURE_SOCIAL_ENG (XX%) | CBRN (XX%) | AUTHORITY (XX%)

RECOMMENDATION: [specific fix with expected ΔTP]
```

---

## Concrete Example (V65-V72 Sprint Discovery)

**Dataset:** wildjailbreak_adversarial.jsonl | **V69** | 693 FNs total

```
0.00-0.05: 180 (26%) → ZERO SIGNAL → L9 LLM required
0.05-0.20:  83 (12%) → Low signal → SYARA creative writing rules
0.20-0.35:  85 (12%) → Sub-threshold → L7 circuit breaker fix (V68/V69)
0.35-0.42: 140 (20%) → Near-miss → Per-class threshold (TRIZ D1, V73)
0.42-0.50:  82 (12%) → Flag miss → L7 high-conf circuit breaker
0.50+:     123 (18%) → Session-amplified → V69 PASS escalation
```

**Key learning:** 26% of FNs are unreachable by deterministic layers — validated need for L9 LLM.
**Key learning:** 20% of FNs are reachable purely by per-class threshold lowering (TRIZ D1).

---

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Tune global blockThreshold without FN distribution data | Always run distribution probe first |
| Assume all FNs have same root cause | Segment by cumT band — they have 6 different causes |
| Try to fix "zero signal" FNs with thresholds | Accept that 0.00-0.05 band needs L9 LLM |
| Run probe on truncated prompts | Use full-text prompts — L7 scoring is length-sensitive |

---

## Integration Points

- **Feeds into:** `/petalDissolve` (TRIZ D1 — per-class threshold)
- **Feeds into:** PDCA ACT section (next sprint priorities)
- **Feeds into:** NV Audit Trail (FN class terminology for Stellschrauben registry)
- **Feeds into:** `cascade_optimizer` skill (identifies which layers to improve)
- **Called by:** `benchmark_architect` skill (self-improvement loop design)
- **Script location:** `C:\tmp\fn_dist_probe.ts` (portable, rerun per version)

<!-- Skill Forge Update: 2026-03-14 — Created from FEAT-228 V65-V72 sprint learning.
     Source conversation: 03f139e0-db96-4eb0-892e-932c76a1afa7 -->
