---
description: Commit all changes, push to Hetzner (sovereign) first, then sync to GitHub
---

# /comitall — Sovereign-First Git Commit & Push

## 🚨 THIS IS THE ONLY WAY TO COMMIT

**NEVER use raw `git commit` or `git push` outside this workflow.**
**NEVER call `git commit` without `--no-verify`.**
**This workflow is the SINGLE SOURCE OF TRUTH for all git operations.**

**RULES:**

- Use `;` as command separator (NOT `&&` — PowerShell doesn't support it)
- Push to **Hetzner (sovereign)** FIRST — it's our sovereign infrastructure
- Then sync to **GitHub (origin)** as a mirror/backup
- **ALWAYS** use `--no-verify` to avoid hook hangs
- **NEVER** use raw `git commit` or `git push` — always go through this workflow
- If git hangs: `taskkill /F /IM git.exe` then `Remove-Item -Force "c:\OHM\.git\index.lock"`

// turbo-all

## Steps

### 1. Kill any stuck git processes (safety net)

```bash
taskkill /F /IM git.exe 2>$null; Remove-Item -Force "c:\OHM\.git\index.lock" -ErrorAction SilentlyContinue; echo "GIT_CLEAN"
```

### 2. Stage all changes

```bash
cd c:\OHM; git add -A
```

### 3. Commit with message

```bash
cd c:\OHM; git commit --no-verify -m "<COMMIT_MESSAGE>"
```

Replace `<COMMIT_MESSAGE>` with the provided or auto-generated commit message.

### 4. Push to Hetzner FIRST (sovereign remote)

```bash
cd c:\OHM; git push --no-verify sovereign main:master
```

This is the PRIMARY push target. Hetzner is our sovereign infrastructure.
Wait for this to complete and confirm success before proceeding.

### 5. Sync to GitHub (mirror/backup)

```bash
cd c:\OHM; git push --no-verify origin main
```

This is the SECONDARY push. GitHub is a backup mirror only.

## Anti-Hang Protocol

If ANY git command hangs for more than 30 seconds:

1. `taskkill /F /IM git.exe`
2. `Remove-Item -Force "c:\OHM\.git\index.lock" -ErrorAction SilentlyContinue`
3. Retry the command

## Notes

- If the commit hangs, check if a large binary file is staged (use `git status` first)
- Never stage `.zip`, `.tar.gz`, or `node_modules/` — add to `.gitignore`
- If push to sovereign fails, DO NOT push to GitHub — fix sovereign first
- The `sovereign` remote is: `root@188.245.235.51:/root/git/ohm.git`
- The `origin` remote is: `https://github.com/Hagenbefragen/OHM.git`
