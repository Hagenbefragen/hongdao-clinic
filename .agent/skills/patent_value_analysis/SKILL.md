---
name: Patent Value Analysis
description: Multi-dimensional patent value assessment across 12 Value Dimensions (Licensing, Selling, Litigation, FTO, Strategic Blocking, Standards, Tax, Collateral, Cross-License, Talent, Brand, and Ecosystem). Produces a beautiful HTML Patent Value Report with spider web visualization, buyer heat maps, and monetization roadmaps. Reuses prior_art_research, adversarial_patent_counsel, patent_fortress_auditor, competitive_radar, and pricing_optimizer.
group: smart.design
---

# 💎 Patent Value Analysis — "Know What Your Patent Is Worth, In Every Dimension"

> "A patent is not one value — it is twelve simultaneous value streams. The owner who sees only one is leaving eleven on the table." — Patent Value Analysis Principle

## Purpose

Performs a **comprehensive, multi-dimensional value assessment** of one or more patents across **12 Value Dimensions**. Identifies the **most profitable commercialization path** for each patent and produces a stunning HTML report with:

- Spider web visualization of all 12 dimensions
- Buyer heat map per dimension
- Monetization roadmap with NPV projections
- Comparative ranking across the portfolio

## When to Trigger

- **Before exit/sale negotiations** — know your portfolio's full value before sitting at the table
- **Before licensing campaigns** — identify which patents are licensing goldmines vs. strategic shields
- **During portfolio pruning** — decide which patents to keep (high value) vs. abandon (maintenance cost > value)
- **Before investor pitches** — quantify IP value for due diligence
- **During M&A** — assess acquisition targets' patent portfolios
- **Annually** — patent values change as markets, competitors, and technology evolve

---

## The 12 Value Dimensions

Every patent generates value across **12 independent dimensions**. Most patent owners only see 1-3 of these. This skill evaluates ALL twelve.

### Dimension Map

```
                    ① LICENSING
                   ╱           ╲
           ⑫ ECOSYSTEM      ② SELLING
              ╱                   ╲
       ⑪ BRAND                 ③ LITIGATION
          ╱                         ╲
    ⑩ TALENT         🎯          ④ FTO
          ╲        PATENT          ╱
       ⑨ CROSS-LICENSE         ⑤ STRATEGIC BLOCK
              ╲                   ╱
           ⑧ COLLATERAL      ⑥ STANDARDS
                   ╲           ╱
                    ⑦ TAX SHIELD
```

### Detailed Dimension Definitions

| #   | Dimension                  | Description                                                                | Key Question                                                         | Valuation Method                                                  |
| --- | -------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| ①   | **Licensing Revenue**      | Income from granting others permission to use the patented invention       | "Who needs this technology and will pay royalties?"                  | Income Approach (DCF of royalty streams)                          |
| ②   | **Sale Value**             | One-time cash from selling (assigning) the patent outright                 | "What would a buyer pay to OWN this?"                                | Market Approach (comparable transactions)                         |
| ③   | **Litigation Value**       | Value derived from enforcing the patent against infringers                 | "Who is infringing, and what damages could we recover?"              | Cost of infringement × probability of success                     |
| ④   | **Freedom to Operate**     | Value of ensuring your business can operate without risk                   | "Does this patent protect us from being sued?"                       | Cost Avoided (legal fees, redesign costs, business interruption)  |
| ⑤   | **Strategic Blocking**     | Value from preventing competitors from entering your market                | "Which competitors cannot build products without licensing from us?" | Competitive advantage quantified as market share preservation     |
| ⑥   | **Standards Essential**    | Value if the patent covers a technology adopted in an industry standard    | "Is this patent essential to IEEE, W3C, NIST, or other standards?"   | FRAND licensing pool revenue                                      |
| ⑦   | **Tax Shield**             | Value from IP tax optimization (IP box regimes, amortization, R&D credits) | "Can we reduce tax burden through this IP?"                          | Tax savings over patent lifetime                                  |
| ⑧   | **Collateral Value**       | Value as security for loans, credit lines, or securitization               | "Can we borrow against this patent?"                                 | Asset-backed lending ratios (typically 10-30% of appraised value) |
| ⑨   | **Cross-License Currency** | Value as bargaining chip in cross-licensing negotiations                   | "What could we trade this patent for?"                               | Value of technology received in return                            |
| ⑩   | **Talent Attraction**      | Value in attracting/retaining inventors and engineers                      | "Does this patent make us an attractive employer for top talent?"    | Hiring cost reduction + inventor retention value                  |
| ⑪   | **Brand Premium**          | Value in marketing, credibility, and brand positioning                     | "Does 'patented technology' command a price premium?"                | Brand equity uplift + trust premium                               |
| ⑫   | **Ecosystem Control**      | Value from controlling a key technology in a larger ecosystem              | "Does owning this patent give us platform control?"                  | Platform lock-in value + switching costs imposed                  |

---

## Execution Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│  PATENT VALUE ANALYSIS PIPELINE                                     │
│                                                                     │
│  Step 1: INGEST — Read patent claims and description               │
│          → Uses: view_file on patent Description.html              │
│          → Extracts: independent claims, tech domain, CPC class    │
│                                                                     │
│  Step 2: LANDSCAPE — Understand the patent's competitive context   │
│          → Uses: prior_art_research (landscape mode)               │
│          → Uses: competitive_radar (competitor filing activity)    │
│          → Output: Market position, competitive density            │
│                                                                     │
│  Step 3: STRENGTH — Assess legal enforceability and scope          │
│          → Uses: patent_fortress_auditor (12-dimension audit)      │
│          → Uses: adversarial_patent_counsel (FTO stress test)      │
│          → Output: Claim strength score, enforceability rating     │
│                                                                     │
│  Step 4: MARKET — Research licensing rates and sale prices          │
│          → Uses: search_web (comparable transactions)              │
│          → Uses: pricing_optimizer (royalty rate analysis)          │
│          → Output: Fair market value range, royalty benchmarks      │
│                                                                     │
│  Step 5: SCORE — Evaluate all 12 dimensions (0-10 each)           │
│          → Internal scoring based on Steps 1-4                     │
│          → Weighted composite score                                │
│          → Identify top 3 value dimensions per patent              │
│                                                                     │
│  Step 6: MONETIZE — Generate commercialization recommendations     │
│          → Optimal path: License vs. Sell vs. Hold vs. Litigate   │
│          → NPV projection over remaining patent life               │
│          → Target buyer/licensee identification                    │
│                                                                     │
│  Step 7: PRESENT — Generate beautiful HTML report                  │
│          → Spider web chart with all 12 dimensions                 │
│          → Buyer heat map (which company for which dimension)      │
│          → Monetization roadmap timeline                           │
│          → Portfolio ranking table                                  │
│                                                                     │
│  Step 7.5: QUALITY GATE — Deep-Link Verification                   │
│          → Ensure all deliverables are complete                    │
│          → Verify ALL source links (investor sites, markets, etc.) │
│          → read_url_content ALL links to ensure NO 404 errors      │
│          → Only proceed if all links return 200 OK                 │
│                                                                     │
│  Step 8: SAVE — Write HTML + commit                                │
│          → Primary: Documentation/Patents/VALUE/                    │
│          → Mirror: .agent/features/research/                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Scoring Methodology

### Per-Dimension Scoring (0-10)

Each of the 12 dimensions is scored on a 0-10 scale:

| Score | Meaning                                             | Revenue Indicator |
| ----- | --------------------------------------------------- | ----------------- |
| 0     | No value in this dimension                          | $0                |
| 1-3   | **Low** — theoretical value, not yet actionable     | < $10K            |
| 4-6   | **Medium** — concrete value, some effort to realize | $10K - $500K      |
| 7-8   | **High** — strong, ready-to-monetize value          | $500K - $5M       |
| 9-10  | **Exceptional** — industry-defining value           | $5M+              |

### Scoring Criteria per Dimension

#### ① Licensing Revenue (0-10)

| Factor                          | Weight | How to Score                                   |
| ------------------------------- | ------ | ---------------------------------------------- |
| Number of potential licensees   | 30%    | 0-2 = Low, 3-10 = Medium, 10+ = High           |
| Industry adoption of technology | 25%    | Niche = Low, Growing = Medium, Standard = High |
| Royalty rate benchmarks         | 25%    | <1% = Low, 1-5% = Medium, >5% = High           |
| Remaining patent life           | 20%    | <5yr = Low, 5-15yr = Medium, >15yr = High      |

#### ② Sale Value (0-10)

| Factor                 | Weight | How to Score                                         |
| ---------------------- | ------ | ---------------------------------------------------- |
| Comparable sale prices | 30%    | Research patent sale databases                       |
| Buyer urgency          | 25%    | Litigation threat vs. optional purchase              |
| Technology maturity    | 25%    | Pre-revenue = Low, Revenue = Medium, Critical = High |
| Portfolio synergy      | 20%    | Standalone = Low, Portfolio enhancer = High          |

#### ③ Litigation Value (0-10)

| Factor                  | Weight | How to Score                                            |
| ----------------------- | ------ | ------------------------------------------------------- |
| Identifiable infringers | 30%    | 0 = Low, 1-3 = Medium, 3+ = High                        |
| Evidence strength       | 25%    | Weak = Low, Circumstantial = Medium, Smoking gun = High |
| Damages potential       | 25%    | <$1M = Low, $1-10M = Medium, >$10M = High               |
| Success probability     | 20%    | <30% = Low, 30-60% = Medium, >60% = High                |

#### ④ Freedom to Operate (0-10)

| Factor                   | Weight | How to Score                                             |
| ------------------------ | ------ | -------------------------------------------------------- |
| Business criticality     | 40%    | Nice-to-have = Low, Important = Medium, Essential = High |
| Design-around difficulty | 30%    | Easy = Low, Possible = Medium, Impossible = High         |
| Litigation cost avoided  | 30%    | <$500K = Low, $500K-$5M = Medium, >$5M = High            |

#### ⑤ Strategic Blocking (0-10)

| Factor                        | Weight | How to Score                                                 |
| ----------------------------- | ------ | ------------------------------------------------------------ |
| Competitor dependency         | 40%    | No dependency = Low, Partial = Medium, Blocked = High        |
| Market entry barrier height   | 30%    | Low barrier = Low, Moderate = Medium, Near-impossible = High |
| Number of competitors blocked | 30%    | 0 = Low, 1-3 = Medium, 3+ = High                             |

#### ⑥ Standards Essential (0-10)

| Factor                      | Weight | How to Score                                                |
| --------------------------- | ------ | ----------------------------------------------------------- |
| Standards body adoption     | 40%    | None = 0, Under discussion = 4, Adopted = 8, Mandatory = 10 |
| FRAND commitment status     | 30%    | Not applicable = 0, Voluntary = 5, Committed = 8            |
| Standards-based market size | 30%    | <$1B = Low, $1-10B = Medium, >$10B = High                   |

#### ⑦ Tax Shield (0-10)

| Factor                       | Weight | How to Score                               |
| ---------------------------- | ------ | ------------------------------------------ |
| Applicable IP box rate       | 40%    | No box = 0, >10% = 3, 5-10% = 6, <5% = 9   |
| R&D credit eligibility       | 30%    | Not eligible = 0, Partial = 5, Full = 10   |
| Transfer pricing opportunity | 30%    | None = 0, Domestic = 5, International = 10 |

#### ⑧ Collateral Value (0-10)

| Factor                   | Weight | How to Score                                              |
| ------------------------ | ------ | --------------------------------------------------------- |
| Appraised value          | 40%    | <$100K = Low, $100K-$1M = Medium, >$1M = High             |
| Lender recognition       | 30%    | Unknown = Low, Some = Medium, Established = High          |
| Securitization potential | 30%    | Not viable = Low, Possible = Medium, Active market = High |

#### ⑨ Cross-License Currency (0-10)

| Factor               | Weight | How to Score                                                |
| -------------------- | ------ | ----------------------------------------------------------- |
| Counterparty desire  | 40%    | No interest = Low, Some = Medium, Critical need = High      |
| Reciprocal value     | 30%    | Low-value exchange = Low, Balanced = Medium, Premium = High |
| Negotiation leverage | 30%    | Weak = Low, Balanced = Medium, Dominant = High              |

#### ⑩ Talent Attraction (0-10)

| Factor                 | Weight | How to Score                                           |
| ---------------------- | ------ | ------------------------------------------------------ |
| Inventor prestige      | 40%    | Unknown = Low, Industry known = Medium, Pioneer = High |
| Technology excitement  | 30%    | Incremental = Low, Novel = Medium, Breakthrough = High |
| Patent portfolio depth | 30%    | 1-5 = Low, 5-20 = Medium, 20+ = High                   |

#### ⑪ Brand Premium (0-10)

| Factor                  | Weight | How to Score                                                          |
| ----------------------- | ------ | --------------------------------------------------------------------- |
| Marketing leverage      | 40%    | Internal only = Low, "Patented" label = Medium, Brand identity = High |
| Price premium enabled   | 30%    | 0% = Low, 5-15% = Medium, >15% = High                                 |
| Trust/credibility boost | 30%    | Minimal = Low, Notable = Medium, Industry-defining = High             |

#### ⑫ Ecosystem Control (0-10)

| Factor                  | Weight | How to Score                                      |
| ----------------------- | ------ | ------------------------------------------------- |
| Platform centrality     | 40%    | Peripheral = Low, Important = Medium, Core = High |
| Switching costs imposed | 30%    | Low = Low, Moderate = Medium, Lock-in = High      |
| Network effects         | 30%    | None = Low, Mild = Medium, Strong = High          |

### Composite Value Score

```
Composite = Σ(Dimension_i × Weight_i) / Σ(Weight_i)

Default weights (adjustable by user):
  ① Licensing:        15%    ⑦ Tax Shield:      5%
  ② Selling:          15%    ⑧ Collateral:      3%
  ③ Litigation:       10%    ⑨ Cross-License:   7%
  ④ FTO:              12%    ⑩ Talent:          3%
  ⑤ Strategic Block:  10%    ⑪ Brand:           5%
  ⑥ Standards:         8%    ⑫ Ecosystem:       7%
```

---

## Required Skills (Integration Chain)

This skill **orchestrates** the following existing skills. It does NOT duplicate their work — it calls them and consumes their output.

```
patent_value_analysis (THIS SKILL — Orchestrator)
    │
    ├── prior_art_research      → Landscape context, competitor density
    ├── adversarial_patent_counsel → FTO risk, infringement vectors
    ├── patent_fortress_auditor → 12-dimension legal strength audit
    ├── competitive_radar       → Competitor technology moves
    ├── pricing_optimizer       → Royalty rate benchmarks, sale prices
    ├── triz_whitespot          → Technology whitespace value
    ├── blind_spot_detector     → Missing value dimensions
    └── market_fit_validator    → Buyer identification
```

---

## HTML Report Structure

The output is a **self-contained HTML file** with:

### Tab 1: Executive Summary

- Composite Value Score (0-100)
- Top 3 Value Dimensions highlighted
- Recommended monetization path
- Estimated total portfolio value

### Tab 2: 12-Dimension Spider Web

- SVG/Canvas spider web chart
- Each axis = one dimension (0-10 scale)
- Filled polygon shows patent's value profile
- Hover tooltips with dimension explanations

### Tab 3: Buyer Heat Map

- Grid: Patents (rows) × Value Dimensions (columns)
- Color coding: 🟢 High (7-10), 🟡 Medium (4-6), 🔴 Low (0-3)
- Identified buyer names in each high-value cell

### Tab 4: Monetization Roadmap

- Timeline: 1Y → 3Y → 5Y → 10Y → 20Y
- Revenue projections per dimension
- NPV calculation with discount rate
- Cumulative cash flow chart

### Tab 5: Portfolio Ranking

- Sortable table of all patents
- Composite score, top dimension, recommended action
- Per-patent detail expandable

### Tab 6: Methodology

- Scoring criteria transparency
- Data sources cited
- Confidence levels per estimate
- Caveats and limitations

### Design Requirements

- Dark mode with glassmorphism cards
- Animated tab transitions
- Print-ready (clean, no animations)
- Editable fields for manual adjustments
- Signature pad for certification
- Auto-save to localStorage

---

## 🚨 MANDATORY: Deep-Link Verification Quality Gate (Step 7.5)

Before saving any generated report or deliverable, you MUST execute this strict Quality Gate:
1. **Deliverables Completed**: Confirm all aspects of the report (all 12 dimensions, NPV, tables, etc.) are fully populated with specific data, not placeholders.
2. **Sources Deep-Linked**: Every statistic, market size claim, comparable patent sale, or industry report mentioned MUST include a clickable hyperlink to the source.
3. **404 Verification**: You MUST use `read_url_content` (or equivalent fetch mechanism) to test EVERY single URL included in the report.
4. **Pass Condition**: Only proceed to Step 8 if **ALL** links return an HTTP 200 (OK) status and contain the content expected. If any link returns a 404 or points to a non-existent page, you MUST find a valid alternative link or remove the claim. DO NOT hallucinate URLs.

---

## Output Files

```
Documentation/Patents/VALUE/
  PATENT_VALUE_ANALYSIS_[PORTFOLIO].html    ← Main report
  PATENT_VALUE_DATA_[PORTFOLIO].json        ← Raw data export

.agent/features/research/
  PATENT_VALUE_[PATENT_CODE]_REPORT.md      ← Per-patent detail
```

---

## Failure Modes & Mitigations

| Failure                       | Risk                            | Mitigation                                           |
| ----------------------------- | ------------------------------- | ---------------------------------------------------- |
| Overvaluation (optimism bias) | Embarrassment in negotiations   | Use devil's_advocate to stress-test every HIGH score |
| Missing comparable data       | Inaccurate market values        | Flag confidence levels, use range estimates          |
| Ignoring maintenance costs    | Negative NPV patents kept alive | Always subtract remaining maintenance fees from NPV  |
| Single-dimension thinking     | Leaving value on the table      | FORCE evaluation of all 12 dimensions, even if 0     |
| Currency conversion errors    | Wrong USD/EUR calculations      | Always state currency, use consistent exchange rates |

---

## Integration with Other Workflows

```
/patent → calls patent_value_analysis after filing
/investorReady → uses patent_value_analysis for due diligence
/petalSell → uses Licensing + Selling dimensions
/petalProtect → uses FTO + Strategic Blocking dimensions
/ipFortress → uses all 12 dimensions for portfolio strategy
/revenueEngine → uses Licensing + Standards dimensions for pricing
```

---

## Legal Disclaimer

⚠️ This skill provides **indicative estimates** for internal strategic planning. Patent valuations for financial reporting, tax purposes, or legal proceedings MUST be conducted by a **qualified patent valuation firm** (e.g., Ocean Tomo, IP Offering, Kroll). This analysis should be treated as a **strategic decision tool**, not a certified appraisal.

---

_"The most expensive mistake in IP is not filing a patent — it's filing a patent and then not knowing what it's worth."_
