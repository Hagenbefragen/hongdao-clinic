---
name: UX/UI-First Shipping Skill
description: Mobile-first, screen-agnostic, business-process-driven UX/UI design system integrated into every SHIP petal. Ensures usability wins the market.
group: smart.design
---

# 🎯 UX/UI-First Shipping Skill — "Usability Wins the Market"

> "If you need a tooltip, the design has failed." — Bliss Commandment #5
> "Once and we do it right. Best Practice, Always!" — OHM Diamond Standard
> "Usability wins the market. The business case wins the rest." — FEAT-226 Mantra

When this skill is invoked — either explicitly or as SHIP Step 0 — embody the role of a
**Mobile-First Product Architect** who designs from the smallest screen outward,
maps every screen to a business process step, and ensures every element is
self-explanatory without tooltips, documentation, or instructions.

**This skill ABSORBS and EXTENDS:**
- `bliss_design` (12 Commandments → PRESERVED in full, Part 2)
- `ui_ux_polish` (Tailwind/A11y → ABSORBED into Parts 3+5)
- `/uioptimizer` workflow aspects (audit protocol → SUBSUMED into Part 6)

---

## PART 1: THE 3 UNBREAKABLE LAWS

### Law 1: MOBILE FIRST — Design Inward → Outward

**Every design starts at 320px.** Not as a "responsive check" after desktop design — as the ORIGIN.

```
DESIGN ORDER (non-negotiable):

  1. 📱 Mobile S (320px)   → Design HERE. This IS the design.
  2. 📱 Mobile L (375px)   → Verify nothing breaks at wider phone
  3. 📋 Tablet (768px)     → Add secondary elements now visible
  4. 💻 Desktop (1440px)   → Add power tools and multi-panel
  5. 🖥️ Wide (1920px+)     → Dashboard mode, data density increase

  WHAT MOBILE FORCES:
  - Feature prioritization (limited space = honest priority)
  - Simplified clarity (no room for clutter = clean design)
  - Touch-first interactions (44px minimum touch targets)
  - Vertical rhythm (single-column forces content hierarchy)
```

### Law 2: BUSINESS PROCESS DRIVEN — Design for TASKS, Not Features

**Users don't use "features." They complete TASKS.** Every screen exists to advance a business process.

```
BEFORE DESIGNING ANY SCREEN, ANSWER:

  1. What TASK is the user trying to complete?
  2. What is the PREVIOUS step in the process?
  3. What is the NEXT step after this screen?
  4. What BUSINESS METRIC does this screen serve?
  5. What happens if the user ABANDONS mid-flow?

PROCESS MAPPING FORMAT:

  [Entry Point] → [Step 1: What?] → [Step 2: How?] → [Step 3: Confirm] → [Done ✅]
       ↓               ↓                 ↓                  ↓
  Landing Page     Primary Screen    Detail/Form      Success State
       ↓               ↓                 ↓                  ↓
  Mobile:           Mobile:           Mobile:           Mobile:
  Full-viewport     Single-column     Focused form      Celebration +
  hero + CTA        card stack        with large         share button
                                      touch targets
```

### Law 3: SELF-EXPLANATORY — Zero Tooltips, Zero Manual

**The 7-Point Self-Explanatory Test** — Every screen MUST pass ALL 7:

| # | Test | Question the User Should Answer | How to Achieve It |
|:-:|------|--------------------------------|-------------------|
| 1 | **Identity** | "Where am I?" | Consistent header with page name, breadcrumb, active tab highlight |
| 2 | **Goal** | "What can I do here?" | Primary action visible above the fold on ALL viewports |
| 3 | **Action** | "How do I do it?" | Single gold/green PRIMARY CTA, visually dominant. Secondary buttons are outline/ghost |
| 4 | **State** | "What happened?" | Every action produces immediate visual feedback (loading → success/error transition) |
| 5 | **Progress** | "Am I done yet?" | Multi-step flows show step indicator. Single-step shows completion animation |
| 6 | **Escape** | "How do I go back?" | Back button / swipe-back / breadcrumb always accessible within 1 gesture |
| 7 | **Delight** | "Do I want to return?" | At least 1 micro-delight per session (smooth animation, satisfying completion, earned badge) |

```
SELF-EXPLANATORY DESIGN RULES:

  ✅ Buttons use VERBS: "Certify Agent" NOT "Submit"
  ✅ Empty states GUIDE: "Start your first audit →" NOT "No data found"
  ✅ Error states HELP: "Check your connection and try again" NOT "Error 500"
  ✅ Icons have visible labels on mobile (icon-only = desktop power-user mode)
  ✅ Colors carry meaning: Gold = important, Green = success, Red = danger
  ✅ Spatial consistency: Same action = same position on every screen
  ✅ Smart defaults: Most common choice pre-selected, least effort first
```

---

## PART 2: OHM DESIGN DNA (Absorbed from `bliss_design`)

> All 12 Bliss Design Commandments are PRESERVED. Refer to `bliss_design/SKILL.md` for full text.
> Below is the quick reference integrated into this skill.

### Color System (HSL-Based, Semantic Roles)

```
PURPOSE COLORS (use these, not raw hex/rgb):
  --color-primary:      hsl(42, 95%, 55%)    — Gold — CTAs, highlights, importance
  --color-trust:        hsl(210, 80%, 55%)   — Blue — Links, trust signals, info
  --color-success:      hsl(150, 60%, 45%)   — Green — Confirmations, health, go
  --color-danger:       hsl(0, 70%, 55%)     — Red — Errors only (SPARINGLY!)
  --color-warm:         hsl(35, 90%, 60%)    — Amber — Warmth, invitation
  --color-heart:        hsl(340, 60%, 65%)   — Rose — Social, connection
  --color-wisdom:       hsl(270, 60%, 55%)   — Violet — Premium, wisdom

NEUTRAL COLORS:
  --bg-deep:            hsl(240, 20%, 8%)    — Deepest background
  --bg-card:            hsl(240, 15%, 12%)   — Card background
  --bg-elevated:        hsl(240, 15%, 16%)   — Elevated surfaces
  --text-primary:       hsl(0, 0%, 100%)     — Primary text (white)
  --text-secondary:     hsl(220, 10%, 70%)   — Secondary text
  --text-dim:           hsl(220, 10%, 50%)   — Tertiary text
  --border:             rgba(255,255,255,0.06) — Subtle borders
```

### Typography Scale (Fluid — `clamp()`)

```
--font-hero:    clamp(2rem, 5vw, 3.5rem)   weight: 900   tracking: -0.02em
--font-h1:      clamp(1.75rem, 4vw, 2.75rem) weight: 800  tracking: -0.01em
--font-h2:      clamp(1.25rem, 3vw, 2rem)   weight: 700
--font-h3:      clamp(1rem, 2.5vw, 1.5rem)  weight: 600
--font-body:    clamp(0.875rem, 1.5vw, 1rem) weight: 400  line-height: 1.6
--font-small:   clamp(0.75rem, 1vw, 0.875rem) weight: 400  opacity: 0.7
--font-micro:   0.6875rem                    weight: 600  text-transform: uppercase
--font-family:  'Inter', system-ui, -apple-system, sans-serif
```

### Spacing Scale (8px Grid)

```
--space-2xs:  2px    — Micro-dividers only
--space-xs:   4px    — Icon padding, compact gaps
--space-sm:   8px    — Inline elements, tight groups
--space-md:   16px   — Card padding, section gaps (DEFAULT)
--space-lg:   24px   — Between sections
--space-xl:   32px   — Major section breaks
--space-2xl:  48px   — Hero spacing
--space-3xl:  64px   — Page section dividers (desktop only)
```

### Animation Standards

```css
/* Easing curves */
--ease-smooth:   cubic-bezier(0.25, 0.1, 0.25, 1);   /* Default */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy */
--ease-calm:     cubic-bezier(0.45, 0, 0.55, 1);       /* Meditative */

/* Duration scale */
--dur-instant:   100ms;   /* Hover states, micro-feedback */
--dur-fast:      200ms;   /* Button presses, toggles */
--dur-normal:    300ms;   /* Expand/collapse, slide */
--dur-slow:      500ms;   /* Page transitions, reveals */
--dur-breath:    1000ms;  /* Ambient breathing animations */

/* Touch targets */
--touch-min:     44px;    /* Minimum on mobile (WCAG 2.2) */
--touch-comfort: 48px;    /* Comfortable tap target */
```

### Glass Morphism Standard

```css
.ohm-glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px) saturate(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}
.ohm-glass:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
```

---

## PART 3: 5-VIEWPORT RESPONSIVE SYSTEM

### Progressive Context Escalation (PCE)

The core architectural pattern from DISSOLVE TC-1:

```
VIEWPORT BEHAVIOR:

📱 MOBILE S (320-375px):
  - Layout: Single column, full-width cards
  - Navigation: Bottom tab bar (5 items max)
  - Actions: Primary CTA sticky at bottom
  - Secondary: Hidden behind swipe-up panel
  - Power tools: Long-press reveals
  - Typography: --font-body mandatory minimum
  - Touch: 48px minimum tap targets

📱 MOBILE L (376-428px):
  - Same as Mobile S with wider card padding
  - 2-column grid allowed for icon cards only
  - Increased spacing between interactive elements

📋 TABLET (429-1024px):
  - Layout: 2-column (sidebar + content) OR wide single-column
  - Navigation: Left sidebar (collapsed icons, expand on hover)
  - Actions: Inline buttons (no sticky bottom CTA)
  - Secondary: Visible in sidebar or inline
  - Split-view capable (side-by-side comparison)
  - 12-column grid system with 16px gutters

💻 DESKTOP (1025-1440px):
  - Layout: Multi-panel (sidebar + main + detail)
  - Navigation: Left sidebar (expanded with labels)
  - Actions: Top-right toolbar with keyboard shortcuts shown
  - Secondary: All visible inline
  - Power tools: Visible in toolbar
  - 12-column grid with 24px gutters

🖥️ WIDE (1441px+):
  - Layout: Centered content (max-width: 1400px) with ambient margins
  - Dashboard density: 3-4 columns for data cards
  - Multi-pane: Up to 3 panels simultaneously
  - Keyboard-centric navigation promoted
  - Data tables with column resizing
```

### Fluid Scaling CSS

```css
/* Container queries for component-level responsiveness */
.ohm-container {
  container-type: inline-size;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 32px);
}

/* The 5-viewport breakpoints */
@media (min-width: 376px) { /* Mobile L */ }
@media (min-width: 429px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
@media (min-width: 1441px) { /* Wide */ }

/* Fluid grid */
.ohm-grid {
  display: grid;
  gap: clamp(12px, 2vw, 24px);
  grid-template-columns: 1fr; /* Mobile: single column */
}
@media (min-width: 429px) {
  .ohm-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1025px) {
  .ohm-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1441px) {
  .ohm-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## PART 4: 6 SCREEN TEMPLATES

### Template 1: Paradise Landing Page

```
PURPOSE: First impression. Convert visitor into user.
BUSINESS METRIC: Signup conversion rate, bounce rate

MOBILE LAYOUT:
┌──────────────────────┐
│ [Logo]    [≡ Menu]   │  ← Fixed header, minimal
├──────────────────────┤
│                      │
│   HERO TEXT           │  ← Full viewport, breathing bg
│   One-line promise    │
│                      │
│  [ PRIMARY CTA ✨ ]   │  ← Gold gradient, full-width
│                      │
├──────────────────────┤
│  Social Proof Row    │  ← "Trusted by X agents"
├──────────────────────┤
│  Feature 1 Card      │  ← Icon + title + 1 sentence
│  Feature 2 Card      │
│  Feature 3 Card      │
├──────────────────────┤
│  [ SECONDARY CTA ]   │  ← Outline button
├──────────────────────┤
│  Footer (Legal)      │
└──────────────────────┘

TABLET/DESKTOP: Feature cards → 2-3 columns. Hero text larger.
```

### Template 2: Sovereign Dashboard

```
PURPOSE: Daily command center. User manages their domain.
BUSINESS METRIC: Session duration, actions per session

MOBILE LAYOUT:
┌──────────────────────┐
│ [←] Dashboard  [⚙]  │  ← Header with back + settings
├──────────────────────┤
│ Stats Card 1  │ SC2  │  ← 2-column mini-stat cards
│ Stats Card 3  │ SC4  │
├──────────────────────┤
│ [ Primary Action ✨ ] │  ← Full-width CTA
├──────────────────────┤
│ Content Card 1       │  ← Scrollable list/cards
│ Content Card 2       │
│ Content Card 3       │
│ ...                  │
├──────────────────────┤
│ [🏠][📊][➕][👤][⚙] │  ← Bottom tab navigation
└──────────────────────┘

TABLET: Stats → 4-column. Content → 2-column grid.
DESKTOP: Add left sidebar for navigation. Stats → row. Content → table view option.
```

### Template 3: Guided Flow (Forms + Processes)

```
PURPOSE: Multi-step task completion. User achieves a goal.
BUSINESS METRIC: Completion rate, drop-off per step, time-to-complete

MOBILE LAYOUT:
┌──────────────────────┐
│ [←] Step 2 of 4      │  ← Progress visible
├──────────────────────┤
│ ●──●──○──○            │  ← Visual step indicator
├──────────────────────┤
│                      │
│ Step Title            │  ← One question per screen
│ Description           │
│                      │
│ ┌──────────────────┐ │
│ │ Input Field      │ │  ← Large touch target
│ └──────────────────┘ │
│                      │
│ Helpful context text │  ← Not a tooltip — inline context
│                      │
├──────────────────────┤
│ [ Continue → ]       │  ← Sticky bottom CTA
│ [ ← Back ]           │  ← Always accessible
└──────────────────────┘

DESIGN RULES FOR FLOWS:
  - ONE question per viewport on mobile
  - Progress indicator always visible
  - Back is ALWAYS accessible (never disable it)
  - Form validation is INLINE and REAL-TIME
  - Error messages appear BELOW the field, not in popups
  - Success animation on completion (confetti, check, or celebration)
```

### Template 4: Calm Data Table

```
PURPOSE: View, sort, filter structured data. User finds information.
BUSINESS METRIC: Time-to-find, filter usage rate

MOBILE LAYOUT:
┌──────────────────────┐
│ [←] Agents  [🔍][⚡] │  ← Search + filter icons
├──────────────────────┤
│ ┌──────────────────┐ │
│ │ Agent Card       │ │  ← Cards, NOT rows on mobile
│ │ Name: Agent-42   │ │
│ │ Score: ████ 8.2  │ │
│ │ Status: 🟢 Gold  │ │
│ │ [View Details →] │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Agent Card       │ │
│ │ ...              │ │
│ └──────────────────┘ │
├──────────────────────┤
│ [🏠][📊][➕][👤][⚙] │
└──────────────────────┘

CRITICAL MOBILE RULE:
  Tables → CARDS on mobile. NEVER horizontal scroll data tables.
  Each card shows the 3-4 most important fields.
  "View Details" opens focus template.

TABLET: 2-column card grid.
DESKTOP: Switch to table view with sortable columns, bulk select, export.
```

### Template 5: Focus Detail View

```
PURPOSE: Deep inspection of a single item. User understands everything.
BUSINESS METRIC: Comprehension, action-from-detail rate

MOBILE LAYOUT:
┌──────────────────────┐
│ [←]  Agent-42  [⋮]  │  ← Context menu (share, export, delete)
├──────────────────────┤
│ ┌──────────────────┐ │
│ │  AGENT PASSPORT  │ │  ← Hero card with key info
│ │  Score: 8.2 🟢   │ │
│ │  Tier: Gold      │ │
│ │  Last: 2h ago    │ │
│ └──────────────────┘ │
├──────────────────────┤
│ [Tab1] [Tab2] [Tab3] │  ← Segmented control for sections
├──────────────────────┤
│ Section Content      │  ← Full-width, scrollable
│ ...                  │
├──────────────────────┤
│ [ Primary Action ✨ ] │  ← Context-dependent CTA
└──────────────────────┘

TABLET: Tabs → sidebar navigation. Content area wider.
DESKTOP: Split view — list on left, detail on right.
```

### Template 6: Toggle Grid (Settings / Configuration)

```
PURPOSE: User configures preferences. Low frequency, high importance.
BUSINESS METRIC: Completion rate, support ticket reduction

MOBILE LAYOUT:
┌──────────────────────┐
│ [←] Settings         │
├──────────────────────┤
│ ┌──── Account ─────┐ │  ← Section headers
│ │ Display Name  [→]│ │
│ │ Email         [→]│ │
│ │ Password      [→]│ │
│ └──────────────────┘ │
│ ┌── Notifications ─┐ │
│ │ Push       [═══] │ │  ← Toggle switches (large)
│ │ Email      [═══] │ │
│ │ Sound      [   ] │ │
│ └──────────────────┘ │
│ ┌──── Danger ──────┐ │
│ │ Delete Account   │ │  ← Red text, NO red button
│ │ (requires 2-step)│ │
│ └──────────────────┘ │
└──────────────────────┘

TOGGLE SIZE: 56×28px on mobile (large thumb target)
DANGER ZONE: Always at bottom, separated by extra spacing
```

---

## PART 5: BUSINESS IMPACT FRAMEWORK

### 12-Dimension UX BPC Scoring

Every screen produced by SHIP must be scored:

| # | Dimension | Weight (φ) | How to Measure |
|:-:|-----------|:----------:|----------------|
| 1 | **Mobile Primacy** | φ³ | Does the mobile layout work without horizontal scroll? |
| 2 | **Screen Fluidity** | φ² | Does it adapt gracefully across all 5 viewports? |
| 3 | **Process Clarity** | φ³ | Is the business task flow obvious? Can you identify the next step? |
| 4 | **Self-Explanatory** | φ³ | Does it pass all 7 points of the Self-Explanatory Test? |
| 5 | **Visual Coherence** | φ² | Does it use OHM Design DNA (colors, spacing, glass, font)? |
| 6 | **Interaction Delight** | φ | Are there hover states, press feedback, and micro-animations? |
| 7 | **Accessibility** | φ² | WCAG 2.2 AA: Contrast ≥ 4.5:1, keyboard nav, aria labels? |
| 8 | **Performance** | φ² | FCP < 1s, TTI < 2s (simulated 3G)? |
| 9 | **Error Grace** | φ | Friendly errors, undo available, no dead ends? |
| 10 | **Onboarding** | φ² | New user completes first task in < 60s without instruction? |
| 11 | **Conversion** | φ² | Clear CTA hierarchy? Time-to-value measured? |
| 12 | **Sovereign Feel** | φ | Does it feel like OHM paradise? No manipulation or surveillance? |

```
COMPOSITE UX SCORE = Σ(wᵢ × dᵢ) / Σ(wᵢ)

LABELS:
  🌟 Bliss     (≥ 9.0) — Paradise experience. Ship it.
  ✅ Excellent  (≥ 8.0) — Premium feel. Minor polish only.
  🟡 Good      (≥ 7.0) — Functional. Needs OHM DNA.
  🟠 Improve   (≥ 6.0) — Usability concerns. Redesign before ship.
  🔴 Rework    (< 6.0) — BLOCKED. Cannot ship.
```

### Business Metrics per Screen Type

| Template | Primary Metric | Secondary Metric | Target |
|----------|---------------|-----------------|--------|
| Landing | Signup conversion | Bounce rate | > 5% conv, < 40% bounce |
| Dashboard | Actions per session | Session duration | > 5 actions, > 3 min |
| Guided Flow | Completion rate | Drop-off per step | > 80% complete, < 10%/step |
| Data Table | Time-to-find | Search/filter usage | < 15s, > 60% |
| Detail View | Action-from-detail | Comprehension | > 40% act, < 1% support |
| Settings | Completion | Support reduction | > 90%, ↓30% tickets |

---

## PART 6: SHIP INTEGRATION PROTOCOL

### How This Skill Integrates into /petalShip

```
/petalShip Execution Flow (UPDATED):

  ┌──────────────────────────────────────────────────────────────┐
  │ STEP 0: UX/UI GATE (NEW — from this skill)                  │
  │                                                              │
  │  1. IDENTIFY screen template (which of the 6?)              │
  │  2. MAP business process (what task? what flow?)            │
  │  3. DESIGN mobile viewport FIRST (320px wireframe)          │
  │  4. VERIFY 7-Point Self-Explanatory Test                    │
  │  5. EXPAND to tablet + desktop (PCE rules)                  │
  │  6. SCORE against 12-dimension UX BPC                       │
  │                                                              │
  │  GATE: UX Score ≥ 7.0 → PROCEED TO BUILD                   │
  │        UX Score < 7.0 → REDESIGN (do not write code yet!)   │
  └──────────────────────────────────────────────────────────────┘
           ↓
  STEP 1: Patent Claims (existing)
  STEP 2: Ship Engine — Build (existing, now code follows design)
  STEP 3: Regulatory Navigator (existing)
  STEP 4: Innovation Journal (existing)
  STEP 5: UX VERIFICATION (NEW — browser test at 3 viewports)
```

### When This Skill Is Auto-Invoked

| Trigger | Action |
|---------|--------|
| `/petalShip` starts | UX Step 0 runs automatically as first gate |
| Any new screen/component creation | Template selection + mobile-first design |
| `/uioptimizer` is called | Delegates to this skill's Part 6 audit protocol |
| `/bestpractice` section 3 (UI/UX Excellence) | Uses the 12-dimension BPC from this skill |
| `/browsertest` finds UX issues | Routes through this skill's remediation workflow |
| Feature request mentions "UI", "UX", "mobile", "responsive" | This skill advises on architecture |

---

## PART 7: ANTI-PATTERNS (FORBIDDEN)

### From `bliss_design` (PRESERVED):

❌ NEVER use aggressive red for non-error states
❌ NEVER show more than 3 modals/popups at once
❌ NEVER use `alert()` or browser-native `confirm()`
❌ NEVER auto-play audio/video without user initiation
❌ NEVER use text smaller than 12px
❌ NEVER use inline styles for colors — use CSS variables
❌ NEVER create custom scrollbars that break native behavior
❌ NEVER disable back-button or browser navigation
❌ NEVER use lorem ipsum — every text is real content
❌ NEVER show technical error messages to users

### New Anti-Patterns (ADDED):

❌ NEVER design desktop-first and then "make it responsive"
❌ NEVER use horizontal scroll tables on mobile (use cards instead)
❌ NEVER put more than ONE primary CTA per viewport
❌ NEVER build a screen without knowing what TASK it serves
❌ NEVER ship without testing at 320px viewport width
❌ NEVER use tooltips as primary information delivery
❌ NEVER assume the user has read documentation
❌ NEVER show a feature gate without explaining HOW to access it
❌ NEVER use icons without labels on mobile viewport
❌ NEVER design a form with more than 3 fields per viewport (use multi-step)

---

## PART 8: AUDIT WORKFLOW (When Used Reactively)

### Reactive Audit Protocol (when /uioptimizer is called)

```
1. CAPTURE screenshots at 5 viewports (320, 375, 768, 1440, 1920px)
2. SCORE each screen against 12-dimension UX BPC
3. IDENTIFY which template the screen SHOULD follow
4. COMPARE current design against template specification
5. LIST remediation items by priority (🔴 Critical → 🟢 Low)
6. APPLY fixes following the template patterns
7. RE-CAPTURE screenshots at 5 viewports
8. RE-SCORE to verify improvement
9. DOCUMENT before/after in audit report
```

### Output Format

```markdown
# 🎯 UX/UI Audit Report — [Screen Name]

## Template Match: [Template X: Name]
## Process: [Task this screen serves]

| Dimension | Before | After | Δ |
|-----------|:------:|:-----:|:-:|
| 1. Mobile Primacy | 5/10 | 9/10 | +4 |
| ... | ... | ... | ... |
| **COMPOSITE** | **X.X** | **X.X** | **+X.X** |

## Viewport Screenshots
| Viewport | Before | After |
|----------|--------|-------|
| Mobile S | [img]  | [img] |
| ... | ... | ... |
```

---

## PART 9: COMPONENT CHECKLIST (Quick Reference)

Every component MUST have:

| Concern | Requirement |
|---------|-------------|
| **Mobile** | Works at 320px without horizontal scroll |
| **Touch** | Touch target ≥ 44px |
| **Feedback** | Hover, focus, active, pressed, disabled states |
| **Accessible** | aria-label, role, keyboard navigable |
| **Motion** | Respects `prefers-reduced-motion` |
| **Loading** | Skeleton or spinner for async content |
| **Empty** | Helpful empty state with CTA (never "No data") |
| **Error** | Inline error below element, not in popup |
| **Dark mode** | Native dark mode support via CSS variables |
| **Overflow** | Text truncation with ellipsis, never layout break |

---

_Skill created: 2026-03-13 | Version: 1.0_
_FEAT-226: UX/UI-First Shipping Skill_
_Absorbs: bliss_design (v1.0), ui_ux_polish (v1.0)_
_Inspired by: Dieter Rams, Apple HIG, Csíkszentmihályi, SAP Fiori, OHM Sovereign Philosophy_
_"Usability wins the market. The business case wins the rest."_ 🏆
