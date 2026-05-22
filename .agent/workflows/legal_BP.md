---
description: Legal Best Practice - Generate and publish all legally required pages for a portal (Impressum, Privacy, Terms, etc.)
---

# /legal_BP - Legal Best Practice Workflow

**"Compliance is not optional. Get it right from Day 1."**

// turbo-all

## ⚠️ CRITICAL: ALWAYS ASK BEFORE PUBLISHING

**When generating legal pages, ALWAYS ask the user for confirmation before:**
1. Deploying to production
2. Changing legal entity information
3. Updating jurisdiction or governing law

**Current Legal Entity (as of 2026-01-02):**
```
Lebensfluss e.V.
Verein zur Förderung ganzheitlicher Lebensweisen
ZVR-Zahl: 1758759096
```

**Future Note:** Rights may be transferred to a new Verein or US DAO LLC. Always verify current entity before publishing.

---

## Overview

This workflow ensures every OHM portal/website has all legally required pages for **Austrian/EU compliance**:

1. **Impressum** (Legal Notice) - REQUIRED by Austrian ECG §5
2. **Datenschutz** (Privacy Policy / DSGVO) - REQUIRED by EU GDPR + Austrian DSG
3. **AGB / Nutzungsbedingungen** (Terms of Service) - RECOMMENDED
4. **Widerrufsbelehrung** (Cancellation Policy) - REQUIRED for commerce (FAGG)
5. **Cookie-Hinweis** (Cookie Notice) - REQUIRED by ePrivacy + TKG 2021

**Applicable Law:** Austrian Law + EU Law ONLY (NOT German TMG)

---

## 🚨 When to Use This Workflow

Use `/legal_BP [PORTAL_NAME]` when:
- Launching a new portal/website
- Adding commerce functionality
- Processing new types of personal data
- Expanding to new regions
- After ANY legal structure change

---

## 📋 Required Pages by Portal Type

| Page | Landing Page | App Portal | Commerce | DT Portal |
|------|-------------|------------|----------|-----------|
| Impressum | ✅ | ✅ | ✅ | ✅ |
| Datenschutz | ✅ | ✅ | ✅ | ✅ |
| Terms of Service | ⚠️ | ✅ | ✅ | ✅ |
| Terms of Usage | ❌ | ✅ | ✅ | ✅ |
| Cookie Policy | ✅ | ✅ | ✅ | ✅ |
| Widerrufsbelehrung | ❌ | ❌ | ✅ | ⚠️ |

---

## 🏛️ Current Legal Entity Information

**All legal pages must include:**

```
Lebensfluss e.V.
Verein zur Förderung ganzheitlicher Lebensweisen

Adresse auf Anfrage
Österreich

Vertreten durch: Der Vorstand des Vereins
Kontakt: Lebensfluss.ev@gmail.com

Vereinsregister:
Eingetragen im Zentralen Vereinsregister (ZVR)
ZVR-Zahl: 1758759096
```

**Jurisdiction:** Austria (Österreich)
**Governing Law:** Austrian Law, EU Regulations
**Court of Jurisdiction:** Austria

---

## 📄 Page Templates

### 1. IMPRESSUM (Austrian Legal Notice)

```markdown
# Impressum

## Angaben gemäß § 5 E-Commerce-Gesetz (ECG)

**Lebensfluss e.V.**
Verein zur Förderung ganzheitlicher Lebensweisen

Adresse auf Anfrage
Österreich

**Vertreten durch:**
Der Vorstand des Vereins

**Kontakt:**
E-Mail: Lebensfluss.ev@gmail.com

**Vereinsregister:**
Eingetragen im Zentralen Vereinsregister (ZVR)
ZVR-Zahl: 1758759096

## Haftungsausschluss

### Haftung für Inhalte
[Standard disclaimer text]

### Haftung für Links
[External links disclaimer]

### Urheberrecht
[Copyright notice]
```

### 2. DATENSCHUTZ (GDPR Privacy Policy)

**Must include:**
- [ ] Data Controller identity
- [ ] Types of data collected
- [ ] Purpose of processing
- [ ] Legal basis (Art. 6 GDPR)
- [ ] Data retention periods
- [ ] Third-party processors (with DPA references)
- [ ] User rights (access, delete, portability, etc.)
- [ ] Cookie details
- [ ] Contact for data requests

**For Digital Twin specifically, add:**
- [ ] AI training data usage
- [ ] Voice/personality data storage
- [ ] Conversation logs retention
- [ ] Heritage transfer data handling
- [ ] **Required Disclosures:**
  - Hetzner (DE/FI) - Hosting (ISO 27001)
  - Ollama/Piper (Local) - No External Data Transfer
  - **Optional:** Deepseek/OpenAI (Only if enabled by user)
  - LiveKit (EU) - Streaming infrastructure

### 3. TERMS OF SERVICE (General)

**Must include:**
- [ ] Service description
- [ ] User eligibility (age, jurisdiction)
- [ ] Account creation/termination
- [ ] Acceptable use policy
- [ ] Intellectual property
- [ ] Limitation of liability
- [ ] Dispute resolution
- [ ] Governing law (Austrian Law recommended)

---

## ⚠️ CRITICAL: PORTAL-SPECIFIC TERMS

**Each portal MUST have its own specific Terms of Usage tailored to its use case!**
Generic terms are NOT acceptable. The following sections define what MUST be included for each portal.

---

### 4. TERMS OF USAGE (Portal-Specific) ← CRITICAL

#### 🤖 Digital Twin (`twin.offlinehumanmode.com`)
- [ ] Definition of "Digital Twin"
- [ ] Ownership rights
- [ ] Heritage transfer conditions
- [ ] **Abandonment policy (12 months → Treasury)**
- [ ] Data portability
- [ ] Content moderation
- [ ] API usage limits
- [ ] Monetization rules
- [ ] Client access/revocation rights

#### 🏔️ OHM Retreats (`ohmretreat.com`)
- [ ] Definition of "Retreat" and "Booking"
- [ ] Booking process and confirmation
- [ ] Payment terms (USDC, XOM, Fiat)
- [ ] **14-day cancellation right (FAGG)** for digital bookings
- [ ] Refund policy (timeline, conditions)
- [ ] No-show policy
- [ ] Health disclaimers (wellness/spiritual activities)
- [ ] Liability waivers for physical activities
- [ ] Retreat host/partner responsibilities
- [ ] Commission structure disclosure
- [ ] NFT-based booking terms (if applicable)
- [ ] Referral program terms

#### 📱 OHM Main App (`app.offlinehumanmode.com`)
- [ ] Platform usage rules
- [ ] XOM token utility and disclaimer
- [ ] Trust Score explanation
- [ ] P2P features and liability
- [ ] Video/Voice call recording policy
- [ ] Crypto wallet disclaimer
- [ ] DAO governance participation

#### 🎥 Stream Portal (`stream.offlinehumanmode.com`)
- [ ] Live streaming rules
- [ ] Content moderation
- [ ] Monetization (Auctions, Tips)
- [ ] Revenue sharing (80/20 split)
- [ ] Recording consent
- [ ] DMCA/Copyright policy

#### 🌐 OHM Website (`offlinehumanmode.com`)
- [ ] Landing page disclaimer
- [ ] Newsletter consent
- [ ] Marketing communications

### 5. COOKIE POLICY

**Must list:**
- [ ] Essential cookies (session, auth)
- [ ] Analytics cookies (if any)
- [ ] Marketing cookies (if any)
- [ ] Third-party cookies (LiveKit, etc.)
- [ ] How to disable cookies

---

## 🔧 Implementation Steps

### Step 1: Generate Content

```powershell
# Create legal pages directory if not exists
New-Item -ItemType Directory -Path "DigitalTwin/frontend/src/pages/legal" -Force
```

### Step 2: Create Page Components

Create these files:
- `Impressum.tsx`
- `Datenschutz.tsx`
- `Nutzungsbedingungen.tsx` (Terms of Usage)
- `AGB.tsx` (Terms of Service)
- `CookiePolicy.tsx`

### Step 3: Add Routes

```typescript
// In router configuration
{ path: '/impressum', element: <Impressum /> },
{ path: '/datenschutz', element: <Datenschutz /> },
{ path: '/nutzungsbedingungen', element: <Nutzungsbedingungen /> },
{ path: '/agb', element: <AGB /> },
{ path: '/cookies', element: <CookiePolicy /> },
```

### Step 4: Add Footer Links

```tsx
<footer>
    <Link to="/impressum">Impressum</Link>
    <Link to="/datenschutz">Datenschutz</Link>
    <Link to="/nutzungsbedingungen">Nutzungsbedingungen</Link>
    <Link to="/agb">AGB</Link>
</footer>
```

### Step 5: Deploy & Verify

- [ ] Build succeeds
- [ ] All pages accessible via URL
- [ ] Footer links work
- [ ] Mobile responsive
- [ ] Dark mode compatible

---

## 🎯 Portal-Specific Requirements

### OHM Main App (`app.offlinehumanmode.com`)
- Standard Impressum + Datenschutz
- Terms of Service (platform usage)
- XOM/Crypto disclosure

### Digital Twin (`twin.offlinehumanmode.com`)
- **CRITICAL:** Terms of Usage with Abandonment Policy
- AI/Voice data disclosures
- Heritage transfer terms
- Client access/revocation terms

### OHM Retreat (`ohmretreat.com`)
- Widerrufsbelehrung (14-day cancellation)
- Booking terms
- Refund policy
- Partner/Merchant terms

### OHM Website (`offlinehumanmode.com`)
- Landing page Impressum (minimal)
- Newsletter consent (if applicable)

---

## ✅ Verification Checklist

After running `/legal_BP [PORTAL]`, verify:

- [ ] All required pages exist
- [ ] Links work from footer
- [ ] Content is legally accurate
- [ ] Last updated date is current
- [ ] German AND English versions (if international)
- [ ] Cookie consent banner works
- [ ] Contact email is valid
- [ ] No placeholder text remaining

---

## 📚 Legal References (Austrian/EU Only)

**Austrian Law:**
- **ECG**: E-Commerce-Gesetz (Austrian E-Commerce Act) - Impressum requirements
- **DSG**: Datenschutzgesetz 2018 (Austrian Data Protection Act)
- **FAGG**: Fern- und Auswärtsgeschäfte-Gesetz (Distance Selling Act) - Cancellation rights
- **TKG 2021**: Telekommunikationsgesetz (Telecom Act) - Cookies
- **VerG**: Vereinsgesetz 2002 (Associations Act)

**EU Law:**
- **GDPR**: Regulation (EU) 2016/679 - Data Protection
- **ePrivacy**: Directive 2002/58/EC - Cookies & Electronic Privacy
- **DSA**: Digital Services Act (EU) 2022/2065 - Platform liability

**NOT Applicable (Germany only):**
- ~~TMG: Telemediengesetz~~ (German law, does not apply to Austrian Vereine)
- ~~RStV: Rundfunkstaatsvertrag~~ (German media law)

---

## 🆘 Need Legal Review?

For complex cases (crypto, AI, cross-border):
- Consult a qualified Austrian/EU attorney
- Keep records of legal advice received
- Update pages when laws change

**⚠️ Always ask user before publishing legal pages to production!**

---

*Last Updated: 2026-01-02*
*Legal Entity: Lebensfluss e.V. (ZVR: 1758759096)*

