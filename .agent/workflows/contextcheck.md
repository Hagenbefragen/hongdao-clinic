---
description: Quick context health check — agent self-assesses context window health using Dual-Channel Verification (FEAT-278 CWP)
---

# 🧠 /contextcheck — Context Window Health Assessment

// turbo-all

> **FEAT-278** | **CWP Rule CWP-4 + CWP-5**
> Triggered by user saying `"context health check"`, `/contextcheck`, or automatically every 10 tool calls.

## When to Use

- User explicitly asks for a context health check
- Agent has made 10+ tool calls since last check
- Output quality appears to be degrading (shorter, vaguer, rule violations)
- Before starting a complex sub-task within an ongoing conversation

---

## Step 1: Channel A — Metabolism Self-Check (Behavioral)

Answer these 4 questions internally:

1. **Specificity:** Am I still producing detailed, specific output with precise file paths, function names, line numbers? (Y/N)
2. **Original Request:** Can I recall the user's EXACT original request verbatim from the start of this conversation? (Y/N)
3. **Rule Adherence:** Am I following all AGENTS.md rules (naming conventions, security rules, DR-xxx decisions)? (Y/N)
4. **Self-Coherence:** Have I contradicted anything I said earlier in this conversation? (Y/N)

**Channel A Score:**
- 4 YES = 🟢 Healthy metabolism
- 3 YES = 🟡 Mild degradation — enable compression
- 2 YES = 🟠 Clear degradation — force phase break
- ≤1 YES = 🔴 Critical — STOP immediately

## Step 2: Channel B — Output-Anchored Verification (Objective Proof)

Produce these 4 concrete artifacts to PROVE context health:

1. **Exact Request:** Cite the user's original request from the beginning of this conversation (copy it verbatim)
2. **File References:** List ≥3 specific file paths OR function names that were discussed earlier in this conversation
3. **Active Rule:** Name the current AGENTS.md rule being followed right now (e.g., "CWP-4", "DR-040")
4. **Current Context:** State the current FEAT number, petal stage, and what deliverable you're working on

**Channel B Result:** PASS (all 4 produced correctly) or FAIL (any missing/incorrect)

## Step 3: Cross-Reference — Verdict Matrix

| Channel A | Channel B | Verdict | Action |
|-----------|-----------|---------|--------|
| 🟢 | PASS | 🟢 **Truly healthy** | Continue working at full speed |
| 🟢 | FAIL | 🟠 **Self-bias detected!** | Agent THINKS it's fine but CAN'T PROVE IT. Force phase break. Write checkpoint to disk. |
| 🟡 | PASS | 🟡 **Mild degradation** | Enable compression mode. Summarize tool outputs, reduce file reads, compress history. |
| 🟡 | FAIL | 🟠 **Degradation confirmed** | Force phase break. Write checkpoint to disk. Recommend task decomposition. |
| 🟠 | PASS | 🟠 **Noticeable degradation** | Phase break. Write full checkpoint. Resume in next message or new conversation. |
| 🟠 | FAIL | 🔴 **Severe degradation** | STOP. Write checkpoint. Recommend new conversation with disk handoff. |
| 🔴 | FAIL | 🔴 **Critical — conversation exhausted** | STOP immediately. Write comprehensive checkpoint to disk. Start new conversation. |

## Step 4: Report to User

Display the result to the user in this format:

```
🧠 CWP Context Health Check
━━━━━━━━━━━━━━━━━━━━━━━━━━

Channel A (Behavioral): [🟢/🟡/🟠/🔴] [score/4]
Channel B (Objective):  [PASS/FAIL]
━━━━━━━━━━━━━━━━━━━━━━━━━━
Verdict: [🟢/🟡/🟠/🔴] [description]

Tool calls this session: [N]
Files read: [N]
Searches: [N]

Recommendation: [continue / compress / phase break / new conversation]
```

## Step 5: Auto-Action (if 🟠 or 🔴)

If the verdict is 🟠 or 🔴:

1. **Write checkpoint file** to the FEAT directory:
   ```
   Documentation/features/research/FEAT-XXX_[topic]/CWP_CHECKPOINT_{YYYYMMDD_HHMM}.md
   ```

2. **Checkpoint contents:**
   - User's original request (verbatim)
   - Current FEAT number and petal stage
   - Summary of work completed so far
   - List of files modified
   - What remains to be done
   - SHA-256 hash of checkpoint content
   - Conversation ID

3. **Recommend next action:**
   - 🟠: "Continue in this conversation with compressed context, or start a new conversation with this checkpoint."
   - 🔴: "Start a new conversation. Reference this checkpoint file to resume."

## Step 6: Self-Bias Alert (if A=🟢 but B=FAIL)

This is the most dangerous state — the agent believes it's healthy but cannot prove it.

**Mandatory action:**
1. Alert the user: "⚠️ Self-bias detected: I report healthy but cannot prove it with objective facts."
2. Force a phase break regardless of the agent's self-assessment
3. Write checkpoint to disk
4. Recommend the user verify recent outputs for accuracy

---

> **Note:** This workflow implements FEAT-278 DISSOLVE dissolutions D-3 (Metabolism Monitor) and D-5 (Dual-Channel Verification).
> See full CWP specification in AGENTS.md §CWP.
> See comprehensive skill: `.agent/skills/context_guardian/SKILL.md`
