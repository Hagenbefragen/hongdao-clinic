---
description: Standardized SSO Seamless Login implementation for all OHM Portals (App, Stream, Twin, Retreats)
---

# SSO Seamless Login Standardization Workflow

This workflow defines the standard pattern for implementing Seamless Login (SSO) across all OHM ecosystem portals.

> ⚠️ **REQUIRED COMPANION WORKFLOW**: When implementing SSO for a new portal, you MUST also follow **`@[/newportal]`** for API authentication patterns (JWT + Wallet dual-mode endpoints).

---

## 🧬 Core SSO Features (MANDATORY)

Every portal MUST leverage these two foundational features:

### FEAT-065: Cross-Domain SSO Cookies (The 10/10 Solution)

**Status**: ✅ COMPLETE (Feb 11, 2026)  
**Doc**: `.agent/knowledge/ohm_architecture_identity_and_principles/artifacts/identity/FEAT-065_cross_domain_sso_cookies.md`

Upgrades SSO from **Portal Bridging** (localStorage + URL params) to **True Native SSO** (shared httpOnly Cookies scoped to `.offlinehumanmode.com`).

Key implementation points:

- Backend sets `ohm_token` cookie with `domain: '.offlinehumanmode.com'`, `httpOnly: true`, `sameSite: 'lax'`
- JWT Strategy extracts tokens from BOTH `Authorization` header AND `ohm_token` cookie
- Frontend performs **Silent Hydration**: if no localStorage token, calls `/api/user/me` — browser auto-sends cross-domain cookie
- Cookie is set on ALL login entry points: email/password, wallet, guest
- `sameSite: 'lax'` (NOT `'strict'`) — required for cross-subdomain navigation

### FEAT-075: Unified SSO Login (`usePortalLogin` + `UnifiedPortalWrapper`)

**Status**: ✅ COMPLETE (Phases 1-4)  
**Doc**: `.agent/features/research/FEAT-075_Unified_SSO_Login.md`

Provides a single, unified login pattern for ALL portal landing pages via:

1. **`usePortalLogin` hook** — In-memory hydration (no page reload, no CORS race conditions)
2. **`UnifiedPortalWrapper`** — Wraps ALL DomainHomeRouter cases with PortalLoginModal + SparkSyncBridge
3. **Identity API SDK** (`@ohm/sso-sdk`) — OAuth2 PKCE + PQC Token Wrapping (Kyber768+Dilithium3)

Login flow:

```
1. User clicks "Sign In" on any portal (e.g., echo.offlinehumanmode.com)
2. PortalLoginModal opens ON the portal (no redirect)
3. User enters email/PIN → POST /api/auth/login → token + cookie received
4. usePortalLogin stores token + calls /api/user/me with Bearer header
5. setCurrentUser() updates React state IN-MEMORY
6. Routing plugin detects currentUser → renders dashboard instantly
7. No page reload. No cross-origin race. Instant.
```

---

## 🌐 Portal Registry (All Subdomains)

| Portal                | Subdomain URL                                 | SSL | SSO Status     | On-Page Login |
| --------------------- | --------------------------------------------- | --- | -------------- | ------------- |
| **OHM App**           | app.offlinehumanmode.com                      | ✅  | ✅ Primary Hub | ✅ Full       |
| **Quantum Home**      | offlinehumanmode.com                          | ✅  | ✅ Marketing   | ✅ Full       |
| **OHM Identity**      | identity.offlinehumanmode.com                 | ✅  | ✅ FEAT-062    | ✅ Full       |
| **ECHO Messenger**    | echo.offlinehumanmode.com                     | ✅  | ✅ FEAT-075    | ✅ Full       |
| **FORTRESS**          | fortress.offlinehumanmode.com                 | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Sovereign Shield**  | shield.offlinehumanmode.com                   | ✅  | ✅ FEAT-075    | ✅ Full       |
| **XPollination**      | xpollination.offlinehumanmode.com             | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Stream Studio**     | stream.offlinehumanmode.com                   | ✅  | ✅ FEAT-053    | ✅ Full       |
| **Digital Twin**      | twin.offlinehumanmode.com                     | ✅  | ✅ FEAT-075    | ✅ Full       |
| **XOM Bank**          | bank.offlinehumanmode.com                     | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Marketplace**       | market.offlinehumanmode.com                   | ✅  | ✅ FEAT-075    | ✅ Full       |
| **OHMusic**           | music.offlinehumanmode.com                    | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Immortal Switch**   | switch.offlinehumanmode.com                   | ✅  | ✅ FEAT-075    | ✅ Full       |
| **InventionSafe**     | patent.offlinehumanmode.com                   | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Social Fund**       | socialfund.offlinehumanmode.com               | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Paradise Fund**     | paradise.offlinehumanmode.com                 | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Proof of Presence** | proofofpresence.offlinehumanmode.com          | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Retreats**          | ohmretreat.com / retreat.offlinehumanmode.com | ✅  | ✅ FEAT-075    | ✅ Full       |
| **Lebensfluss**       | lebensfluss.offlinehumanmode.com              | ✅  | ✅ Supabase    | ✅ Full       |
| **Clawbot**           | bot.offlinehumanmode.com                      | ✅  | 🟡 Planned     | 🟡 Planned    |
| **Creator Hub**       | creator.offlinehumanmode.com                  | ✅  | 🟡 Planned     | 🟡 Planned    |
| **CRM**               | crm.offlinehumanmode.com                      | ✅  | 🟡 Planned     | 🟡 Planned    |
| **ELWMS**             | elwms.offlinehumanmode.com                    | ✅  | 🟡 Planned     | 🟡 Planned    |
| **Kairos**            | kairos.offlinehumanmode.com                   | ✅  | 🟡 Planned     | 🟡 Planned    |
| **Legal**             | legal.offlinehumanmode.com                    | ✅  | 🟡 Planned     | 🟡 Planned    |
| **OHMazon**           | ohmazon.offlinehumanmode.com                  | ✅  | 🟡 Planned     | 🟡 Planned    |
| **OHMoney**           | ohmoney.offlinehumanmode.com                  | ✅  | 🟡 Planned     | 🟡 Planned    |
| **Priceless**         | priceless.offlinehumanmode.com                | ✅  | 🟡 Planned     | 🟡 Planned    |
| **Skills**            | skills.offlinehumanmode.com                   | ✅  | 🟡 Planned     | 🟡 Planned    |
| **Trust Web**         | trustweb.offlinehumanmode.com                 | ✅  | 🟡 Planned     | 🟡 Planned    |

> **SSL Certificate**: Single Let's Encrypt cert covering all 33 subdomains. Auto-renewed by Certbot.

> **SSO Interconnection (Feb 2026)**: All landing pages include "One Identity, All Portals" navigation. Users traverse the entire OHM universe seamlessly using FEAT-065 cross-domain cookies + FEAT-075 unified login.

> **FEAT-053**: Stream Studio supports One-Click Room Claiming with integrated signup.

> **FEAT-062**: OHM Identity Portal - Whitelabel SSO API for third-party integration.

---

## 🔑 CRITICAL: On-Page Login Principle

> **Users should NEVER be redirected to `app.offlinehumanmode.com` just to log in.**
> Each portal MUST support full Login/Signup directly on its own domain.

### Why?

1. **User Experience**: Redirects are confusing and break flow
2. **Stream Guests**: VC/Stream users may ONLY want streaming, not the full app
3. **Trust**: Users are suspicious of being bounced between domains
4. **SEO**: Each portal should be self-contained

### Implementation Pattern

Each portal needs a **SeamlessLogin** or **PortalLoginModal** component that:

1. Shows Login/Signup UI directly on the portal
2. Authenticates against `app.offlinehumanmode.com/api/auth/*` (CORS)
3. Stores token locally
4. Does NOT redirect to another domain
5. **MANDATORY: Supports OHM File (Paperback) Recovery** _(see below)_

```tsx
// Example: PortalLoginModal usage in Plugin
const StreamLandingWrapper: React.FC = () => {
  const [showLogin, setShowLogin] = React.useState(false);
  return (
    <>
      <StreamLandingPageBig onLogin={() => setShowLogin(true)} />
      <PortalLoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
};
```

---

## 📁 MANDATORY: OHM File v3.3 & Paperback Recovery

> **Every portal with guest entry MUST support OHM file recovery.**
> This is the sovereign way - users own their identity in a local file.

### What is Paperback?

- A `.ohm` file containing the user's encrypted identity
- Uses **PBKDF2 (1M iterations) + AES-256-GCM** per `OHM_File_Structure_v3.3.md`
- User protects it with a PIN they choose
- Can be stored offline, printed as QR, or backed up anywhere

### Required Components

| Component                                      | Purpose                              |
| ---------------------------------------------- | ------------------------------------ |
| `frontend/lib/ohm-file-v33.ts`                 | v3.3 compliant encryption/decryption |
| `frontend/components/modals/PinInputModal.tsx` | PIN creation/unlock UI               |
| `AccountClaimModal.tsx`                        | Export .ohm file with PIN            |
| `StreamGuestEntryModal.tsx`                    | Import/recover from .ohm file        |

### Export Flow (AccountClaimModal)

1. User clicks "Download .ohm File"
2. PIN modal opens (`mode="create"`)
3. User creates a PIN (strength checked)
4. File is encrypted with v3.3 spec and downloaded

### Import Flow (StreamGuestEntryModal)

1. User clicks "Paperback Recovery"
2. User uploads their `.ohm` file
3. PIN modal opens (`mode="unlock"`)
4. User enters their PIN
5. Identity is decrypted and session restored

### Code Example

```tsx
// In your portal's entry modal
import { PinInputModal } from "../modals/PinInputModal";
import { decryptOhmProfile, parseOhmFile } from "../../lib/ohm-file-v33";

const handlePinUnlock = async (pin: string) => {
  const ohmFile = parseOhmFile(JSON.stringify(ohmFileData));
  const profile = await decryptOhmProfile(ohmFile, pin);
  // Restore session with profile data
};
```

---

## 🔐 Authentication Flow

### 1. SparkSyncBridge (Cross-Domain Sync)

Every portal MUST include the SparkSyncBridge component to sync auth state:

```tsx
// In App.tsx or root component
import { SparkSyncBridge } from "./components/auth/SparkSyncBridge";

const App = () => (
  <>
    <SparkSyncBridge />
    <AppContent />
  </>
);
```

### 2. Cross-Portal Navigation with Token

When navigating FROM one portal TO another, pass the auth token:

```tsx
const navigateToStream = () => {
  const token = localStorage.getItem("ohm_token");
  const uid = currentUser?.id;

  // ALWAYS go to stream.offlinehumanmode.com, NEVER app.offlinehumanmode.com/stream/
  const baseUrl = "https://stream.offlinehumanmode.com";

  if (token) {
    window.location.href = `${baseUrl}/dashboard?auth_token=${token}&uid=${uid}`;
  } else {
    window.location.href = baseUrl;
  }
};
```

**⚠️ IMPORTANT**: Each subdomain has its OWN entry point:

- Stream Studio: `stream.offlinehumanmode.com` (NOT `app.offlinehumanmode.com/stream/dashboard`)
- Digital Twin: `twin.offlinehumanmode.com` (NOT `app.offlinehumanmode.com/twin/`)

---

## 🤖 Partner API (Third-Party SSO)

External websites can integrate OHM SSO using the Partner API:

### 1. Authorization Flow (OAuth-style)

redirect user to:
`https://app.offlinehumanmode.com/auth/partner/authorize?partner={DOMAIN}&state={STATE}`

### 2. Token Exchange

Exchange code for access token via `POST /api/auth/partner/token`

### 3. Profile Validation

Verify identity via `POST /api/auth/partner/validate`

---

## 🚀 Implementation Checklist for New Portals

// turbo-all

### Step 1: Add SparkSyncBridge

```bash
# Ensure the component exists and is imported in root
```

- [ ] Import SparkSyncBridge in App.tsx or root
- [ ] Render it BEFORE other content

### Step 2: Add On-Page Login/Signup

- [ ] Create `[Portal]LoginModal.tsx` or use `SeamlessLogin` component
- [ ] Ensure it calls `app.offlinehumanmode.com/api/auth/*` directly (CORS)
- [ ] Store token locally, reload current page (NO redirect)
- [ ] Support both Login and Signup flows

### Step 2.5: Add OHM File Recovery (MANDATORY)

- [ ] Import `PinInputModal` from `../modals/PinInputModal`
- [ ] Import `decryptOhmProfile, parseOhmFile` from `../../lib/ohm-file-v33`
- [ ] Add file upload input accepting `.ohm` files
- [ ] Implement `handleFileSelect` to read and validate OHM file
- [ ] Implement `handlePinUnlock` to decrypt and restore identity
- [ ] Display "Paperback Recovery" option in entry modal

### Step 3: Create Portal Header

- [ ] Copy pattern from `StreamHeader.tsx`
- [ ] Update portal name/branding
- [ ] Ensure all portal links use SSO pattern with correct subdomain URLs

### Step 4: Handle Incoming Auth Tokens

- [ ] Check for `auth_token` query param on load
- [ ] Store in localStorage
- [ ] Clean URL and reload

### Step 5: Add CORS for Backend

- [ ] Add new portal domain to backend CORS whitelist
- [ ] Deploy backend changes

### Step 6: Test SSO Round-Trip

- [ ] Log into App → Navigate to new Portal → Verify logged in
- [ ] Log into Portal directly (on-page login) → Verify logged in
- [ ] Navigate back to App → Verify logged in
- [ ] Guest signup on Stream → Verify account created without visiting App

---

## 📁 Reference Files

| File                                                      | Purpose                                      |
| --------------------------------------------------------- | -------------------------------------------- |
| `frontend/hooks/usePortalLogin.ts`                        | **FEAT-075 Unified SSO hook**                |
| `frontend/App.tsx` (UnifiedPortalWrapper)                 | **FEAT-075 Portal wrapper**                  |
| `frontend/components/auth/SparkSyncBridge.tsx`            | Cross-domain auth sync                       |
| `frontend/components/auth/SeamlessLogin.tsx`              | Universal login component                    |
| `frontend/components/auth/PortalLoginModal.tsx`           | **On-page login modal**                      |
| `frontend/components/streaming/StreamHeader.tsx`          | Portal header with SSO links                 |
| `frontend/components/MainLayout.tsx`                      | Auth token handling                          |
| `frontend/lib/ohm-file-v33.ts`                            | **v3.3 OHM file encryption**                 |
| `frontend/lib/ohm-sso-sdk/`                               | **FEAT-075 SSO SDK (PQC)**                   |
| `frontend/components/modals/PinInputModal.tsx`            | **PIN creation/unlock UI**                   |
| `frontend/components/modals/AccountClaimModal.tsx`        | **OHM file export flow**                     |
| `frontend/components/streaming/StreamGuestEntryModal.tsx` | **OHM file import flow**                     |
| `backend/src/main.ts`                                     | CORS config + cookie-parser                  |
| `backend/src/auth/auth.controller.ts`                     | **FEAT-065 Cookie setting**                  |
| `backend/src/auth/jwt/jwt.strategy.ts`                    | **FEAT-065 Multi-extractor (cookie+header)** |
| `backend/src/auth/partner-auth.controller.ts`             | Partner API implementation                   |

### Feature Documentation

| Document                                                    | Purpose                       |
| ----------------------------------------------------------- | ----------------------------- |
| `.agent/knowledge/.../FEAT-065_cross_domain_sso_cookies.md` | Cross-domain SSO cookies spec |
| `.agent/features/research/FEAT-075_Unified_SSO_Login.md`    | Unified SSO Login spec        |

---

## 🔧 Backend CORS Configuration

Ensure all portal domains are in the CORS whitelist:

```typescript
// backend/src/main.ts
app.enableCors({
  origin: [
    "https://app.offlinehumanmode.com",
    "https://stream.offlinehumanmode.com",
    "https://twin.offlinehumanmode.com",
    "https://ohmretreat.com",
    "https://www.ohmretreat.com",
    "https://offlinehumanmode.com",
    "https://www.offlinehumanmode.com",
    // Development
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
});
```

---

## 🚨 Common Mistakes

1. **Redirecting to App for login** → Users should login ON the portal they're on
2. **Using `/stream/dashboard` path on app domain** → Use `stream.offlinehumanmode.com` subdomain
3. **Forgetting SparkSyncBridge** → Users lose auth when switching portals
4. **Not passing auth_token in URL** → Manual re-login required
5. **Missing CORS domain** → API calls blocked
6. **Not cleaning URL after auth** → Token visible in URL
7. **Hardcoding portal URLs** → Breaks in different environments

---

## 📝 Known Issues (BUG TRACKER)

| Issue                              | Status   | Fix                               |
| :--------------------------------- | :------- | :-------------------------------- |
| "Unknown User" ghost after refresh | 🔧 Fixed | Profile name sync on login        |
| 401 race condition after OHM login | 🔧 Fixed | Clear stale token before login    |
| Stream link goes to app domain     | 🔧 Fixed | Updated Header.tsx links          |
| Stream portal no on-page login     | 🔧 Fixed | Added PortalLoginModal to plugins |

---

## 🔐 Security Standards (Quantum-Safe)

Current SSO security score: **9.5/10** (Diamond Standard)

### Quantum-Safe Cryptography

| Component          | Algorithm        | PQC Status        |
| ------------------ | ---------------- | ----------------- |
| JWT Signing        | HS256 (HMAC)     | ✅ Quantum Safe   |
| Session Encryption | AES-256-GCM      | ✅ Quantum Safe   |
| Key Derivation     | PBKDF2-SHA256    | ✅ Quantum Safe   |
| .ohm File Vault    | PBKDF2 + AES-256 | ✅ Quantum Safe   |
| Wallet Signatures  | ECDSA            | ⚠️ Hybrid Planned |

### Security Implementation

- **Rate Limiting**: All auth endpoints (3-10/min)
- **httpOnly Cookies**: Session tokens XSS-protected
- **JWT Refresh Tokens**: 15min access + 7d refresh rotation
- **CORS Hardening**: Localhost blocked in production

---

## 🎯 Roadmap to 10/10 Score

Full roadmap: `Documentation/Roadmaps/TODO_SSO_ROADMAP.md`

| Phase      | Timeline | Features                            | Score After |
| ---------- | -------- | ----------------------------------- | ----------- |
| ✅ Phase 1 | Feb 2026 | PQC Module, Rate Limiting, httpOnly | 9.5/10      |
| 🟡 Phase 2 | Q2 2026  | KERI Integration, Whitelabel API    | 9.65/10     |
| 🟡 Phase 3 | Q3 2026  | ML-DSA/ML-KEM Signatures            | 9.80/10     |
| 🟡 Phase 4 | Q4 2026  | EUDI Bridge, HSM Integration        | 9.90/10     |
| 🟡 Phase 5 | 2027     | ZKP, FIPS 140-3 Certification       | **10/10**   |

---

## 🌍 Whitelabel SSO API (FEAT-062)

### Vision

Make OHM SSO a **free, open, whitelabel product** for any app to join the OHM Universe.

### Landing Page

**URL**: `identity.offlinehumanmode.com`

Features:

- Developer documentation & API reference
- API key generation (free tier)
- SDK downloads (`@ohm/sso-sdk`)
- Interactive API explorer
- Integration examples

### API Endpoints (Planned)

```typescript
// identity.offlinehumanmode.com/api/v1/

// OAuth-style Authorization
GET /authorize?client_id={ID}&redirect_uri={URI}&scope={SCOPES}

// Token Exchange
POST /token
Body: { code, client_id, client_secret }

// User Profile
GET /userinfo
Returns: { sub, trust_score, credentials[] }

// Zero-Knowledge Claims
POST /verify-claim
Body: { claim: "age >= 18", presentation: JWT }
Returns: { verified: true/false }
```

### Integration Tiers

| Tier           | Cost     | Features                                          |
| -------------- | -------- | ------------------------------------------------- |
| **Free**       | €0       | Basic auth, Trust Score, 1000 verifications/month |
| **Partner**    | 0.5% XOM | Issue credentials, custom claims, unlimited       |
| **Enterprise** | Custom   | SAML, dedicated support, SLA                      |

### Related Research

- `Documentation/AS_BUILD/00_Auth/KERI_EUDI_RESEARCH.md` - Advanced identity protocols
- `Documentation/AS_BUILD/00_Auth/SSO_IDENTITY_FUTURE.md` - Vision blog post
- `Documentation/Roadmaps/TODO_SSO_ROADMAP.md` - Full roadmap

---

_Last Updated: 2026-02-11 | FEAT-065 + FEAT-075 integrated | SSL expanded to 33 subdomains_
