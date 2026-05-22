---
name: NI Dashboard
description: Update the ONE NI Production Readiness Dashboard with latest improvements, wiring status, BPC scores, and audit findings. Ensures everything is production-ready and correctly wired.
---

# NI Dashboard Skill

## Purpose

Maintains the ONE NI Dashboard (`Documentation/VC-EXIT/31_ONE_NI_DASHBOARD_V2.html`) as the **single source of truth** for production readiness. Every time this skill is triggered, it:

1. **Checks backend wiring** — verifies `/api/ni-benchmark/*` endpoints respond
2. **Fetches live BPC scores** — pulls latest from backend dashboard API
3. **Updates audit status** — checks which improvements are implemented
4. **Refreshes the HTML** — updates scores, metrics, and status indicators

## Trigger

Use `/NIdashboard` or mention "update NI dashboard" in conversation.

## Dashboard Location

`c:\ohm\Documentation\VC-EXIT\31_ONE_NI_DASHBOARD_V2.html`

## V2 Features (from DASHBOARD_QUALITY_AUDIT_2026-02-22.md)

### 5 Audit Improvements

1. **💰 TCO Calculator** — $/month sovereign vs cloud API comparison
2. **📊 Composite Trajectory Sparkline** — proves improvement trend over time
3. **🧮 Counterfactual What-If Table** — interactive sliders for dimension impact
4. **🎯 Executive Summary Cards** — 3 big cards at top (Composite, vs OpenAI, Token Cost)
5. **🏥 PDCA Loop Health Indicator** — self-monitoring widget (5 checks)

### 3 Blind Spot Fixes

6. **⚠️ Failure Rate Metric** — `coherent_count / total_count` reliability display
7. **⚠️ Human Calibration Indicator** — shows if human evaluation ground truth exists
8. **⚠️ Hardware Matrix** — performance across 3+ hardware configs

## Step-by-Step Update Process

// turbo-all

### Step 1: Check Backend Health

```bash
curl -s http://localhost:3001/api/ni-benchmark/dashboard | head -c 500
```

If backend is down, note it but continue — dashboard works in offline/simulation mode.

### Step 2: Fetch Latest BPC Scores

```bash
curl -s http://localhost:3001/api/ni-benchmark/dashboard | python -m json.tool 2>/dev/null || echo "OFFLINE"
```

### Step 3: Check Benchmark Run Count

```bash
curl -s http://localhost:3001/api/ni-benchmark/runs | python -m json.tool 2>/dev/null || echo "OFFLINE"
```

### Step 4: Review Current Dashboard

Open `c:\ohm\Documentation\VC-EXIT\31_ONE_NI_DASHBOARD_V2.html` and verify:

- [ ] All 4 tabs render (Pipeline Demo, BPC Spider Web, Evolution Film, Strategic Dashboard)
- [ ] Executive Summary cards show live data
- [ ] TCO Calculator computes correctly
- [ ] What-If sliders update composite in real-time
- [ ] PDCA health indicator shows current status
- [ ] Failure rate metric displays
- [ ] Sparkline trajectory renders

### Step 5: Update Scores & Status

If backend returned new data, update the `ohmScores` array and any hardcoded metrics in the HTML.

### Step 6: Verify in Browser

Open the dashboard in browser and take screenshots of each tab.

### Step 7: Commit

```bash
cd c:\ohm
git add Documentation/VC-EXIT/31_ONE_NI_DASHBOARD_V2.html
git commit -m "NI-DASH: Update dashboard with latest scores and status"
```

## Architecture

- **Single HTML file** — no build step, works offline, opens in any browser
- **Chart.js** — for radar charts, sparklines
- **Backend API** — optional live data from `localhost:3001/api/ni-benchmark/*`
- **localStorage** — caches last known scores for offline viewing
- **4 Tabs**: Pipeline Demo | BPC Spider Web | Evolution Film | Strategic Dashboard (NEW)

## Data Sources

| Source      | Endpoint                      | Fallback              |
| ----------- | ----------------------------- | --------------------- |
| BPC Scores  | `/api/ni-benchmark/dashboard` | Hardcoded baseline    |
| Run History | `/api/ni-benchmark/runs`      | XPollination baseline |
| Inference   | `/api/ni-benchmark/inference` | Simulated response    |
| Proof Data  | `ni-proof.json` (static)      | Demo mode             |

## Scoring Reference

- 🏆 GOLD: ≥ 9.0/10 composite
- 🥈 SILVER: ≥ 8.0/10 composite
- 🥉 BRONZE: ≥ 7.0/10 composite
- ❌ Below: < 7.0/10 composite
