---
description: Run a comprehensive UI/UX optimization audit and apply best practices for Mobile, Tablet, and Desktop.
---

# /uioptimizer - UI/UX Optimization Workflow

// turbo-all

## Overview

This workflow acts as a UI/UX Expert Agent to audit, analyze, and optimize the application's design, responsiveness, and user experience.

**🌟 SKILL INTEGRATION**: Before starting, read the **Bliss Design Mastery** skill at `.agent/skills/bliss_design/SKILL.md` for deep design knowledge including:

- The 12 Bliss Design Commandments (Calm Technology, Flow State, Sovereign Intuition)
- OHM Design DNA (HSL colors, 8px grid, animation standards, glass morphism)
- 60-screen inventory with scoring rubric
- Paradise Entry + Sovereign Dashboard + Calm Notification patterns
- Anti-patterns (FORBIDDEN practices)

## 🎨 OHM Design DNA (Quick Reference)

**Colors (HSL-Based)**:

- **Primary Gold**: `hsl(42, 95%, 55%)` — Sovereign warmth
- **Deep Space**: `hsl(240, 20%, 8%)` — Background depth
- **Ocean Blue**: `hsl(210, 80%, 55%)` — Trust, connection
- **Text**: Always WHITE (`#FFFFFF`) with black shadow on dark backgrounds
- **Text Secondary**: Use `text-gray-300` (NEVER `text-gray-500` or darker on dark backgrounds!)
- **Backgrounds**: Soft, subtle gradients — keep colors IN BACKGROUND

**Contrast Rules**:

- ❌ NEVER use `text-gray-500`, `text-gray-600`, `text-gray-700` on dark backgrounds
- ✅ Use `text-gray-300` or `text-gray-400` for secondary text
- ✅ Use `text-white` with `textShadow` for primary text

**Spacing**: 8px grid (4px compact, 8px tight, 16px standard, 24px sections, 32px major)

**Animations**: `cubic-bezier(0.25, 0.1, 0.25, 1.0)` for smooth, `200ms` for interactions, `300ms` for transitions

## Steps

### 0. 📝 Log & Track

- **Check Status**: Read `.agent/ui_optimization/UIOptimizer_log.md` to see active issues.
- **Log New Issues**: checking the `UIOptimizer_log.md` is the FIRST step. If the user reports a new issue, add it to the log immediately.
- **Update Status**: After implementing changes, update the issue status to **🧪 Verification Missing**.
- **CRITICAL RULE**: NEVER mark as "Completed" or delete from "Active" without User confirmation.
- **RETENTION POLICY**:
  - Move verified issues to "Resolved Issues" section with verification date
  - NEVER delete from "Resolved Issues" unless verified date is 1+ month old
  - Keep resolved issues as historical record for future reference
  - Archive format: `- [✅ VERIFIED 2026-01-30] ISSUE-XXX: Description`

### 1. 🔍 Audit & Discovery

- **Load the Bliss Design Skill**: `view_file .agent/skills/bliss_design/SKILL.md` — Internalize the 12 Commandments and DNA
- **Visual Inspection**: Use the browser agent to capture screenshots of key pages across 3 viewports:
  - **Mobile**: 375x667 (iPhone 8/SE/12 Mini equivalent)
  - **Tablet**: 768x1024 (iPad Portrait)
  - **Desktop**: 1440x900 (Laptop)
- **3-Second Test**: For each screen, ask: "Can the user understand this in 3 seconds?"
- **Bliss Test**: For each screen, ask: "Does this feel like paradise software?"
- **Design System Check** (Per Bliss Commandment #8 & #11):
  - Typography (Font sizes, line heights, readability)
  - Color Palette (DNA palette compliance, no ad-hoc colors)
  - Spacing (8px grid compliance, tap targets >= 44px)
  - Glass Morphism (backdrop-blur, translucency where applicable)
  - Micro-animations (hover, focus, active states on ALL interactive elements)
- **Component Analysis**: Check specific components:
  - Modals (Centering, backdrop, close buttons)
  - Forms (Input focus states, labels, error messages)
  - Navigation (Hamburger menus, tab bars, breadcrumbs)
  - Buttons (Primary=gradient, Secondary=outline, Ghost=text)
  - Cards (Glass morphism, consistent padding, hover elevation)

### 2. ⚡ Optimization Actions

- **CSS Refactoring**:
  - Replace ad-hoc colors with DNA palette CSS variables
  - Enforce 8px spacing grid (replace arbitrary px values)
  - Apply Tailwind responsive prefixes (`md:`, `lg:`) to fix layout breaks
  - Implement `min-h-[44px]` for all interactive mobile elements
  - Ensure safe areas (`pb-safe`) for modern mobile browsers
- **Glass & Polish** (Bliss Commandment #3):
  - Add `backdrop-blur-xl bg-white/5 border border-white/8` where appropriate
  - Ensure backgrounds breathe through — no opaque blocks on dark themes
- **Animation & Flow** (Bliss Commandment #4, #6):
  - Add subtle micro-interactions (`hover:scale-[1.02]`, `active:scale-95`)
  - Ensure transitions use `transition-all duration-200 ease-in-out`
  - Add breathing animations to key elements (`animate-pulse` or custom `breathe`)
- **Accessibility** (Bliss Commandment #10):
  - Add `aria-label` to icon-only buttons
  - Fix low-contrast text colors (min 4.5:1 ratio)
  - Verify focus states for keyboard navigation
  - Respect `prefers-reduced-motion`

### 3. 🧪 Verification

- Re-run browser tests on the optimized pages to ensure no regression
- Validate that the UI "WOWs" the user (Premium aesthetic check)
- Score each screen using the Bliss rubric (10/10 = Flow State, 1/10 = Confusing)
- Update the UIOptimizer_log.md with results
- Create before/after comparison screenshots

## 📋 Full Screen Inventory (60+ screens)

Reference the **Bliss Design Skill Part 3** for the complete categorized list:

- **A. Landing Pages** (22 screens) — Must be WOW first impression
- **B. Dashboards** (9 screens) — Must be Calm & Productive
- **C. Functional Pages** (8 screens) — Must be Intuitive
- **D. Stream/VC Experience** (7 screens) — Must be Immersive
- **E. Use Case Pages** (12 screens) — Must be Persuasive
- **F. Overlays & Micro-UI** (7 screens) — Must be Gentle

## Focus Areas (User Request)

- **VC Room**: Ensure controls are accessible, video grid is responsive, and overlays don't block content.
- **Stream Dashboard**: Verify host overlays and chat visibility.
- **Mobile Experience**: Strict check on touch targets and font sizes.
- **Landing Pages**: Every landing page must follow the "Paradise Entry" pattern (Hero → Promise → Proof → Features → CTA → Footer).
- **Dashboards**: Every dashboard must follow the "Sovereign Dashboard" pattern (Header → Stats → Actions → Content → Filters → Empty State).
