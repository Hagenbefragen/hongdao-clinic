---
name: Context Guardian — CWP Engine
description: Comprehensive Context Window Protocol (CWP) engine implementing all 5 dissolution layers from FEAT-278. Prevents AI agent quality degradation through Task Size Estimation, Adaptive Phase Cascade, Micro-Checkpoints, Metabolism Monitoring, and Dual-Channel Verification. Use when managing complex multi-step tasks, when context health needs assessment, or when the user says "context health check".
---

# 🧠 Context Guardian — CWP Engine (FEAT-278)

> **Version:** 1.0 — 2026-03-22
> **DISSOLVE Survivability:** 96/100 (5 TRIZ dissolutions + 12 enforcement gates)
> **Implements:** CWP Rules 1-5 from AGENTS.md §CWP
> **Quick check:** Use `/contextcheck` workflow for a fast health assessment

## Purpose

The Context Guardian is the comprehensive skill for managing AI agent context window health. It combines all 5 dissolutions from FEAT-278 into a single, cohesive protocol that prevents quality degradation on complex tasks.

**When to invoke this skill:**
- Starting a complex multi-step task (>5 tool calls expected)
- When `/marathon` mode is active
- When the user says "context health check" or `/contextcheck`
- When any petal workflow estimates >40% context budget
- When output quality appears to be declining

## The 5 Layers

### Layer 1: Task Size Estimation (D-1 → CWP-1)

**Before starting any complex task, estimate its context cost.**

Estimation heuristics (proxy signals since direct token counting is unavailable):

| Signal | Approximate Token Cost | Weight |
|--------|----------------------|--------|
| Each file read (view_file) | ~2,000-8,000 tokens | High |
| Each grep_search result | ~500-2,000 tokens | Medium |
| Each web search | ~1,000-3,000 tokens | Medium |
| Each skill definition loaded | ~2,000-5,000 tokens | High |
| AGENTS.md system rules | ~8,000 tokens (fixed) | Fixed |
| Conversation history per exchange | ~500-2,000 tokens | Accumulating |
| Each code generation output | ~1,000-5,000 tokens | High |

**Budget decision tree:**

```
Estimated total < 40% of window → TIER 0: Full speed, no CWP overhead
Estimated total < 60% of window → TIER 1: Enable micro-checkpoints, compress tool outputs
Estimated total < 80% of window → TIER 2: Auto-decompose into 2-3 phases, disk handoff
Estimated total ≥ 80% of window → TIER 3: MUST use /marathon with checkpoint/resume
```

**GATE-2 Compliance:** All thresholds are RATIOS (40%/60%/80%), never absolute token counts. This makes CWP scale-invariant — it works at any context window size (128K, 200K, 1M, etc.).

**GATE-4 Compliance:** Estimation runs FIRST, before reading any user-provided files or content. If the estimation itself shows >80% cost → declare "/marathon required" before consuming any budget.

### Layer 2: Adaptive Phase Cascade (D-1 → CWP-2)

**Dynamic escalation based on real-time health signals.**

The key innovation: the cascade ESCALATES AUTOMATICALLY when degradation is detected. It doesn't wait for failure — it acts at the FIRST signal.

```
START: Single-phase mode (Tier 0)
  ↓ (if micro-checkpoint summaries getting vague)
ESCALATE: Compression mode (Tier 1)
  ↓ (if metabolism check shows 🟡)
ESCALATE: Phase decomposition (Tier 2)
  ↓ (if metabolism check shows 🟠)
ESCALATE: Marathon mode (Tier 3)
  ↓ (if metabolism check shows 🔴)
HALT: Write checkpoint, recommend new conversation
```

**GATE-7 Compliance (Zero-Touch Activation):** For simple tasks (Tier 0), CWP produces NO output and adds ZERO overhead. The user never sees CWP unless a task is complex enough to need it.

**GATE-8 Compliance (Observable Proof):** When CWP triggers an escalation, the agent EXPLICITLY states it:
- "🟡 CWP: Context at ~55%. Enabling compression to preserve quality."
- "🟠 CWP: Context health degrading. Writing checkpoint and splitting into phases."
- "🔴 CWP: Context exhausted. Checkpoint written. Please start a new conversation."

### Layer 3: Micro-Checkpoints (D-2 → CWP-3)

**Continuous, zero-overhead state tracking merged into natural work flow.**

After processing ANY tool output (file read, search, command):
1. Mentally note 1 sentence: `"[tool]: [what was learned]"`
2. When 10+ notes accumulate → compress into 3-sentence digest
3. When writing to disk → include SHA-256 hash + conversation ID + FEAT# + timestamp

**Checkpoint file format:**

```markdown
# CWP Checkpoint — FEAT-XXX — [YYYY-MM-DD HH:MM]

## Original Request
[Verbatim copy of user's first message]

## Work Completed
1. [Summary item 1]
2. [Summary item 2]
...

## Files Modified
- `path/to/file1.ts` — [what changed]
- `path/to/file2.md` — [what changed]

## Remaining Work
- [ ] Task 1
- [ ] Task 2

## Context Summary (compressed)
[3-sentence digest of all micro-checkpoints]

## Metadata
- Conversation ID: [ID]
- FEAT: FEAT-XXX
- Petal: [SENSE/DISSOLVE/SHIP/SELL/PROTECT/MEASURE]
- SHA-256: [hash of content above]
- Timestamp: [ISO 8601]
```

**GATE-5 Compliance:** Every checkpoint includes SHA-256, conversation ID, FEAT#, and timestamp.
**GATE-10 Compliance:** Checkpoints older than 72 hours are considered expired.

### Layer 4: Metabolism Monitor (D-3 → CWP-4)

**Behavioral self-assessment — Channel A.**

Every 10 tool calls, the agent pauses for 4 questions:

| # | Question | Healthy Signal | Degraded Signal |
|---|----------|---------------|-----------------|
| 1 | Am I still specific? | File paths, line numbers, precise code | Vague language, "the file", "the function" |
| 2 | Can I recall original request? | Verbatim quote | Paraphrase or incorrect summary |
| 3 | Following AGENTS.md rules? | DR-xxx referenced, naming correct | Rules skipped, `console.log` used |
| 4 | Self-coherent? | Consistent recommendations | Contradicting earlier statements |

**Scoring:** 4Y=🟢 | 3Y=🟡 | 2Y=🟠 | ≤1Y=🔴

### Layer 5: Dual-Channel Verification (D-5 → CWP-5)

**Objective cross-check — Channel B.**

This is the critical trust layer. It eliminates the "drunk driver" problem where a degraded agent may be too degraded to notice its own degradation.

After every major output, the agent must PROVE health by producing 4 objective facts:

1. **Exact Request:** The user's original request, verbatim
2. **File References:** ≥3 specific file paths or function names from earlier in the conversation
3. **Active Rule:** The AGENTS.md rule currently being followed (e.g., "DR-040", "CWP-3")
4. **Current State:** FEAT number + petal stage + current deliverable

**Verdict Matrix (Cross-reference A × B):**

| A \ B | B = PASS | B = FAIL |
|-------|----------|----------|
| 🟢 | 🟢 Truly healthy | 🟠 **SELF-BIAS! Force phase break** |
| 🟡 | 🟡 Mild, functional | 🟠 Degradation confirmed |
| 🟠 | 🟠 Phase break needed | 🔴 Severe — checkpoint + halt |
| 🔴 | 🔴 Critical | 🔴 Critical — new conversation |

**GATE-6 Compliance:** Channel B makes self-gaming impossible. An agent that games Channel A ("I feel fine!") still FAILS Channel B if it can't produce correct file paths and FEAT numbers.

## PDCA Integration

After every CWP assessment, log the result for threshold calibration:

```markdown
## CWP Assessment Log
- Date: [ISO 8601]
- Channel A: [🟢/🟡/🟠/🔴] ([score]/4)
- Channel B: [PASS/FAIL]
- Verdict: [🟢/🟡/🟠/🔴]
- Estimated context %: [X%]
- Actual quality observed: [brief note]
- Action taken: [none/compress/phase break/halt]
- Was action correct? [Y/N/Unknown]
```

After 50+ assessments, analyze patterns to refine thresholds:
- If false-positive rate > 10% → relax Tier 1 threshold from 40% to 45%
- If false-negative rate > 5% → tighten Tier 2 threshold from 80% to 75%
- If Channel B FAIL rate > 15% → investigate and increase assessment frequency

## Enforcement Gates Summary

| Gate | Rule | Enforcement |
|------|------|-------------|
| GATE-1 | CWP in AGENTS.md as MANDATORY | `/audit_BP` dimension 17 |
| GATE-2 | Ratio-based thresholds | Scale-invariant by design |
| GATE-3 | Annual CWP Review | PDCA log checkpoint |
| GATE-4 | Estimation-first | Petal workflow ordering |
| GATE-5 | Checksummed checkpoints | SHA-256 + metadata |
| GATE-6 | Dual-Channel anti-gaming | Channel B objective proof |
| GATE-7 | Zero-Touch Activation | Threshold-based, invisible for simple tasks |
| GATE-8 | Observable Proof | Explicit CWP status messages |
| GATE-9 | Graceful Degradation | CWP is additive, not exclusive |
| GATE-10 | Auto-Expiry (72h) | Checkpoint cleanup rule |
| GATE-11 | Calibrated Thresholds | PDCA empirical adjustment |
| GATE-12 | Not a quality guarantee | Explicit scope limitation |

## Quick Reference

```
USER COMMANDS:
  "context health check"     → Full CWP-4 + CWP-5 assessment
  "/contextcheck"            → Same (workflow shortcut)
  "compress and checkpoint"  → Force CWP-3 checkpoint to disk
  "phase break"              → Force CWP-2 phase decomposition
  "how much have you read?"  → Agent reports proxy context estimate

AGENT AUTO-TRIGGERS:
  Every 10 tool calls   → CWP-4 metabolism check
  Every major output    → CWP-5 dual-channel verification (when in Tier 1+)
  On task start         → CWP-1 estimation
  On degradation signal → CWP-2 auto-escalation
```

## Origin

- **FEAT-278:** Context Window Quality Optimization
- **SENSE PMF:** 9.0/10 🟢
- **DISSOLVE Survivability:** 96/100 (hardened with 12 gates)
- **TRIZ Dissolutions:** D-1 Adaptive Phase Cascade, D-2 Inline Micro-Checkpoints, D-3 Metabolism Monitor, D-4 Tiered Rule Architecture, D-5 Dual-Channel Verification
- **Research:** SENSE report analyzed context degradation patterns, "Lost in the Middle" attention dilution, and industry shift from prompt engineering to context engineering
