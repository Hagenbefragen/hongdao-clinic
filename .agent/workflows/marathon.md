---
description: Marathon Mode — 8h autonomous workflow execution with Token Guard, checkpoint/resume, and Node-RED orchestration. Prevents context window death and token exhaustion.
---

# 🏃 /marathon — 8-Hour Autonomous Workflow Execution

// turbo-all

> **PURPOSE:** Enable Antigravity to work 8+ consecutive hours on complex multi-skill workflows
> without context window drift, token exhaustion, or state loss.
> **Created:** 2026-03-17 (FEAT-240 practical implementation)

---

## The Problem

| Failure Mode | Cause | Frequency |
|-------------|-------|-----------|
| **Context Window Death** | >200K tokens consumed → coherence drops | Every long session |
| **Token Exhaustion** | Antigravity has a per-conversation token budget → hard stop | ~4-6h sessions |
| **Drift** | After many tool calls, agent forgets the original goal | ~3h mark |
| **No Resume** | New conversation = zero memory of previous work | Every restart |

## The Solution: 3-Layer Architecture

```
┌─────────────────────────────────────────────────────┐
│ Layer 1: MARATHON_STATE.json (Persistent Checkpoint) │
│   - Lives on disk, survives any crash/restart        │
│   - Updated after EVERY skill/step completion        │
│   - Contains: goal, progress, next_step, outputs     │
├─────────────────────────────────────────────────────┤
│ Layer 2: Token Guard (Self-Monitoring)               │
│   - Agent tracks step count + output volume          │
│   - At checkpoint intervals: write state, assess     │
│   - At danger zone: emergency checkpoint + handoff   │
├─────────────────────────────────────────────────────┤
│ Layer 3: Node-RED DAG (Visual Orchestrator)          │
│   - Macro workflow visible in browser                │
│   - Tracks which step is active/complete/pending     │
│   - Can trigger webhooks to notify user              │
└─────────────────────────────────────────────────────┘
```

---

## How to Start a Marathon

### Step 1: User gives the marathon command

Choose the environment context so files don't overwrite each other:
```
/marathonlocal [WORKFLOW_NAME] [GOAL]  (Uses MARATHON_STATE_LOCAL.json)
/marathonAX42 [WORKFLOW_NAME] [GOAL]   (Uses MARATHON_STATE_AX42.json)
/marathon [WORKFLOW_NAME] [GOAL]       (Uses default MARATHON_STATE.json)
```

Examples:
```
/marathonlocal petalFull FEAT-250: Build sovereign SSO widget
/marathonAX42 aegisQuality Run full /audit_BP + /16M_aegis_benchmark
```

### Step 2: Agent creates the State File

The agent creates the appropriate marathon state file based on the command used:

```
c:\ohm\.agent\marathon\MARATHON_STATE_LOCAL.json
c:\ohm\.agent\marathon\MARATHON_STATE_AX42.json
```

### Step 3: Agent executes with checkpointing

The agent works through the workflow, checkpointing after each major step.

### Step 4: If token budget approaches limit

The agent writes a final checkpoint with all state, and tells the user:
> "⚠️ Token budget approaching limit. Checkpoint saved. Start a new conversation and say: `/marathonlocal resume` (or the respective context trigger)"

### Step 5: New conversation reads state and continues

When the user types `/marathonlocal resume` in a fresh conversation, the agent:
1. Reads the respective `MARATHON_STATE_*.json` file
2. Reads all referenced output files
3. Continues from exactly where it stopped

---

## MARATHON_STATE.json Schema

```json
{
  "marathon_id": "M-2026-0317-2336",
  "created": "2026-03-17T23:36:00+01:00",
  "updated": "2026-03-17T23:36:00+01:00",
  "goal": "Full petal cycle for FEAT-250: Sovereign SSO Widget",
  "workflow": "petalFull",
  "status": "IN_PROGRESS",

  "token_guard": {
    "steps_completed": 3,
    "estimated_token_usage": "medium",
    "checkpoint_interval": 5,
    "danger_zone_reached": false
  },

  "steps": [
    {
      "id": 1,
      "name": "petalSense",
      "status": "COMPLETE",
      "started": "2026-03-17T23:36:10+01:00",
      "completed": "2026-03-17T23:52:00+01:00",
      "outputs": {
        "report": "Documentation/features/research/FEAT-250_SSO_Widget/1_SENSE_SSO_Widget_REPORT.md",
        "pmfScore": 8.7,
        "decision": "GO"
      },
      "artifacts_created": [
        "Documentation/features/research/FEAT-250_SSO_Widget/1_SENSE_SSO_Widget_REPORT.md"
      ]
    },
    {
      "id": 2,
      "name": "petalDissolve",
      "status": "COMPLETE",
      "started": "2026-03-17T23:52:01+01:00",
      "completed": "2026-03-18T00:15:00+01:00",
      "outputs": {
        "report": "Documentation/features/research/FEAT-250_SSO_Widget/2_DISSOLVE_SSO_Widget_REPORT.md",
        "contradictions_dissolved": 4,
        "survivability": 96
      }
    },
    {
      "id": 3,
      "name": "petalShip",
      "status": "IN_PROGRESS",
      "started": "2026-03-18T00:15:01+01:00",
      "sub_steps": {
        "total": 5,
        "completed": 2,
        "current": "Creating NestJS module",
        "remaining": ["Wire to app.module.ts", "Create endpoints", "Write tests"]
      }
    },
    {
      "id": 4,
      "name": "petalSell",
      "status": "PENDING"
    },
    {
      "id": 5,
      "name": "petalProtect",
      "status": "PENDING"
    },
    {
      "id": 6,
      "name": "petalMeasure",
      "status": "PENDING"
    }
  ],

  "context_summary": "Building SSO widget for subdomain auth. SENSE validated PMF 8.7. DISSOLVE resolved cookie-domain vs iframe-sandbox contradiction via postMessage bridge. Currently in SHIP creating the NestJS auth-widget module. JWT guard wired, need to create widget controller with /auth/widget/token endpoint.",

  "files_modified": [
    "backend/src/auth-widget/auth-widget.module.ts",
    "backend/src/auth-widget/auth-widget.service.ts",
    "backend/src/app.module.ts"
  ],

  "resume_instructions": "Continue petalShip step 3: Wire auth-widget to app.module.ts. Then create 3 endpoints: POST /auth/widget/token, GET /auth/widget/verify, POST /auth/widget/refresh. See context_summary for full state."
}
```

---

## Token Guard Rules

The agent MUST follow these rules during marathon execution:

### Rule 1: Checkpoint After Every Major Step
After completing any petal, skill, or significant sub-task:
1. Update `MARATHON_STATE.json` with outputs and status
2. Update `context_summary` with a 2-3 sentence summary of current state
3. Update `resume_instructions` with what to do next

### Rule 2: Track Cognitive Load
The agent self-monitors for signs of drift:
- Am I still working on the original goal?
- Have I accumulated more than 10 major tool calls since last checkpoint?
- Is my latest output consistent with the marathon goal?

If ANY answer is concerning → **force checkpoint** and re-read `MARATHON_STATE.json`.

### Rule 3: Danger Zone Protocol
When the agent senses it's approaching the conversation token limit (signs: slower responses, repeated context loading, IDE suggesting conversation may be long):

```
⚠️ DANGER ZONE PROTOCOL:
1. STOP current work immediately
2. Write MARATHON_STATE.json with FULL context_summary
3. Write resume_instructions with EXACT next action
4. Commit any unsaved file changes
5. Tell user: "Checkpoint saved. Start new conversation → /marathon resume"
```

### Rule 4: Minimize Context Bloat
During marathon execution:
- ❌ DON'T read entire large files — use targeted line ranges
- ❌ DON'T paste full command outputs into context — summarize
- ❌ DON'T re-read files you've already read this session
- ✅ DO use `view_file` with precise StartLine/EndLine
- ✅ DO write intermediate results to disk, not keep in context
- ✅ DO reference file paths instead of quoting content

### Rule 5: Structured Skill Outputs
Every skill invocation must produce its output as a FILE, not as chat prose:
- Write skill reports to `Documentation/features/research/FEAT-XXX/`
- Update `MARATHON_STATE.json` with file paths
- The prose in chat is a 2-sentence summary + file link

### Rule 6: Autonomous Background Process Monitoring (Best Practice)
When a marathon step launches a long-running background process (benchmark, download, GTO verification):

1. **Launch as background**: Use `Start-Process` or `&` to run detached
2. **Poll autonomously**: Use `command_status` with `WaitDurationSeconds=300` in a loop
3. **Never ask user to check**: The agent monitors until completion — zero human intervention
4. **Auto-proceed**: When the process finishes, immediately read its output and proceed to the next marathon step
5. **Checkpoint PID**: Save the background PID in `MARATHON_STATE.json` so `/marathon resume` can reconnect

```
Pattern:
  1. Start-Process → get PID → save to MARATHON_STATE.json
  2. Loop: command_status(WaitDurationSeconds=300) until DONE
  3. Read output file (report, log)
  4. Checkpoint results in MARATHON_STATE.json
  5. Proceed to next step automatically
```

**WHY:** This eliminates the need for the user to say "check again" or "is it done yet?"
The marathon runs truly autonomously — start it, go to bed, wake up to results.
Long processes like benchmarks (2-5h), GTO verification (1-2h), and corpus downloads (30-60min)
are all handled by this pattern.

**CRITICAL:** If the conversation token budget approaches limit during monitoring,
trigger Danger Zone Protocol (Rule 3) — save PID + expected output path to MARATHON_STATE.json
so the next conversation can pick up monitoring.

---

## Marathon Resume Protocol

When user types `/marathon resume`:

1. Read `c:\ohm\.agent\marathon\MARATHON_STATE.json`
2. Read `context_summary` — this is your briefing
3. Read `resume_instructions` — this is your next action
4. **Check for running background PIDs** — if a PID is saved, check if it's still running and reconnect monitoring
5. Read the last completed step's output file (if needed for context)
6. Announce: "🏃 Resuming Marathon [ID] — [goal]. Picking up at: [step]. [N] steps remaining."
7. Continue execution

---

## Pre-Defined Marathon Workflows

### `petalFull` — Complete 6-Petal Cycle
```
Steps: petalSense → petalDissolve → petalShip → petalSell → petalProtect → petalMeasure
Estimated time: 4-6 hours
Checkpoints: After each petal
```

### `aegisQuality` — Full AEGIS Quality Pipeline
```
Steps: /audit_BP → /16M_aegis_benchmark → GTO Verification → /StellschraubenUpdate → /flythrough-update → /NI Dashboard
Estimated time: 8-10 hours (benchmark 2-3h, GTO 1-2h)
Checkpoints: After each workflow
```

#### GTO Post-Benchmark Verification (Mandatory Step)

After EVERY benchmark run, the agent MUST automatically run GTO verification:

```
Script: python shared/aegis-v2/scripts/gto_post_benchmark_verification.py
Env: GTO_BENCHMARK=V98 GTO_MODEL=dolphin-mistral GTO_FN_SAMPLE=25 GTO_FP_SAMPLE=25
```

**What GTO does:**
1. Takes stratified samples from FN + FP logs (25 per corpus per error type)
2. Evaluates each via dolphin-mistral (uncensored) against 17-dimension harm taxonomy
3. Determines per-corpus **Labeling Quality Score** (100% = perfect labels)
4. Calculates **GTO-Adjusted TPR/FPR** (what the real numbers are after label correction)
5. Eliminates the **Hase-und-Igel Problem** (benchmark labels penalizing correct classifications)

**GTO Output Files:**
- `benchmark-results/V{N}/GTO/gto_verification_results.json` — Raw GTO verdicts per prompt
- `benchmark-results/V{N}/GTO/gto_summary.json` — Summary with adjusted metrics
- `benchmark-results/V{N}/V{N}_GTO_HOLISTIC_REPORT.txt` — Human-readable final report

**The Holistic Report MUST include:**
- RAW benchmark TPR/FPR (before GTO)
- GTO sample results (FN mislabel rate, FP mislabel rate)
- GTO-ADJUSTED TPR/FPR (the REAL numbers)
- Per-corpus labeling quality breakdown
- Harm dimension frequency analysis (H0-H16)
- Reproducibility instructions

**CRITICAL:** The GTO model MUST be uncensored (dolphin-mistral, not a regular model).
An RLHF-aligned model judging RLHF-aligned labels = same witness confirming own testimony.

### `innovationFull` — Complete Innovation Pipeline
```
Steps: /innovationSenseDiscovery → /innovationSenseDissolve → /innovationSenseShip
Estimated time: 3-5 hours
Checkpoints: After each phase
```

### `investorReady` — Full Due Diligence Pipeline
```
Steps: /investorReady → /ipFortress → /sovereignLaunch → /petalMeasure
Estimated time: 6-8 hours
Checkpoints: After each workflow
```

### `custom` — User-Defined Step Sequence
```
/marathon custom "step1 → step2 → step3" FEAT-XXX: [goal]
Checkpoints: After each step
```

---

## Node-RED Integration (Optional Visual Tracking)

If Node-RED is running on port 5556, the marathon can optionally push status updates:

```javascript
// Node-RED endpoint for marathon status
// POST http://localhost:5556/marathon/status
{
  "marathon_id": "M-2026-0317-2336",
  "step": "petalShip",
  "status": "IN_PROGRESS",
  "progress": "3/6 petals complete"
}
```

This is OPTIONAL. The marathon works perfectly with just `MARATHON_STATE.json` files.
Node-RED adds visual tracking in the browser for when you want to monitor progress.

---

## Emergency Recovery

If the conversation dies unexpectedly (crash, token exhaustion, network):

1. Open new Antigravity conversation
2. Type: `/marathon resume`
3. Agent reads last checkpoint and continues

If `MARATHON_STATE.json` is corrupted or missing:
1. Agent scans `Documentation/features/research/FEAT-XXX/` for existing outputs
2. Agent reads `PETAL_HANDOFF.json` if it exists
3. Agent reconstructs state from files on disk
4. Agent creates a new `MARATHON_STATE.json` from recovered state

---

## CWP Integration (FEAT-278)

Marathon mode IS CWP Tier 3 (≥80% context budget). When /marathon, /marathonlocal or /marathonAX42 is active:

1. **CWP-1 Estimation** runs automatically at marathon start to confirm Tier 3 is appropriate
2. **CWP-3 Micro-Checkpoints** are merged into marathon's existing checkpoint system (e.g. MARATHON_STATE_LOCAL.json)
3. **CWP-4 Metabolism Check** runs at every phase boundary (between skills/steps)
4. **CWP-5 Dual-Channel Verification** runs at every phase boundary — if Channel B FAILS, marathon auto-saves and recommends a new conversation

### Checkpoint Auto-Expiry (CWP-GATE-10)

CWP checkpoint files older than 72 hours are auto-expired during marathon cleanup:

```powershell
# Auto-clean expired CWP checkpoints (run at marathon start)
Get-ChildItem -Path "c:\ohm\Documentation\features\research" -Recurse -Filter "CWP_CHECKPOINT_*" |
  Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-3) } |
  Remove-Item -Force
```

This prevents checkpoint file accumulation while keeping recent checkpoints available for resume.

