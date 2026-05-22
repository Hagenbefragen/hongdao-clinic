---
description: Sync IDE bug/feature tracker data to the production Kanban dashboard
---

# /synckanban — IDE → Production Kanban Sync

**"Same data in IDE and in Production. Always."**

This workflow syncs `BUG_TRACKER.md` and `FEATURE_REQUEST_TRACKER.md` from your local IDE to the live Bug Bounty Dashboard's Kanban Board tab.

---

## 🏗️ Architecture

```
LOCAL IDE                          PRODUCTION
┌─────────────────────┐           ┌─────────────────────┐
│ BUG_TRACKER.md      │           │ Backend API         │
│ FEATURE_REQUEST_    │  sync →   │ /api/v1/kanban/sync │
│ TRACKER.md          │  (POST)   │ /api/v1/kanban/board│
└─────────────────────┘           └──────────┬──────────┘
                                             │ fetch
                                  ┌──────────▼──────────┐
                                  │ BugBountyDashboard   │
                                  │ → 📋 Kanban Board    │
                                  │    (live tab)        │
                                  └─────────────────────┘
```

---

## ▶️ Quick Sync (One Command)

// turbo

```bash
powershell -File scripts/sync-kanban.ps1
```

This will:

1. Parse all `BUG-XXX` entries from `.agent/bugs/BUG_TRACKER.md`
2. Parse all `FEAT-XXX` entries from `.agent/features/FEATURE_REQUEST_TRACKER.md`
3. POST the combined JSON to `https://app.offlinehumanmode.com/api/v1/kanban/sync`
4. The live dashboard at `app.offlinehumanmode.com/bug-bounty/dashboard` → **📋 Kanban Board** tab updates immediately

---

## 🔧 Local Testing

// turbo

```bash
powershell -File scripts/sync-kanban.ps1 -Local
```

Uses `http://localhost:3000` instead of production.

---

## 📋 When to Trigger

Run this workflow after:

- ✅ Fixing a bug (updating BUG_TRACKER.md)
- ✅ Completing a feature (updating FEATURE_REQUEST_TRACKER.md)
- ✅ After `/bugfix` workflow completes
- ✅ After `/featurerequest` workflow completes
- ✅ Before a demo or review session
- ✅ After deploying (to confirm status alignment)

---

## 🔐 Authentication

The sync uses `APP_SECRET` from your `.env` file as the API key.
The backend validates `x-api-key` header against the same `APP_SECRET`.

---

## 📊 Live Dashboard Access

After sync, the data is visible at:

- **Production**: `https://app.offlinehumanmode.com/bug-bounty/dashboard` → **📋 Kanban Board** tab
- **Local**: `http://localhost:3001/bug-bounty/dashboard` → **📋 Kanban Board** tab

---

## 🔗 Related Files

| File                                                   | Purpose                                         |
| ------------------------------------------------------ | ----------------------------------------------- |
| `scripts/sync-kanban.ps1`                              | PowerShell sync script                          |
| `backend/src/bug-bounty/kanban-sync.controller.ts`     | Backend API (POST sync, GET board, GET metrics) |
| `frontend/components/bugbounty/KanbanBoardTab.tsx`     | React Kanban Board component                    |
| `frontend/components/bugbounty/BugBountyDashboard.tsx` | Parent dashboard (hosts the tab)                |
| `.agent/bugs/BUG_TRACKER.md`                           | Source of truth for bugs                        |
| `.agent/features/FEATURE_REQUEST_TRACKER.md`           | Source of truth for features                    |

---

## 🚀 Related Workflows

- `/bugfix` — After fixing a bug, run `/synckanban` to update the live board
- `/featurerequest` — After completing a feature, run `/synckanban`
- `/deploy` — Include sync as a post-deploy step
- `/comitall` — Commit + sync in one flow

---

**"One source of truth, everywhere."** 📋
