---
description: Autonomous browser testing mode with persistent test documentation
---

# /browsertest - Automated Browser Testing Workflow

// turbo-all

## Overview
This workflow puts the agent into **Global Browser Testing Mode**. The agent will:
1. Read/update `Documentation/Testing/Browser_Test_Script.md` before and after each test
2. Execute tests autonomously using the browser subagent
3. Document all findings (bugs, errors, successes)
4. Fix bugs after testing, then re-test

## ⚡ CRITICAL EFFICIENCY RULE (THE "PROFI" STANDARD) ⚡
- **Speed**: Target **3 seconds per screen** max. Do not linger.
- **Login Strategy**: EVERY Test Case in `Browser_Test_Script.md` **MUST** explicitly state: `**User**: [email]`.
- **Shortcuts**: Use "Creative Profi" shortcuts (deep links, cookie injection) if they speed up success, as long as they respect `@/bestpractice`.
- **No Amateur Hour**: If login fails, check DB immediately. Do not retry blindly.


## 🚨 CRITICAL AUTHENTICATION RULE 🚨
- **AUTOMATION = EMAIL LOGIN ONLY**
- **DO NOT** attempt Web3 or Offline/File-based login with the browser subagent.
- Mark any Web3/Offline tests as **MANUAL_REQUIRED** in the test script.
- **Ensure Test Users**: Before starting, verify you have enough Email credentials created. If not, create them via the backend/database tools.

## 🔑 TEST USER CREDENTIALS

All test users use password: **TestPass123!**

| Email | Roles | Trust Score | Purpose |
|-------|-------|-------------|---------|
| admin@test.ohm | Admin, CoCreator, Business, Alchemy | 95 | Full admin access testing |
| creator@test.ohm | CoCreator | 75 | Stream/VC testing, Studio access |
| business@test.ohm | BusinessOwner, StartupFounder | 60 | Business portal testing |
| alchemy@test.ohm | AlchemyUser | 50 | Alchemy dating testing (walled garden) |
| basic@test.ohm | None | 35 | Basic user experience testing |
| guardian@test.ohm | None (Trust 100+) | 100 | Guardian tab access testing |

**Note**: All users have trust scores > 30 to bypass portal selection screens.

---

## Workflow Steps

### 1. Load Test State
Read `Documentation/Testing/Browser_Test_Script.md` to understand:
- Current test cases and their status
- Outstanding bugs from previous sessions
- Which tests need re-running after fixes

### 2. Pre-Test Update
Update `Documentation/Testing/Browser_Test_Script.md` with:
- Current session timestamp
- Tests you plan to execute
- Mark tests as "🔄 In Progress"
- Mark Web3/Offline tests as "🛑 MANUAL_REQUIRED"

### 3. Execute Tests (Autonomous - Email Only)
For each test case:
- Use `browser_subagent` tool to navigate and interact
- **Login using Email/Password only**
- Capture screenshots as evidence
- Document results immediately in the test script
- Mark as ✅ PASS, ❌ FAIL, or ⚠️ BLOCKED

### 4. Post-Test Update
Update `Documentation/Testing/Browser_Test_Script.md` with:
- Test results and screenshots
- New bugs discovered (add to Bug ToDo List)
- Session summary

### 5. Bug Fixing Phase
For each bug in the ToDo List:
- Attempt to fix the code
- Document the fix
- Mark bug as "🔧 Fixed (Needs Retest)"

### 6. Re-Test Fixed Bugs
Re-run tests for fixed bugs:
- If PASS: Move to "✅ Resolved" section
- If FAIL: Update bug description with new findings

### 7. User Approval Tasks (END)
At the very end, batch all tasks requiring user approval:
- Deployment commands
- Database migrations
- Other destructive operations

---

## Test Script Structure

The `Documentation/Testing/Browser_Test_Script.md` file follows this structure:

```markdown
# Browser Test Script

## Session Log
| Date | Tests Run | Passed | Failed | Notes |
|------|-----------|--------|--------|-------|

## Active Test Cases
### TC-001: [Test Name]
- **Status**: 🔄 In Progress / ✅ PASS / ❌ FAIL / 🛑 MANUAL_REQUIRED
- **User**: [email@test.ohm] (MANDATORY)
- **Steps**: ...
- **Expected**: ...
- **Actual**: ...
- **Screenshot**: [path]

## Bug ToDo List
### BUG-001: [Bug Title]
- **Severity**: High/Medium/Low
- **Found In**: TC-XXX
- **Status**: 🐛 Open / 🔧 Fixed / ✅ Resolved
- **Fix Commit**: [hash]

## Resolved Tests (Archive)
[Tests that passed after being fixed - keep for history]
```

---

## Key Principles

1. **Never Delete Test Cases** - Mark as resolved, move to archive
2. **Screenshots Are Evidence** - Always capture before claiming success
3. **Autonomous First** - Only pause for truly blocking issues
4. **Session Continuity** - Document everything for next session pickup
5. **Fix Then Retest** - Always verify fixes with a new test run
