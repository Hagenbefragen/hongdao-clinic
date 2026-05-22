---
description: XPollination Holistic Best Practice Evaluation Framework
---
# /xpollination - Holistic Best Practice Evaluation

> **🧠 SKILL REQUIRED:** Before executing this workflow, read the **XPollination Analyst** skill at `.agent/skills/xpollination_analyst/SKILL.md` for hierarchical BPC design methodology, TÜV-rigor scoring standards, and spider web data architecture.

**Purpose:** Conduct holistic Best Practice evaluations for any product/technology/use case, identifying Best Practice Solutions (BPS) against comprehensive Best Practice Criteria (BPC).

## Core Framework

### 1. Define Hierarchical Best Practice Criteria (BPC)

**Structure:** 5-9 Main BPC, each with 2-6 Sub BPC.

**Mandatory Main BPC (Always Include):**
1. 🌍 **Holistic Sustainability** - Planetary health & resource efficiency
2. ❤️ **Health & Safety** - Human biological and mental well-being
3. ⚖️ **Social Justice & Ethics** - Inclusion, accessibility, affordability
4. 🔧 **Longevity & Repairability** - Durability, modularity, open standards
5. 🔓 **Freedom to Operate** - No vendor lock-in, open source priority

**Rules:**
- [ ] Each criterion has a one-sentence definition (max 20 words)
- [ ] Present in nested table or collapsible markdown
- [ ] Sub BPC are measurable aspects of Main BPC

### 2. Identify Best Practice Solutions (BPS)

Select 4-9 real-world solutions prioritizing:
- [ ] Fully Open Source / Open Hardware first
- [ ] Maximum Freedom to Operate
- [ ] Global availability
- [ ] Balanced mix of open, hybrid, and commercial options

### 3. Evaluate with KPIs

**Scoring:**
- Scale: 0-10 (10 = absolute best-in-class)
- Main BPC score = average of Sub BPC scores
- Evidence-based, transparent, rigorous

**Required Tables:**
- [ ] Overview table with Main BPC scores
- [ ] Detailed tables per Main BPC showing Sub BPC KPIs
- [ ] Include: price, purchase links, affiliate/referral info

### 4. Create Interactive Spider Web Chart

**ONE single Chart.js radar chart with:**

- [ ] **Toggle Switch:** "Simplified View ↔ Detailed View"
  - Simplified: 5-9 Main BPC axes (averaged scores)
  - Detailed: All Sub BPC axes (up to 25), color-coded by Main BPC

- [ ] **Tooltips:**
  - Axis hover: Definition + score for hovered solution
  - Data point hover: Solution name, price, Open Source status

- [ ] **Legend enhancements:**
  - Dataset legend with Open Source/Hybrid highlighted
  - Criteria definitions (collapsible)

- [ ] **Price display:** Prominent for each solution
- [ ] **Open Source highlighting:** Distinctive colors/icons
- [ ] **PNG download button**

### 5. Award XPollination Label

- [ ] Award "XPOLLINATION Holistic Best Practice Label" to top 1-2 solutions
- [ ] Provide overall ranking
- [ ] Justify from planetary + human-centric perspective

## Implementation Rules

1. **Scoring must be evidence-based** - More rigorous than TÜV, Stiftung Warentest, etc.
2. **Prioritize long-term freedom** - Reparability, openness, planetary health
3. **Open Source first** - Always search for OS alternatives before commercial
4. **Direct purchase links required** - Include affiliate/referral details
5. **Consistent output structure** - For cross-evaluation comparability
6. **Single interactive chart** - Never multiple static charts

## Website Implementation

When adding new XPollination Decisions to the website:

1. **Create View:** `website/src/pages/xpollination/views/[Decision]View.tsx`
2. **Create Plugin:** `website/src/pages/xpollination/plugins/[Decision]Plugin.tsx`
3. **Register Plugin:** Add to `website/src/pages/xpollination/plugins/index.ts`
4. **Add Route:** Update `website/src/App.tsx` with route to View
5. **Hub displays:** Collapsible banner for each registered plugin

## Example Decisions

| Decision | Title | Status |
|----------|-------|--------|
| #1 | Sovereign Structure (Legal Entities) | ✅ Active |
| #2 | SSI Best Practice (Digital Identity) | ✅ Active |
