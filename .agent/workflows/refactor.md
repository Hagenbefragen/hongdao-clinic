---
description: Safe, modular refactoring workflow for large monolithic components
---

# /refactor - Safe Modular Refactoring Workflow

> **🧠 SKILL REQUIRED:** Before executing this workflow, read the **Refactor Surgeon** skill at `.agent/skills/refactor_surgeon/SKILL.md` for complexity metrics, domain identification methodology, extraction patterns (hook, component, plugin), and safety protocol.

**Philosophy:** "Measure twice, cut once. Refactor in small, testable increments."

// turbo-all

## 🏆 Success Story: MainLayout (2026-01-09)
**Before:** 1523 lines, 33 useState hooks, 19 render branches
**After:** 1316 lines (~14% reduction), plugin-based routing
**Location:** `frontend/components/MainLayout/routing/plugins/`
See: `docs/refactors/MAINLAYOUT_AUDIT.md`

---

## Phase 0: Pre-Flight Safety Check

### 0.1 Backup & Branch
```bash
git stash push -m "pre-refactor-$(date +%Y%m%d)"
git checkout -b refactor/[component-name]
```

### 0.2 Document Current State
Before ANY changes, create an audit document:

```markdown
# Refactor Audit: [ComponentName]

## Current Stats
- **File Size**: [X] lines / [Y] bytes
- **Imports**: [count]
- **useState Hooks**: [count]
- **useEffect Hooks**: [count]
- **Helper Functions**: [count]
- **Render Branches**: [count] (if/else blocks returning JSX)

## Identified Problems
1. [Problem 1]
2. [Problem 2]

## Proposed Architecture
[Diagram or description]
```

### 0.3 Verify Build Passes
```bash
cd frontend && npm run build
```
**STOP if build fails. Fix errors first.**

---

## Phase 1: Analysis & Planning

### 1.1 Identify Logical Domains
Group related code into "domains" that could become separate modules:

| Domain | Lines | Description | Target Module |
|--------|-------|-------------|---------------|
| Auth/SSO | X-Y | Token sync, login checks | `hooks/useAuthRouting.ts` |
| Routing | X-Y | URL parsing, deep links | `hooks/useDeepLinkRouter.ts` |
| Modals | X-Y | Modal state management | `hooks/useModalState.ts` |
| Theme | X-Y | Dark mode, preferences | `hooks/useTheme.ts` |

### 1.2 Map Dependencies
For each domain, list:
- What context values it READS
- What context values it WRITES
- What props it needs from parent
- What it renders

### 1.3 Define Plugin Interfaces (If Applicable)
If the component manages "views" or "tabs", define a plugin interface:

```typescript
// types/routing-plugin.ts
export interface RoutingPlugin {
    id: string;
    priority: number; // Lower = checked first
    shouldHandle: (ctx: RoutingContext) => boolean;
    render: () => React.ReactNode;
}
```

---

## Phase 2: Extract Hooks (Low Risk)

**Rule:** Extract hooks FIRST. They are the safest refactor.

### 2.1 Create Hook File
```bash
mkdir -p frontend/components/[component]/hooks
touch frontend/components/[component]/hooks/use[Domain].ts
```

### 2.2 Move Logic
1. Copy the `useState` + `useEffect` + helper functions for ONE domain
2. Return an object with the state values and handlers
3. Import and use the hook in the original component
4. **TEST IMMEDIATELY** - verify no regression

### 2.3 Repeat for Each Domain
Do NOT batch. Extract one hook, verify, commit, then next.

```bash
git add -A && git commit -m "refactor([component]): Extract use[Domain] hook"
```

---

## Phase 3: Extract Sub-Components (Medium Risk)

### 3.1 Identify Render Blocks
Look for:
- Large JSX blocks returned inside `if` statements
- Repeated UI patterns (modals, overlays)
- Self-contained UI with local state

### 3.2 Create Component Files
```bash
mkdir -p frontend/components/[component]/components
touch frontend/components/[component]/components/[SubComponent].tsx
```

### 3.3 Extract Pattern
```typescript
// BEFORE (in MainLayout)
if (showModal) {
    return (
        <div className="modal">
            <h1>Title</h1>
            {/* 50 lines of JSX */}
        </div>
    );
}

// AFTER
// components/MyModal.tsx
export const MyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="modal">...</div>
);

// MainLayout.tsx
if (showModal) return <MyModal onClose={() => setShowModal(false)} />;
```

### 3.4 Pass Props Explicitly
**Never rely on context inside extracted components unless absolutely necessary.**
Pass required data as props for clarity and testability.

---

## Phase 4: Implement Plugin Pattern (High Impact)

### 4.1 Create Registry
```typescript
// lib/[component]-plugin-system/registry.ts
import { RoutingPlugin } from './types';

class RoutingPluginRegistry {
    private plugins: RoutingPlugin[] = [];
    
    register(plugin: RoutingPlugin) {
        this.plugins.push(plugin);
        this.plugins.sort((a, b) => a.priority - b.priority);
    }
    
    findHandler(ctx: RoutingContext): RoutingPlugin | undefined {
        return this.plugins.find(p => p.shouldHandle(ctx));
    }
}

export const routingRegistry = new RoutingPluginRegistry();
```

### 4.2 Create Plugins for Each Route/View
```typescript
// plugins/routing/stream-guest.plugin.ts
import { routingRegistry } from '../../lib/routing-plugin-system/registry';

routingRegistry.register({
    id: 'stream-guest',
    priority: 10,
    shouldHandle: (ctx) => !!ctx.activeStreamWatchId && !!ctx.currentUser,
    render: () => <StreamGuestView roomId={ctx.activeStreamWatchId} />
});
```

### 4.3 Replace Switch/If Chains
```typescript
// BEFORE
if (condition1) return <View1 />;
if (condition2) return <View2 />;
if (condition3) return <View3 />;
// ... 20 more conditions

// AFTER
const handler = routingRegistry.findHandler(routingContext);
if (handler) return handler.render();
return <DefaultView />;
```

---

## Phase 5: Cleanup & Validation

### 5.1 Remove Dead Code
- [ ] Delete commented-out blocks
- [ ] Remove unused imports (use IDE "Organize Imports")
- [ ] Delete orphaned helper functions

### 5.2 Add Documentation
```typescript
/**
 * MainLayout - Core application shell
 * 
 * Architecture:
 * - Routing: Handled by RoutingPluginRegistry (see plugins/routing/)
 * - Auth: Managed by useAuthRouting hook
 * - Modals: Managed by useModalState hook
 * 
 * To add a new route/view:
 * 1. Create plugin in plugins/routing/
 * 2. Register in bootstrap.ts
 * 3. No changes needed to this file
 */
```

### 5.3 Final Verification
```bash
# Build check
npm run build

# Type check
npx tsc --noEmit

# Visual regression (manual)
# Test all major flows: Login, Logout, each tab, each modal
```

### 5.4 Commit & Merge
```bash
git add -A && git commit -m "refactor(MainLayout): Complete modular restructure"
git checkout main
git merge refactor/[component-name] --no-ff
```

---

## Refactoring Checklist

### Pre-Refactor
- [ ] Build passes
- [ ] Audit document created
- [ ] Branch created

### During Refactor
- [ ] One domain extracted at a time
- [ ] Test after EACH extraction
- [ ] Commit after EACH successful extraction

### Post-Refactor
- [ ] Original file < 500 lines (or justified)
- [ ] All functionality preserved
- [ ] No console errors
- [ ] Mobile/Desktop both work
- [ ] Documentation added

---

## Red Flags During Refactor

🚩 **STOP if you see:**
- Build errors after extraction → Revert, debug
- Runtime errors in browser → Check prop passing
- Missing functionality → Hook dependency missing
- Circular imports → Restructure module boundaries

---

## Anti-Patterns to Avoid

❌ **Don't:**
- Refactor multiple domains simultaneously
- Delete code before confirming new code works
- Skip the audit document
- Rush the process

✅ **Do:**
- Small, incremental changes
- Verify after every change
- Keep old code until new code is proven
- Document architectural decisions
