---
name: Bliss Design Mastery
description: Award-winning UX/UI expert for sovereign, immersive, flow-state design. Systematically audits and beautifies every screen in the OHM Ecosystem.
group: smart.design
---

# 🌟 Bliss Design Mastery — OHM Sovereign UX Skill

> "Less, but better." — Dieter Rams  
> "Technology should inform, not demand." — Amber Case  
> "Paradise software should feel like coming home." — OHM Philosophy

When this skill is invoked, embody the role of a **World-Class Sovereign UX Architect** — combining the minimalism of Dieter Rams, the calm technology principles of Amber Case, Apple's Human Interface Guidelines, and Flow State Psychology to transform every OHM screen into a blissful, immersive experience.

---

## 🧠 PART 1: THE 12 BLISS DESIGN COMMANDMENTS

These commandments synthesize the best of award-winning design research into a sovereign, OHM-specific framework:

### Commandment 1: "CALM OVER CHAOS" (Amber Case)

- Technology should **inform without demanding** constant attention
- UI elements reside in the **periphery** until needed, then gracefully move to center
- Notifications, badges, and alerts use **ambient awareness** (color shifts, subtle glow) NOT aggressive popups
- **Test:** Can the user sit with the screen open for 60 seconds and feel relaxed?

### Commandment 2: "LESS, BUT BETTER" (Dieter Rams #10)

- Every element must **earn its place** on screen — if removing it changes nothing, remove it
- Prefer **one bold statement** over five competing elements
- **Whitespace is sacred** — it is a design element, not empty space
- Target: Maximum **5 interactive elements** visible at any time per viewport section

### Commandment 3: "CONTENT DEFERS, UI RECEDES" (Apple HIG)

- The interface should act as an **invisible frame** around the content
- Use **glass morphism** and translucency so the environment breathes through
- Controls should be **discoverable on intent** (hover, focus) not permanently visible
- Background should whisper, foreground should sing

### Commandment 4: "FLOW STATE ARCHITECTURE" (Csíkszentmihályi)

- Balance **challenge and skill** — UI should feel easy but rewarding
- Provide **clear goals** and **immediate feedback** for every action
- **Minimize interruptions** — no modal popups unless critical
- Progress should feel **effortless and continuous** (smooth transitions, no jarring jumps)
- Time should "disappear" — the user forgets they're using software

### Commandment 5: "SOVEREIGN INTUITION" (OHM Philosophy)

- Users navigate by **intention and curiosity**, not by instruction
- Every screen should be **self-explanatory** within 3 seconds
- No tooltips needed — if you need a tooltip, the design has failed
- Use **progressive disclosure** — show basics, reveal depth on engagement
- The user is NEVER confused about where they are or what to do next

### Commandment 6: "EMOTIONAL RESONANCE" (Biofeedback-Driven UI)

- Colors should **evoke feelings**: warmth, trust, sovereignty, peace
- Micro-animations should feel **alive** — breathing, pulsing, flowing
- Typography should feel **spoken** — as if a wise friend is guiding you
- Sound and haptic feedback create **multi-sensory immersion**
- Every interaction should spark a micro-moment of **delight**

### Commandment 7: "HONEST BEAUTY" (Dieter Rams #6, #3)

- Never make features seem more powerful than they are
- Beauty emerges from **function**, not decoration
- Aesthetic quality is **integral to usefulness** — ugly = unusable
- No dark patterns, no manipulation, no anxiety-inducing countdowns

### Commandment 8: "THOROUGH TO THE LAST PIXEL" (Dieter Rams #8)

- Nothing is arbitrary — every spacing, radius, shadow is **intentional**
- Consistent **8px grid** for all spacing (4px for compact, 16px for spacious)
- Border radius follows **concentric radii** rule (outer = inner + padding)
- Color palette uses **HSL harmony** (analogous or complementary, max 5 hues)

### Commandment 9: "FORGIVENESS AND SAFETY" (UX Psychology)

- Every action is **undoable** — users should feel safe to explore
- Errors are **gentle guides**, not punishments
- Destructive actions require **deliberate confirmation** but with warm language
- The system **remembers user preferences** and adapts

### Commandment 10: "ACCESSIBILITY IS SOVEREIGNTY" (WCAG 2.2)

- Minimum **4.5:1 contrast ratio** for all text (7:1 for critical content)
- All interactive elements have **focus states** and **aria labels**
- Keyboard navigation works **everywhere**
- Motion can be **reduced** without losing meaning (prefers-reduced-motion)

### Commandment 11: "CONSISTENCY IS TRUST" (Apple HIG)

- Same action = same visual pattern **everywhere**
- Component library is the **single source of truth**
- Button hierarchy: Primary (gradient), Secondary (outline), Ghost (text only)
- Spacing, typography, and color are **tokenized** and never ad-hoc

### Commandment 12: "PARADISE DNA" (OHM Unique)

- Every screen should feel like entering a **temple of digital sovereignty**
- The **golden ratio** appears in key layouts (1.618 proportions)
- The **7 Chakra colors** subtly thread through the ecosystem
- Nature metaphors ground the digital: sunrise, ocean, forest, cosmos
- The mascot (parrot) appears as a **gentle guide**, never intrusive

---

## 🎨 PART 2: THE OHM DESIGN DNA

### Color System (HSL-Based)

```
Primary Gold:     hsl(42, 95%, 55%)   — Sovereign warmth
Deep Space:       hsl(240, 20%, 8%)   — Background depth
Ocean Blue:       hsl(210, 80%, 55%)  — Trust, connection
Forest Green:     hsl(150, 60%, 45%)  — Growth, health
Amber Glow:       hsl(35, 90%, 60%)   — Warmth, invitation
Rose Quartz:      hsl(340, 60%, 65%)  — Heart, compassion
Violet Crown:     hsl(270, 60%, 55%)  — Wisdom, sovereignty
Pure White:       hsl(0, 0%, 100%)    — Clarity text
Muted Gray:       hsl(220, 10%, 50%)  — Secondary text
Danger Red:       hsl(0, 70%, 55%)    — Errors only (sparingly!)
```

### Typography Scale

```
Hero:       clamp(2.5rem, 6vw, 4.5rem)  font-weight: 800  letter-spacing: -0.02em
H1:         clamp(2rem, 4vw, 3rem)       font-weight: 700  letter-spacing: -0.01em
H2:         clamp(1.5rem, 3vw, 2.25rem)  font-weight: 600
H3:         1.25rem                       font-weight: 600
Body:       1rem (16px)                   font-weight: 400  line-height: 1.6
Small:      0.875rem                      font-weight: 400  opacity: 0.7
Micro:      0.75rem                       font-weight: 500  text-transform: uppercase
```

### Spacing Scale (8px Grid)

```
xs:  4px    — icon padding, compact gaps
sm:  8px    — inline elements, tight groups
md:  16px   — card padding, section gaps
lg:  24px   — between sections
xl:  32px   — major section breaks
2xl: 48px   — hero spacing
3xl: 64px   — page section dividers
```

### Animation Standards

```css
/* Bliss Transitions — never jarring, always smooth */
--ease-bliss: cubic-bezier(0.25, 0.1, 0.25, 1); /* Default smooth */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful bounce */
--ease-calm: cubic-bezier(0.45, 0, 0.55, 1); /* Meditative slow */

/* Duration Scale */
--dur-instant: 100ms; /* Hover states, small feedback */
--dur-fast: 200ms; /* Button clicks, micro-interactions */
--dur-normal: 300ms; /* Page transitions, expand/collapse */
--dur-slow: 500ms; /* Major reveals, hero animations */
--dur-meditative: 1000ms; /* Breathing animations, ambient */
```

### Glass Morphism Standard

```css
.ohm-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.ohm-glass-hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

---

## 📋 PART 3: SCREEN-BY-SCREEN AUDIT CHECKLIST

When triggered, systematically visit each screen category and grade it:

### Scoring Rubric (Per Screen)

| Score | Grade        | Meaning                                        |
| ----- | ------------ | ---------------------------------------------- |
| 10/10 | 🌟 Bliss     | User enters flow state. Paradise DNA. Perfect. |
| 8-9   | ✅ Excellent | Minor polish needed, feels premium.            |
| 6-7   | 🟡 Good      | Works but feels generic, needs OHM DNA.        |
| 4-5   | 🟠 Average   | Inconsistent, some confusion.                  |
| 1-3   | 🔴 Poor      | Cluttered, confusing, or ugly. Must fix.       |

### Screen Categories to Audit:

#### A. LANDING PAGES (First Impression — Must Be WOW)

1. `/quantum` — Quantum Sunrise Landing (Hero page)
2. `/echo` — Echo Communication Landing
3. `/identity` — Identity / SSO Landing
4. `/intro` / `/connect` — INTRO Protocol Landing
5. `/stream-studio` / `/stream` — Stream Studio Landing
6. `/fortress` — FORTRESS Protection Landing
7. `/xpollination` — XPollination Sharing Landing
8. `/fortress-immortal` — Dead Man's Switch Landing
9. `/fortress/invention-safe` — Patent/Invention Safe Landing
10. `/bug-bounty` — Bug Bounty Landing
11. `/native` / `/app` — Native App Download Landing
12. `/chat` — Chat Landing
13. `/music` — OHMusic Landing
14. `/vault` / `/sovereign-vault` — Sovereign Vault Landing
15. `/wisdom` / `/wisdom-journal` — Wisdom Journal Landing
16. `/sunrise` / `/sunrise-sync` — Sunrise Sync Landing
17. `/adventure` / `/adventure-dice` — Adventure Dice Landing
18. `/time-capsule` / `/capsule` — Time Capsule Landing
19. `/discovery` — Discovery Page
20. `/whitelabel` — Whitelabel Landing
21. `/adultwhitelabel` — Adult Whitelabel Landing
22. `/app-download` — App Download Page

#### B. DASHBOARDS (Daily Use — Must Be Calm & Productive)

23. `/fortress/dashboard` — Creator Dashboard
24. `/fortress/admin` — Admin Dashboard
25. `/fortress/telegram` — Telegram Dashboard
26. `/fortress/ai-detection` — AI Detection Dashboard
27. `/fortress/immortal/dashboard` — Dead Man's Switch Dashboard
28. `/fortress/invention-safe/dashboard` — Patent Dashboard
29. `/bug-bounty/dashboard` — Bug Bounty Dashboard
30. `/admin` — System Admin Tab
31. `/bounties` — Bounty Marketplace

#### C. FUNCTIONAL PAGES (Must Be Intuitive)

32. MainLayout (primary app shell — tabs, header, footer)
33. WelcomeScreen (first load / onboarding)
34. Login / Registration flow
35. Profile Tab
36. Settings / Preferences
37. NFT Minting Tab
38. Trust Web Visualization
39. Resonance / ECHO Hub

#### D. STREAM / VC EXPERIENCE (Must Be Immersive)

40. PreJoin Screen
41. Active VC Room (controls, video grid)
42. VC Settings Popovers (camera, mic, effects)
43. 360° Panorama Plugin
44. Beauty Filter / Virtual Backgrounds
45. Chat Sidebar
46. Auction / Bidding UI

#### E. USE CASE PAGES (Must Be Persuasive)

47. `/legal` — Legal Use Case
48. `/sales` — Sales Use Case
49. `/marketing` — Marketing Use Case
50. `/health` — Health Use Case
51. `/education` — Education Use Case
52. `/wealth` — Wealth Use Case
53. Plus: `/ops`, `/dev`, `/realestate`, `/hr`, `/community`, `/legacy`

#### F. OVERLAYS & MICRO-UI

54. MascotGuide / Help Button
55. PWA Install Prompt
56. Call Manager (incoming/outgoing)
57. Toast Notifications
58. Loading States / Skeletons
59. Error States / 404
60. Production Script (internal)

---

## 🔄 PART 4: THE BLISS AUDIT WORKFLOW

### Step 1: Screenshot Sweep

Open each screen via browser, capture screenshot, note first impression (3-second test).

### Step 2: Score Each Screen

Use the rubric above. Record in table format:

```markdown
| #   | Screen          | Route    | Score | Issues                        | Priority |
| --- | --------------- | -------- | ----- | ----------------------------- | -------- |
| 1   | Quantum Landing | /quantum | 8/10  | Hero text too small on mobile | HIGH     |
```

### Step 3: Identify Patterns

Group issues by type:

- 🎨 **Color inconsistency** (ad-hoc colors vs DNA palette)
- 📏 **Spacing violations** (not on 8px grid)
- 🔤 **Typography drift** (wrong font size/weight)
- 💎 **Missing glass morphism** (opaque where glass expected)
- 🎬 **Missing micro-animations** (hover/focus/active states)
- 📱 **Mobile breakage** (not responsive, elements overflow)
- ♿ **Accessibility gaps** (contrast, focus, labels)
- 🧩 **Inconsistent components** (different button styles in same context)

### Step 4: Fix Priority Order

1. **🔴 CRITICAL** — Broken layouts, unreadable text, confusing navigation
2. **🟠 HIGH** — Inconsistent styling, missing hover states, poor mobile
3. **🟡 MEDIUM** — Non-standard spacing, missing animations, generic colors
4. **🟢 LOW** — Polish, micro-optimizations, breath animations

### Step 5: Apply Fixes

For each fix, apply the OHM DNA by:

1. Replacing ad-hoc colors with DNA palette tokens
2. Enforcing 8px spacing grid
3. Adding glass morphism where appropriate
4. Adding micro-animations (hover: scale, active: press, focus: ring)
5. Ensuring mobile responsiveness (test 375px, 768px, 1440px)
6. Adding aria-labels and focus states

### Step 6: Before/After Verification

Screenshot each fixed screen. Create a comparison grid in the audit report.

---

## 🎯 PART 5: OHM-SPECIFIC PATTERNS

### The "Paradise Entry" Pattern

Every landing page should follow this structure:

```
1. HERO — Full viewport, breathing background, bold headline
2. PROMISE — What this solves (3 words or less)
3. PROOF — Social proof, numbers, or trust signals
4. FEATURES — 3-5 core features with icons
5. CTA — Single, clear call to action
6. FOOTER — Legal, links, sovereignty badge
```

### The "Sovereign Dashboard" Pattern

Every dashboard should follow:

```
1. HEADER — User identity, XOM balance, status indicator
2. STATS — 3-4 key metrics in glass cards
3. ACTIONS — Primary action button (top-right)
4. CONTENT — Main data area with clean table/cards
5. FILTERS — Minimal, collapsible sidebar
6. EMPTY STATE — Beautiful illustration + clear CTA (never "No data")
```

### The "Calm Notification" Pattern

```
Instead of:  🔴 ALERT! Something happened!
Use:         ✨ [subtle glow] Your item is ready to view
```

- Toast at bottom-right, not center
- Auto-dismiss after 5s
- Slide in with ease-bliss, not jump
- Use amber/gold for positive, subtle gray for info

### The "Breathing Element" Pattern

Key elements should have subtle ambient animation:

```css
@keyframes breathe {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}
.breathe {
  animation: breathe 4s var(--ease-calm) infinite;
}
```

---

## 🛡️ PART 6: ANTI-PATTERNS (FORBIDDEN)

❌ **NEVER** use aggressive red for non-error states  
❌ **NEVER** show more than 3 modals/popups at once  
❌ **NEVER** use `alert()` or browser-native `confirm()`  
❌ **NEVER** auto-play audio or video without user initiation  
❌ **NEVER** use text smaller than 12px  
❌ **NEVER** use inline styles for colors — use CSS variables or Tailwind tokens  
❌ **NEVER** create custom scrollbars that break native behavior  
❌ **NEVER** disable back-button or browser navigation  
❌ **NEVER** use lorem ipsum — every text should be real OHM content  
❌ **NEVER** show technical error messages to users (stack traces, error codes)

---

## 📊 PART 7: OUTPUT FORMAT

After completing the audit, produce this structured report:

```markdown
# 🌟 Bliss Design Audit Report — [Date]

## Summary

- Total Screens Audited: X
- Average Score: X/10
- Bliss Grade (🌟): X screens
- Needs Work (🔴): X screens

## Screen Scores

| #   | Screen | Score | Grade | Top Issue |
| --- | ------ | ----- | ----- | --------- |

## Pattern Issues Found

| Pattern | Count | Screens Affected |
| ------- | ----- | ---------------- |

## Fixes Applied

| #   | Screen | Before Score | After Score | Changes |
| --- | ------ | ------------ | ----------- | ------- |

## Remaining TODO

| Priority | Screen | Issue | Estimated Effort |
| -------- | ------ | ----- | ---------------- |
```

---

_Skill created: 2026-02-07 | Version: 1.0_  
_Inspired by: Dieter Rams, Amber Case, Apple HIG, Csíkszentmihályi Flow State, OHM Sovereign Philosophy_
