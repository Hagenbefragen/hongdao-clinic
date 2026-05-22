---
description: Master list of all workflow triggers and when to use them
---

# OHM Workflow Triggers - Quick Reference

## 🚀 Deployment Workflows

| Trigger | When to Use | Risk | What It Does |
|---------|-------------|------|--------------|
| `/deploy_stream` | VC/Stream UI changes | 🟢 LOW | Deploys Frontend only (No Backend restart) |
| `/deploy_core` | Backend/Auth/DB changes | 🟠 HIGH | Deploys Backend + App + Website |
| `/deploy_master` | Major version releases | 🔴 MAX | Deploys EVERYTHING |
| `/deploy_website` | Website deployment | 🟢 LOW | Deploys offlinehumanmode.com + ohmretreat.com |
| `/deploy_dt` | Digital Twin deployment | 🟠 HIGH | Deploys the DT stack to Hetzner |
| `/restart` | Restart services | 🟠 HIGH | Restarts frontend and backend PM2 processes |
| `/ports_reference` | Port configuration lookup | ℹ️ REF | Quick reference for all port assignments |

## 🎨 UI/UX Workflows

| Trigger | When to Use | What It Does |
|---------|-------------|--------------|
| `/uioptimizer` | UI looks broken/unprofessional | Full UI audit: Mobile, Tablet, Desktop |
| `/darkmode` | Contrast/accessibility issues | Dark mode best practices |
| `/color` | Color palette problems | Color schema optimization |

## 🧪 Testing Workflows

| Trigger | When to Use | What It Does |
|---------|-------------|--------------|
| `/browsertest` | Run automated browser tests | Tests with persistent documentation |
| `/addtestcase` | After implementing a feature | Adds test case to Browser_Test_Script.md |
| `/bugfix` | Found a bug | Process bug reports from screenshots |

## 🔧 Development Workflows

| Trigger | When to Use | What It Does |
|---------|-------------|--------------|
| `/vcplugin` | Add VC/Stream feature | Safe plugin-based feature addition | /vcplugin add [feature name]
| `/newportal` | Create new authenticated page | SeamlessLogin integration checklist |
| `/bestpractice` | Starting any new feature | Ensures we do it right the first time |
| `/documentation` | Need to document something | Guide for creating proper docs |
| `/terminal` | PowerShell commands failing | PowerShell syntax rules |

## 📝 Content Workflows

| Trigger | When to Use | What It Does |
|---------|-------------|--------------|
| `/videoscripts` | Creating marketing videos | Write successful video scripts |

## ⚡ Speed Workflows

| Trigger | When to Use | What It Does |
|---------|-------------|--------------|
| `/turbo` | Want fast auto-approve mode | Auto-accepts all command prompts |
| `/comitall` | Ready to commit changes | Commits all changes with message |

---

## 🎯 Best Practices for Triggering

### Starting a New Feature
```
/bestpractice + description of what you want
```

### Adding VC/Stream Features
```
/vcplugin add [feature name] - [brief description]
```

### Creating a New Page/Portal
```
/newportal [page name]
```

### UI Looks Broken
```
/uioptimizer for [component name]
```

### After Finishing Work
```
/comitall [commit message]
```

### Full Deployment After Major Changes
```
/deploy_master
```

---

## 📋 Workflow Combinations

### New Feature (Full Process)
1. `/bestpractice` - Plan it right
2. Implement the feature
3. `/addtestcase` - Document the test
4. `/browsertest` - Verify it works
5. `/comitall` - Commit changes
6. `/deploy_app` - Deploy to production

### UI Overhaul
1. `/uioptimizer` - Audit current state
2. `/darkmode` - Check contrast
3. `/color` - Verify palette
4. `/browsertest` - Test across devices

### New VC/Stream Feature
1. `/vcplugin` - Follow plugin architecture
2. Build and test locally
3. `/deploy_app` - Deploy
4. `/addtestcase` - Document

---

## ⚠️ Important Notes

- **Always use `/bestpractice`** when starting something new
- **Never skip `/browsertest`** before deploying user-facing changes
- **Use `/vcplugin`** for any VC/Stream additions - NEVER modify core views directly
- **Combine `/turbo`** with any workflow for faster execution