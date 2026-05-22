---
description: Run a QFVC Video Compression A/B test with 2-4 browser participants for prior art evidence collection
---

# /QFVCTest — QFVC Video Compression A/B Test

// turbo-all

## Overview

This workflow opens multiple browser tabs to simulate a VC room with QFVC (Quantum Fibonacci Video Compression) enabled. It runs an A/B comparison test and collects timestamped prior art evidence for the patent dashboard.

**Duration**: 40 minutes per test (20 min QFVC ON + 20 min QFVC OFF)
**Smoke Test**: 5 minutes total (2.5 min QFVC ON + 2.5 min QFVC OFF) — use for quick validation
**Participants**: 2-4 browser tabs (1 host + 1-3 guests)
**Output**: Auto-downloaded `QFVC_PriorArt_Evidence_{timestamp}.json` file

### FORTRESS Integration (Optional)

When running with FORTRESS proof, also enable the 🏰 FORTRESS watermark plugin during the test:

1. Each participant gets a **unique invisible watermark** embedded in the video stream
2. Key frames (QFVC F(n)) → MULTI watermark, intermediate → DCT, static → skip
3. After the test, export `FORTRESS_Evidence_{timestamp}.json` from the FORTRESS Proof tab
4. Combined evidence proves both **compression** (QFVC) and **protection** (FORTRESS) work simultaneously

---

## Prerequisites

1. Backend running at `https://app.offlinehumanmode.com` (production) OR `http://localhost:3001` (local dev)
2. Stream app accessible at `https://stream.offlinehumanmode.com` OR `http://localhost:5173`
3. Test users created in the database (see /browsertest for credentials)

### ⚠️ CRITICAL: Cookie Session Warning

> [!CAUTION] > **Browser automation shares cookies across all tabs.** Running this test on PRODUCTION will
> **OVERWRITE the user's real auth token** on `.offlinehumanmode.com`.
>
> **After the test**, the user MUST re-login to `stream.offlinehumanmode.com` with their real account.
> Run this in browser console to clear stale tokens:
>
> ```js
> localStorage.removeItem("authToken");
> localStorage.removeItem("ohm_token");
> location.reload();
> ```
>
> **Best practice**: Run smoke tests on **localhost** to avoid clobbering production sessions.
> For production tests, use the **guest flow** (no cookie conflict) or the user's **second device**.

## Test Credentials

| Role         | Email             | Password     |
| ------------ | ----------------- | ------------ |
| Host (Admin) | admin@test.ohm    | TestPass123! |
| Guest 1      | creator@test.ohm  | TestPass123! |
| Guest 2      | basic@test.ohm    | TestPass123! |
| Guest 3      | business@test.ohm | TestPass123! |

---

## Step 1 — Ask Configuration

Ask the user:

> 💬 "QFVC A/B Test Configuration:
>
> 1. **Environment**: Production (`stream.offlinehumanmode.com`) or Local (`localhost:5173`)?
> 2. **Participants**: How many? (2, 3, or 4)
> 3. **Duration**: Full (20 min/phase = 40 min) or Smoke Test (2.5 min/phase = 5 min)?
> 4. **FORTRESS**: Enable watermark protection test alongside QFVC? (yes/no)"

---

## Step 2 — Open Host Browser Tab

Use `browser_subagent` to:

1. Navigate to the stream/app URL
2. Login as `admin@test.ohm` / `TestPass123!`
3. Navigate to VC room creation
4. Create a room named `qfvc-test-{YYYY-MM-DD-HHmm}`
5. Join the room with camera + microphone enabled
6. Take a screenshot confirming the room is active

---

## Step 3 — Open Guest Browser Tabs

For each additional participant:

1. Open a NEW browser tab (use `browser_subagent` with a different page)
2. Login as the next test user
3. Navigate to the same room URL
4. Join as a guest
5. Confirm video is visible

---

## Step 4 — Enable QFVC and Start A/B Test

Back in the host's browser tab:

1. Click the **🌀 QFVC** plugin button in the control bar
2. Wait for the QFVC panel to appear
3. Click **"Start A/B Comparison"** button
4. Take a screenshot showing:
   - QFVC panel with compression stats
   - Participant count
   - Current bandwidth readings
5. Record the start time

---

## Step 5 — Monitor Every 5 Minutes

Set up a monitoring loop. Every 5 minutes:

1. Take a screenshot of the QFVC panel
2. Log these metrics:
   - Current bandwidth (kbps)
   - Compression ratio
   - Savings percentage
   - Participant count
   - PHQM quality score (if available)
3. Check if anyone disconnected unexpectedly

**⚠️ CRITICAL MONITORING:**

- If `savingsPercent` shows > 85%, note this may be WebRTC adaptive bitrate, not just QFVC
- If participants disconnect, LOG the exact timestamp and compression % at that moment
- The hardcoded `estimatedStandardRate = 2500 kbps` in the code may inflate the savings number

### Known Issue: 96% Compression Disconnect (BUG-351)

**Symptom**: At ~17 minutes, all participants kicked from room when savings show 96%
**Root Cause Investigation**:

- The `savingsPercent` formula compares actual bandwidth to hardcoded 2500 kbps baseline
- WebRTC's OWN adaptive bitrate may reduce bandwidth to ~100 kbps independently
- Formula: `1 - 100/2500 = 96%` — this is WebRTC adaptation, NOT QFVC compression
- At very low bitrates, LiveKit's media server may timeout the WebRTC ICE connection
- **TRUE QFVC savings** should be measured by comparing QFVC-ON bandwidth to QFVC-OFF bandwidth in the same conditions (which the A/B test does)

**Mitigation**: The A/B test is the correct way to measure — Phase A (QFVC ON) vs Phase B (QFVC OFF) comparing real bandwidth samples.

---

## Step 6 — Wait for A/B Test Completion

The A/B test runs automatically:

- **Phase A** (20 min): QFVC enabled, recording bandwidth samples
- **Switching** (~5 sec): QFVC toggles off
- **Phase B** (20 min): Standard codec, recording bandwidth samples

After completion, the plugin shows a comparison panel with:

- Side-by-side bandwidth stats
- File size comparison
- Net savings percentage

Take a final screenshot of the results.

---

## Step 7 — Collect Evidence

After the test completes:

1. The auto-download should trigger a `QFVC_PriorArt_Evidence_{timestamp}.json` file
2. Verify the file was downloaded
3. If not auto-downloaded, click the **"Export to Dashboard"** button manually
4. Check localStorage for `qfvc_experiments` data

---

## Step 8 — Load Evidence into Dashboard

1. Open `31_ONE_NI_DASHBOARD_V2.html` (locally or on the server)
2. Click **🌀 QFVC Proof** tab
3. Click **📥 Load Downloaded Evidence JSON**
4. Select the downloaded evidence file
5. Verify the data renders in the Live Session Evidence section
6. Take a screenshot showing the populated dashboard

---

## Step 9 — Report Results

Provide a summary to the user:

| Metric         | Phase A (QFVC) | Phase B (Standard) | Savings |
| -------------- | -------------- | ------------------ | ------- |
| Avg Bandwidth  | X kbps         | Y kbps             | Z%      |
| Peak Bandwidth | X kbps         | Y kbps             | Z%      |
| Total Data     | X MB           | Y MB               | Z%      |
| Duration       | 20 min         | 20 min             | —       |
| Participants   | N              | N                  | —       |
| Disconnects    | 0/1            | 0/1                | —       |

Also note:

- Any disconnects and at what compression %
- Whether the savings % in the UI matched the actual A/B comparison
- PHQM quality score if available
- Evidence file location

---

## Output Files

- `QFVC_PriorArt_Evidence_{timestamp}.json` — Auto-downloaded to browser Downloads
- Screenshots in the browser subagent recordings
- localStorage `qfvc_experiments` array

## Integration with /NITeststart

This workflow can be triggered as Step 6B of `/NITeststart` when the user opts into QFVC testing. Both the NI benchmark and the QFVC A/B test run in parallel, collecting dual-track prior art evidence.
