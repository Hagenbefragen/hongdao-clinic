---
description: Create stunning portal landing pages with SSO, onboarding, and referral link generation
---

# /landingpagecreation - Portal Landing Page Creator

## 1. 🎯 Overview

**Name**: Landing Page Creation Workflow  
**Version**: 1.0  
**Description**: Creates stunning, production-ready landing pages for OHM ecosystem portals. Follows the QuantumLandingPage aesthetic with premium animations, SSO integration, onboarding flows, and referral link generation.

---

## 2. ⚙️ Inputs

| Parameter          | Required | Description                                                      |
| ------------------ | -------- | ---------------------------------------------------------------- |
| **PortalName**     | ✅       | Name of the portal (e.g., "ECHO", "Stream", "FORTRESS")          |
| **Tagline**        | ✅       | Main value proposition (e.g., "Privacy-First Communication Hub") |
| **Features**       | ✅       | Array of 6-8 features to highlight                               |
| **ColorTheme**     | ❌       | Primary gradient colors (default: cyan-teal for ECHO)            |
| **TargetAudience** | ❌       | Who this page targets (e.g., "Privacy-conscious communicators")  |

---

## 3. 🎨 Design Standards (2027 Paradise Entry)

### OHM Color Palette (from /color workflow)

**MANDATORY**: Use pastel colors throughout:

- **Primary**: Pastel Blue (`#89CFF0`, `blue-300`)
- **Secondary**: Pastel Blueviolet (`#B0A6E8`, `violet-300`)
- **Accent**: Pastel Bluepink (`#DDA0DD`, `pink-300`)
- **Text**: Always WHITE (`#FFFFFF`) with black shadow
- **Text Secondary**: Use `text-gray-300` (NEVER `text-gray-500` or darker!)
- **Backgrounds**: Soft, subtle - used IN BACKGROUND only

### Visual Requirements

- **Background**: Dark (#050510) with animated particle field
- **Text**: Always white (#FFFFFF) with black shadow guard
- **Gradients**: Glassmorphism, premium gradients (blue → violet → pink)
- **Animations**: Floating, pulse, spin-slow effects
- **Layout**: Hero → Features → CTA → Footer

### Abbreviation Tooltips (MANDATORY)

**EVERY abbreviation or acronym** (TAM, SAM, SOM, GMV, GDPR, DAO, PII, SSI, SSO, DMA, ATT, SAFE, DMCA, etc.) MUST be wrapped in `<abbr title="...">` tags. The `title` attribute must contain:

1. **Full expansion** of the abbreviation
2. **One-sentence explanation** in plain English
3. **Source citation** (e.g., "Source: NIST FIPS 180-4", "Source: EU Regulation 2016/679")

**Example:**

```html
<abbr
  title="Total Addressable Market — The entire revenue opportunity available if a product achieved 100% market share. Source: Statista 'Digital Advertising Worldwide' 2025"
  >TAM</abbr
>
```

**CSS for tooltips** (add to every landing page's `<style>`):

```css
abbr[title] {
  text-decoration: none;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.4);
  cursor: help;
  position: relative;
}
abbr[title]:hover {
  border-bottom-color: var(--accent-cyan);
}

abbr[title]::after {
  content: attr(title);
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(10, 10, 20, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(167, 139, 250, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 13px;
  line-height: 1.5;
  width: max-content;
  max-width: 320px;
  z-index: 500;
  pointer-events: none;
  text-transform: none;
  letter-spacing: 0;

  /* Hidden State */
  opacity: 0;
  visibility: hidden;

  /* Transition for 2s Persistence on Mouse Leave */
  transition: opacity 0.3s ease 2s, transform 0.3s ease 2s,
    visibility 0s linear 2s;
}

/* Visible State (Hover) */
abbr[title]:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  /* Instant appearance on hover */
  transition-delay: 0s;
}
```

**Why:** Investors, users, and visitors should NEVER have to Google an abbreviation. Tooltips show professionalism
and respect for the reader. This also helps with SEO and accessibility.

### Text Shadow Guard (MANDATORY)

```typescript
const textShadow =
  "0 0 2px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.7)";
```

---

## 4. 🚀 Workflow Steps

// turbo-all

### Step 1: Create Directory Structure

```bash
mkdir -p frontend/components/marketing/[portal]/layout
mkdir -p frontend/components/marketing/[portal]/visuals
mkdir -p frontend/components/marketing/[portal]/sections
```

### Step 2: Create Main Landing Page Component

Create `[Portal]LandingPage.tsx` following QuantumLandingPage pattern:

- Import shared layout components (GalaxyHeader, Footer)
- Create portal-specific visuals (WaveField, ParticleSystem, etc.)
- Add Hero, Features, CTA, Footer sections
- Include SSO/Onboarding modal integration

### Step 3: Add SSO Integration (MANDATORY)

Every landing page MUST include:

```tsx
import { SeamlessLogin } from '../../auth/SeamlessLogin';
import { SparkSyncBridge } from '../../auth/SparkSyncBridge';

// In component:
<SparkSyncBridge />
<SeamlessLogin
    isOpen={showLogin}
    onClose={() => setShowLogin(false)}
    onSuccess={handleLoginSuccess}
/>
```

### Step 4: Add Referral Link Generation

```tsx
import { useReferralLink } from "../../../hooks/useReferralLink";

const { referralUrl, copyToClipboard, referralStats } = useReferralLink({
  portal: "echo",
  userId: currentUser?.id,
});

// CTA Button:
<button onClick={copyToClipboard}>Get Your Personal Invite Link</button>;
```

### Step 5: Add Route Registration

```typescript
// In frontend/pageRegistry.tsx or routing config
{
    path: '/echo',
    component: lazy(() => import('./components/marketing/EchoLandingPage')),
    title: 'ECHO - Sovereign Messenger'
}
```

### Step 6: Create Feature Request Entry

Follow `/featurerequest` workflow to track:

```markdown
- [ ] FEAT-XXX: [Portal] Landing Page
  - **Category**: Marketing / Onboarding
  - **Priority**: HIGH
  - **Description**: Landing page with SSO and referral links
```

### Step 7: SSL & Nginx Configuration (MANDATORY)

**Every landing page MUST have HTTPS.** See `Documentation/INFRASTRUCTURE/SUBDOMAINS.md` for the single source of truth.

1. **Verify DNS**: Ensure an A record exists for `[portal].offlinehumanmode.com → 188.245.235.51` in Hetzner DNS console.

2. **Update Nginx Config** (`nginx_offlinehumanmode.conf`):
   - Add `[portal].offlinehumanmode.com` to the portal server block (Section 2) — both the HTTPS block AND the HTTP→HTTPS redirect block.
3. **Expand SSL Certificate** on the server:

```bash
# turbo
# SSH into server and expand the Let's Encrypt cert
ssh root@188.245.235.51 "certbot certonly --nginx -d [portal].offlinehumanmode.com --expand --non-interactive --agree-tos"
```

4. **Copy Nginx config to server and reload**:

```bash
# turbo
scp nginx_offlinehumanmode.conf root@188.245.235.51:/etc/nginx/sites-available/offlinehumanmode.conf
ssh root@188.245.235.51 "nginx -t && systemctl reload nginx"
```

5. **Verify SSL**:

```bash
# turbo
curl -sI https://[portal].offlinehumanmode.com | head -5
```

6. **Update SUBDOMAINS.md**: Add the new subdomain to the documentation.

---

## 5. 📋 Landing Page Sections (Template)

### 5.1 Hero Section

```tsx
<section className="min-h-screen flex flex-col items-center justify-center">
  {/* Icon/Logo */}
  <div className="text-8xl mb-6 animate-pulse-slow">🌊</div>

  {/* Title */}
  <h1 className="text-6xl md:text-8xl font-black text-center">{PortalName}</h1>

  {/* Tagline */}
  <p className="text-xl md:text-2xl text-gray-300 mt-4">{Tagline}</p>

  {/* CTA Buttons */}
  <div className="flex gap-4 mt-8">
    <button onClick={() => setShowLogin(true)}>Start for Free</button>
    <button onClick={() => scrollToFeatures()}>Learn More</button>
  </div>
</section>
```

### 5.2 Features Grid

```tsx
<section id="features" className="py-20">
  <h2>Why Choose {PortalName}?</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {features.map((feature) => (
      <FeatureCard
        key={feature.id}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
      />
    ))}
  </div>
</section>
```

### 5.3 Trust/Referral Section

```tsx
<section className="py-20 text-center">
  <h2>Build Your Trust Web</h2>
  <p>Invite friends and grow your sovereign network</p>

  <ReferralLinkCard
    url={referralUrl}
    onCopy={copyToClipboard}
    stats={referralStats}
  />
</section>
```

### 5.4 CTA Section

```tsx
<section className="py-20 text-center">
  <h2>Ready to {actionVerb}?</h2>
  <button
    onClick={() => setShowLogin(true)}
    className="bg-gradient-to-r from-[primaryColor] to-[secondaryColor] px-8 py-4 rounded-full"
  >
    Join Now — It's Free
  </button>
</section>
```

---

## 6. 🔗 SSO Integration Checklist

Per `/sso_seamless` workflow:

- [ ] Import `SparkSyncBridge` in root
- [ ] Add `SeamlessLogin` component
- [ ] Support Login AND Signup flows
- [ ] Handle `auth_token` query parameter
- [ ] Store token in localStorage
- [ ] Clean URL after auth
- [ ] NO redirect to app.offlinehumanmode.com for login

---

## 7. 🎁 Referral Link System

### Hook: useReferralLink

```typescript
interface UseReferralLinkReturn {
  referralUrl: string; // https://offlinehumanmode.com/echo?ref=USER_CODE
  referralCode: string; // USER_CODE
  copyToClipboard: () => void; // Copy and show toast
  referralStats: {
    totalInvites: number;
    signups: number;
    xomEarned: number;
  };
  generateQRCode: () => string; // Base64 QR image
}
```

### Backend Integration

```typescript
// POST /api/referral/generate
// Returns: { referralCode, referralUrl }

// GET /api/referral/stats
// Returns: { totalInvites, signups, xomEarned }

// POST /api/referral/claim
// Body: { referralCode, newUserId }
// Awards XOM to referrer
```

---

## 8. 🧪 Testing Checklist

- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] Dark mode (matches dark theme)
- [ ] SSO login flow
- [ ] SSO signup flow
- [ ] Referral link copy
- [ ] Referral link QR code
- [ ] Scroll animations
- [ ] CTA button hover states
- [ ] Accessibility (ARIA labels)

---

## 9. 📝 Example: ECHO Landing Page

```tsx
// EchoLandingPage.tsx

const ECHO_FEATURES = [
  {
    icon: "🔒",
    title: "Quantum-Encrypted",
    description: "ML-KEM + X25519 hybrid",
  },
  {
    icon: "✨",
    title: "Resonance Spark",
    description: "Find compatible souls",
  },
  {
    icon: "📅",
    title: "Event Scout",
    description: "AI-powered event discovery",
  },
  {
    icon: "🌉",
    title: "Platform Bridges",
    description: "Connect WhatsApp, Telegram",
  },
  { icon: "📧", title: "Smart Email", description: "AI-sorted inbox" },
  { icon: "🎤", title: "Voice Messages", description: "Sovereign voice notes" },
  {
    icon: "🌊",
    title: "Data Sovereignty",
    description: "P2P → Mesh → Cloud priority",
  },
  {
    icon: "🛡️",
    title: "Quantum Shield",
    description: "HNDL attack protection",
  },
];
```

---

## 10. 📁 Reference Files

| File                       | Purpose                  |
| -------------------------- | ------------------------ |
| `QuantumLandingPage.tsx`   | Template for style       |
| `quantum/layout/*`         | Shared layout components |
| `quantum/visuals/*`        | Background effects       |
| `auth/SeamlessLogin.tsx`   | SSO integration          |
| `auth/SparkSyncBridge.tsx` | Cross-domain sync        |
| `hooks/useReferralLink.ts` | Referral system          |

---

_Workflow created 2026-02-05 for OHM Ecosystem Portal Marketing_
