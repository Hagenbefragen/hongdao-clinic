---
description: Health Research Series — Generate infographics with MANDATORY real images for personal health deep-dives
---

// turbo-all

# 🧬 /healthResearch — Health Series Infographic Workflow

> **PURPOSE:** Create diamond-hardened, brutally honest health research infographics
> with REAL generated medical images — not ASCII art or placeholder diagrams.
> Part of the OHM personal health knowledge series alongside Hip Healing,
> Deparasitation, and Detoxification.

## 📜 MANDATORY RULES

### Rule 1: REAL IMAGES REQUIRED
> 🔴 **EVERY health infographic MUST include at least 1 generated medical illustration.**
> ASCII diagrams in the HTML are SUPPLEMENTARY, not primary.
> Use the `generate_image` tool to create scientifically accurate, premium medical illustrations.
> Style: dark background, bioluminescent elements, medical textbook meets cyberpunk aesthetic.

### Rule 2: Diamond-Hardened Science
> Every claim MUST have an evidence badge:
> - `✅ PROVEN` — established science, clinical trials, textbook anatomy
> - `⚠️ HYPOTHESIS` — leading theory but not definitively proven
> - `❌ DISPROVEN` — debunked or insufficient evidence
> NEVER present hypotheses as facts. Brutal honesty > virality.

### Rule 3: Trap Cards
> Every health topic has counterintuitive dangers. Identify and document them as
> "Trap Cards" with danger dot indicators (1-4 dots). These are the most valuable
> content — things people do thinking they're healing that actually make it worse.

### Rule 4: Medical Disclaimer
> EVERY health infographic MUST include a medical disclaimer footer.
> This is NON-NEGOTIABLE. Template:
> ```
> ⚠️ MEDICAL DISCLAIMER: This report is for educational and research purposes only.
> It is not medical advice. Consult a healthcare professional before making changes
> to your health regimen.
> ```

### Rule 5: References
> Minimum 15 academic/clinical references. Categorized by topic.
> PubMed links preferred. Books with ISBNs. Named practitioners with credentials.

## 📁 File Convention

```
Documentation/Research/                          ← Standalone copies (browsable)
  SENSE_[Topic]_Infographic.html                 ← HTML infographic
  [topic]_[concept].png                          ← Generated medical images

Documentation/features/research/FEAT-XXX_[Topic]/ ← SSOT in FEAT folder
  3_SHIP_[Topic]_Infographic.html                ← Primary HTML (SSOT)
  [concept].png                                  ← Generated images (SSOT)
```

## 🎨 Design System (Health Series Standard)

| Element | Value |
|---------|-------|
| Background | `#0a0a0f` (near-black) |
| Fonts | Inter (body) + Playfair Display (headers) |
| Accent Colors | Topic-specific (Hip=green/purple, Brain=cyan/pink, Detox=gold/green) |
| Cards | `#12121a` with `.06` white border, 16px radius, hover lift |
| Animations | Scroll-fade (IntersectionObserver) |
| Trap Cards | Left-border color stripe, danger dots, think/actual/solution pattern |
| Evidence Badges | Inline colored pills (green=proven, gold=hypothesis, red=disproven) |
| Concentration Bars | Horizontal bars with gradient fills |
| Timelines | Vertical line with colored dot nodes |
| Image Style | Dark background, bioluminescent, medical+cyberpunk, sans-serif labels |

## ✅ Execution Checklist

```
1. [ ] Research topic thoroughly (READ FIRST — Toltec Agreement #3)
2. [ ] Run through SDD petals (SENSE minimum, DISSOLVE for hardening)
3. [ ] Generate 1-3 medical illustrations using generate_image tool
4. [ ] Create HTML infographic matching FEAT-070 design system
5. [ ] Include ALL evidence badges on claims
6. [ ] Include ALL trap cards with danger dots
7. [ ] Add medical disclaimer
8. [ ] Add 15+ references with links
9. [ ] Copy HTML to Documentation/Research/ (standalone)
10. [ ] Copy images to Documentation/Research/ (standalone)
11. [ ] Verify files exist in both FEAT folder AND Research folder
```

## 📚 Health Series Registry

| # | Topic | FEAT | HTML | Images | Date |
|:-:|-------|------|------|--------|------|
| 1 | Hip Joint Bone-on-Bone Healing | FEAT-070 | SENSE_Hip_Healing_Infographic.html | — (pre-workflow) | 2026-02-23 |
| 2 | Deparasitation | — | SENSE_Deparasitation_Infographic.html | — (pre-workflow) | 2026-02 |
| 3 | Detoxification | — | SENSE_Detoxification_Infographic.html | — (pre-workflow) | 2026-02 |
| 4 | Brain Pain Paradox & Hydration | FEAT-282 | Brain_Cant_Feel_Pain_Infographic.html | brain_pain_paradox.png, sglt1_osmosis_mechanism.png | 2026-03-22 |
| 5 | Salt, Sugar, Water & Caffeine | FEAT-282 V2 | Salt_Sugar_Water_Caffeine_MultiFactor.html | salt_quality_comparison.png, caffeine_withdrawal_brain.png | 2026-03-23 |

> **Next topics (ideas):** Sleep architecture, Gut-brain axis, Fascia & pain, Breathwork science, Oxalate trap, EMF & body conductivity
