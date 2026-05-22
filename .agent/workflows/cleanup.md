# /cleanup - Safe Code Cleanup Sprint Workflow

**"Clean code is professional code."**

// turbo-all

## 🎯 Purpose

Remove tech debt, fix lint errors, and improve code quality WITHOUT breaking the running system.

---

## ⚠️ CRITICAL SAFETY RULES

1. **BUILD FIRST**: Before any cleanup, verify existing build passes: `npm run build`
2. **ONE FILE AT A TIME**: Never batch cleanup multiple files without intermediate builds
3. **INCREMENTAL COMMITS**: Commit after each successful file cleanup
4. **PRESERVE FUNCTIONALITY**: Cleanup is COSMETIC only - no logic changes
5. **ROLLBACK READY**: If build fails, `git checkout -- <file>` immediately

---

## Workflow Steps

### 1. Pre-Flight Check

// turbo

```bash
cd backend && npm run build
```

// turbo

```bash
cd frontend && npm run build
```

**If builds fail BEFORE cleanup, STOP. Fix build first.**

### 2. Identify Cleanup Targets

Run linter to get error list:
// turbo

```bash
cd backend && npm run lint 2>&1 | head -100
```

// turbo

```bash
cd frontend && npm run lint 2>&1 | head -100
```

### 3. Cleanup Categories (Priority Order)

| Priority | Category               | Safe?    | Example                                           |
| -------- | ---------------------- | -------- | ------------------------------------------------- |
| 🟢 1     | Unused imports         | ✅ SAFE  | Remove `import { BadRequestException }` if unused |
| 🟢 2     | Indentation/Formatting | ✅ SAFE  | 4-space → 2-space                                 |
| 🟢 3     | Trailing whitespace    | ✅ SAFE  | Remove trailing spaces                            |
| 🟡 4     | Unused variables       | ⚠️ CHECK | May be used dynamically                           |
| 🔴 5     | Type changes           | ❌ RISKY | May change behavior                               |

### 4. Safe Cleanup Pattern

For EACH file:

```
1. View file, identify lint issues
2. Make ONLY formatting/cosmetic changes
3. Save file
4. Run: npm run build
5. If SUCCESS: git add <file> && git commit -m "chore(cleanup): format <file>"
6. If FAIL: git checkout -- <file> && investigate
```

### 5. Batch Formatting (ESLint Auto-Fix)

For files with only formatting issues (not logic):
// turbo

```bash
cd backend && npx eslint src/vc/vc.service.ts --fix
```

**Verify build after EVERY --fix run!**

### 6. Post-Cleanup Verification

// turbo

```bash
cd backend && npm run build
```

// turbo

```bash
cd frontend && npm run build
```

// turbo

```bash
git status
```

---

## Common Fixes Cheatsheet

### Remove Unused Import

```typescript
// BEFORE
import { Injectable, BadRequestException } from "@nestjs/common";
// 'BadRequestException' is defined but never used

// AFTER
import { Injectable } from "@nestjs/common";
```

### Fix Indentation (4-space → 2-space)

Use IDE auto-format or ESLint --fix

### Remove Trailing Whitespace

```bash
# PowerShell one-liner (Windows)
(Get-Content file.ts) | ForEach-Object { $_.TrimEnd() } | Set-Content file.ts
```

---

## 🚨 What NOT To Do During Cleanup

❌ Change function signatures
❌ Rename variables
❌ Refactor logic
❌ Add new features
❌ Delete "unused" code that may be used dynamically
❌ Batch multiple files without intermediate builds

---

## Session End Checklist

- [ ] All builds pass
- [ ] All changes committed
- [ ] No uncommitted cleanup work
- [ ] Linter errors reduced (log before/after count)
