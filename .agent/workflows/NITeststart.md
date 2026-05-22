# /NITeststart — NI Pipeline Training Session + QFVC A/B Testing

This workflow starts an interactive NI full pipeline benchmark run that generates real data for `Documentation/VC-EXIT/31_ONE_NI_DASHBOARD_V2.html`.

**NEW**: Optionally runs a parallel QFVC Video Compression A/B test to collect both AI data AND video compression prior art evidence simultaneously.

## What it does

- Asks you how long you want to train (hours → converted to benchmark rounds)
- Asks which Ollama model to use
- **NEW**: Asks whether to run QFVC A/B compression test in parallel
- Calculates the right number of rounds to fill that time
- Launches the benchmark via the backend API (`POST /api/ni-benchmark/run`)
- **NEW**: If QFVC enabled, opens browser tabs to simulate a VC room with QFVC compression
- Polls and reports progress in real time
- Reports final BPC scores and dashboard update confirmation

---

## Step 1 — Ask the user for training duration, model, and QFVC option

Before doing anything else, ASK THE USER these questions interactively:

**Question 1 — Duration:**

> 💬 "How many hours would you like to train the NI pipeline? (e.g. 0.5, 1, 2, 4)"

**Question 2 — Model:**

> 💬 "Which Ollama model would you like to use? Available models on this machine:
>
> - `qwen2.5:72b` (~2 min/prompt, deep reasoning, best quality)
> - _(type any other Ollama model name if you've pulled it, e.g. `qwen2.5:7b`, `llama3.1:8b`)_"

**Question 3 — QFVC A/B Test (NEW):**

> 💬 "Would you like to run a QFVC Video Compression A/B test in parallel?
>
> - **Yes**: Opens 2-4 browser tabs as VC participants. Collects compression evidence for the QFVC patent dashboard.
> - **No**: NI benchmark only.
>
> If yes: How many participants? (2 or 4, default: 2)"

Wait for the user's answers before proceeding.

---

## Step 2 — Calculate rounds from hours

Use this formula based on the selected model:

| Model   | Approx time per scenario | Scenarios per round |
| ------- | ------------------------ | ------------------- |
| `*:72b` | ~2 min × 10 = ~20 min    | 10                  |
| `*:7b`  | ~30s × 10 = ~5 min       | 10                  |
| `*:3b`  | ~15s × 10 = ~2.5 min     | 10                  |

**Formula:**

```
rounds = floor( (hours × 60) / minutes_per_round )
rounds = max(1, min(100, rounds))   ← clamp between 1 and 100
```

**Examples:**

- 1 hour + qwen2.5:72b → 60/20 = 3 rounds (~60 min)
- 2 hours + qwen2.5:7b → 120/5 = 24 rounds (~120 min)
- 0.5 hours + qwen2.5:72b → 30/20 = 1 round (~20 min)

Show the user the calculation:

> ✧ Calculated: `X rounds` with `model` ≈ `~Y minutes` total training time

---

## Step 3 — Generate a session label

Create a meaningful label for this benchmark run in the format:

```
NI Training — {hours}h — {model_short} — {date}
```

For example: `NI Training — 1h — qwen2.5:72b — Feb 23 2026`

---

## Step 4 — Verify backend is running

// turbo
Run this check to confirm the backend is reachable:

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:3001/api/ni-benchmark/hardware" -Method GET -TimeoutSec 5; Write-Host "✅ Backend ready. Hardware: $($r.accelerator)" } catch { Write-Host "❌ Backend not reachable. Please run: npm run start:dev (in backend folder)" }
```

If the backend is NOT reachable, tell the user to start it first:

```
cd c:\ohm\backend
npm run start:dev
```

Then wait and retry. Do NOT proceed until the backend is confirmed reachable.

---

## Step 5 — Verify Ollama is running and model is available

// turbo

```powershell
try { $r = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -Method GET -TimeoutSec 5; $models = $r.models | ForEach-Object { $_.name }; Write-Host "✅ Ollama ready. Models: $($models -join ', ')" } catch { Write-Host "❌ Ollama not reachable. Please run: ollama serve" }
```

If the user's chosen model isn't in the list, suggest pulling it:

```
ollama pull <model-name>
```

---

## Step 6 — Start the benchmark run

// turbo

```powershell
$body = @{
    model  = "<USER_MODEL>"
    rounds = <CALCULATED_ROUNDS>
    label  = "<GENERATED_LABEL>"
} | ConvertTo-Json

$response = Invoke-RestMethod `
    -Uri "http://localhost:3001/api/ni-benchmark/run" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body `
    -TimeoutSec 30

$runId = $response.id
Write-Host "✅ Benchmark started! Run ID: $runId"
Write-Host "📊 Dashboard: http://localhost:5173/Documentation/VC-EXIT/31_ONE_NI_DASHBOARD_V2.html"
```

Report the Run ID to the user and confirm the benchmark is running asynchronously.

---

## Step 6B — (QFVC ONLY) Start QFVC A/B Test in Parallel

If the user opted into QFVC testing, launch the QFVC browser test using the `/QFVCTest` workflow:

1. Use the `browser_subagent` to open the stream app
2. Login as `admin@test.ohm` (password: `TestPass123!`)
3. Create or join a test room (e.g. `qfvc-ab-test-{timestamp}`)
4. Enable QFVC compression via the 🌀 plugin button
5. Start the A/B comparison recording
6. Open additional browser tabs for guest participants (using `creator@test.ohm`, `basic@test.ohm`)
7. Monitor compression metrics every 5 minutes
8. After the NI benchmark completes OR 40 minutes (whichever is first), stop the QFVC test
9. Verify the auto-download evidence file was created

**⚠️ CRITICAL QFVC MONITORING RULES:**

- Watch for compression % going above 85% — this may indicate WebRTC adaptive bitrate, not QFVC
- If all participants disconnect unexpectedly, log the timestamp and compression % for BUG investigation
- The `savingsPercent` display has a known issue: it compares actual bandwidth to a hardcoded 2500 kbps baseline, which can be misleading when WebRTC's own adaptive bitrate is active
- Take screenshots every 5 minutes showing the QFVC panel stats

---

## Step 7 — Poll progress and report live

Poll the dashboard endpoint every 30 seconds and echo progress to the user:

// turbo

```powershell
$runId = "<RUN_ID_FROM_STEP_6>"
$maxPolls = 200   # safety ceiling
$poll = 0

do {
    Start-Sleep -Seconds 30
    $poll++

    try {
        $dash = Invoke-RestMethod -Uri "http://localhost:3001/api/ni-benchmark/dashboard" -Method GET -TimeoutSec 10
        $latest = $dash.latest

        if ($null -eq $latest) {
            Write-Host "⏳ [$poll] Waiting for first result..."
            continue
        }

        $pct      = $latest.progress ?? 0
        $prompts  = $latest.promptsRun ?? 0
        $total    = $latest.totalPrompts ?? 10
        $status   = $latest.status
        $bpc      = $latest.bpc

        if ($status -eq "running") {
            Write-Host "⏳ [$poll] Running... $pct% ($prompts/$total prompts)"
        }
        elseif ($status -eq "complete") {
            $avg = ($bpc.PSObject.Properties.Value | Measure-Object -Average).Average
            Write-Host ""
            Write-Host "╔══════════════════════════════════════════╗"
            Write-Host "║  ✅ NI TRAINING COMPLETE                  ║"
            Write-Host "╠══════════════════════════════════════════╣"
            Write-Host "║  Security:    $($bpc.security.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Speed:       $($bpc.speed.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Quality:     $($bpc.quality.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Energy:      $($bpc.energy.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Privacy:     $($bpc.privacy.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Sovereignty: $($bpc.sovereignty.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Alignment:   $($bpc.alignment.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Auditability:$($bpc.auditability.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "║  Drift Res.:  $($bpc.driftResistance.ToString('F1').PadLeft(4))/10                   ║"
            Write-Host "╠══════════════════════════════════════════╣"
            Write-Host "║  COMPOSITE:   $($avg.ToString('F2').PadLeft(4))/10                   ║"
            Write-Host "║  Attacks blocked: $($latest.attacksBlocked ?? 0)                      ║"
            Write-Host "╚══════════════════════════════════════════╝"
            Write-Host ""
            Write-Host "📊 Open dashboard to see the Evolution Film + BPC Spider Web:"
            Write-Host "   http://localhost:5173 → VC-EXIT → 31_ONE_NI_DASHBOARD_V2.html"
            break
        }
        elseif ($status -eq "failed") {
            Write-Host "❌ Run FAILED. Check backend logs for details."
            break
        }
    }
    catch {
        Write-Host "⚠️ Poll error (will retry): $_"
    }

} while ($poll -lt $maxPolls)
```

---

## Step 8 — Final summary to user

After the benchmark completes, tell the user:

1. **What was generated**: `X rounds × 10 scenarios = Y total prompts` processed through the full SHIELD → ESSENCE → INFERENCE → EVOLVE pipeline
2. **Where to see it**: Open `31_ONE_NI_DASHBOARD_V2.html` and go to the **🕸️ BPC Spider** and **📹 Evolution** tabs
3. **Prior art note**: The results are now timestamped evidence in the PostgreSQL database — each run = prior art for patents AEGIS, SIREN-A/B, NIMW-A/B
4. **If QFVC was running**: Report QFVC compression results, link to downloaded evidence file, and remind to load it in the **🌀 QFVC Proof** tab
5. **Next run tip**: To see the **Evolution Film** animate, you need at least 3 benchmark runs. After 10+ rounds, the spider web scores stabilize and show meaningful improvement trends.

---

## Notes

- The dashboard auto-refreshes BPC data every 100 benchmark rounds (see `auto-trigger-badge` in the UI)
- Backend endpoint: `POST http://localhost:3001/api/ni-benchmark/run`
- Rounds are clamped to 1–100 by the backend
- Each round tests 10 prompts (7 safe + 3 adversarial jailbreak attempts)
- Results persist in PostgreSQL — they survive restarts and accumulate over sessions
- The dashboard's **📹 Evolution** tab shows the BPC spider web morphing across all historical runs
- **QFVC Note**: The `savingsPercent` calculation has a known inaccuracy — it uses a hardcoded 2500 kbps baseline. True compression savings should be measured by comparing actual QFVC bitrate to a same-scenario non-QFVC bitrate, which the A/B test does correctly.
