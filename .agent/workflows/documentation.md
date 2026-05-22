---
description: Guide for creating and organizing best-practice documentation in the OHM Ecosystem.
---

# 📚 Documentation Best Practices Workflow

This workflow defines how to create, update, and organize documentation to ensure the "Single Source of Truth" remains clean and usable.

## 1. Master Documentation Folder

All documentation **MUST** reside in the `Documentation/` folder.
NO `docs/`, `doc/`, or root-level markdown files (except `README.md` and specific operational files).

## 2. Folder Structure

Determine where your content belongs:

### A. Core Governance (`Documentation/Rules/`)

- **Content:** Strict mandates, coding standards, critical constraints.
- **Format:** Uppercase filenames (e.g., `REAL_DATA_MANDATE.md`).
- **Tone:** Imperative. "You MUST...".

### B. Specifications & Architecture (`Documentation/Specs/`)

- **Content:** Product vision, strategies, technical architecture, implementation plans.
- **Format:** `FEATURE_NAME.md` or `SYSTEM_NAME.md`.
- **Tone:** Descriptive, visionary.

## 📂 Folder Structure

All documentation lives in `Documentation/` with the following structure:

- **`Documentation/Architecture/`** - System design, data flows, technical architecture
- **`Documentation/AS_BUILD/`** - Implementation history, deployment records
- **`Documentation/Audits/`** - Security audits, best practice reviews
- **`Documentation/Marketing/Blog/`** - Tech blog posts, announcements
- **`Documentation/Plans/`** - Feature roadmaps, implementation plans
- **`Documentation/Research/`** - Research papers, technical investigations
- **`Documentation/Specs/`** - Feature specifications, requirements
- **`Documentation/Testing/`** - Test plans, browser test scripts
- **`Documentation/Manuals/`** - User guides, operational procedures
- **`Documentation/MEETING_Briefings/`** - Executive briefing dashboards and CRM meeting notes

**IMPORTANT**: Never create files in `docs/` - this folder has been deprecated. Always use `Documentation/`.

---

## 3. Standard Header Format

Every major document should start with a clear Title and Context.

```markdown
# [Title of Document]

**Status:** [Draft / Active / Deprecated]
**Last Updated:** [Date]
**Owner:** [Role/Person]

## Summary

[Brief 2-3 sentence explanation of what this document covers]

### 🏗️ Architectural Mapping (Mandatory for Technical Specs)

If the document describes system features, layers, or technical components, it MUST include:

1. **Agent Topology**: Exact count of active agents vs. infrastructure.
2. **Knowledge Domains**: The underlying science/domain for each component.
3. **Roles**: Is the component a Blocker, Flagger, Advisor, Orchestrator, or Infra?
4. **BPC Alignment**: How does this improve our Best Practice Compliance score?
```

## 4. Workflow for Updating Documentation

1.  **Search First:** Check `Documentation/00_INDEX.md` or relevant subfolders.
2.  **Create/Edit:** Place file in the correct subfolder (Section 2).
3.  **Link:** Add to `00_INDEX.md` if it's a major addition.
4.  **No Duplicates:** Do not create a new file if one exists. Update the existing one.

## 5. 🌸 Petal Sprint Documentation Rule — MANDATORY BEST PRACTICE

### The Standard

> **THE FEAT FOLDER IS THE SINGLE SOURCE OF TRUTH.**
> Every document created during a petal sprint is BORN in the FEAT-XXX folder. No exceptions.

> 🔴 **CANONICAL LOCATION:** `c:\ohm\Documentation\features\research\FEAT-XXX_[topic]\`
> ⛔ **DEPRECATED:** `.agent/features/research/` — NEVER create FEAT folders there!
> 📋 **FEAT Number Counter:** `Documentation/features/research/FEAT_NUMBER_COUNTER.md` — **READ BEFORE CREATING NEW FEAT FOLDERS**

Documentation/ subfolders (`VC-EXIT/`, `Legal/`, `Patents/`, etc.) are **secondary mirrors** only — they exist so documents are accessible from canonical public paths. But the document is always **created in FEAT-XXX first**.

**If you search for a petal document, look in the FEAT folder. Always. Period.**

### FEAT Folder Structure — Flat, Numbered, Primary

```
Documentation/features/research/FEAT-XXX_[Topic_Name]/    ← CREATE FILES HERE
  1_SENSE_[topic]_REPORT.md
  1_SENSE_[topic]_MarketMap.html
  2_DISSOLVE_[topic]_REPORT.md
  2_DISSOLVE_[topic]_TRIZ.html
  3_SHIP_[topic]_REPORT.md
  3_SHIP_[topic]_Patent.html
  3_SHIP_[topic]_BMK_Letter.html
  3_SHIP_[topic]_Dashboard.html
  4_SELL_[topic]_REPORT.md
  4_SELL_[topic]_GTM.html
  4_SELL_[topic]_Proposal.html
  5_PROTECT_[topic]_REPORT.md
  5_PROTECT_[topic]_SecurityAudit.html
  5_PROTECT_[topic]_AGB.html
  5_PROTECT_[topic]_DPA_AVV.html
  6_MEASURE_[topic]_REPORT.md
  6_MEASURE_PETAL-MASTER.html         ← 🌸 THE LOTUS FLOWER
```

### Naming Convention

```
[PetalNumber]_[PETALNAME]_[WhatItIs].[ext]
```

| Part          | Examples                                                                     |
| ------------- | ---------------------------------------------------------------------------- |
| `PetalNumber` | `1`, `2`, `3`, `4`, `5`, `6`                                                 |
| `PETALNAME`   | `SENSE`, `DISSOLVE`, `SHIP`, `SELL`, `PROTECT`, `MEASURE`                    |
| `WhatItIs`    | `REPORT`, `GTM`, `Patent`, `AGB`, `DPA_AVV`, `SecurityAudit`, `PETAL-MASTER` |
| `ext`         | `.md` for reports, `.html` for visual/legal artifacts                        |

Files sort alphabetically → they sort by petal number. **Open the FEAT folder and you see the entire sprint.**

### Two Locations — PRIMARY vs SECONDARY

| Priority                | Location                                               | Role                                                   |
| ----------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| 🔴 **PRIMARY** (always) | `Documentation/features/research/FEAT-XXX_[topic]/`    | **Create here first** — every petal document born here |
| 🟡 SECONDARY (mirror)   | `Documentation/VC-EXIT/` or relevant subfolder         | Canonical public path for sharing/linking — copy AFTER |

> **RULE: Never create a file in `Documentation/Legal/`, `Documentation/Patents/`, or any other subfolder without FIRST creating it in the FEAT folder.**
> The FEAT folder is where you look. The Documentation folder is where others look.

### Execution — Create in FEAT First, Then Mirror

```powershell
# STEP 1: Create the document directly in FEAT folder
$feat = "c:\ohm\Documentation\features\research\FEAT-XXX_[topic]"
# Write your HTML/MD directly to $feat\N_PETALNAME_[WhatItIs].[ext]

# STEP 2 (optional): Mirror to canonical Documentation/ path
Copy-Item "$feat\5_PROTECT_[topic]_AGB.html"         "c:\ohm\Documentation\Legal\[topic]_AGB.html" -Force
Copy-Item "$feat\5_PROTECT_[topic]_SecurityAudit.html" "c:\ohm\Documentation\Audits\[topic]_Audit.html" -Force
Copy-Item "$feat\4_SELL_[topic]_GTM.html"             "c:\ohm\Documentation\VC-EXIT\[topic]_GTM.html" -Force
```

> **NEVER create subfolders inside FEAT-XXX. Always flat. Always prefixed. Always born in FEAT.**

## 6. ✋ ToDoManual Protocol

If you identify manual verification steps or external dependencies (API keys) that cannot be automated:

1.  **Open**: `Documentation/Manuals/ToDoManual.md`.
2.  **Append**: Add the task under a `## [Date] Context` header.
3.  **Format**: `- [ ] [High Priority] Task description`
