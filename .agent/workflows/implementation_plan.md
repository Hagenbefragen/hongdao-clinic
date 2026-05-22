# /implementation-plan - High-Tech Implementation Strategy Workflow

**Trigger:** `/implementation-plan`
**Purpose:** Generate Best-Practice compliant implementation plans that automatically incorporate advanced UI/UX, Color Theory, and Dark Mode standards without needing explicit reminders.

**"Cutting Edge by Default."**

---

## 🏗️ 1. Architecture & Tech Stack (The "Turbo" Foundation)

**Automatically Include:**
*   **Database**: TypeORM Entities with strict typing.
*   **State Management**: React Context or Zustand (No Redux unless validated).
*   **Performance**: Redis Caching for hot data.
*   **Security**: RLS (Row Level Security) or API Guards by default.
*   **Philosophy**: **Hybrid Choice** (Users get ~3 trade-off tiers) & **Future-Proof** (No hacks).

---

## 🎨 2. Design System Integration (Auto-Optimized)

**Every Plan MUST cite these standards:**

### 2.1 Visual Aesthetics (`@[/uioptimizer]` & `@[/color]`)
*   **Glassmorphism**: Use `backdrop-blur-md bg-white/10` for panels.
*   **Pastel Palette**: Use `blue`, `violet`, `pink` pastels for backgrounds/accents.
*   **Animations**: `framer-motion` for all entrances (`initial={{opacity: 0}} animate={{opacity: 1}}`).
*   **Gradients**: Subtle radial gradients for depth (`bg-gradient-to-br from-blue-500/20 to-purple-500/20`).

### 2.2 Dark Mode Native (`@[/darkmode]`)
*   **Text**: ALWAYS specify `dark:text-gray-100` alongside `text-gray-900`.
*   **Backgrounds**: `dark:bg-gray-900` or `dark:bg-slate-900`.
*   **Borders**: `border-gray-200 dark:border-gray-700`.

### 2.3 Responsiveness
*   **Mobile-First**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
*   **Touch Targets**: Minimum `h-12` (48px) for buttons on mobile.

---

## 📝 3. The Implementation Plan Template

When triggered, generate the plan using this structure:

```markdown
# [Feature Name] Implementation Plan

## 1. 🎯 Objective
[Clear goal]

## 2. 📱 UI/UX Strategy (Premium)
*   **Visuals**: Glassmorphism cards with pastel galaxy backgrounds.
*   **Interactions**: Micro-animations on hover/click.
*   **Dark Mode**: Fully compliant contrast ratios.

## 3. 🛡️ Architectural Standards (Pre-Check)

### 3.1 Authentication & Portals (`@[/newportal]` & `@[/sso_seamless]`)
If this plan involves a **New Page** or **Portal** (e.g., `bounties/`):
*   **Dual-Auth Supported**: Must support JWT AND Wallet-based Auth (`newportal`).
*   **SSO Ready**: Must use `SparkSyncBridge` and `auth_token` handoff for seamless login (`sso_seamless`).
*   **Entity Check**: Ensure `ownerWalletAddress` is stored alongside `ownerId`.
*   **CORS**: Add domain to backend `main.ts` whitelist.

### 3.1.2 VC & Streaming Features (`@[/vcplugin]`)
If this plan involves **Video Conference** or **Streaming**:
*   **No Core Edits**: NEVER modify `VCView.tsx` or `StreamView.tsx` in `frontend/core`.
*   **Plugin Architecture**: Must use the `VCPlugin` interface (`frontend/plugins`).
*   **Registry**: Register new features in `frontend/plugins/index.ts`.

### 3.2 ⚖️ Business & Legal Checks (Diamond Standard)
*   **Monetization**:
    *   **XOM Preference**: ALWAYS prioritize "Pay-per-Use" (XOM) over Monthly Subscription.
        *   *Fairness*: User pays only for what they use. Zero cost on holidays.
        *   *Exchange*: Reference XOM ≈ 0.12 USDC (0.10 EUR). Monitor BRICS rates.
    *   **Comparison**: Show "Monthly SaaS Price" vs "XOM Pay-as-you-go" on landing pages.
*   **Legal**: Does this collect user data? If YES, update `PrivacyPolicy.tsx` immediately.
*   **Treasury**: All XOM transactions flow via `XomBankService` (No manual increments).

### 3.3 🦋 Sovereign Ethics (The "Soul" Check)
*   **Offline First**: Does this work if the server dies? (Cache/PWA).
*   **No Lock-in**: Can the user export their data? (JSON Export).
*   **Human Connection**: Does this encourage *real* interaction, or just scroll-dopamine?

### 3.4 Technical Architecture
[Entities, APIs, Services]

### 3.5 🧠 Strategic Philosophy (Hybrid & Future-Proof)
*   **Hybrid Choice**: usage of ~3 Tiers (e.g. Cloud vs Local vs Hybrid) if trade-offs exist.
*   **Best Practice**: No "MVP hacks". Implement the "Diamond Standard" (`@[/bestpractice]`).
*   **Universality**: Design for the "Best of All Universes" (Secure AND Convenient).

### 3.6 🛠️ Admin Panel Governance (`@[/admin_app]`)
**CRITICAL**: Any feature with adjustable parameters MUST expose them in the Admin Panel.
*   **Parameters Section**: If this feature has tunable values (e.g., `minBid`, `rewardMultiplier`, `trustThreshold`), add them to `AdminTab.tsx` → **Parameters Panel**.
*   **Pricing Section**: If this feature has pricing (e.g., `pricePerMinute`, `nftMintCost`), add to **Pricing Panel** (`AdminPricingPanel.tsx`).
*   **DAO-Ready**: All exposed parameters MUST be exportable to JSON for future DAO proposal voting.
*   **No Hardcoding**: NEVER hardcode magic numbers in business logic. Use `governanceService.getParameter('key')` pattern.
*   **Audit Trail**: Parameter changes MUST be logged with `changedBy`, `oldValue`, `newValue`, `timestamp`.

### 3.7 📜 IP/Patent & Originality Check (The "Genuine Innovation" Rule)
**CRITICAL**: OHM always creates **genuine solutions** inspired by best practices, NEVER copies patented implementations.

*   **No Library Lock-in**: If using open-source libraries with restrictive licenses (GPL, AGPL), document obligations.
*   **Protocol Inspiration vs. Copy**:
    *   ✅ GOOD: "OHM uses X25519 key agreement and AES-256-GCM (public standards)"
    *   ❌ BAD: "OHM uses libsignal-protocol-javascript" (third-party implementation)
*   **Cryptographic Primitives**: Always use **Web Crypto API** or battle-tested WASM implementations of public algorithms (NaCl, libsodium concepts).
*   **Patent Check**: Before implementing advanced features, ask:
    *   Is this algorithm patented? (e.g., some DRM, compression, ML techniques)
    *   Can we achieve similar results with public-domain alternatives?
    *   Document the inspiration source and our differentiation.
*   **OHM-Native Rule**: All core security features must be:
    *   Built on **open standards** (IETF RFCs, W3C specs)
    *   Implemented using **standard browser APIs** (Web Crypto, IndexedDB)
    *   **Customized for OHM's needs** (not a direct fork)
*   **Attribution**: If inspired by another project, add comment: `// Inspired by [Project], adapted for OHM with [our innovation]`

### 3.8 🤖 AI Service Strategy (`@[/ai_strategy]`)
**CRITICAL**: Any feature using AI MUST follow the 3-Tier model for sustainability and sovereignty.

*   **Tier 1 - BYOK (Bring Your Own Key)**: User provides their own API key (Gemini, OpenAI).
    *   Enable Google OAuth for Gemini access
    *   Keys stored ONLY in user's browser (encrypted)
    *   OHM charges nothing for AI usage
*   **Tier 2 - OHM-Hosted AI**: OHM provides the API with **2x markup**.
    *   Provider Cost × 2.0 = User Price
    *   Payment in XOM tokens
    *   Guaranteed 50% profit margin
*   **Tier 3 - Local AI (Ollama)**: Maximum privacy, runs on user's device.
    *   Zero external API calls
    *   Supports Llama 3, Mistral, LLaVA
    *   Perfect for "Ghost Mode" users

**Mandatory UI:**
*   AI Provider Selection before first use
*   Cost transparency modal before expensive operations
*   Usage dashboard in user profile
*   Billing integration with `XomBankService`
*   **Legacy Model**: Deprecate any "subscription only" AI models.

### 3.9 🧪 Synergetic Testing Ecosystem (`@[docs/AS_BUILD/06_Testing/SYNERGETIC_TESTING_ECOSYSTEM_PLAN.md]`)
**CRITICAL**: All new features must be "Self-Healing Ready".
*   **Test Case Overlay**: Does this feature support the `TestOverlayPlugin`? (User sees what to test).
*   **Bug Reporting**: Ensure `BugBountyPlugin` can capture state/screenshots from this feature.
*   **Automated Verification**: Define a `Browser_Test_Script` case that the Agent can run autonomously at Hetzner.
*   **Bounty Ready**: Allocate a XOM Budget for community testing/verification.

### 3.10 🔄 Auto-Evolution & Plugin Architecture (Sigi Standard)
**CRITICAL**: All new modules must be designed for "Unattended Upgrades".
*   **Plugin-First**: Build features as isolated plugins (`/plugins/auto/`).
*   **Version-Agnostic**: Code must handle "hot-swapping" (e.g., `dwg-parser-v2` replaces `v1` without restart).
*   **Meta-Data**: Every plugin needs a `manifest.json` compatible with the `Plugin-Updater-Sigi` schema.
    ```json
    { "id": "my-plugin", "compatibility": ["Llama-3.1", "Phi-3"], "license": "MIT" }
    ```
*   **Self-Test**: Include a smoke-test function `run_diagnostics()` that Sigi can call in quarantine.

### 3.11 🦋 Sovereign Best Practices (Deep Code)
*   **Data Exile Prevention**: NEVER store encrypted user data on 3rd-party clouds without Owner Key encryption.
*   **Graceful Degradation**:
    *   *Cloud Down?* → Switch to Local LLM (Phi-3).
    *   *DB Down?* → Switch to SQLite mirror.
    *   *Net Down?* → Full PWA Offline Mode.
*   **Human-in-the-Loop**: Large financial tx (>10 XOM) or sensitive "Learnings" require manual Git-Pull approval.

## 4. 📅 Phase Roadmap
*   Phase 1: Database & Core Logic
*   Phase 2: UI Components (Mobile Responsive)
*   Phase 3: Integration & Polish

## 5. ✋ Manual Tasks Protocol
If any step requires manual intervention (API keys, 3rd party signups, hardware interaction):
1.  **Create/Update**: `Documentation/Manuals/ToDoManual.md`.
2.  **Log Task**: Add a checkbox `[ ]` with clear instructions.
3.  **Reference**: Link to this manual in the plan.
*   Phase 4: Auto-Evolution (Sigi Integration) - Optional
```

---

## 5. 📚 Documentation Standard (`@[/documentation]`)

**Final Step:** Every plan MUST end with a "Documentation Check" reminder.
1.  **Save** to `docs/AS_BUILD/[Category]/[Feature_Name].md`.
2.  **Link** in `docs/00_INDEX.md`.
3.  **Propose** the first step immediately.

## 6. 🔄 Lifecycle Management

Plans are living documents. You must update their **Status** field as you work.

*   **DRAFT**: Initial creation.
*   **ACTIVE**: Development in progress. Update the roadmap checkboxes `[x]` as you go.
*   **REVIEW**: When ALL phases are `[x]`, move file to `docs/REVIEW/` for audit.
*   **AS_BUILD**: After approval, move final spec back to `docs/AS_BUILD/`.

**Rule:** `docs/AS_BUILD` reflects *reality*, not dreams. `DRAFT` reflects *dreams*.

## 7. 🧪 Final Verification (The "Diamond" Polish)

**Must execute in order:**
1.  **Code Integrity**: Run `@[/codetest]` to ensure build stability (Zero Tolerance).
2.  **Test Planning**: Use `@[/addtestcase]` to define acceptance criteria in `Browser_Test_Script.md`.
3.  **Browser Validation**: Run `@[/browsertest]` (Autonomous) to verify the UI.

**"From Idea to Bulletproof Deployment."**
