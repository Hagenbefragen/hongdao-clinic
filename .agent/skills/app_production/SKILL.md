---
name: App Production Validator
description: Pre-deployment cross-platform validation for PWA, Android (TWA), and iOS (PWA/Safari). Ensures the app works correctly on all target platforms before any production push.
group: smart.frontend
---

# 📱 App Production Validator

**Purpose:** Validate that the OHM app works correctly on ALL target platforms before deploying to production. This skill prevents "works on desktop but breaks on mobile" scenarios.

**Trigger:** Invoke BEFORE every production deployment (`/deploy`, `/deploy_core`, `/comitall`), or when Ship Engine Phase 4 runs.

---

## 1. Pre-Deploy Validation Matrix

Run through ALL levels in order. A failure at any level blocks deployment.

### Level 1: Build Integrity 🔨

```bash
# 1a. TypeScript — zero new errors allowed
cd c:\ohm\frontend && npx tsc --noEmit 2>&1

# 1b. Vite Production Build — must succeed cleanly
cd c:\ohm\frontend && npm run build

# 1c. Check for console.log pollution (production leak)
grep -r "console.log" frontend/components/ --include="*.tsx" --include="*.ts" | grep -v "// debug" | grep -v test | wc -l
# Goal: < 50 (track trend, never increase)
```

**Exit:** Build succeeds, no new TypeScript errors.

### Level 2: SSL & Infrastructure Verification 🔐

```bash
# 2a. Verify repo nginx config uses correct cert path
# 🚨 LESSON LEARNED (SSL-003): Post-receive hook copies nginx config from REPO
# to server on every deploy. Server-side sed fixes get OVERWRITTEN.
# The REPO file is the Single Source of Truth!
grep "offlinehumanmode.com-0001" nginx_offlinehumanmode.conf
# MUST return zero results! If found → FIX IN REPO before deploying!

# 2b. Post-deploy SSL check (PowerShell)
$domains = @('app.offlinehumanmode.com', 'stream.offlinehumanmode.com', 'twin.offlinehumanmode.com')
foreach ($d in $domains) {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $tcp.Connect($d, 443)
    $ssl = New-Object System.Net.Security.SslStream($tcp.GetStream(), $false, {$true})
    $ssl.AuthenticateAsClient($d)
    $cert = $ssl.RemoteCertificate
    if ($cert.Subject -notmatch 'offlinehumanmode.com') {
        Write-Host "❌ WRONG CERT on $d — Subject: $($cert.Subject)"
    } else {
        Write-Host "✅ $d — $($cert.Subject)"
    }
    $ssl.Close(); $tcp.Close()
}
```

**Exit:** All subdomains serve `CN=offlinehumanmode.com`.

### Level 3: Desktop Browser (Chrome/Firefox) 🖥️

| Check         | URL                                 | Expected                                 | Action if Fail                     |
| ------------- | ----------------------------------- | ---------------------------------------- | ---------------------------------- |
| Main landing  | offlinehumanmode.com                | Quantum Landing loads, particles animate | Check route plugins                |
| App login     | app.offlinehumanmode.com            | SeamlessLogin renders                    | Check SSO cookies                  |
| Stream portal | stream.offlinehumanmode.com         | Stream landing loads                     | Check SSL cert + subdomain routing |
| Twin portal   | twin.offlinehumanmode.com           | DT interface loads                       | Check twin build                   |
| API health    | app.offlinehumanmode.com/api/health | `{"status":"ok"}`                        | Check backend PM2                  |

**Exit:** All 5 URLs load correctly, no white screens, no SSL errors.

### Level 4: Mobile Web (PWA) — Android Chrome 📱

> **⚠️ CRITICAL:** This is where most regressions hide. Desktop devs forget mobile.

| Check          | How                                                                    | Expected                                             |
| -------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| Touch targets  | All buttons ≥ 44x44px                                                  | No mis-taps on small buttons                         |
| Viewport       | `<meta name="viewport" content="width=device-width, initial-scale=1">` | No horizontal scroll                                 |
| Service Worker | DevTools > Application > Service Workers                               | Registered, no stale chunks                          |
| Add to Home    | Chrome menu > "Add to Home Screen"                                     | App icon appears, launches fullscreen                |
| Offline mode   | Enable airplane mode                                                   | App shell renders, offline indicator shows           |
| Camera access  | Stream > Test Camera                                                   | getUserMedia works, preview renders                  |
| Touch gestures | Swipe, pinch-zoom on relevant screens                                  | No unintended zoom or scroll hijack                  |
| Bottom nav     | Check NavBar position                                                  | Not hidden behind Android nav bar                    |
| Keyboard       | Open any input field                                                   | Virtual keyboard doesn't cover input, layout adjusts |
| Orientation    | Rotate device                                                          | Layout adapts, no content clipping                   |

**Test devices (minimum):**

- Android Chrome (latest) on a mid-range device
- Samsung Internet (if available)

### Level 5: Mobile Web (PWA) — iOS Safari 🍎

> **⚠️ iOS-SPECIFIC GOTCHAS — These break silently:**

| Check          | iOS Gotcha                                        | Expected                                          |
| -------------- | ------------------------------------------------- | ------------------------------------------------- |
| Service Worker | iOS kills SW aggressively after 2 weeks idle      | SW re-registers on next visit                     |
| Camera         | iOS requires `playsinline` attribute on `<video>` | Video preview works (no fullscreen forced)        |
| WebRTC         | iOS Safari has strict autoplay policy             | Camera/mic works after user gesture               |
| Safe area      | iPhone notch/Dynamic Island                       | Content not obscured (`env(safe-area-inset-top)`) |
| PWA launch     | Add to Home Screen via Share > Add                | Correct icon, title, standalone mode              |
| Back gesture   | iOS swipe-from-left-edge                          | Doesn't conflict with app navigation              |
| Scroll         | Body scroll bounces (rubber-band) on iOS          | No double-scroll or stuck scroll                  |
| Date inputs    | iOS date picker is different from Android         | All date inputs work correctly                    |
| Fonts          | iOS doesn't support all Google Fonts weights      | Text renders correctly, no missing glyphs         |

**Test devices (minimum):**

- iPhone with iOS 17+ in Safari
- iPad Safari (if tablet layout exists)

### Level 6: Android TWA (Native Wrapper) 📦

```bash
# 6a. Build the TWA APK
cd c:\ohm\mobile\android
./gradlew assembleRelease

# 6b. Verify APK
# - Opens in fullscreen (no browser chrome)
# - Digital Asset Links verified (no address bar)
# - Push notifications work (if configured)
# - App icon and splash screen correct

# 6c. Install on device
adb install -r app/build/outputs/apk/release/app-release.apk
```

| Check          | Expected                                      |
| -------------- | --------------------------------------------- |
| No browser bar | TWA runs fullscreen (asset links verified)    |
| Deep links     | `ohm://` scheme opens in app                  |
| Background     | App doesn't crash when backgrounded/resumed   |
| Memory         | No excessive memory usage on mid-range device |

---

## 2. Regression Quick-Check (For Hotfixes)

When deploying a hotfix (not a full feature), use this abbreviated check:

```markdown
# Hotfix Validation Checklist

- [ ] Build succeeds (`npm run build`)
- [ ] SSL certs not broken (check repo nginx config!)
- [ ] Changed page loads correctly on desktop
- [ ] Changed page loads correctly on mobile (responsive check)
- [ ] No new console errors
```

---

## 3. Integration with Ship Engine

This skill is invoked as **Phase 4F** in the Ship Engine pipeline:

```
Phase 4: VALIDATE
  4A: /bestpractice audit
  4B: /unittest
  4C: /codetest (lint, security)
  4D: /browsertest (E2E)
  4E: /quality_gateway
  4F: /app_production (THIS SKILL) ← NEW
```

**When to invoke fully vs. abbreviated:**

| Deployment Type                  | Levels to Run               |
| -------------------------------- | --------------------------- |
| Full deploy (`/deploy_master`)   | ALL levels (1-6)            |
| Core deploy (`/deploy_core`)     | Levels 1-4                  |
| Stream deploy (`/deploy_stream`) | Levels 1-3                  |
| Hotfix                           | Regression Quick-Check only |
| Website only (`/deploy_website`) | Levels 1-2                  |

---

## 4. Failure Escalation

If any level fails:

1. **Block deploy** — do NOT push to production
2. **Document failure** in Ship Report with screenshot
3. **Route back** to Ship Engine Phase 1 (IMPLEMENT) or Phase 2 (SELF-HEAL)
4. **Re-run** from the failed level after fix

---

## 5. Lessons Learned Log

| Date       | Bug     | Platform | Lesson                                                                                                                                                                                         |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-02-18 | SSL-003 | All      | Nginx config in REPO had wrong cert path (`-0001`). Post-receive hook copies repo file to server on every deploy, overwriting server-side fixes. **ALWAYS fix the repo file, not the server.** |
| 2026-02-18 | VB-352  | Desktop  | Canvas `width`/`height` reset clears content per HTML spec. Virtual backgrounds flickered because canvas was cleared every frame.                                                              |

---

**Version:** 1.0 (Feb 2026)
**Created by:** Ship Engine / Skill Forge
