---
description: Upgrade MainLayout to Plugin Architecture (Phase 2)
---

# Upgrade Shell Workflow

This workflow guides the refactoring of the monolithic `MainLayout.tsx` into a modular Plugin Shell.

## Step 1: Foundation
1. Create directory `frontend/lib/app-plugin-system/`.
2. Define `AppPlugin` interface in `types.ts`.
   - Should include: `id`, `label`, `icon`, `render()`.
3. Implement `AppPluginRegistry` in `registry.ts`.

## Step 2: Plugin Migration (Iterative)
1. **Chat Tab:**
   - Create `frontend/plugins/app-chat/index.tsx`.
   - Wrap `ChatTab` component in `AppPlugin`.
   - Register it in `App.tsx` or `SystemBoot.ts`.
2. **Profile Tab:**
   - Create `frontend/plugins/app-profile/index.tsx`.
   - Wrap `ProfileTab`.
3. **Repeat** for other tabs.

## Step 3: Shell Refactoring
1. Open `frontend/components/MainLayout.tsx`.
2. Replace the hardcoded `switch (activeTab)` with:
   ```typescript
   const plugin = registry.get(activeTab);
   return plugin ? plugin.render() : <NotFound />;
   ```
3. Update specific "Icon Sidebar" logic to iterate over `registry.getAll()`.

## Step 4: Verification
1. Run application.
2. Verify all tabs load correctly.
3. Check bundle size (optional).

## Step 5: Cleanup
1. Remove old hardcoded imports in `MainLayout.tsx`.
