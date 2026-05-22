---
description: Add the last fix/feature to the Validation Queue for crowd verification
---

# /validation - Validation Bounty Workflow

// turbo-all

## 🎯 Overview

The Validation Bounty system lets the community verify that deployed fixes and features actually work in production. Every time you trigger this workflow, the most recently deployed fix/feature is added to the Validation Queue with clear reproduction steps.

**Difference from Bug Bounty:**
- **Bug Bounty** = Find NEW bugs → Report → Get paid
- **Validation Bounty** = Verify DEPLOYED FIXES work → Confirm → Get paid

---

## 🚀 When Triggered

### Step 1: Identify the Last Deployed Fix/Feature

```powershell
# Check the last 3 commits for context
git log -n 3 --oneline
```

### Step 2: Read Current Validation Queue

```powershell
cat .agent/validation/VALIDATION_QUEUE.md | Select-Object -First 10
```

### Step 3: Get Next VAL-ID

Find the highest VAL-XXX number in the queue and increment by 1.

### Step 4: Create Validation Entry

Add a new entry to `.agent/validation/VALIDATION_QUEUE.md` under `## 📋 Pending Validation` with this template:

```markdown
- [ ] **VAL-XXX: [Short Description] ([BUG/FEAT-ID])** 🔴/🟠/🟡/🟢 [SEVERITY]
  - **Type:** Bug Fix Validation / Feature Validation / Auth Validation / General Validation
  - **Deployed:** [Date Time]
  - **Fix Summary:** [1-2 sentence description of what was fixed/added]
  - **Files Changed:** [List of key files]
  - **Validation Steps:**
    1. [Step 1 - Navigate to ...]
    2. [Step 2 - Perform action ...]
    3. [Step 3 - Check result ...]
  - **Expected Result:** [What should happen if the fix works]
  - **Reward:** [XOM amount] (validation) + [XOM amount] (if regression found)
  - **Max Validators:** 3
  - **Claimed By:** 0
  - **Status:** 🔍 AWAITING VALIDATION
```

### Step 5: Update Stats

Update the stats table at the bottom of VALIDATION_QUEUE.md.

### Step 6: Update Dashboard Data

If the dashboard component exists (`frontend/components/marketing/BugBountyDashboard.tsx`), update the mock data to include the new validation item as a verification task.

### Step 7: Commit

```powershell
git add -A ; git commit -m "validation(VAL-XXX): Add [description] to validation queue"
```

---

## 🏷️ Validation Types (Maps to Feedback Types)

| Type | Icon | Description | Reward |
|------|------|-------------|--------|
| **Bug Fix Validation** | 🐛 | Verify a deployed bug fix works | 50-100 XOM |
| **Feature Validation** | ✨ | Verify a new feature works as designed | 75-150 XOM |
| **Auth & Billing** | 🔐 | Verify auth/billing changes are correct | 100-200 XOM |
| **General Validation** | 📋 | General UX/UI verification | 25-50 XOM |

---

## 🔄 Validation Lifecycle

```
1. Fix Deployed → Antigravity adds to Validation Queue (/validation)
2. Validator logs in → Opens Dashboard → Sees "Needs Validation" tab
3. Validator claims a task (max 3 per task)
4. Validator follows steps → Reports result (✅ Pass / ❌ Regression)
5. If ✅: Validator earns XOM reward
6. If ❌: Validator earns BONUS XOM + new bug auto-created in BUG_TRACKER
7. After 3 validations: Task moves to "Validated" section
```

---

## 📁 File Locations

| File | Purpose |
|------|---------|
| `.agent/validation/VALIDATION_QUEUE.md` | Central validation queue |
| `.agent/bugs/BUG_TRACKER.md` | Bug tracker (regressions go here) |
| `.agent/workflows/bugbounty.md` | Bug bounty workflow (sister workflow) |
| `frontend/components/marketing/BugBountyDashboard.tsx` | Dashboard UI |

---

_Workflow created 2026-02-10 for OHM Validation Bounty Program_
