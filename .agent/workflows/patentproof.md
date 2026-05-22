---
description: Patent Proof Workflow — Research and implement examiner-grade dashboard tabs mapping patent claims to source code evidence.
---

# /patentproof

This workflow automates the creation of an examiner-grade Patent Proof Tab, which maps every claim of a patent application to precise, verifiable code implementations and measurement data.

**Core Principle:** This process MUST be based on rigorous research of fact-based measurements, not assumptions. We need examiner-ready prior art evidence exactly like the existing QFVC, SIREN, and AEGIS tabs.

## Step 1: Deep Research, Claim Extraction & 4-Way Mapping

1. **Identify the Target Patent:** Review the relevant patent documentation (e.g. Markdown provisional applications, IP Fortress reports, IDS documents).
2. **Extract All Claims:** Systematically list all Independent and Dependent claims into a structured database format.
3. **4-Way Mapping (The "2-Fliegen-mit-einer-Klappe" Principle):** For EVERY claim, you must build a verifiable 4-way mapping matrix:
   - **(a) Claim Narrative:** Legal technical text for the Patent Examiner.
   - **(b) Source Code:** Exact file paths, line numbers, and function names. **Never hallucinate these. If a claim is not yet built, mark it as `SPEC_READY`. If it is built, mark it as `IMPLEMENTED`.**
   - **(c) Compliance Law:** Which specific EU AI Act, DSA, GDPR, or ISO mandate this code satisfies.
   - **(d) Purpose of Code:** The strategic business and ROI value of the code for Investors.
4. **Identify Measurement Data:** Find where the system generates real benchmark, measurement, or performance data relevant to the patent (e.g., token savings, coherence values, attacks blocked).

## Step 2: Determine Target Dashboard

1. Check the patent family/domain:
   - **If the patent belongs to the NI Family (Natural Intelligence, QFAI-C, AEGIS, QFVC, SIREN, etc.):** Proceed to Step 3 and inject the tab into `c:\ohm\Documentation\VC-EXIT\31_ONE_NI_DASHBOARD_V2.html`.
   - **If the patent belongs to a different family (e.g., FORTRESS, FPD, Resonance, New Earth Device):** You must either locate the existing `ONE_[Name]_DASHBOARD.html` for that family or create a brand new dashboard following the exact visual excellence standards of the NI dashboard.

## Step 3: Architecture of the Proof Module

You must create a new modular JavaScript file (e.g., `[feature]-proof.js`) that replicates the robust structure of `siren-proof.js` or `aegis-proof.js`:

1. **Declare the Claim Database:** Build a JSON-like array containing `{ id, type, title, summary, codeFiles: [ path, fn, lines ], compliance: "...", purpose: "...", status, evidence }` to execute the 4-Way Mapping requirement.
2. **Implement Live Visualization:** Create a dynamic, animated visualization that represents the core mechanism of the patent (e.g., QFVC Phase Conjugation, SIREN Heartbeat, AEGIS Shield).
3. **Render Functions:** Build the HTML string builders (`renderPatentProof()`) that iterate over the Claim Database and construct the UI matrix.
4. **Auto-Hook:** Add an event listener to trigger the render function when the user clicks the corresponding tab button.

## Step 4: Dashboard Integration

1. **Add the Tab Button:** Edit the main Dashboard HTML file to include a new `<button class="tab-btn">` in the `.tab-nav` section.
2. **Add the Content Container:** Create a new `<div class="container tab-content" id="content-[feature]">` with the `tab-explainer` header.
3. **Include the Script:** Add the `<script src="ni-dashboard/[feature]-proof.js"></script>` at the bottom of the HTML file.

## Step 5: Verification & Quality Gates

1. **Deep-Link Verification (Quality Gate):** Parse the resulting HTML/JS and test EVERY SINGLE deep link or source code URI. NO 404s, NO outdated pages allowed. The deliverable is blocked if a link dies.
2. **BestPractice Execution Check:** Verify that all deliverables have been entirely executed and that the 4-way code mapping strictly aligns with the `@[/bestpractice]` Diamond Standard. Every file path mentioned MUST be real and read from the codebase.
3. Load the dashboard HTML file in the browser or via `view_file`.
4. Ensure the tab renders gracefully, the visualization pulses correctly, and the 4-way mapping (Claim → Code → Compliance → Purpose) is perfectly intelligible for both an Examiner and an Investor.

## 🪞 Honest Completion Statement (MANDATORY — Toltec Agreement 1)

> **"Be Impeccable with Your Word"** — The agent must NEVER claim patent proof is done when it isn't.

At the END of every /patentproof execution, the agent MUST output:

```
## 🪞 Honest Completion Statement — Patent Proof

**Target Patent/Dashboard:** [identifier]
**Completion Status:** [TRUE_COMPLETE | PARTIAL_CONTEXT_LIMIT | PARTIAL_TIME_LIMIT | PARTIAL_CODE_GAP]
**Reason for Stopping:**
  - [ ] ✅ All claims mapped, code verified, deep links tested (TRUE_COMPLETE)
  - [ ] ⚠️ Context window approaching limit (PARTIAL_CONTEXT_LIMIT)
  - [ ] ⚠️ Time/token budget exhausted (PARTIAL_TIME_LIMIT)
  - [ ] ⚠️ Some claims reference unbuilt code — marked SPEC_READY (PARTIAL_CODE_GAP)

**Claims Mapped:** [N]/[Total]
**Deep-Links Verified:** [N]/[Total URLs]
**Code Paths Verified:** [N]/[Total via grep_search]
**What Was Delivered:** [list]
**What Remains:** [list, if any]
**Agent Self-Assessment:** [1-2 honest sentences]
```

> If the agent claims `TRUE_COMPLETE` but any deep link is untested or code path unverified, this is a Toltec Agreement 1 violation.
