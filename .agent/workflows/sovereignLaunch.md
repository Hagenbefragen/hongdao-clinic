---
description: Sovereign launch readiness — OWASP pentesting + EU compliance + legal pages + data sovereignty. Ship with zero compliance debt.
---

# /sovereignLaunch — Zero Compliance Debt Launch

// turbo-all

## Skills Chain

`security_audit` → `launch_guardian` → `regulatory_navigator` → `legal_compliance` → `data_sovereignty_audit`

## Step 1: `security_audit` — Find Vulnerabilities

1. Read SKILL.md: `c:\ohm\.agent\skills\security_audit\SKILL.md`
2. Run OWASP Top 10:2025 checklist
3. Scan backend for injection, auth bypass, IDOR
4. Scan frontend for XSS, data leaks, exposed keys
5. Check server configuration (headers, CORS, TLS)

## Step 2: `launch_guardian` — Production Readiness Score

1. Read SKILL.md: `c:\ohm\.agent\skills\launch_guardian\SKILL.md`
2. Run 100-point launch scoring
3. Verify PWA readiness (manifest, service worker, icons)
4. Test on 3 browsers + mobile
5. Verify SSL, CDN, error pages

## Step 3: `regulatory_navigator` — EU Compliance Matrix

1. Read SKILL.md: `c:\ohm\.agent\skills\regulatory_navigator\SKILL.md`
2. Check eIDAS 2.0, NIS2, DORA, DSA requirements
3. Map compliance status for each regulation
4. Flag gaps that block launch

## Step 4: `legal_compliance` — Required Legal Pages

1. Read SKILL.md: `c:\ohm\.agent\skills\legal_compliance\SKILL.md`
2. Generate/verify: Impressum, DSGVO/Privacy, AGB/Terms
3. Ensure correct jurisdiction (Austrian VerG 2002)
4. Add cookie banner if required

## Step 5: `data_sovereignty_audit` — Interior Data Check

1. Read SKILL.md: `c:\ohm\.agent\skills\data_sovereignty_audit\SKILL.md`
2. Scan for plaintext PII in database
3. Check for dead/duplicate code
4. Verify unwired services are disconnected
5. Ensure all migrations are complete

### 🚫 LAUNCH GATE

- Security score < 70 → **DO NOT LAUNCH**
- Missing legal pages → **DO NOT LAUNCH**
- PII in plaintext → **DO NOT LAUNCH**
- All clear → 🟢 LAUNCH APPROVED

## Output

```markdown
## Sovereign Launch Report

- Security: [score/100]
- Launch Readiness: [score/100]
- EU Compliance: [matrix]
- Legal Pages: [checklist]
- Data Sovereignty: [audit results]
- Decision: [LAUNCH / BLOCK with reasons]
```
