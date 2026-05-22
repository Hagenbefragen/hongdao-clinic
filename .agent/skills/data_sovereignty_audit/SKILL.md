---
name: Data Sovereignty Audit
description: Interior data integrity audit — checks what PERIMETER audits miss. Scans for plaintext PII in DB, dead/duplicate code, unwired services, and incomplete migrations. The missing audit dimension that perimeter security audits don't cover.
group: smart.security
---

# Data Sovereignty Audit Skill

> **"Surf the wave, don't be broken by it."** — Hagen, Feb 2026

## Purpose

Perimeter security audits (`/audit_BP`, `/codetest`, `/productionlaunch`) answer: **"Can an attacker get in?"**

This skill answers the **other** question: **"Is the data INSIDE already clean, and is the crypto FUTURE-PROOF?"**

Created after two Diamond Standard audits (9.13/10 and 8.90/10) missed:

- Plaintext emails sitting in the database
- A duplicate SDK package with identical code
- A quantum-safe service file never imported anywhere
- An email hash migration that never ran for existing users

## When To Use

- **Before any production deployment** (add to `/deploy_master`)
- **After any security audit** (complement to `/audit_BP`)
- **After merging branches** (catch duplicate packages)
- **After adding new entity columns** (verify migration completeness)
- **Quarterly health check**
- **Before investor/compliance presentations** (GDPR, EU PQC mandate)

---

## THE 10 DIMENSIONS

```
┌─────────────────────────────────────────────────────────────────┐
│                DATA SOVEREIGNTY AUDIT v2.0                      │
│                                                                 │
│  INTERIOR (What's already inside?)                              │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐     │
│  │ 1. PII Scan │ │ 2. Packages  │ │ 3. Wiring Check     │     │
│  │ 4. Migration│ │ 5. Env Drift │ │ 6. Guard Coverage   │     │
│  │ 7. GDPR Del │ │              │ │                     │     │
│  └─────────────┘ └──────────────┘ └─────────────────────┘     │
│                                                                 │
│  QUANTUM FUTURE (Proactive — ride the wave)                    │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐     │
│  │ 8. Crypto   │ │ 9. Crypto    │ │ 10. Data Lifespan   │     │
│  │   Inventory │ │   Agility    │ │     vs HNDL Risk    │     │
│  └─────────────┘ └──────────────┘ └─────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## PART A: INTERIOR DIMENSIONS (1–7)

### Dimension 1: Data-at-Rest PII Scan

**Question**: Is there plaintext PII sitting in the database right now?

**Method**:

1. Hit the PII audit endpoint (if deployed):
   ```bash
   curl -s https://api.offlinehumanmode.com/api/vault/pii-audit | jq .
   ```
2. If endpoint unavailable, query directly:
   ```sql
   SELECT
     COUNT(*) as total_users,
     COUNT("emailHash") as hashed,
     COUNT(*) - COUNT("emailHash") as unhashed_emails,
     ROUND(COUNT("emailHash")::numeric / NULLIF(COUNT(*), 0) * 100, 1) as pct_compliant
   FROM "user"
   WHERE email IS NOT NULL;
   ```
3. Scan ALL entity files for plaintext PII columns:
   ```bash
   grep -rn "email\|phone\|address\|ssn\|passport\|birthdate\|firstName\|lastName" \
     --include="*.entity.ts" backend/src/ \
     | grep -v "Hash\|Encrypted\|encrypted\|hash\|// DEPRECATED"
   ```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | Zero plaintext PII, all sensitive columns hashed or encrypted |
| 7/10 | <5% plaintext PII remaining (migration in progress) |
| 4/10 | >5% plaintext PII |
| 1/10 | No hashing/encryption strategy exists |

---

### Dimension 2: Package Hygiene (Dead/Duplicate Code)

**Question**: Are there duplicate packages, dead exports, or unused dependencies?

**Method**:

1. List all `package.json` under `shared/`:
   ```bash
   find shared/ -name "package.json" -maxdepth 3
   ```
2. Check for overlapping exports:
   ```bash
   grep -rn "export function\|export class\|export const" \
     --include="*.ts" shared/ \
     | awk -F: '{print $3}' | sort | uniq -d
   ```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | Zero duplicate packages, all exports imported somewhere |
| 7/10 | Duplicate exists but with different content (legitimate split) |
| 4/10 | Duplicate code exists across packages |
| 1/10 | Multiple packages with identical functionality |

---

### Dimension 3: Wiring Verification (Is Code Actually Used?)

**Question**: Do critical security services actually exist in the dependency graph?

> **Anti-Pattern: "File Exists = Deployed"**
> The most dangerous false positive. A file can exist with 232 lines of
> perfect code and NEVER be imported. Always verify the full import chain.

**Method**:

1. Find critical service files:
   ```bash
   find backend/src/ -name "*.service.ts" -o -name "*.guard.ts" \
     | xargs grep -l "encrypt\|quantum\|vault\|security\|pqc"
   ```
2. For EACH file, verify imports:
   ```bash
   BASENAME=$(basename "$FILE" .ts)
   grep -rn "$BASENAME" --include="*.ts" --include="*.module.ts" backend/src/ \
     | grep -v "$FILE"
   # If 0 results → UNWIRED! ❌
   ```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | All critical services imported AND registered in DI |
| 7/10 | Services imported but only in tests, not production |
| 4/10 | Critical files exist but are not imported anywhere |
| 1/10 | Security modules completely disconnected |

---

### Dimension 4: Migration Completeness

**Question**: Do ALL existing rows have required computed/derived columns populated?

**Method**:

```sql
-- For each derived column, check NULL count:
SELECT
  'emailHash' as column_name,
  COUNT(*) as total,
  COUNT("emailHash") as populated,
  COUNT(*) - COUNT("emailHash") as missing
FROM "user"
WHERE email IS NOT NULL;
```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | All derived columns 100% populated, no pending migrations |
| 7/10 | <5% NULL values (migration in progress) |
| 4/10 | >5% NULL values or pending migrations not executed |
| 1/10 | Derived columns exist in schema but never populated |

---

### Dimension 5: Environment Secret Drift

**Question**: Do ALL environments have the SAME required secrets?

**Method**:

1. Extract all `process.env.*` references:
   ```bash
   grep -rno "process\.env\.\w\+" --include="*.ts" backend/src/ | \
     awk -F'.' '{print $NF}' | sort -u > /tmp/required_env.txt
   ```
2. Compare against `.env.example`:
   ```bash
   grep -oP '^[A-Z_]+' .env.example | sort -u > /tmp/example_env.txt
   diff /tmp/required_env.txt /tmp/example_env.txt
   ```
3. On production, verify no missing keys:
   ```bash
   ssh root@server "env | grep -c 'LIVEKIT\|JWT\|POSTGRES\|REDIS\|VAULT'"
   ```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | All environments have all required secrets, `.env.example` is up to date |
| 7/10 | 1-2 non-critical vars missing from `.env.example` |
| 4/10 | Critical secrets missing from production |
| 1/10 | No `.env.example` exists, secrets are undocumented |

---

### Dimension 6: Guard-to-Route Coverage Map

**Question**: Are there routes WITHOUT guards that SHOULD have them?

**Method**:

```bash
# Find all route handlers
grep -B5 "@(Get\|Post\|Put\|Delete\|Patch)" --include="*.controller.ts" -rn backend/src/

# Cross-reference with UseGuards
# Any route WITHOUT @UseGuards, @Public, or class-level guard = EXPOSED
```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | Every route has explicit guard or `@Public()` annotation |
| 7/10 | 1-2 routes missing guards but are read-only (low risk) |
| 4/10 | Write endpoints (POST/PUT/DELETE) lack guards |
| 1/10 | Multiple sensitive endpoints unprotected |

---

### Dimension 7: Soft-Delete / GDPR Integrity

**Question**: Do "deleted" records actually disappear from API responses?

**Method**:

```bash
# Find queries that might leak soft-deleted records
grep -rn "\.find(\|\.findOne(\|\.createQueryBuilder" --include="*.ts" backend/src/ \
  | grep -v "withDeleted\|deletedAt\|\.test\.\|\.spec\."
```

Then verify each result respects TypeORM's default `deletedAt IS NULL` filter, or explicitly uses `withDeleted: false`.

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | All queries respect soft-delete, GDPR compliant |
| 7/10 | Admin queries intentionally include deleted (documented) |
| 4/10 | Some user-facing queries leak deleted records |
| 1/10 | No soft-delete awareness in queries |

---

## PART B: QUANTUM FUTURE DIMENSIONS (8–10)

> **Context**: NIST will deprecate RSA/ECC by 2030 and disallow by 2035.
> The EU mandates national PQC transition plans by Dec 31, 2026.
> CISA/NSA recommend cryptographic inventory NOW.
> Forbes: 1-in-7 probability of a Cryptographically Relevant Quantum Computer (CRQC) by 2026.
> **"Harvest Now, Decrypt Later" (HNDL) attacks are already happening.**

### Dimension 8: Cryptographic Inventory (HNDL Defense)

**Question**: Do we know EVERY cryptographic algorithm in our stack, and which are quantum-vulnerable?

**Why**: Adversaries are already harvesting encrypted TLS traffic and database backups.
If ANY part of the stack uses RSA, ECDSA, or classical Diffie-Hellman, that data
is future-compromised the moment a CRQC exists.

**Method**:

1. **Scan all crypto usage in code**:
   ```bash
   # Find ALL cryptographic algorithm references
   grep -rn "RSA\|ECDSA\|secp256k1\|P-256\|curve25519\|DH\|diffie" \
     --include="*.ts" --include="*.json" --include="*.env" \
     backend/ shared/ frontend/
   ```
2. **Classify each finding**:
   | Algorithm | PQC Status | Action Required |
   |---|---|---|
   | AES-256-GCM | ✅ Quantum Safe | None |
   | SHA-256/SHA-3 | ✅ Quantum Safe | None (128-bit PQ equivalent) |
   | HMAC-SHA256 | ✅ Quantum Safe | None |
   | PBKDF2/scrypt | ✅ Quantum Safe | None |
   | **RSA** | ❌ **VULNERABLE** | Replace with ML-DSA |
   | **ECDSA** | ❌ **VULNERABLE** | Replace with ML-DSA + ECDSA hybrid |
   | **secp256k1** | ❌ **VULNERABLE** | Crypto-agile wallet design |
   | **Curve25519** | ❌ **VULNERABLE** | Replace with ML-KEM hybrid |
   | **DH/ECDH** | ❌ **VULNERABLE** | Replace with ML-KEM |

3. **Check TLS configuration** (are connections PQC-protected?):

   ```bash
   # Test if server supports PQ key exchange
   openssl s_client -connect api.offlinehumanmode.com:443 -groups X25519MLKEM768 2>&1 \
     | grep "Server Temp Key"
   ```

4. **Inventory third-party dependencies** using vulnerable crypto:
   ```bash
   grep -rn "require.*crypto\|from.*crypto" --include="*.ts" backend/ \
     | grep -v "node:crypto"
   ```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | Complete inventory, zero undocumented quantum-vulnerable crypto, hybrid deployed |
| 8/10 | Complete inventory, vulnerable crypto identified with migration timeline |
| 5/10 | Partial inventory, some quantum-vulnerable crypto unplanned |
| 2/10 | No inventory exists, quantum risk unassessed |

---

### Dimension 9: Crypto-Agility Score

**Question**: How quickly can we swap cryptographic algorithms WITHOUT rebuilding?

**Why**: Even NIST-approved PQC algorithms may be broken (SIKE was broken in 2022
after being a NIST finalist). Crypto-agility means we can swap in a weekend,
not in a quarter.

**Method**:

1. **Check for hardcoded algorithm names** (BAD):
   ```bash
   # Hardcoded = NOT agile
   grep -rn "'aes-256-gcm'\|'sha256'\|'HS256'\|'RS256'" \
     --include="*.ts" backend/ shared/
   ```
2. **Check for algorithm configuration** (GOOD):
   ```bash
   # Configurable = agile
   grep -rn "ALGORITHM\|algo\|cipher\|ENCRYPTION_METHOD" \
     --include="*.ts" --include="*.env" backend/ shared/
   ```
3. **Assess abstraction layers**:

   - Does a single `SovereignVault` class wrap all encryption? ✅ Agile
   - Are crypto calls scattered across 20 files? ❌ Not agile
   - Is the algorithm selectable via config/env? ✅ Agile
   - Are key sizes hardcoded? ❌ Not agile

4. **NIST Crypto-Agility Maturity Model** (simplified):
   | Level | Description | OHM Target |
   |---|---|---|
   | 0 | No awareness | ❌ |
   | 1 | Inventory exists | ✅ (Dimension 8) |
   | 2 | Abstraction layer exists | ✅ (SovereignVault) |
   | 3 | Can swap via config | 🎯 TARGET |
   | 4 | Automated rotation | Future |
   | 5 | Zero-downtime algorithm migration | Future |

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | All crypto behind abstraction, algorithm selectable via config, tested swap path |
| 7/10 | Abstraction exists (SovereignVault), but algorithm hardcoded inside it |
| 4/10 | Crypto calls scattered, no central abstraction |
| 1/10 | Algorithms hardcoded everywhere, swap requires rewrite |

---

### Dimension 10: Data Lifespan vs HNDL Risk Classification

**Question**: Which data has a lifespan LONGER than the time until CRQC arrives?

**Why**: "Harvest Now, Decrypt Later" only matters for data that will STILL be sensitive
when quantum computers arrive. A session token expiring in 15 minutes doesn't matter.
A health record, email address, or private key is sensitive for DECADES.

**Method**:

1. **Classify every sensitive data type** by lifespan:
   | Data Type | Lifespan | HNDL Risk | Protection Required |
   |---|---|---|---|
   | JWT Access Token | 15 min | 🟢 None | Current HS256 is fine |
   | JWT Refresh Token | 7 days | 🟢 None | Current HS256 is fine |
   | Session Cookie | 7 days | 🟢 None | HS256 + httpOnly |
   | **Email Address** | **Forever** | 🔴 **Critical** | Hash + encrypt at rest |
   | **Wallet Private Key** | **Forever** | 🔴 **Critical** | PQC hybrid required |
   | **Health Data** | **Decades** | 🔴 **Critical** | Quantum-safe vault |
   | **DID / Identity** | **Decades** | 🟡 **High** | ML-DSA signatures |
   | Trust Graph | Years | 🟡 High | Encrypted transmission |
   | Stream Room Name | Days | 🟢 None | No special protection |
   | XOM Balance | Months | 🟢 Low | Integrity (not confidentiality) |

2. **For each 🔴 Critical item**, verify:

   - Is it encrypted at rest? (AES-256-GCM minimum)
   - Is the key exchange quantum-safe? (ML-KEM or symmetric)
   - Could a HNDL attack on current TLS traffic expose it?

3. **Calculate HNDL Exposure Window**:

   ```
   HNDL Risk = Data Lifespan - Time Until CRQC

   If Data Lifespan > CRQC Timeline → MIGRATING NOW is mandatory
   If Data Lifespan < CRQC Timeline → Can migrate at standard pace

   Current estimates (2026):
   - Conservative CRQC: 2035 (9 years)
   - Aggressive CRQC:  2030 (4 years)
   - "Already harvesting": NOW
   ```

**Scoring**:
| Score | Criteria |
|---|---|
| 10/10 | All long-lived data protected with quantum-safe encryption, HNDL exposure = zero |
| 7/10 | Long-lived data identified, migration underway, <30% exposed |
| 4/10 | Long-lived data exists in quantum-vulnerable crypto |
| 1/10 | No lifespan classification, no HNDL awareness |

---

## OUTPUT FORMAT

```markdown
# 🏛️ Data Sovereignty Audit Report v2.0

**Date**: YYYY-MM-DD
**Scope**: [Full / Targeted]
**Auditor**: Antigravity Agent
**Framework**: `/data_sovereignty_audit` v2.0

## Summary

### Interior Dimensions (1-7)

| #   | Dimension                | Score | Status   | Detail               |
| --- | ------------------------ | ----- | -------- | -------------------- |
| 1   | Data-at-Rest PII         | X/10  | ✅/⚠️/❌ | N plaintext fields   |
| 2   | Package Hygiene          | X/10  | ✅/⚠️/❌ | N duplicate packages |
| 3   | Wiring Verification      | X/10  | ✅/⚠️/❌ | N unwired services   |
| 4   | Migration Completeness   | X/10  | ✅/⚠️/❌ | N% columns populated |
| 5   | Environment Secret Drift | X/10  | ✅/⚠️/❌ | N missing vars       |
| 6   | Guard-to-Route Coverage  | X/10  | ✅/⚠️/❌ | N unguarded routes   |
| 7   | Soft-Delete / GDPR       | X/10  | ✅/⚠️/❌ | N leaking queries    |

### Quantum Future Dimensions (8-10)

| #   | Dimension               | Score | Status   | Detail                   |
| --- | ----------------------- | ----- | -------- | ------------------------ |
| 8   | Cryptographic Inventory | X/10  | ✅/⚠️/❌ | N vulnerable algorithms  |
| 9   | Crypto-Agility          | X/10  | ✅/⚠️/❌ | Level N/5 maturity       |
| 10  | Data Lifespan vs HNDL   | X/10  | ✅/⚠️/❌ | N critical items exposed |

**Overall Interior Score: X.XX/10**
**Overall Quantum Score: X.XX/10**
**Combined Sovereignty Score: X.XX/10**

## Findings

[Detail each finding with file locations and remediation steps]

## Remediation Plan

[Ordered by severity, with estimated effort and timeline]

## Regulatory Alignment

| Framework              | Requirement                          | OHM Status |
| ---------------------- | ------------------------------------ | ---------- |
| GDPR Art. 30           | Record of processing activities      | ✅/❌      |
| CJEU C-413/23 P        | One-way hashes ≠ personal data       | ✅/❌      |
| EU PQC Mandate         | National transition plan by Dec 2026 | ✅/❌      |
| NIST SP 800-131A Rev 3 | Deprecate RSA/ECC by 2030            | ✅/❌      |
| CISA PQC Playbook      | Cryptographic inventory required     | ✅/❌      |
```

---

## INTEGRATION WITH OTHER AUDITS

| Existing Audit       | What It Checks                    | This Skill Adds                |
| -------------------- | --------------------------------- | ------------------------------ |
| `/audit_BP`          | Perimeter (CORS, guards, headers) | Interior data cleanliness      |
| `/codetest`          | Lint, build, test pass            | Dead code, unwired services    |
| `/unittest`          | Function correctness              | Migration data completeness    |
| `/productionlaunch`  | OWASP Top 10, pen testing         | Plaintext PII in production DB |
| `/xom_integrity`     | XOM amount fidelity               | All derived columns            |
| **NEW** → This skill | Interior + Quantum Future         | Proactive HNDL defense         |

---

## PROACTIVE vs REACTIVE

```
REACTIVE (what we did before):
  Bug found → Audit → Score → Fix → Deploy → Pray

PROACTIVE (what this skill enables):
  Dimension Scan → Risk Score → Migration Plan → Fix BEFORE exploit

  Specifically for Quantum:
  ┌────────────────────────────────────────────────┐
  │  TODAY (2026)                                  │
  │  • Inventory all crypto ← Dimension 8         │
  │  • Classify data lifespans ← Dimension 10     │
  │  • Ensure crypto-agility ← Dimension 9        │
  │                                                │
  │  2027-2028                                     │
  │  • Deploy ML-KEM hybrid key exchange           │
  │  • Deploy ML-DSA hybrid signatures             │
  │  • Test PQC TLS (X25519MLKEM768)               │
  │                                                │
  │  2029-2030 (NIST deprecation begins)           │
  │  • Remove all classical-only crypto paths      │
  │  • Full PQC-only mode available                │
  │                                                │
  │  2035 (NIST disallows RSA/ECC)                 │
  │  • Already done ✅ — surfing the wave          │
  └────────────────────────────────────────────────┘
```

## KEY REFERENCES

- **NIST SP 800-131A Rev 3** — Deprecation timeline for RSA/ECC
- **NIST IR 8547** — Transition to PQC Standards (Nov 2024)
- **CISA PQC Initiative** — Cryptographic inventory mandate
- **EU Recommendation 2024/2604** — PQC transition plans by Dec 2026
- **G7 CEG** — Financial sector PQC risk assessment in 2026
- **UK NCSC** — Full migration complete by 2035
- **CJEU C-413/23 P** — One-way hashes ≠ personal data
