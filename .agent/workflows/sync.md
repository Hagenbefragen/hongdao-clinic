---
description: Sync Knowledge Items and Brain between local machine and Hetzner server
---

# /sync - Brain & Knowledge Sync Workflow

**Sync your local brain (KIs + conversations) to the Hetzner server so Antigravity there has full context.**

## Architecture

```
LOCAL MACHINE (Windows)                    HETZNER SERVER (Linux)
┌─────────────────────────────┐            ┌─────────────────────────────┐
│ ~/.gemini/antigravity/      │            │ ~/.gemini/antigravity/      │
│   ├── knowledge/ (11 KIs)   │◄──────────►│   ├── knowledge/ (11 KIs)   │
│   └── brain/ (60 convos)    │◄──────────►│   └── brain/ (text only)    │
├─────────────────────────────┤            ├─────────────────────────────┤
│ C:\OHM\.agent/              │            │ /root/ohm-live/.agent/      │
│   ├── workflows/ (55)       │──git push──│   ├── workflows/ (55)       │
│   ├── skills/ (18)          │──git push──│   ├── skills/ (18)          │
│   └── features/             │──git push──│   └── features/             │
└─────────────────────────────┘            └─────────────────────────────┘
```

**Knowledge Items:** Synced via Git (through `.agent/knowledge/`)
**Brain (conversations):** Synced via SCP directly (text files only, skips screenshots/videos)
**Workflows/Skills:** Already in Git repo, auto-deployed on `git push`

---

## 🔄 PUSH: Local → Hetzner (Most Common)

### Step 1: Sync Knowledge Items (via Git)

// turbo

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; powershell -File c:\OHM\.agent\scripts\sync-knowledge.ps1
```

Then push:

// turbo

```powershell
cd c:\OHM ; git push sovereign main ; git push origin main
```

### Step 2: Sync Brain Conversations (text only, ~1.6MB)

// turbo

```powershell
powershell -File c:\OHM\.agent\scripts\sync-brain.ps1 -Direction Push
```

---

## 🔽 PULL: Hetzner → Local

### Step 1: Pull Knowledge Items (via Git)

// turbo

```powershell
cd c:\OHM ; git pull origin main
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; powershell -File c:\OHM\.agent\scripts\sync-knowledge.ps1 -Pull
```

### Step 2: Pull Brain Conversations from Hetzner

// turbo

```powershell
powershell -File c:\OHM\.agent\scripts\sync-brain.ps1 -Direction Pull
```

---

## 🔁 FULL SYNC: Both Directions

// turbo

```powershell
powershell -File c:\OHM\.agent\scripts\sync-brain.ps1 -Direction Full
```

This does:

1. Push local KIs → Hetzner
2. Push local Brain → Hetzner (text only)
3. Pull new Hetzner Brain → Local (if Antigravity on server created new conversations)

---

## Quick Reference

| Command                          | What it does                             |
| -------------------------------- | ---------------------------------------- |
| `sync-knowledge.ps1`             | Push local KIs to Git repo + auto-commit |
| `sync-knowledge.ps1 -DryRun`     | Preview only, no changes                 |
| `sync-knowledge.ps1 -Pull`       | Pull repo KIs to local                   |
| `sync-brain.ps1 -Direction Push` | Push local brain to Hetzner (text only)  |
| `sync-brain.ps1 -Direction Pull` | Pull Hetzner brain to local              |
| `sync-brain.ps1 -Direction Full` | Bidirectional sync                       |

---

## Notes

- **Brain sync skips media files** (`.png`, `.webp`, `.jpg`, `.mp4`, `.webm`, `.gif`) — these are 5.3GB+ of screenshots/recordings
- Text-only brain is ~1.6MB and syncs in seconds
- Knowledge Items sync via Git repo (`.agent/knowledge/`), Brain syncs via SCP directly
- Uses SSH key: `c:\OHM\ohm_deploy_key`
- Server path: `root@78.46.219.101:~/.gemini/antigravity/`
