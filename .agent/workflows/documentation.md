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
*   **Content:** Strict mandates, coding standards, critical constraints.
*   **Format:** Uppercase filenames (e.g., `REAL_DATA_MANDATE.md`).
*   **Tone:** Imperative. "You MUST...".

### B. Specifications & Architecture (`Documentation/Specs/`)
*   **Content:** Product vision, strategies, technical architecture, implementation plans.
*   **Format:** `FEATURE_NAME.md` or `SYSTEM_NAME.md`.
*   **Tone:** Descriptive, visionary.
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
```

## 4. Workflow for Updating Documentation

1.  **Search First:** Check `Documentation/00_INDEX.md` or relevant subfolders.
2.  **Create/Edit:** Place file in the correct subfolder (Section 2).
3.  **Link:** Add to `00_INDEX.md` if it's a major addition.
4.  **No Duplicates:** Do not create a new file if one exists. Update the existing one.

## 6. ✋ ToDoManual Protocol
If you identify manual verification steps or external dependencies (API keys) that cannot be automated:
1.  **Open**: `Documentation/Manuals/ToDoManual.md`.
2.  **Append**: Add the task under a `## [Date] Context` header.
3.  **Format**: `- [ ] [High Priority] Task description`

