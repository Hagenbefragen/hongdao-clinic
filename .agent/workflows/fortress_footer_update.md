---
description: How to maintain and inject the Fortress Global Navigation Footer across all subpages.
---
# 🏰 Workflow: Fortress Footer Navigation Update

Whenever a new page is added to the `/fortress/` ecosystem on Destill.ai, or when managing existing pages, use this workflow to guarantee consistent deep-linking across the portal.

## Rule: The Global Footer Mandate
All HTML pages inside `c:\ohm\Documentation\VC-EXIT\destill-landing\fortress\` MUST include the standard Fortress Footer just before the closing `</body>` tag. The system is designed so users never hit dead ends within the compliance shield portal.

## Step 1: Scan Existing Pages
First, list all files in the Fortress directory to ensure you capture every route:
```powershell
ls c:\ohm\Documentation\VC-EXIT\destill-landing\fortress\*.html
```

## Step 2: Ensure the Links Array is Updated
Check the list of standard links block below, and add the new page if it was just created. Maintain alphabetical order roughly, or logical importance.

Current standard links map:
- `🏠 Platform Home` -> `/fortress/`
- `⚙️ Architecture` -> `/fortress/architecture`
- `📋 Compliance Audit` -> `/fortress/ComplianceAudit`
- `🎨 Creator Portal` -> `/fortress/creator`
- `⚖️ Legislation & Fines` -> `/fortress/legislation`
- `📜 Patents` -> `/fortress/patents`
- `🚀 Pitch Hub` -> `/fortress/pitch/`
- `⚡ Quickstart` -> `/fortress/quickstart`
- `🐝 Swarm Intro` -> `/fortress/swarm-intro`
- `👮 Swarm Police` -> `/fortress/swarm-police`

## Step 3: Inject the Standard Footer Code
Inject the following HTML block into the target pages before `</body>`. 
**CRITICAL:** For the page that is *currently active*, change its background to `rgba(0,255,204,0.1)`, its text color to `var(--accent)`, and its border to `1px solid var(--accent)`, along with `font-weight: bold;`. The inactive links get the standard `.05` white background.

```html
    <!-- FORTRESS GLOBAL FOOTER -->
    <footer style="margin-top: 60px; padding: 40px 20px; background: rgba(10, 10, 12, 0.9); border-top: 1px solid var(--border); text-align: center;">
        <h3 style="color: var(--accent); margin-bottom: 20px; font-size: 1.2rem; letter-spacing: 2px; text-transform: uppercase;">Fortress Ecosystem Navigation</h3>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; max-width: 1000px; margin: 0 auto;">
            <!-- INJECT ALL LINKS HERE (Apply active styling to the current page's route!) -->
        </div>
        <p style="margin-top: 30px; color: var(--dim); font-size: 0.8rem;">© 2026 Destill.ai / OHM. Sovereign Architecture.</p>
    </footer>
```

## Step 4: Run Destill Deployment (MANDATORY ZIP FAST-SYNC)
**CRITICAL:** Do NOT use slow, file-by-file `scp` transfers (which can take 3+ minutes). Always compress the artifacts into a `.zip` locally to deploy instantly.

```powershell
# 1. Zip the specific updated directory
Compress-Archive -Path "c:\ohm\Documentation\VC-EXIT\destill-landing\fortress\*" -DestinationPath "c:\ohm\fortress-update.zip" -Force

# 2. Upload via SCP
scp -i C:\ohm\ohm_deploy_key c:\ohm\fortress-update.zip root@78.46.219.101:/tmp/

# 3. Unzip on the Hetzner Server (overwriting existing files securely)
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "cd /var/www/destill/fortress/ && unzip -o /tmp/fortress-update.zip && rm /tmp/fortress-update.zip"
```
*(If you need to deploy the entire Destill.ai site, apply this same `Compress-Archive` logic to the `c:\ohm\Deploy_Destill.ps1` script instead of file-by-file copying).*
