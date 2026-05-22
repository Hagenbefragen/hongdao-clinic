---
description: Process screenshot-based bug reports from local folder or descriptions
---

# /bugfix - Screenshot-based Bug Fixing Workflow

This workflow processes bug reports with screenshots stored locally in the project.

## Bug Tracker Location

- Screenshots: `.agent/bugs/screenshots/`
- Bug List: `.agent/bugs/BUG_TRACKER.md`

## Workflow Steps

### 1. Check for New Bugs

// turbo

```bash
cat .agent/bugs/BUG_TRACKER.md
```

### 2. View Screenshot (if provided)

Use `view_file` tool to analyze the screenshot:

```
view_file(".agent/bugs/screenshots/XXX.png")
```

### 3. Check Recent Changes (Regression Analysis)

**IMPORTANT:** If the bug might be a regression from recent changes, check:
// turbo

```bash
git log --oneline -10
git diff HEAD~3 --stat
```

Review if any recent commits touched the affected components.

### 3.5. 🚨 GIT BLAME CULTURE (Anti-Regression Safeguard)

**CRITICAL LESSON from BUG-059:** Before "fixing" code that looks wrong, ALWAYS check `git blame` to understand WHY it was written that way!

// turbo

```bash
# Check WHO changed this line and WHEN
git blame -L <start>,<end> <file>

# See the full commit context
git show <commit-hash>
```

**Real Example (BUG-059):**

- Monday: Agent removed `isSubscribed` check with comment "Let VideoTrack manage subscription" ✅
- Tuesday: Different agent added it back thinking it was "missing" ❌ BROKE!
- **Root Cause:** Didn't check git blame to see WHY it was removed
- **Result:** 8 hours debugging a self-inflicted regression

**Rule:** If you see code that looks "wrong" but has been there for a while, it's probably RIGHT for a non-obvious reason. Check the commit message before changing it!

### 3.7. 🎯 HALLELUJA PLAUSIBILITY CHECK (Before Proposing ANY Fix)

**CRITICAL LESSON from BUG-148:** NEVER propose a fix based on guessing. ALWAYS cross-reference against a KNOWN WORKING commit first!

// turbo

```bash
# 1. Find the last confirmed working commit (HALLELUJA commit)
git log --oneline --grep="WORKING\|HALLELUJA" | head -5

# 2. Compare suspect files against working state
git diff <halleluja-commit> HEAD -- <suspect-file>

# 3. Check what the WORKING config looked like
git show <halleluja-commit>:<file-path>
```

**Real Example (BUG-148):**

- Agent assumed Nginx was on wrong port (8880 vs 7880)
- Agent changed port 8880→7880 thinking that was "the fix"
- **Reality:** The WORKING commit already had 7880!
- **Root Cause:** Didn't check what the working state actually was
- **Result:** Multiple wasted deploy cycles, customer demo at risk

**MANDATORY Before Proposing Infrastructure Fixes:**

1. **Find HALLELUJA commit:** `git log --grep="WORKING\|HALLELUJA" --oneline | head -1`
2. **Compare suspect files:** `git show <halleluja>:<file> | head -50`
3. **Only change what's ACTUALLY different from working state**

### 3.6. 📋 CREATE FORENSIC LOG (ONLY for CRITICAL/HIGH Priority Bugs)

**IMPORTANT:** Forensic logs are ONLY required for **🔴 CRITICAL** or **🟡 HIGH** priority bugs. For **🟢 MEDIUM** and **⚪ LOW** priority bugs, follow the standard bugfixing workflow (Step 4).

**When to create a forensic log (CRITICAL/HIGH only):**

- 🔴 **CRITICAL:** Production down, data loss, security breach
- 🔴 **HIGH:** Major feature broken, affects all users, regression from recent deploy
- ❌ **NOT for MEDIUM/LOW:** Skip this step for minor bugs, UI issues, or small improvements

// turbo

```bash
# ONLY if bug is CRITICAL or HIGH priority:
cp .agent/bugs/FORENSIC_LOG_TEMPLATE.md .agent/bugs/BUG-XXX_FORENSICS.md

# The template provides structure for:
# - Timeline of changes (git blame, commit history)
# - Hypothesis testing
# - Proposed fixes with risk analysis
# - Lessons learned
```

**Benefits of forensic logs:**

1. **Prevents hasty fixes:** Forces systematic investigation for critical issues
2. **Documents timeline:** Clear before/after for post-mortem analysis
3. **Captures lessons:** Prevents recurrence of critical failures
4. **Enables review:** Stakeholders can understand what went wrong

**Example:** See `BUG-066_FORENSICS.md` for a CRITICAL bug investigation that identified commit `1795e61` using git blame and timeline analysis.

### 4. Investigate & Fix

- Locate the relevant code based on bug description
- Check if recent changes caused the regression
- **🔍 Git Blame Check:** Before modifying suspicious code, run `git blame` to see the commit history and WHY it was done that way

**🌐 Infrastructure/Connectivity Bugs:**

If the bug involves connections, network, ports, WebSockets, or proxies, **CHECK INFRASTRUCTURE FIRST:**

// turbo

```bash
# 1. Nginx/Reverse Proxy Config
grep -r "service_name" /etc/nginx/sites-enabled/
cat server_nginx_current.conf | grep "service_name"

# 2. Cross-reference PORTS.md
cat Documentation/INFRASTRUCTURE/PORTS.md | grep "service_name"

# 3. Docker Port Mappings
docker ps | grep "service_name"

# 4. Environment Variables
cat .env | grep "SERVICE"
cat .env.production | grep "SERVICE"
```

**Infrastructure Checklist:**

- [ ] Nginx config files match PORTS.md
- [ ] Docker port mappings (HOST:CONTAINER) are correct
- [ ] Environment variables are set correctly
- [ ] Service is actually running (`pm2 list` or `docker ps`)

**LESSON from BUG-066:** Nginx proxy had wrong port (7880 vs 8880) for 2 weeks! Checking infrastructure first would have caught it immediately.

**🚨 SSH COMMANDS WARNING (See `.agent/workflows/ssh_commands.md`):**

NEVER use direct SSH commands on Windows - they hang! Use:

```powershell
# ✅ SAFE - Use curl for health checks
curl -s https://app.offlinehumanmode.com/api/health
curl -s https://app.offlinehumanmode.com/livekit

# ✅ SAFE - Use deploy.ps1 for server changes
powershell -ExecutionPolicy Bypass -File .\deploy.ps1

# ❌ BAD - WILL HANG FOREVER
ssh root@188.245.235.51 "pm2 list"
```

**📺 WebRTC/LiveKit Connection Bugs (BUG-148 Pattern):**

If video calls fail with "could not establish pc connection":

1. **Check Port Reference FIRST:** See `.agent/workflows/ports_reference.md` and `Documentation/INFRASTRUCTURE/PORTS.md`

2. **Required Firewall Ports (from livekit.yaml):**
   | Port | Protocol | Purpose |
   |------|----------|---------|
   | `7881` | TCP | RTC TCP fallback |
   | `7882` | **UDP** | RTC media (PRIMARY) |
   | `3478` | **UDP** | TURN NAT traversal |
   | `5349` | TCP | TURN TLS |

3. **Server-side Fix Commands:**

   ```bash
   # Check current firewall
   sudo ufw status verbose | grep -E "7881|7882|3478|5349"

   # Open missing ports
   sudo ufw allow 7881/tcp
   sudo ufw allow 7882/udp
   sudo ufw allow 3478/udp
   sudo ufw allow 5349/tcp
   ```

4. **LiveKit Container Check:**
   ```bash
   docker ps | grep livekit
   docker logs livekit-server --tail 50
   ```

**🔴 LESSON from BUG-148:** WebRTC needs UDP ports (7882, 3478) open! Signaling works via Nginx (8880) but media transport goes directly to host.

**Other Bug Types:**

- **Routing Bugs:** Check `frontend/components/MainLayout/routing/plugins/` - routes are handled by plugins! DO NOT edit MainLayout.tsx for routing logic.
- **MainLayout UI Bugs:** Check `frontend/components/MainLayout/components/MainShell.tsx` for layout issues.
- **VC/Stream Bugs:** Check corresponding VC plugins, NOT VCView.tsx directly
- **Data Loss/Stability Bugs:** CRITICAL - Refer to `Documentation/AS_BUILD/02_Deployment/Overall_Production_Strategy.md` to prevent recurrence.
- **🎨 Core File Detection:** If fixing `frontend/components/vc/core/*` or similar, consider: Should this logic be in a PLUGIN instead? Core files should be stable!
- Implement the fix following `/bestpractice`
- Test if possible

### 4.5. 💬 LOUD COMMENT REQUIREMENT (Prevent Future Confusion)

**CRITICAL LESSON from BUG-059:** Non-obvious fixes MUST have LOUD comments explaining WHY!

**Bad Comment (caused BUG-059):**

```tsx
// Let VideoTrack manage subscription
const remoteCameraOn = cameraPub && !cameraPub.isMuted;
```

**GOOD Comment (would have prevented BUG-059):**

```tsx
// 🚨 CRITICAL: Do NOT add isSubscribed check here!
// VideoTrack has manageSubscription=true (line 329), which subscribes AFTER rendering.
// Checking isSubscribed here creates a chicken-and-egg problem:
// - We won't render VideoTrack until isSubscribed=true
// - VideoTrack can't subscribe until we render it
// - Result: Infinite wait, remote video never shows!
const remoteCameraOn = cameraPub && !cameraPub.isMuted;
```

**When to use LOUD comments:**

- Race conditions or timing-dependent logic
- Removing checks that "look necessary" but aren't
- Working around framework quirks
- Any fix that made you go "wait, why does this work?"

**Format:**

```tsx
// 🚨 CRITICAL: [One-line summary]
// [Detailed explanation of WHY]
// [What happens if you change this]
```

### 4. Update Bug Tracker

After fixing, move the bug from "Pending" to "Fixed":

```markdown
## Fixed Bugs

- [x] BUG-XXX: Description - FIXED in commit ABC123
```

### 5. Add Test Case

Use `/addtestcase` workflow to add browser test for the fixed bug.

### 6. Commit the Fix

```bash
git add -A ; git commit -m "fix(component): description of fix - closes BUG-XXX"
```

## Bug Report Format

When adding bugs to BUG_TRACKER.md, use this format:

```markdown
- [ ] BUG-XXX: [Short Description]
  - Screenshot: screenshots/XXX.png
  - Page/Component: [Where the bug appears]
  - Expected: [What should happen]
  - Actual: [What is happening]
  - Priority: HIGH/MEDIUM/LOW
```

## Example Session

User: "Bitte fixe die Bugs in .agent/bugs/"
Agent:

1. Reads BUG_TRACKER.md
2. Views screenshots
3. Fixes bugs one by one
4. Updates tracker
5. Creates test cases
6. Commits changes
