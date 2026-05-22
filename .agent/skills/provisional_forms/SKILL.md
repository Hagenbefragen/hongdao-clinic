---
name: Provisional Patent Forms Generator
description: Downloads and pre-fills all required USPTO forms for provisional patent applications (SB/16 Cover Sheet, SB/15A Micro Entity, ADS). Generates per-patent filing folders with all documents ready for Patent Center upload.
group: smart.frontend
---

# Provisional Patent Forms Generator

Generate all required USPTO forms for provisional patent applications, pre-filled with inventor data, and organized into per-patent filing folders.

## What This Skill Does

For each patent in the OHM portfolio, this skill generates a **filing-ready folder** containing:

| Document                          | Form       | Purpose                                                    | Required?                   |
| --------------------------------- | ---------- | ---------------------------------------------------------- | --------------------------- |
| `cover_sheet_SB16.html`           | PTO/SB/16  | Identifies application as provisional                      | ✅ MANDATORY                |
| `micro_entity_SB15A.html`         | PTO/SB/15A | Certifies micro entity status for reduced fees             | ✅ MANDATORY (for $65 rate) |
| `application_data_sheet_ADS.html` | PTO/AIA/14 | Bibliographic data for USPTO capture                       | 📎 RECOMMENDED              |
| `specification.html`              | —          | The provisional application itself (from existing patents) | ✅ MANDATORY                |
| `FILING_CHECKLIST.md`             | —          | Per-patent checklist for filing completion                 | 📋 Tracking                 |

## Prerequisites

- Node.js installed
- Existing patent description HTMLs in `Documentation/Patents/FILING/`
- Existing provisional HTMLs in `Documentation/Patents/provisionalPatent/`

## Usage

### Generate forms for ALL 36 patents:

```powershell
node c:\ohm\scripts\generate-provisional-forms.cjs
```

### Generate forms for a SINGLE patent:

```powershell
node c:\ohm\scripts\generate-provisional-forms.cjs --patent AEGIS
```

## Output Structure

```
Documentation/Patents/provisionalPatent/
├── 1_AEGIS/
│   ├── cover_sheet_SB16.html          ← PTO/SB/16 pre-filled
│   ├── micro_entity_SB15A.html        ← PTO/SB/15A pre-filled
│   ├── application_data_sheet_ADS.html ← PTO/AIA/14 pre-filled
│   ├── specification.html             ← Full provisional application
│   └── FILING_CHECKLIST.md            ← Per-patent checklist
├── 2_SP1A/
│   ├── ...
├── ... (36 folders total)
└── 33_SP7QFAI/                        ← QFAI-C last
    └── ...
```

## Inventor Data (Pre-Filled)

All forms are pre-filled with the following inventor data.
Fields marked 🟡 are editable (click to modify, auto-saves to localStorage).

| Field          | Value                     | Editable? |
| -------------- | ------------------------- | --------- |
| Given Name     | Hagen                     | 🟡 Yes    |
| Family Name    | Schmidt                   | 🟡 Yes    |
| City           | Wiener Neustadt           | 🟡 Yes    |
| State/Province | Lower Austria             | 🟡 Yes    |
| Country        | Austria                   | 🟡 Yes    |
| Postal Code    | [ENTER]                   | 🟡 Yes    |
| Street Address | [ENTER]                   | 🟡 Yes    |
| Citizenship    | Austria                   | 🟡 Yes    |
| Phone          | [ENTER]                   | 🟡 Yes    |
| Email          | [ENTER]                   | 🟡 Yes    |
| Entity Status  | Micro Entity              | Pre-set   |
| Attorney/Agent | Pro Se (Self-Represented) | Pre-set   |

## Micro Entity Certification Requirements (35 U.S.C. § 123)

The SB/15A form certifies that the applicant:

1. ✅ Qualifies as a small entity (< 500 employees)
2. ✅ Has NOT been named on more than 4 previously filed non-provisional applications
   (provisional applications do NOT count toward this limit)
3. ✅ Did NOT have gross income exceeding 3× median household income (~$230,000)
   in the preceding calendar year
4. ✅ Has NOT assigned/licensed rights to an entity that exceeds the income limit

## Integration with /provisional_patent Workflow

This skill is called at **Step 5** of the `/provisional_patent` workflow:

```
Step 5: Prepare Filing Documents
  → Run: node c:\ohm\scripts\generate-provisional-forms.cjs
  → Output: Per-patent folders with all forms pre-filled
  → Next: Step 8 (File via Patent Center)
```

## Print to PDF Instructions

Each HTML form includes print-optimized CSS. To generate PDFs:

1. Open the HTML file in Chrome/Edge
2. Press `Ctrl+P`
3. Set "Destination" to "Save as PDF"
4. Set margins to "Default" or "Minimum"
5. Ensure "Background graphics" is checked
6. Save to the same patent folder

Alternatively, use the automated PDF generation:

```powershell
# Batch convert all forms to PDF (requires Chrome)
node c:\ohm\scripts\generate-provisional-forms.cjs --pdf
```
