---
name: Android APK Builder
description: Build and sign the OHM Android APK (TWA) for production release
group: smart.frontend
---

# Android APK Builder

Build the OHM Android TWA (Trusted Web Activity) APK from `c:\ohm\mobile\`.

## Prerequisites

- **Java 17** (`java -version`)
- **Android SDK** at `%LOCALAPPDATA%\Android\Sdk` (set in `mobile/local.properties`)
- **Signing Key** at `C:/OHM/android-keystore/ohm-release-new.keystore`
  - Alias: `ohm-release`
  - Password: In `mobile/gradle.properties` (OHM_KEYSTORE_PASSWORD / OHM_KEY_PASSWORD)
  - SHA-256: `B1:84:ED:5A:38:22:34:F4:17:44:B1:2B:66:5E:BD:7B:92:DE:E6:98:93:14:2B:5B:F0:AA:3F:74:54:0B:85:FE`

> [!CAUTION] > **NEVER** change the keystore. Android permanently binds the package to its signing key.
> A key mismatch forces ALL existing users to uninstall and reinstall.

## Steps

### 1. Bump Version

Edit `c:\ohm\mobile\gradle.properties`:

```properties
OHM_VERSION_CODE=<INCREMENT BY 1>
OHM_VERSION_NAME=<NEW VERSION e.g. 1.2.0>
```

> [!IMPORTANT] > `OHM_VERSION_CODE` must ALWAYS increase. Never decrease it.

### 2. Verify local.properties

Ensure SDK path matches current machine:

```properties
sdk.dir=C:\\Users\\Hagen\\AppData\\Local\\Android\\Sdk
```

### 3. Build Release APK

// turbo

```powershell
cd c:\ohm\mobile; .\gradlew.bat assembleRelease 2>&1
```

Typical build time: ~40 seconds.

### 4. Copy APK to Distribution

// turbo

```powershell
$apk = Get-ChildItem "c:\ohm\mobile\app\build\outputs\apk\release\*.apk"
Copy-Item $apk.FullName "c:\ohm\frontend\public\OHM_V$VERSION.apk" -Force
Copy-Item $apk.FullName "c:\ohm\frontend\public\OHM_latest.apk" -Force
Copy-Item $apk.FullName "c:\ohm\OHM_V$VERSION.apk" -Force
```

### 5. Deploy (Push to make APK downloadable)

Commit and push to make the APK available at `https://app.offlinehumanmode.com/OHM_latest.apk`:

```powershell
git add frontend/public/OHM_*.apk mobile/gradle.properties
git commit -m "Release APK V$VERSION"
git push sovereign main:master; git push origin main
```

## Output Location

- Build output: `c:\ohm\mobile\app\build\outputs\apk\release\app-release.apk`
- Public download: `c:\ohm\frontend\public\OHM_latest.apk`
- Root copy: `c:\ohm\OHM_V$VERSION.apk`

## Troubleshooting

- **SDK XML version mismatch**: Harmless warning, ignore
- **Signing error**: Check `OHM_KEYSTORE_PASSWORD` in `gradle.properties`
- **SDK not found**: Fix `sdk.dir` in `mobile/local.properties`
