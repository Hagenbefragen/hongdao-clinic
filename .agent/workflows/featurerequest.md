---
description: Master workflow for feature requests from ideation to production deployment (combines research, implementation planning, and verification)
---

# /featurerequest - Unified Feature Development Workflow

> **🧠 SKILL AVAILABLE:** For the strategy phase, read the **Strategy Architect** skill at `.agent/skills/strategy_architect/SKILL.md` for ELWMS component mapping, onion levels, and reuse identification.

**"Best of Best - From Idea to Bulletproof Deployment."**

This master workflow manages the complete feature lifecycle:

- 🔍 Research & Evaluation
- 📋 Planning & Architecture
- 🛠️ Implementation & Polish
- ✅ Verification & Documentation

---

## 📁 Feature Locations

> 🔴 **CANONICAL LOCATION:** `c:\ohm\Documentation\features\research\FEAT-XXX_[topic]\`
> ⛔ **DEPRECATED:** `.agent/features/research/` — NEVER create FEAT folders there!

- **FEAT Number Counter**: `Documentation/features/research/FEAT_NUMBER_COUNTER.md` ← **READ THIS FIRST**
- **Research Notes**: `Documentation/features/research/FEAT-XXX_[name]/`
- **Implementation Plans**: `Documentation/Plans/FEAT-XXX_[name].md`
- **Final Docs**: `Documentation/AS_BUILD/[Category]/FEAT-XXX_[name].md`

---

## 🎯 Step 0: Complexity Tier Detection

**Before starting, determine the feature scope:**

| Tier         | Duration  | Examples                                       | Extra Checks                            |
| ------------ | --------- | ---------------------------------------------- | --------------------------------------- |
| **LITE**     | 1-3 days  | Landing pages, UI polish, simple integrations  | Skip to Phase 1-4                       |
| **STANDARD** | 1-2 weeks | New plugins, API endpoints, dashboard features | Full workflow                           |
| **COMPLEX**  | 3+ weeks  | FORTRESS, VPN, Multi-agent systems             | Add Ethics, Legal, Diamond Verification |

**Auto-Detect Triggers:**

- Multiple backend entities → STANDARD+
- Treasury/XOM integration → STANDARD+
- New authentication patterns → COMPLEX
- Cross-repo dependencies → COMPLEX
- Legal/privacy implications → COMPLEX

---

## 📋 Step 1: Review Existing Features

// turbo

```bash
cat .agent/features/FEATURE_REQUEST_TRACKER.md
```

Check if:

- [ ] Feature already exists (avoid duplicates)
- [ ] Related features to build upon
- [ ] Blockers or dependencies

---

## 🔍 Step 2: Research Phase

### 2.1 Library Evaluation (For Technical Features)

**Search for open source solutions:**

- GitHub: Stars, last commit, issues
- npm: Bundle size, TypeScript support
- Docs: Quality of examples

**80-Point Scoring System:**

| Criteria                  | Max Points | Threshold |
| ------------------------- | ---------- | --------- |
| Maintenance (commit <6mo) | 10         | 8+        |
| Popularity (>1000 stars)  | 10         | 8+        |
| Bundle Size (<100KB gzip) | 10         | 8+        |
| TypeScript Support        | 10         | 9+        |
| Documentation Quality     | 10         | 8+        |
| License (MIT/Apache)      | 10         | 10        |
| Browser Compatibility     | 10         | 9+        |
| Performance (60fps)       | 10         | 8+        |

**Minimum Score: 70/80 to proceed**

### 2.2 Create Research Document

**MANDATORY: Read FEAT_NUMBER_COUNTER.md first!**

```powershell
# 1. Check and reserve the next FEAT number
Get-Content "c:\ohm\Documentation\features\research\FEAT_NUMBER_COUNTER.md" | Select-String "Next Available"
# 2. Create the folder
New-Item -Path "c:\ohm\Documentation\features\research\FEAT-XXX_[feature_name]" -ItemType Directory
# 3. Update FEAT_NUMBER_COUNTER.md with the new entry
```

**Include:**

- Library comparison table
- Technical feasibility assessment
- Performance benchmarks
- Integration complexity (1-10)
- Code examples

---

## 📝 Step 3: Add to Feature Tracker

**Use this template in `FEATURE_REQUEST_TRACKER.md`:**

```markdown
- [ ] FEAT-XXX: [Short Title]
  - **Category**: [VC/Stream | UI/UX | Privacy | Gamification | Integration | Mobile]
  - **Priority**: HIGH/MEDIUM/LOW
  - **Complexity**: LITE/STANDARD/COMPLEX
  - **Requestor**: [User | Team | Community]
  - **Description**: [What the feature does]
  - **Technical Requirements**:
    1. [Requirement 1]
    2. [Requirement 2]
  - **Open Source Libraries**: [Library] - [Score/80]
  - **Implementation Strategy**:
    - Phase 1: Core Logic
    - Phase 2: UI Integration
    - Phase 3: Polish & Testing
  - **Integration Point**: [Component or file]
  - **Performance Target**: [e.g., <16ms/frame]
  - **Status**: 🔄 Research Phase
  - **Estimated Effort**: [Time]
```

---

## 🏗️ Step 4: Architecture Pre-Checks (STANDARD+ Only)

### 4.1 Authentication & Portals

If feature involves a **new page/portal**:

- [ ] Dual-Auth: Support both JWT AND Wallet auth
- [ ] SSO Ready: Use `SparkSyncBridge` component
- [ ] Entity: Store `ownerWalletAddress` alongside `ownerId`
- [ ] CORS: Add domain to backend `main.ts` whitelist

### 4.2 VC & Streaming Features

If feature involves **video/streaming**:

- [ ] **NO CORE EDITS**: Never modify `VCView.tsx` or `StreamView.tsx`
- [ ] **Plugin Architecture**: Use `VCPlugin` interface
- [ ] **Registry**: Register in `frontend/plugins/index.ts`

### 4.3 Tech Stack Standards

- **Database**: TypeORM Entities with strict typing
- **State**: React Context or Zustand (No Redux unless validated)
- **Cache**: Redis for hot data
- **Security**: API Guards by default

---

## 🎨 Step 5: Design System Integration

**Every feature MUST follow OHM Premium UI Standards:**

### 5.1 Visual Aesthetics

- **Glassmorphism**: `backdrop-blur-md bg-white/10` for panels
- **Gradients**: `bg-gradient-to-br from-blue-500/20 to-purple-500/20`
- **Animations**: `framer-motion` for entrances

### 5.2 Dark Mode Native

- **Text**: Always `text-white` with `textShadow` for contrast
- **Backgrounds**: `bg-gray-900` or `bg-slate-900`
- **Borders**: `border-white/10` or `border-white/20`

### 5.3 Responsiveness

- **Mobile-First**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Touch Targets**: Minimum `h-12` (48px) for buttons

---

## ⚖️ Step 6: Business & Ethics Checks (COMPLEX Only)

### 6.1 Business Checks

- [ ] **Monetization**: Need subscription tier? (`/admin_app`)
- [ ] **Treasury**: Involves XOM? Link to `XomBankService` (No manual increments!)
- [ ] **XOM Integrity**: Run `/xom_integrity` audit for any invite/payment/balance changes
- [ ] **Legal**: Collects user data? Update `PrivacyPolicy.tsx`

### 6.2 Sovereign Ethics ("Soul Check")

- [ ] **Offline First**: Works if server dies? (Cache/PWA)
- [ ] **No Lock-in**: Can user export their data? (JSON Export)
- [ ] **Human Connection**: Encourages real interaction, not scroll-dopamine?

### 6.3 Strategic Philosophy

- [ ] **Hybrid Choice**: Offer ~3 tiers if trade-offs exist (Cloud vs Local vs Hybrid)
- [ ] **Best Practice**: No "MVP hacks" - Diamond Standard only
- [ ] **Future-Proof**: Design for extensibility

### 6.4 XPollination Decision Criteria (BPC Evaluation)

> **Before ANY implementation, this is the ULTIMATE AUTHORITY.**

- [ ] **Purpose Alignment:** Ensure the operational goal and purpose of the solution are unambiguously defined.
- [ ] **Pure Improvement:** Must provide quantitative evidence that it improves one or more BPCs (Best Practice Criteria) without trade-offs.
- [ ] **Zero Negative Impact:** Ensure no other BPCs are degraded.
- [ ] **Trade-Off Resolution:** If a trade-off exists, run `@[/petalDissolve]` to dissolve it.

---

## 🛠️ Step 7: Implementation Phases

### Phase 0: Token Budget Guard (FEAT-163) 🛡️

Before generating ANY large output (HTML, patent docs, dashboards):

```powershell
# Check if output will exceed 16,384 token limit
$src = Get-Item "[source-file]"
if ($src.Length -gt 30KB) { Write-Host "🔴 USE SCRIPT (generate-*.cjs)" }
```

| Output Type                | Size Indicator | Action                                           |
| -------------------------- | -------------- | ------------------------------------------------ |
| HTML doc from >30KB source | 🔴             | Write a `generate-*.cjs` script, run via Node.js |
| HTML doc from >30 claims   | 🔴             | Write a `generate-*.cjs` script, run via Node.js |
| Code file >500 lines       | 🟡             | Chunk into 2-3 phases (scaffold → fill)          |
| Report/doc <10KB           | 🟢             | Inline generation OK                             |

> 🔥 **Cost of ignoring:** ~$3.22 per burn × estimated 100+ burns = **$322+ wasted**
> Template: `scripts/generate-ni-extension-html.cjs`

### Phase 1: Core Functionality

- Implement basic feature with chosen library
- Add loading states and error handling
- Test on Chrome/Firefox/Safari

### Phase 2: UI Integration

- Create UI controls (sliders, toggles, presets)
- Follow OHM Premium UI Standards
- Mobile responsive from day 1

### Phase 3: Performance Optimization

- Profile frame rate and memory
- Optimize canvas/WebGL operations
- Add Web Worker for heavy computation

### Phase 4: Polish & Testing

- Add presets/defaults
- Implement reset/undo functionality
- Create test cases (`/addtestcase`)

---

## 🔄 Step 8: Lifecycle Management

**Update Status as you work:**

| Status         | Meaning                             | Location                    |
| -------------- | ----------------------------------- | --------------------------- |
| 🔄 Research    | Investigating libraries/feasibility | `Documentation/features/research/` |
| 📋 Planning    | Architecture design                 | `Documentation/Plans/`      |
| 🚧 In Progress | Active development                  | Feature Tracker             |
| 🔍 Review      | All phases complete, awaiting audit | `Documentation/REVIEW/`     |
| ✅ Complete    | Shipped to production               | `Documentation/AS_BUILD/`   |

---

## ✅ Step 9: Final Verification ("Diamond Polish")

**Execute in order:**

1. **Code Integrity** (`/codetest`)

   ```bash
   npm run lint && npm run build
   ```

   - Zero tolerance for build errors

2. **Test Planning** (`/addtestcase`)

   - Add acceptance criteria to `Browser_Test_Script.md`

3. **Browser Validation** (`/browsertest`)

   - Autonomous testing of all UI flows

4. **Documentation** (`/documentation`)

   - Save final spec to `Documentation/AS_BUILD/[Category]/`
   - Link in `Documentation/00_INDEX.md`

5. **XOM Integrity** (`/xom_integrity`) _(if feature touches economy)_
   - Run 4-phase audit: Frontend → Backend → E2E → Cross-Module
   - Verify no silent capping, mock APIs, or arithmetic errors

---

## 📦 Step 10: Completion & Commit

**Update Feature Tracker:**

```markdown
- [x] FEAT-XXX: [Feature Name] - **✅ COMPLETE**
  - ... (keep original content)
  - **Completion Date**: [Date]
  - **Final Bundle Size**: [e.g., +120KB gzip]
  - **Commit**: [hash]
  - **Documentation**: [Link to AS_BUILD doc]
```

**Commit:**

```bash
git add -A
git commit -m "feat(FEAT-XXX): [Short description]

- Implemented using [Library]
- Added [specific features]
- Performance: [metrics]
- Browser tested: Chrome 120+, Firefox 121+, Safari 17+"
```

---

## 🚀 Quick Reference: Complexity Shortcuts

### LITE Features (1-3 days)

Skip Steps 4, 6. Focus on Steps 1-3, 7, 10.

### STANDARD Features (1-2 weeks)

Full workflow. Skip Step 6 unless XOM/Treasury involved.

### COMPLEX Features (3+ weeks)

Full workflow + Step 6 mandatory. Create dedicated Implementation Plan in `Documentation/Plans/`.

---

## 📚 Related Workflows

- `/vcplugin` - VC-specific plugin creation
- `/newportal` - New portal/page setup
- `/sso_seamless` - SSO integration
- `/bestpractice` - Quality standards
- `/browsertest` - Autonomous testing
- `/addtestcase` - Test case creation
- `/documentation` - Documentation standards
- `/xom_integrity` - XOM economy audit (auto-triggered for payment/invite features)

---

**"Once and we do it right. Best Practice, Always!"** 🎯
