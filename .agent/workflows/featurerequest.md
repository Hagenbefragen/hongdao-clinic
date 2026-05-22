---
description: Master workflow for feature requests from ideation to production deployment (combines research, implementation planning, and verification)
---

# /featurerequest - Unified Feature Development Workflow

**"Best of Best - From Idea to Bulletproof Deployment."**

This master workflow manages the complete feature lifecycle:

- 🔍 Research & Evaluation
- 📋 Planning & Architecture
- 🛠️ Implementation & Polish
- ✅ Verification & Documentation

---

## 📁 Feature Locations

- **Feature Tracker**: `.agent/features/FEATURE_REQUEST_TRACKER.md`
- **Research Notes**: `.agent/features/research/FEAT-XXX_[name].md`
- **Prototypes**: `.agent/features/prototypes/FEAT-XXX/`
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
| Maintenance (commit <6mo) | 10         | 6+        |
| Popularity (>1000 stars)  | 10         | 6+        |
| Bundle Size (<100KB gzip) | 10         | 6+        |
| TypeScript Support        | 10         | 8+        |
| Documentation Quality     | 10         | 6+        |
| License (MIT/Apache)      | 10         | 10        |
| Browser Compatibility     | 10         | 8+        |
| Performance (60fps)       | 10         | 6+        |

**Minimum Score: 50/80 to proceed**

### 2.2 Create Research Document

```bash
New-Item -Path ".agent/features/research/FEAT-XXX_[feature_name].md" -ItemType File
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
- [ ] **Legal**: Collects user data? Update `PrivacyPolicy.tsx`

### 6.2 Sovereign Ethics ("Soul Check")

- [ ] **Offline First**: Works if server dies? (Cache/PWA)
- [ ] **No Lock-in**: Can user export their data? (JSON Export)
- [ ] **Human Connection**: Encourages real interaction, not scroll-dopamine?

### 6.3 Strategic Philosophy

- [ ] **Hybrid Choice**: Offer ~3 tiers if trade-offs exist (Cloud vs Local vs Hybrid)
- [ ] **Best Practice**: No "MVP hacks" - Diamond Standard only
- [ ] **Future-Proof**: Design for extensibility

---

## 🛠️ Step 7: Implementation Phases

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
| 🔄 Research    | Investigating libraries/feasibility | `.agent/features/research/` |
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

---

**"Once and we do it right. Best Practice, Always!"** 🎯
