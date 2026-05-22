---
description: Branch & Commit Strategy — single-branch sovereign model
---

# 🌿 OHM Branch & Commit Strategy

// turbo-all

## 🎯 The Rule: ONE Branch — `main`

OHM uses a **single-branch model**. All work happens on `main`. No feature branches, no develop, no staging.

### Why?
- Solo/small team — branching adds overhead with no benefit
- `deploy.ps1` pushes `HEAD:main` → server builds from `main`
- Feature branches rot and cause merge hell
- Sovereign deployment = push directly to production

## 📍 Remotes

| Remote | URL | Purpose |
|--------|-----|---------|
| `sovereign` | `188.245.235.51:/root/git/ohm.git` | **Production** — triggers build |
| `origin` | `github.com/Hagenbefragen/OHM.git` | **Backup** — mirror only |

## 🚀 Deployment Flow

```
1. Code on local `main`
2. git add -A ; git commit -m "type(scope): description"
3. powershell -ExecutionPolicy Bypass -File deploy.ps1
   → pushes HEAD:main to sovereign (triggers build)
   → pushes HEAD:main to origin (backup)
```

### ⚠️ NEVER DO:
- ❌ `git push sovereign HEAD:master` — server ignores master!
- ❌ Create feature branches unless explicitly needed for experiments
- ❌ Push to origin without also pushing to sovereign

## 📝 Commit Message Format

```
type(scope): short description

Types:
  feat     — New feature
  fix      — Bug fix
  refactor — Code restructuring
  chore    — Config, deps, cleanup
  docs     — Documentation only
  test     — Test additions
  style    — CSS/UI only changes

Scope examples:
  stream, paradise, backend, auth, deploy, mobile

Examples:
  feat(stream): add room claim USDC pricing
  fix(paradise): BUG-324 black-on-black title
  chore(deploy): branch cleanup
```

## 🧹 Branch Cleanup Protocol

Run periodically (monthly or after major deploys):

```powershell
# 1. Check for stale local branches
git branch --list

# 2. Delete merged/old local branches (keep only main)
git branch -D <branch-name>

# 3. Clean server branches
git push sovereign --delete <branch-name>

# 4. Clean GitHub branches
git push origin --delete <branch-name>

# 5. Prune stale remote tracking refs
git remote prune sovereign
git remote prune origin
```

### Branches to NEVER delete:
- `main` (production)

### Branches safe to delete:
- Any `feature/*` branch already merged
- Any `edit/*` auto-generated branch
- Old experiment branches (OHM-ELWMS, OHMAvatar, etc.)

## 🔄 Emergency Rollback

If a deploy breaks production:

```powershell
# 1. Find the last good commit
git log --oneline -10

# 2. Reset to it
git reset --hard <good-commit-hash>

# 3. Force push
git push sovereign HEAD:main --force

# 4. Verify
curl -s https://app.offlinehumanmode.com/api/health
```

## 📋 Pre-Deploy Checklist

1. `git status` — clean working directory?
2. `git log --oneline -3` — commits look right?
3. `git branch --show-current` — on `main`?
4. Run `deploy.ps1` — NEVER manual `git push`
