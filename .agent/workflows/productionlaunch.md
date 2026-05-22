---
description: Production Launch Readiness — Security, Penetration Testing, Hacking Simulation, and Full Ecosystem Verification
---

# /productionlaunch — OHM Production Launch Readiness & Security Audit

// turbo-all

## 🎯 Overview

**Version**: 1.0 (Feb 2026)  
**Purpose**: The ULTIMATE pre-production and post-deployment verification protocol. Combines:

- ✅ **Smoke Testing** — All pages, routes, and features load
- 🔐 **Security Penetration Testing** — OWASP Top 10 2025 compliance
- 🕵️ **Hacking Simulation** — Automated attack scenarios
- 📱 **PWA Readiness** — Service Worker, manifest, offline
- ⛓️ **Web3 Security** — Wallet, smart contract, blockchain
- ⚡ **Performance** — Core Web Vitals, load testing
- 📋 **Compliance** — GDPR, legal pages, accessibility

**Standards Applied**: OWASP Top 10:2025, OWASP ASVS v5.0, OWASP WSTG, NIST FIPS 203/204/205

---

## 📋 Pre-Flight Checklist

Before running tests, verify:

- [ ] Backend is running on production (`pm2 status` on Hetzner)
- [ ] Frontend is built and deployed
- [ ] Database migrations are current
- [ ] SSL certificates are valid
- [ ] DNS is resolving for all subdomains

---

## PHASE 1: 🚀 SMOKE TEST (All Routes & Pages)

> **Goal**: Every public page in the ecosystem loads without errors.

### 1.1 Main App Routes (app.offlinehumanmode.com)

Test each route with browser_subagent. For each page:

- Navigate to the URL
- Wait 5s for SPA render
- Take screenshot
- Verify main heading/content renders
- Check for JS errors

| #   | Route                | Expected Content                             | Priority    |
| --- | -------------------- | -------------------------------------------- | ----------- |
| 1   | `/`                  | "Connect to OHM" login screen                | 🔴 Critical |
| 2   | `/login`             | Login options (Email, Wallet, QR)            | 🔴 Critical |
| 3   | `/identity`          | "Consciousness of Identity"                  | 🟠 High     |
| 4   | `/quantum`           | Quantum field animation, 7 Chakras           | 🟠 High     |
| 5   | `/echo`              | "Privacy-First Communication Hub"            | 🟠 High     |
| 6   | `/fortress`          | "Military-Grade Content Protection"          | 🟠 High     |
| 7   | `/xpollination`      | "Sovereign Invention Protection"             | 🟠 High     |
| 8   | `/immortal`          | "Whistleblower Protection"                   | 🟠 High     |
| 9   | `/shield`            | "Sovereign Shield" / "Quantum-Resistant VPN" | 🟡 Medium   |
| 10  | `/bug-bounty`        | "Help us squash bugs" + XOM rewards          | 🟡 Medium   |
| 11  | `/production-script` | Password gate (🎬 emoji, input)              | 🟡 Medium   |

### 1.2 Ecosystem Subdomains

| #   | URL                           | Expected Content         | Priority    |
| --- | ----------------------------- | ------------------------ | ----------- |
| 1   | `stream.offlinehumanmode.com` | "Own Your Digital Stage" | 🔴 Critical |
| 2   | `ohmretreat.com`              | Retreat landing page     | 🟠 High     |
| 3   | `offlinehumanmode.com`        | Main website             | 🟠 High     |

### 1.3 Static Assets

| #   | URL              | Expected                  | Priority    |
| --- | ---------------- | ------------------------- | ----------- |
| 1   | `/manifest.json` | Valid PWA manifest JSON   | 🔴 Critical |
| 2   | `/sw.js`         | Service worker file loads | 🔴 Critical |
| 3   | `/logo-512.png`  | OHM logo renders          | 🟡 Medium   |
| 4   | `/favicon.ico`   | Favicon present           | 🟡 Medium   |

---

## PHASE 2: 🔐 AUTHENTICATION & ACCESS CONTROL (OWASP A01/A07:2025)

> **Goal**: Verify authentication works correctly and access control is enforced.

### 2.1 Login Flow Tests

```
Test each login method:
1. Email Login: creator@test.ohm / TestPass123!
   - VERIFY: Login succeeds → Dashboard with @TEST-CREATOR
   - VERIFY: Session persists on page refresh
   - VERIFY: Logout clears session

2. Wallet Login (if available):
   - VERIFY: MetaMask prompt appears
   - VERIFY: Signature verification works

3. Guest Login:
   - VERIFY: Guest can access limited features
   - VERIFY: Guest CANNOT access admin functions
```

### 2.2 Broken Access Control Tests (OWASP A01:2025)

```
⚠️ CRITICAL SECURITY TESTS — Run these manually:

1. IDOR Test (Insecure Direct Object Reference):
   - Login as user A
   - Try to access user B's profile by changing userId in URL/API
   - EXPECTED: 403 Forbidden

2. Privilege Escalation:
   - Login as regular user
   - Try to call admin API endpoints (e.g., /v1/admin/users)
   - EXPECTED: 401/403

3. Unauthenticated Access:
   - Without login, call protected API endpoints
   - EXPECTED: 401 Unauthorized

4. JWT Token Tests:
   - Use expired JWT → EXPECTED: 401
   - Use modified JWT (changed userId) → EXPECTED: 401
   - Use JWT from different environment → EXPECTED: 401
```

### 2.3 API Guard Verification (BUG-316/317 Fix)

```powershell
# Test auction endpoints WITHOUT auth (should return 401)
try {
  $r = Invoke-WebRequest -Uri "https://app.offlinehumanmode.com/api/v1/auction/start" -Method POST -ContentType "application/json" -Body '{"roomId":"test"}' -UseBasicParsing
  Write-Host "FAIL: Got $($r.StatusCode) — should be 401"
} catch {
  $status = $_.Exception.Response.StatusCode.value__
  if ($status -eq 401) { Write-Host "PASS: 401 Unauthorized" }
  else { Write-Host "WARN: Got $status instead of 401" }
}

# Test with x-mock-user-id header (BUG-316 — should be IGNORED)
try {
  $headers = @{ "x-mock-user-id" = "1" }
  $r = Invoke-WebRequest -Uri "https://app.offlinehumanmode.com/api/v1/auction/start" -Method POST -Headers $headers -ContentType "application/json" -Body '{"roomId":"test"}' -UseBasicParsing
  Write-Host "FAIL: Mock header bypass still works!"
} catch {
  Write-Host "PASS: Mock header ignored — returned $($_.Exception.Response.StatusCode.value__)"
}
```

---

## PHASE 3: 🕵️ PENETRATION TESTING (OWASP Top 10:2025)

> **Goal**: Systematically test for the OWASP Top 10:2025 vulnerabilities.

### 3.1 Injection Tests (OWASP A05:2025)

```
Test ALL input fields for injection:

1. SQL Injection:
   - Email field: ' OR 1=1 --
   - Search/handle: '; DROP TABLE users; --
   - API params: {"roomId": "' OR ''='"}
   - EXPECTED: Input rejected or safely escaped

2. XSS (Cross-Site Scripting):
   - Name field: <script>alert('xss')</script>
   - Bio/description: <img src=x onerror=alert(1)>
   - URL params: ?q=<script>document.cookie</script>
   - EXPECTED: HTML entities escaped, no script execution

3. Command Injection:
   - File upload name: ; rm -rf /
   - Handle input: $(whoami)
   - EXPECTED: Sanitized, no shell execution

4. NoSQL Injection:
   - Login: {"email": {"$gt": ""}, "password": {"$gt": ""}}
   - EXPECTED: Rejected by input validation
```

### 3.2 Security Misconfiguration (OWASP A02:2025)

```powershell
# Check security headers
$response = Invoke-WebRequest -Uri "https://app.offlinehumanmode.com" -UseBasicParsing
$headers = $response.Headers

# These headers MUST be present:
$requiredHeaders = @(
  "Strict-Transport-Security",    # HSTS
  "X-Content-Type-Options",       # nosniff
  "X-Frame-Options",              # DENY or SAMEORIGIN
  "Referrer-Policy"               # strict-origin
)

foreach ($h in $requiredHeaders) {
  if ($headers[$h]) {
    Write-Host "✅ PASS: $h = $($headers[$h])"
  } else {
    Write-Host "❌ FAIL: Missing header: $h"
  }
}

# These headers should NOT reveal info:
$dangerousHeaders = @("X-Powered-By", "Server")
foreach ($h in $dangerousHeaders) {
  if ($headers[$h]) {
    Write-Host "⚠️ WARN: $h exposed: $($headers[$h])"
  } else {
    Write-Host "✅ PASS: $h hidden"
  }
}
```

### 3.3 Cryptographic Failures (OWASP A04:2025)

```powershell
# SSL/TLS Certificate Check
$uri = [System.Uri]"https://app.offlinehumanmode.com"
$req = [System.Net.HttpWebRequest]::Create($uri)
$req.AllowAutoRedirect = $false
try {
  $resp = $req.GetResponse()
  $cert = $req.ServicePoint.Certificate
  Write-Host "Certificate Subject: $($cert.Subject)"
  Write-Host "Issuer: $($cert.Issuer)"
  Write-Host "Expires: $($cert.GetExpirationDateString())"
  Write-Host "Protocol: TLS 1.2+ expected"
  $resp.Close()
} catch {
  Write-Host "Error checking cert: $($_.Exception.Message)"
}
```

```
Manual checks:
1. VERIFY: All cookies have Secure flag
2. VERIFY: All cookies have HttpOnly flag
3. VERIFY: SameSite=Strict on auth cookies
4. VERIFY: No sensitive data in URL parameters
5. VERIFY: Passwords hashed with bcrypt (NOT MD5/SHA1)
6. VERIFY: JWT uses RS256 or ES256 (NOT HS256 with weak secret)
```

### 3.4 CORS Validation

```powershell
# Test CORS from unauthorized origin (should be blocked)
try {
  $headers = @{ "Origin" = "https://evil-hacker.com" }
  $r = Invoke-WebRequest -Uri "https://app.offlinehumanmode.com/api/v1/users/me" -Headers $headers -UseBasicParsing
  if ($r.Headers["Access-Control-Allow-Origin"] -eq "https://evil-hacker.com") {
    Write-Host "❌ CRITICAL: CORS allows arbitrary origins!"
  } else {
    Write-Host "✅ PASS: CORS properly restricted"
  }
} catch {
  Write-Host "✅ PASS: Request blocked (expected)"
}

# Test CORS wildcard
try {
  $headers = @{ "Origin" = "*" }
  $r = Invoke-WebRequest -Uri "https://app.offlinehumanmode.com/api/v1/users/me" -Headers $headers -UseBasicParsing
  if ($r.Headers["Access-Control-Allow-Origin"] -eq "*") {
    Write-Host "❌ CRITICAL: CORS wildcard on authenticated endpoint!"
  }
} catch {
  Write-Host "✅ PASS: Wildcard origin rejected"
}
```

### 3.5 Rate Limiting Verification

```powershell
# Brute force login test (should get rate-limited after 5 attempts)
$results = @()
for ($i = 1; $i -le 10; $i++) {
  try {
    $body = '{"email":"brute@test.com","password":"wrong"}'
    $r = Invoke-WebRequest -Uri "https://app.offlinehumanmode.com/api/auth/login" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
    $results += "Attempt $i : $($r.StatusCode)"
  } catch {
    $status = $_.Exception.Response.StatusCode.value__
    $results += "Attempt $i : $status"
    if ($status -eq 429) {
      Write-Host "✅ PASS: Rate limited after $i attempts"
      break
    }
  }
}
$results | ForEach-Object { Write-Host $_ }
```

### 3.6 Session Management Tests

```
1. Session Fixation:
   - Get session token before login
   - Login
   - VERIFY: Token changes after authentication

2. Session Timeout:
   - Login
   - Wait for token expiry (or modify token timing)
   - VERIFY: Expired token is rejected

3. Concurrent Sessions:
   - Login from browser A
   - Login from browser B
   - VERIFY: Both sessions work OR policy enforced

4. CSRF Protection:
   - Attempt state-changing request from different origin
   - VERIFY: Blocked by SameSite cookies or CSRF token
```

---

## PHASE 4: 📱 PWA READINESS

> **Goal**: Verify Progressive Web App meets production standards.

### 4.1 Manifest Verification

```
Navigate to /manifest.json and verify:
- name: "OHM — Offline Human Mode"
- short_name: "OHM"
- start_url: "/"
- display: "standalone"
- theme_color: present
- background_color: present
- icons: at least 2 sizes (192x192, 512x512)
- orientation: set
```

### 4.2 Service Worker Tests

```javascript
// Execute in browser via subagent:

// Test 1: SW Registration
navigator.serviceWorker.getRegistration().then((r) => {
  console.log("SW Active:", r?.active?.state);
  console.log("SW Scope:", r?.scope);
});

// Test 2: Cache Status
caches.keys().then((names) => console.log("Caches:", names));

// Test 3: Offline Capability (simulate)
// Toggle offline in DevTools, verify cached pages load
```

### 4.3 PWA Install Criteria

```
Verify via browser_subagent:
1. HTTPS served ✅
2. manifest.json linked in HTML ✅
3. Service worker registered ✅
4. At least one icon ≥ 144x144 ✅
5. start_url is reachable ✅
```

---

## PHASE 5: ⛓️ WEB3 & BLOCKCHAIN SECURITY

> **Goal**: Verify wallet connections and on-chain interactions are secure.

### 5.1 Wallet Connection Security

```
1. MetaMask Integration:
   - VERIFY: App never asks for seed phrase
   - VERIFY: Only signature requests (no raw transaction signing)
   - VERIFY: Network switching handled gracefully

2. XOM Token:
   - VERIFY: Balance displayed correctly
   - VERIFY: Transactions require user confirmation
   - VERIFY: No private keys stored in localStorage

3. NFT Handle:
   - VERIFY: Polygon contract address is correct
   - VERIFY: Minting requires payment confirmation
```

### 5.2 Smart Contract Checks

```
Manual verification:
1. Contract verified on Polygonscan
2. OpenZeppelin base contracts used
3. No selfdestruct function
4. Access control on privileged functions
5. Events emitted for state changes
6. No unchecked external calls
7. Reentrancy guards on payable functions
```

---

## PHASE 6: ⚡ PERFORMANCE & LOAD TESTING

> **Goal**: Verify the app performs well under normal and peak load.

### 6.1 Core Web Vitals

```
Run Lighthouse audit via browser_subagent on key pages:
- app.offlinehumanmode.com (login)
- app.offlinehumanmode.com/identity (landing)
- stream.offlinehumanmode.com (stream)

Target scores:
- Performance: > 70
- Accessibility: > 80
- Best Practices: > 80
- SEO: > 80

Metrics:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- INP (Interaction to Next Paint): < 200ms
- TTFB (Time to First Byte): < 800ms
```

### 6.2 Bundle Size Check

```powershell
# Check production build size
Get-ChildItem -Path "frontend/dist/assets" -Recurse |
  Where-Object { -not $_.PSIsContainer } |
  Sort-Object Length -Descending |
  Select-Object -First 10 Name, @{N='SizeKB';E={[math]::Round($_.Length/1024,1)}}

# Total bundle size (should be < 5MB uncompressed)
$total = (Get-ChildItem -Path "frontend/dist" -Recurse | Measure-Object -Property Length -Sum).Sum
Write-Host "Total bundle: $([math]::Round($total/1024/1024,2))MB"
```

### 6.3 API Response Times

```powershell
# Test API response latency
$endpoints = @(
  "https://app.offlinehumanmode.com",
  "https://stream.offlinehumanmode.com",
  "https://app.offlinehumanmode.com/manifest.json"
)

foreach ($url in $endpoints) {
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  try {
    Invoke-WebRequest -Uri $url -UseBasicParsing | Out-Null
    $sw.Stop()
    $ms = $sw.ElapsedMilliseconds
    $status = if ($ms -lt 500) { "✅" } elseif ($ms -lt 2000) { "🟡" } else { "❌" }
    Write-Host "$status $url : ${ms}ms"
  } catch {
    $sw.Stop()
    Write-Host "❌ $url : FAILED ($($_.Exception.Message))"
  }
}
```

---

## PHASE 7: 📋 COMPLIANCE & LEGAL

> **Goal**: Verify legal and privacy compliance.

### 7.1 Legal Pages Check

```
Navigate and verify these pages exist and have content:

1. Privacy Policy / Datenschutz
2. Terms of Service / AGB
3. Impressum (required for Germany)
4. Cookie Policy
5. GDPR Data Subject Request mechanism

For each page:
- VERIFY: Page loads
- VERIFY: Content is in correct language (DE for German users)
- VERIFY: Contact information present
- VERIFY: Last updated date visible
```

### 7.2 GDPR Compliance

```
1. Cookie Consent:
   - VERIFY: Cookie banner appears on first visit
   - VERIFY: Can reject non-essential cookies
   - VERIFY: Preferences are respected

2. Data Export:
   - VERIFY: User can request their data (Article 15)
   - VERIFY: Export format is machine-readable

3. Right to Deletion:
   - VERIFY: User can request account deletion
   - VERIFY: "Reset App Data" function works

4. Privacy by Design:
   - VERIFY: No PII sent to third-party analytics
   - VERIFY: Sensitive data encrypted at rest
   - VERIFY: Minimal data collection
```

---

## PHASE 8: 🔍 INFRASTRUCTURE SECURITY

> **Goal**: Verify server-level security is hardened.

### 8.1 Server Security (Run via SSH)

```bash
# SSH to Hetzner server and check:

# 1. Open ports (should be minimal)
sudo ss -tlnp

# 2. Firewall rules
sudo ufw status verbose

# 3. SSL certificate expiry
echo | openssl s_client -servername app.offlinehumanmode.com -connect app.offlinehumanmode.com:443 2>/dev/null | openssl x509 -noout -dates

# 4. Running services (no unnecessary services)
pm2 list

# 5. Docker containers (if any)
docker ps

# 6. Disk space
df -h

# 7. System updates
apt list --upgradable

# 8. Fail2ban status (brute force protection)
sudo fail2ban-client status
```

### 8.2 Nginx Configuration

```bash
# Check Nginx security headers
curl -I https://app.offlinehumanmode.com 2>/dev/null | grep -iE "(strict-transport|x-frame|x-content|referrer|x-powered|server:|content-security)"

# Check HTTPS redirect
curl -I http://app.offlinehumanmode.com 2>/dev/null | head -5
# Should show 301 redirect to HTTPS
```

---

## PHASE 9: 🧬 SUPPLY CHAIN & DEPENDENCY AUDIT

> **Goal**: No known vulnerable dependencies.

### 9.1 NPM Audit

```powershell
# Frontend dependencies
cd frontend
npm audit --audit-level=high
npm outdated

# Backend dependencies
cd ../backend
npm audit --audit-level=high
npm outdated
```

### 9.2 Dependency Integrity

```powershell
# Verify lock file integrity
cd frontend
npm ci --dry-run

# Check for suspicious packages
npm ls --depth=0 | Select-String -Pattern "UNMET|MISSING|ERR"
```

---

## PHASE 10: 📊 REPORTING & SCORING

### 10.1 Score Card Template

After running all phases, fill in this scorecard:

| Phase     | Category                 | Score      | Max     | Status |
| --------- | ------------------------ | ---------- | ------- | ------ |
| 1         | Smoke Tests (Pages Load) | \_/15      | 15      | ⬜     |
| 2         | Auth & Access Control    | \_/20      | 20      | ⬜     |
| 3         | Penetration Testing      | \_/25      | 25      | ⬜     |
| 4         | PWA Readiness            | \_/5       | 5       | ⬜     |
| 5         | Web3 Security            | \_/10      | 10      | ⬜     |
| 6         | Performance              | \_/10      | 10      | ⬜     |
| 7         | Compliance & Legal       | \_/5       | 5       | ⬜     |
| 8         | Infrastructure           | \_/5       | 5       | ⬜     |
| 9         | Supply Chain             | \_/5       | 5       | ⬜     |
| **TOTAL** |                          | **\_/100** | **100** | ⬜     |

### 10.2 Rating Scale

| Rating                  | Score  | Action                       |
| ----------------------- | ------ | ---------------------------- |
| 🏆 **Sovereign Grade**  | 90-100 | Ship it!                     |
| ✅ **Production Ready** | 75-89  | Ship with monitoring         |
| ⚠️ **Needs Attention**  | 50-74  | Fix critical issues first    |
| 🚨 **Not Ready**        | 0-49   | STOP — Major security issues |

### 10.3 Report Output

Save results to: `Documentation/Audits/LAUNCH_AUDIT_[YYYY-MM-DD].md`

Include:

- Date and time of audit
- Git commit hash
- All phase results with evidence (screenshots, API responses)
- New bugs filed (with BUG-XXX numbers)
- Recommendations for improvement
- Next audit date

---

## 🚨 CRITICAL FINDINGS — Immediate Action Required

If ANY of these are found during testing, **STOP DEPLOYMENT**:

1. ❌ Unauthenticated access to protected endpoints
2. ❌ SQL/NoSQL injection possible
3. ❌ XSS execution in any input field
4. ❌ Private keys or secrets in frontend code
5. ❌ CORS wildcard on authenticated endpoints
6. ❌ Missing HTTPS (HTTP allowed without redirect)
7. ❌ Default credentials active in production
8. ❌ Admin bypass via header manipulation (BUG-316 regression)
9. ❌ JWT tokens that never expire
10. ❌ Unencrypted sensitive data in database

---

_Workflow v1.0 — Based on OWASP Top 10:2025, ASVS v5.0, WSTG v5.0 standards._
_Adapted for OHM Sovereign Ecosystem (React/NestJS/Polygon)._
_Created: 2026-02-07 by Antigravity Agent._
