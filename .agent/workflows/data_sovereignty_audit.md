---
description: Interior data integrity audit — scans for plaintext PII, dead code, unwired services, and incomplete migrations. The missing audit dimension that perimeter security audits don't cover.
---

# /data_sovereignty_audit — Interior Data Integrity + Quantum Future Audit

> **🧠 SKILL REQUIRED:** Before executing, read the **Data Sovereignty Audit** skill at `.agent/skills/data_sovereignty_audit/SKILL.md` for all 10 dimension scoring criteria, anti-patterns, and the full methodology.

## Purpose

Answers two questions perimeter audits miss:

1. **"Is the data INSIDE already clean?"** (Dimensions 1–7)
2. **"Is the crypto FUTURE-PROOF against quantum threats?"** (Dimensions 8–10)

## When to Use

- Before production deployments
- After any security audit (complement to `/audit_BP`)
- After merging branches or adding entity columns
- Quarterly health check
- Before investor/compliance presentations
- When user says: "audit data", "check PII", "data sovereignty", "quantum audit", "HNDL"

## Workflow Steps

// turbo-all

### Step 0: Read the Skill

1. Read `.agent/skills/data_sovereignty_audit/SKILL.md` for the full 10-dimension methodology.

---

### PART A: INTERIOR (Dimensions 1-7)

### Step 1: Dimension 1 — Data-at-Rest PII Scan

2. Scan entity files for plaintext PII columns without hash/encrypted counterparts.
3. If DB access available, run the NULL check query from the skill.
4. Score Dimension 1.

### Step 2: Dimension 2 — Package Hygiene

5. List all `package.json` under `shared/`.
6. Check for duplicate function/class names across packages.
7. Score Dimension 2.

### Step 3: Dimension 3 — Wiring Verification

8. Find all critical security/crypto service files.
9. For EACH, verify it is imported somewhere (not just existing).
10. Score Dimension 3.

### Step 4: Dimension 4 — Migration Completeness

11. Check derived columns for NULL values on existing rows.
12. Score Dimension 4.

### Step 5: Dimension 5 — Environment Secret Drift

13. Extract all `process.env.*` references from backend code.
14. Compare against `.env.example`.
15. Score Dimension 5.

### Step 6: Dimension 6 — Guard-to-Route Coverage

16. Find all route decorators (`@Get`, `@Post`, etc.).
17. Cross-reference with `@UseGuards` or `@Public()`.
18. Score Dimension 6.

### Step 7: Dimension 7 — Soft-Delete / GDPR Integrity

19. Find all `.find()` / `.findOne()` calls.
20. Verify each respects soft-delete filters.
21. Score Dimension 7.

---

### PART B: QUANTUM FUTURE (Dimensions 8-10)

### Step 8: Dimension 8 — Cryptographic Inventory

22. Scan ALL code for cryptographic algorithm references (RSA, ECDSA, DH, etc.).
23. Classify each as Quantum Safe ✅ or Vulnerable ❌.
24. Check TLS for PQ key exchange support.
25. Score Dimension 8.

### Step 9: Dimension 9 — Crypto-Agility

26. Check for hardcoded algorithm names vs configurable options.
27. Verify abstraction layers exist (SovereignVault, etc.).
28. Rate against NIST Crypto-Agility Maturity Model (Level 0-5).
29. Score Dimension 9.

### Step 10: Dimension 10 — Data Lifespan vs HNDL Risk

30. Classify every sensitive data type by lifespan (minutes, days, forever).
31. For each "forever" or "decades" item, verify quantum-safe protection.
32. Calculate HNDL Exposure Window per the skill formula.
33. Score Dimension 10.

---

### Step 11: Generate Report

34. Create the audit report at:

```
Documentation/Audits/AUDIT_DATA_SOVEREIGNTY_[YYYY-MM-DD].md
```

Use the output format from the skill (Summary tables + Findings + Remediation + Regulatory Alignment).

35. If any dimension scores below 7/10, create remediation tasks:
    - Dim 1 low → Hash/encrypt PII migration
    - Dim 2 low → Merge duplicate packages
    - Dim 3 low → Wire unwired services
    - Dim 4 low → Create backfill migration
    - Dim 5 low → Update .env.example + production
    - Dim 6 low → Add missing guards
    - Dim 7 low → Fix leaking queries
    - Dim 8 low → Create cryptographic inventory doc
    - Dim 9 low → Wrap crypto behind abstraction
    - Dim 10 low → Prioritize HNDL-vulnerable data for PQC migration

### Step 12: Commit

36. Commit the report:

```powershell
cd c:\ohm; git add Documentation/Audits/AUDIT_DATA_SOVEREIGNTY_*.md; git commit -m "audit(sovereignty): 10-dimension data sovereignty audit - [SCORE]/10"
```

## Quality Standards

- **Every finding must include file path and line number**
- **Every score must be justified with evidence**
- **Never score "✅ IMPLEMENTED" just because a file exists — verify the import chain**
- **Quantum dimensions MUST reference NIST/CISA/EU timelines**
- **HNDL risk classification is MANDATORY for all long-lived data**
