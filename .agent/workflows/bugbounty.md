---
description: Bug Bounty Program - How to run bug hunting sessions with friends
---

# /bugbounty - Bug Bounty Program Guide

// turbo-all

## 🎯 Overview

The OHM Bug Bounty Program lets your friends help find and report bugs via screen sharing sessions. You host VC rooms where hunters share their screen, describe bugs, and earn XOM rewards.

---

## 🚀 Quick Start (For You - The Host)

### Step 1: Invite Friends to Landing Page

```
https://app.offlinehumanmode.com/bug-bounty
```

Share this URL with friends who want to participate.

### Step 2: Start a Bug Bounty Session

1. **Create VC Room** at `https://stream.offlinehumanmode.com/studio`
2. **Name it:** "Bug Bounty Session [DATE]"
3. **Mode:** Conference (VC mode)
4. **Share room link** with bug hunters

### Step 3: During the Session

While friend shares screen and describes bug:

1. **Take notes** or use VC recording
2. **Ask clarifying questions:**
   - "What did you expect?"
   - "What actually happened?"
   - "Can you reproduce it?"
3. **Screenshot** the bug (or ask them to)

### Step 4: Log the Bug

```powershell
# Open bug tracker
code .agent/bugs/BUG_TRACKER.md
```

Add entry following this template:

```markdown
- [ ] **BUG-XXX: [Short Description]** 🔴/🟡/🟢 [SEVERITY]
  - **Reported By:** [Friend Name] (Bug Bounty)
  - **Reported At:** [Date/Time]
  - **Page/Component:** [URL or Component Name]
  - **Expected:** [What should happen]
  - **Actual:** [What actually happens]
  - **Screenshot:** screenshots/BUG-XXX.png
  - **Steps to Reproduce:**
    1. [Step 1]
    2. [Step 2]
    3. [Step 3]
  - **Priority:** CRITICAL / HIGH / MEDIUM / LOW
  - **Status:** 🔍 PENDING REVIEW
```

### Step 5: Reward XOM

| Severity | Base Reward | When Fix Merged | Total    |
| -------- | ----------- | --------------- | -------- |
| LOW      | 50 XOM      | +50 XOM         | 100 XOM  |
| MEDIUM   | 100 XOM     | +100 XOM        | 200 XOM  |
| HIGH     | 250 XOM     | +250 XOM        | 500 XOM  |
| CRITICAL | 500 XOM     | +500 XOM        | 1000 XOM |

**Manual Reward Process:**

1. Go to Admin Panel → XOM Ledger
2. Credit user's wallet with reward amount
3. Add note: "Bug Bounty: BUG-XXX"

---

## 🐛 For Bug Hunters (Share with Friends)

### What You Need

- ✅ OHM account (any type)
- ✅ Webcam + Microphone
- ✅ Screen sharing capability
- ✅ Passion for finding bugs!

### How to Participate

1. **Visit Landing Page:** `https://stream.offlinehumanmode.com/bug-bounty`
2. **Join VC Session** when host invites you
3. **Share Your Screen** when you find a bug
4. **Describe the Problem:**
   - What you were trying to do
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
5. **Wait for Confirmation** and XOM reward

### What Makes a Good Bug Report

✅ **GOOD:**

- "When I click 'Save', the page freezes for 10 seconds"
- "The button says 'Submit' but nothing happens when I click it"
- "The text is cut off on mobile when I rotate to landscape"

❌ **BAD:**

- "The app is broken" (too vague)
- "I don't like the color" (feature request, not bug)
- "Make it faster" (no specific issue)

### Rewards

| Bug Type                       | XOM Earned   |
| ------------------------------ | ------------ |
| CRITICAL (Production Down)     | 500-1000 XOM |
| HIGH (Major Feature Broken)    | 250-500 XOM  |
| MEDIUM (Partial Feature Issue) | 100-200 XOM  |
| LOW (Minor UI Issues)          | 50-100 XOM   |

---

## 🔧 After the Session (For Host)

### Fix the Bug

```powershell
# Run bugfix workflow
# (In Antigravity/Gemini session)
/bugfix
```

This will:

1. Read BUG_TRACKER.md
2. Analyze the bug
3. Propose/implement fix
4. Update bug status

### For CRITICAL/HIGH Bugs

Create forensic log:

```powershell
cp .agent/bugs/FORENSIC_LOG_TEMPLATE.md .agent/bugs/BUG-XXX_FORENSICS.md
```

### Add Test Case

```powershell
# Add test to browser test script
/addtestcase
```

### Deploy Fix

```powershell
# Deploy to production
/deploy
```

### Update Bug Status

```markdown
# After fix is deployed:

- [x] **BUG-XXX: [Description]** ✅ FIXED
  - **Fix Commit:** abc1234
  - **Deployed:** [Date/Time]
```

### Award Fix Bonus

Credit the additional XOM when bug is confirmed fixed.

---

## 📊 Tracking Stats

### View Current Bugs

```powershell
cat .agent/bugs/BUG_TRACKER.md | Select-String "- \[ \]" | Measure-Object
```

### View Fixed Bugs

```powershell
cat .agent/bugs/BUG_TRACKER.md | Select-String "- \[x\]" | Measure-Object
```

### Session History

All sessions logged in `Documentation/Testing/Browser_Test_Script.md`

---

## 📁 File Locations

| File                                           | Purpose                     |
| ---------------------------------------------- | --------------------------- |
| `.agent/bugs/BUG_TRACKER.md`                   | Central bug list            |
| `.agent/bugs/FORENSIC_LOG_TEMPLATE.md`         | Deep investigation template |
| `.agent/bugs/screenshots/`                     | Bug screenshots             |
| `.agent/workflows/bugfix.md`                   | Bugfix workflow             |
| `Documentation/Testing/Browser_Test_Script.md` | Test cases                  |

---

## 🎁 Leaderboard (Manual Tracking)

Track top bug hunters in BUG_TRACKER.md footer:

```markdown
## 🏆 Bug Bounty Leaderboard

| Rank | Hunter   | Bugs Reported | Bugs Fixed | XOM Earned |
| ---- | -------- | ------------- | ---------- | ---------- |
| 1    | @friend1 | 12            | 10         | 2,500      |
| 2    | @friend2 | 8             | 7          | 1,800      |
| 3    | @friend3 | 5             | 4          | 900        |
```

---

## ⚠️ Rules (Share with Hunters)

### ✅ Allowed

- Finding bugs in production (stream.offlinehumanmode.com)
- Testing on your own account
- Reporting security issues privately

### ❌ Not Allowed

- Disclosing bugs publicly before fixed
- Creating bugs intentionally
- Testing on other users' accounts
- Spam/duplicate reports

---

_Workflow created 2026-02-05 for OHM Bug Bounty Program_
