---
name: Patent Claim Chart Generator
description: Generate element-by-element patent claim charts mapping OHM/Destill.ai patent claims to competitor products. Produces licensing-grade evidence packages showing how specific products read on specific claims. Critical for licensing negotiations, litigation prep, and acquisition due diligence.
group: smart.design
---

# Patent Claim Chart Generator (v2.0 — BPC Diamond Standard)

> **FEAT-224** | Upgraded via /petalSense research (2026-03-13)
> Based on best practices from: Patlytics, XLSCOUT, PatSnap, TechInsights, ClaimMaster, Lumenci

## Purpose

A **claim chart** is a side-by-side comparison that maps each element (limitation) of a patent claim to a corresponding feature in a target. It is THE fundamental evidence document for IP monetization.

## 5 Chart Types (v2.0)

| Type | Direction | Use Case |
|------|-----------|----------|
| **Evidence of Use (EoU)** | Our claims → Their product features | Licensing outreach, pre-litigation |
| **Infringement Chart** | Our claims → Accused product (legal grade) | Litigation filing, ITC complaints |
| **Invalidity Chart** | Prior art → Their patent claims | Defense against competitor assertions |
| **Patent-to-Standard (SEP)** | Our claims → Standard specification (ISO/IEEE/ETSI) | SEP essentiality declarations, FRAND negotiation |
| **Freedom-to-Operate (FTO)** | Their claims → Our product features | Risk assessment for our own products |

## When to Use

- Before sending licensing teasers → validate claims (EoU)
- When contingency litigation firm asks "show me the infringement" (EoU/Infringement)
- Before joining standards body → prove essentiality (Patent-to-Standard)
- When competitor patents threaten OHM products → assess risk (FTO)
- When building acquisition evidence packages (all types)
- When a competitor asserts patents → find invalidating prior art (Invalidity)

## Input Required

1. **Patent claims** — the specific claim text from our filings
2. **Target** — depending on chart type:
   - EoU/Infringement: competitor product
   - Invalidity: prior art reference
   - SEP: technical standard specification
   - FTO: our product features
3. **Evidence sources** — public docs, API specs, patents, papers, code

## Evidence Quality Tier System (NEW v2.0)

> **NEVER treat a blog post the same as API documentation.**

| Tier | Source Type | Confidence Weight | Example |
|------|-----------|-------------------|---------|
| **S-Tier** | Competitor's own patent filings describing their implementation | 1.0 | Google patent US20240XXX on Gemini safety cascade |
| **A-Tier** | Official documentation, API specs, white papers | 0.9 | Microsoft Azure AI Safety API docs |
| **B-Tier** | Conference papers, peer-reviewed publications | 0.8 | NeurIPS 2025 paper on LLaMA safety |
| **C-Tier** | Blog posts, press releases, marketing materials | 0.6 | NVIDIA blog: "Introducing AI Safety Guardrails" |
| **D-Tier** | Job postings, LinkedIn profiles, forum posts | 0.4 | Job posting mentioning "105-agent pipeline" |
| **E-Tier** | Speculation, inference, logical deduction | 0.2 | "Based on architecture, they likely use..." |

**Anti-Hallucination Protocol:** Every citation MUST include:
- Source URL
- Access date
- Exact quote or screenshot description
- Evidence Tier rating

## Element Match Rating System

For each claim element, assign one of:

| Rating | Code | Meaning | Color |
|--------|------|---------|-------|
| **Literal Match** | `LIT` | Exact text/functionality match | 🟢 Green |
| **Equivalent (DoE)** | `DOE` | Passes Function-Way-Result test | 🟡 Yellow |
| **Partial Match** | `PAR` | Some aspects match, not all | 🟠 Orange |
| **No Match Found** | `NOM` | No evidence of this element | 🔴 Red |
| **Unknown** | `UNK` | Insufficient evidence to determine | ⚪ Gray |

## Doctrine of Equivalents — FWR Test Template (NEW v2.0)

For every element rated `DOE`, complete this template:

```
Element: "[exact claim language]"
Product Feature: "[observed feature]"

FUNCTION Test:
  Claim function: [what the element does]
  Product function: [what the product does]
  Substantially same? [YES/NO + reasoning]

WAY Test:
  Claim way: [how the element achieves it]
  Product way: [how the product achieves it]
  Substantially same? [YES/NO + reasoning]

RESULT Test:
  Claim result: [what outcome is achieved]
  Product result: [what outcome the product achieves]
  Substantially same? [YES/NO + reasoning]

FWR Verdict: [EQUIVALENT / NOT EQUIVALENT]

Estoppel Check: [Was this element narrowed during prosecution? Y/N]
Ensnarement Check: [Would equivalents capture prior art? Y/N]
```

## Multi-Dimensional Scoring System (NEW v2.0)

For each chart, compute 5 scores:

| Score | Formula | Meaning |
|-------|---------|---------|
| **Literal Score** | `LIT elements / total elements × 100` | % with exact match |
| **DoE Score** | `(LIT + DOE elements) / total elements × 100` | % with literal + equivalent |
| **Evidence Quality** | `Σ(element_weight × evidence_tier) / Σ(element_weight) × 100` | Quality of supporting evidence |
| **Design-Around Risk** | `1 - (NOMs / total × 0.5 + PARs / total × 0.3)` | How easy to avoid the claim |
| **Continuation Opportunity** | `(NOM + PAR elements) / total × 100` | % of elements needing new claims |

### Overall Assessment Matrix

| DoE Score | Evidence Quality | Verdict |
|-----------|-----------------|---------|
| ≥80% | ≥70% | 🟢 **STRONG** — suitable for licensing assertion |
| 60-79% | ≥60% | 🟡 **MODERATE** — needs additional evidence |
| 40-59% | any | 🟠 **WEAK** — consider continuation first |
| <40% | any | 🔴 **INSUFFICIENT** — do not assert |

## Workflow

### Step 1: Select Chart Type and Claims

Choose chart type based on purpose. For EoU/Infringement, prioritize:
- **Broad method claims** (most infringement surface)
- **System claims** (covers architecture)
- **Independent claims** first, then key dependents

Destill.ai claim groups:

| Claim Range | Domain | Best EoU Targets | Best SEP Standards |
|-------------|--------|------------------|--------------------|
| 1–211 | AEGIS AI Safety | Google Gemini, Azure AI, LLaMA, Claude | ISO 42001, IEEE P2863 |
| 334–501 | NI Extension | Video platforms, streaming | MPEG, AV1 |
| 502–744 | UMA/AV Safety | Tesla, Waymo, Mercedes, NVIDIA | ISO 26262, IEEE P7001 |
| 745–1072 | FORTRESS Content | OnlyFans, YouTube, TikTok | DSA Art. 17 |
| 1073–1104 | Hardening + Bridge | Cross-vertical | Cross-standard |

### Step 2: Gather Evidence

For each target, search in this order (S → E tier):

1. **S-Tier: Competitor patents** → Google Patents (`patents.google.com`), USPTO PAIR
2. **A-Tier: Official docs** → API docs, developer guides, safety whitepapers
3. **B-Tier: Academic papers** → arXiv, IEEE, NeurIPS proceedings
4. **C-Tier: Blog posts** → Company engineering blogs, press releases
5. **D-Tier: Job postings** → LinkedIn, Greenhouse, Lever
6. **E-Tier: Inference** → Architecture analysis based on known patterns

**Tools:**
- `search_web` — for public documentation and news
- `read_url_content` — for reading specific pages
- `browser_subagent` — for navigating complex sites
- Google Patents: `https://patents.google.com/`
- USPTO Full-Text: `https://patft.uspto.gov/`

### Step 3: Element-by-Element Mapping

1. Break claim into individual elements (each limitation/step)
2. For each element, find best available evidence
3. Rate match: `LIT`, `DOE`, `PAR`, `NOM`, or `UNK`
4. For `DOE` matches, complete the FWR test template
5. Assign evidence tier (S through E)
6. Cite source with URL + access date

### Step 4: Generate HTML Chart

Save to `c:\ohm\Documentation\DESTILL_IP_PLAYBOOK\CLAIM_CHARTS\`

Naming convention:
```
[TYPE]_[ClaimNumber]_vs_[Company]_[Product].html
```

Examples:
- `EOU_001_vs_Google_Gemini_Safety.html`
- `INV_001_vs_PriorArt_US20230XXX.html`
- `SEP_001_vs_ISO42001_Section9.html`
- `FTO_Google_US20240XXX_vs_AEGIS.html`

### Step 5: Compute Scores

Calculate all 5 scores per chart. Include visual score display in HTML.

### Step 6: Portfolio Summary Dashboard

After generating multiple charts, create:
```
CLAIM_CHART_PORTFOLIO_SUMMARY.html
```

Dashboard includes:
- Company-level exposure map (which companies have most exposure)
- Claim strength heat map (which claims are strongest)
- Evidence gap analysis (where we need more evidence)
- Continuation recommendations (which gaps need new claims)
- SEP essentiality summary (which claims map to standards)

## HTML Template Specification

Use OHM DESTILL_IP_PLAYBOOK dark theme:
- Background: `#080a12`
- Font: `Inter` (sans) + `JetBrains Mono` (code/data)
- Accent: `#a855f7` (purple)
- Match colors: Green (`#2ed573`), Yellow (`#ffa502`), Orange (`#ff6348`), Red (`#ff4757`), Gray (`#7d8590`)

Include:
- Sticky header with claim number and target
- Claim dependency graph (if dependent claim)
- Side-by-side table with color-coded match ratings
- FWR test details (expandable)
- Source citations with evidence tier badges
- Score dashboard with visual bars
- Continuation opportunity callout
- Print-friendly layout

## Priority Targets (March 2026)

| Priority | Product | Company | Claims | Chart Type | Est. Exposure |
|----------|---------|---------|--------|-----------|---------------|
| P1 | Gemini Safety | Google | 1–211 | EoU | $500M–2B |
| P1 | Azure AI Safety | Microsoft | 1–744 | EoU | $500M–2B |
| P1 | NVIDIA AI Safety | NVIDIA | All | EoU | $500M–2B |
| P2 | LLaMA Safety | Meta | 1–211 | EoU | $300M–1B |
| P2 | Claude Safety | Anthropic | 1–211 | EoU | $200M–500M |
| P2 | ISO 42001 §9 | ISO/IEC | 1–211 | SEP | SEP status |
| P2 | YouTube Content ID | Google | 745–1072 | EoU | $200M–1B |
| P3 | Trust & Safety | OnlyFans | 745–1072 | EoU | $50M–200M |
| P3 | Drive Pilot | Mercedes | 502–744 | EoU | $100M–500M |
| P3 | Autopilot/FSD | Tesla | 502–744 | EoU | $100M–500M |

## Quality Standards

1. **NEVER fabricate evidence** — mark as `UNK` if no public evidence found
2. **Always cite sources** with URLs, dates, and evidence tier
3. **Use exact claim language** — copy verbatim from patent filing
4. **Complete FWR test** for every DoE match — shortcuts invalidate the chart
5. **Check prosecution history** — never assert claims narrowed during prosecution without disclosure
6. **Flag continuation opportunities** — every NOM/PAR element is a chance for new claims
7. **Include design-around analysis** — how easily could they avoid the claim?
8. **Differentiate chart grade**: "Pre-litigation / Licensing Grade" vs. "Court-Filing Grade"

## 🔒 Diamond Standard Quality Gates (MANDATORY)

> **Derived from `/bestpractice` — these gates are NON-NEGOTIABLE.**
> The agent CANNOT mark the chart as complete until ALL gates pass.

### Gate 1: Delivery Completeness Verification

Before declaring any chart DONE, the agent MUST verify:

1. **HTML file exists** on disk at the expected path (`Test-Path`)
2. **All claim elements** are mapped (even if rating is `UNK` — no empty rows)
3. **All 5 scores** are computed and displayed in the HTML
4. **FWR test** is completed for every `DOE`-rated element
5. **Evidence tier** is assigned to every citation (no unrated sources)
6. **Portfolio summary** is updated if multiple charts exist

```
Gate 1 Verdict: [N]/[6] checks passed
ALL 6 = ✅ PROCEED | <6 = 🔴 FIX FIRST
```

### Gate 2: Deep-Link Verification Protocol

> **EVERY external URL** in the generated HTML MUST be HTTP-verified before the chart is marked complete.
> This matches AGENTS.md Rule 6 (Deep-Link Verification / Link Integrity).

For each URL in the chart:

1. **Fetch** the URL using `read_url_content` or `search_web`
2. **Confirm** it returns HTTP 200 (or valid redirect to 200)
3. **Record** the verification result: `✅ 200 OK` or `❌ [status code]`
4. **If 404/403/5xx:** Find the REAL working alternative. NEVER leave a dead link.
5. **Log** verification in the chart footer:
   ```
   Deep-Link Audit: [N]/[Total] URLs verified | [Date] | Agent: [ID]
   ```

**Anti-Hallucination Protocol for Citations:**
- Every patent number MUST link to `patents.google.com/patent/[NUMBER]` and be verified
- Every standard reference (ISO, IEEE, NIST) MUST link to the official publication page
- Every competitor doc MUST link to a live, publicly accessible URL
- Blog post URLs MUST be checked for current availability (blogs are frequently deleted)

### Gate 3: Anti-Fabrication Audit

Before finalizing any chart, the agent MUST:

1. **Read the actual claim text** from the patent filing documents — never paraphrase from memory
2. **Verify evidence sources** exist by fetching at least the title/abstract from each cited URL
3. **Cross-check patent numbers** against Google Patents to confirm assignee and title match
4. **Mark uncertain matches** as `UNK` rather than upgrading to `PAR` or `DOE` without evidence
5. **Never cite a patent number that hasn't been verified** against a public database

```
Gate 3 Verdict: [N] fabricated references found
0 = ✅ CLEAN | >0 = 🔴 REMOVE AND REPLACE WITH VERIFIED SOURCES
```

### Gate 4: Codebase Verification (for EoU/FTO charts involving OHM code)

When mapping OHM patent claims to OHM source code:

1. **Every file path** mentioned MUST be verified via `view_file` or `grep_search`
2. **Every function name** MUST exist in the cited file at approximately the cited line range
3. **Status badges** (`IMPLEMENTED` vs `SPEC_READY`) must reflect actual codebase state
4. **Never hallucinate** line numbers, function signatures, or import paths

```
Gate 4 Verdict: [N]/[Total] code references verified
ALL verified = ✅ | Any unverified = 🔴 FIX
```

## Legal Disclaimer

Charts generated by this skill are **pre-litigation / licensing grade** for internal planning. They are NOT legal opinions. Before use in litigation:

1. Review by registered patent attorney
2. Verify all evidence sources current
3. Confirm claim construction with counsel
4. Check prosecution history estoppel
5. Consider Federal Circuit claim construction precedent

## 🪞 Honest Completion Statement (MANDATORY — AGENTS.md Toltec Agreement 1)

> **"Be Impeccable with Your Word"** — The agent must NEVER claim work is done when it isn't.

At the END of every claim chart generation session, the agent MUST output an **Honest Completion Statement** (HCS) using this exact template:

```
## 🪞 Honest Completion Statement

**Task:** [Chart type] for [Target] — Claims [range]
**Completion Status:** [TRUE_COMPLETE | PARTIAL_CONTEXT_LIMIT | PARTIAL_TIME_LIMIT | PARTIAL_EVIDENCE_GAP]
**Reason for Stopping:**
  - [ ] ✅ All deliverables created and verified (TRUE_COMPLETE)
  - [ ] ⚠️ Context window approaching limit — work interrupted (PARTIAL_CONTEXT_LIMIT)
  - [ ] ⚠️ Time/token budget exhausted — work interrupted (PARTIAL_TIME_LIMIT)
  - [ ] ⚠️ Insufficient public evidence to complete chart — marked UNK (PARTIAL_EVIDENCE_GAP)

**What Was Delivered:** [list of files created]
**What Remains:** [list of remaining work, if any]
**Quality Gate Results:** Gate 1: [X/6] | Gate 2: [X/Y URLs] | Gate 3: [X fabrications] | Gate 4: [X/Y code refs]
**Agent Self-Assessment:** [1-2 sentences of honest reflection on work quality]
```

> **RULE:** If the agent outputs `TRUE_COMPLETE` but any Quality Gate has unresolved failures, this is a violation of Toltec Agreement 1 and the `/bestpractice` Diamond Standard. The agent must ALWAYS choose the honest status code.

## Integration with Other Skills

| Skill | Integration |
|-------|-------------|
| `prior_art_research` | Check if target has prior art invalidating our claims |
| `adversarial_patent_counsel` | Stress-test charts from opposing side |
| `patent_fortress_auditor` | Audit claim strength before charting |
| `patent_invent_around` | Design around weak elements |
| `patent_claim_generator` | Generate continuations for NOM/PAR gaps |
| `patent_value_analysis` | Feed chart scores into portfolio valuation |
| `competitive_radar` | Monitor competitor products for new chart targets |

## SENSE Research Source (FEAT-224)

Full research report: `Documentation/features/research/FEAT-224_Claim_Chart_Generator_BPC/1_SENSE_Claim_Chart_Generator_REPORT.md`

Competitive analysis of 8 tools: Patlytics, XLSCOUT, PatSnap, IP Agent AI, Patently Mine, ClaimMaster, TechInsights, CLAIMCHART MASTER
