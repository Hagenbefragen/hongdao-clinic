---
description: Deploy Destill.ai — ZIP-based fast deployment of landing pages, NI Flythrough, Blog articles, and Nginx config to Hetzner AX42
---
# 🚀 Deploy: Destill.ai (ZIP Mode)

This workflow deploys the entire destill.ai static website using **ZIP-based deployment** (3 ZIPs instead of 15+ individual SCPs). ~10x faster.

**Target Server:** `root@78.46.219.101`
**Remote Root:** `/var/www/destill/`
**SSH Key:** `C:\ohm\ohm_deploy_key`
**Script:** `c:\ohm\Deploy_Destill.ps1`

// turbo-all

---

## Phase 1: Deploy Landing Pages + Flythrough + Nginx

Run the existing deployment script which handles all landing HTML pages, NI Flythrough, and Nginx config:

```powershell
powershell -ExecutionPolicy Bypass -File "c:\ohm\Deploy_Destill.ps1"
```

This deploys:
- All HTML landing pages from `c:\ohm\Documentation\VC-EXIT\destill-landing\`
- NI Flythrough from `c:\ohm\NI-Flythrough-Public\`
- **NI Stack Big Picture** (as `ni-dashboard.html`)
- **Rosetta Stone** (actual content as `rosetta.html`)
- Nginx config (with `/ni-dashboard` and `/rosetta` routes)
- Runs smoke tests on all landing page URLs

---

## Phase 2: Deploy Blog Articles

### Step 2.1: Create remote blog directory structure

```powershell
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "mkdir -p /var/www/destill/blog/images"
```

### Step 2.2: Deploy standalone blog HTML files from `website/blog/`

These are the original blog articles (each a single HTML file):

```powershell
scp -i C:\ohm\ohm_deploy_key -r c:\ohm\website\blog\*.html root@78.46.219.101:/var/www/destill/blog/
```

### Step 2.3: Deploy blog images from `website/blog/images/`

```powershell
scp -i C:\ohm\ohm_deploy_key -r c:\ohm\website\blog\images\* root@78.46.219.101:/var/www/destill/blog/images/
```

### Step 2.4: Deploy Content Pipeline blog articles

These are `/createcontent`-generated campaigns. Each campaign folder contains a `Blog.html` plus satellite content (LinkedIn, Medium, etc.). Only the `Blog.html` and images get deployed.

For each campaign folder in `Documentation/Content/Blog/YYYY-MM-DD_*`:
1. Create the remote folder
2. Copy the `Blog.html`
3. Copy any .png/.jpg images

```powershell
$SSH_KEY = "C:\ohm\ohm_deploy_key"
$SERVER = "root@78.46.219.101"
$REMOTE_BLOG = "/var/www/destill/blog"
$LOCAL_CONTENT = "c:\ohm\Documentation\Content\Blog"

$campaigns = Get-ChildItem -Path $LOCAL_CONTENT -Directory | Where-Object { $_.Name -match '^\d{4}-\d{2}-\d{2}_' }
$deployed = 0

foreach ($campaign in $campaigns) {
    $blogFile = Join-Path $campaign.FullName "Blog.html"
    if (Test-Path $blogFile) {
        $slug = $campaign.Name
        Write-Host "   Deploying: $slug ..." -ForegroundColor Cyan
        
        # Create remote dir
        ssh -i $SSH_KEY $SERVER "mkdir -p ${REMOTE_BLOG}/${slug}"
        
        # Copy Blog.html
        scp -i $SSH_KEY $blogFile "${SERVER}:${REMOTE_BLOG}/${slug}/Blog.html"
        
        # Copy images (png, jpg, webp)
        $images = Get-ChildItem -Path $campaign.FullName -Include *.png,*.jpg,*.webp -File
        foreach ($img in $images) {
            scp -i $SSH_KEY $img.FullName "${SERVER}:${REMOTE_BLOG}/${slug}/$($img.Name)"
        }
        
        $deployed++
        Write-Host "   OK $slug" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "   Blog campaigns deployed: $deployed" -ForegroundColor Green
```

---

## Phase 3: Verify Blog Deployment

### Step 3.1: List deployed blog files

```powershell
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "find /var/www/destill/blog/ -name '*.html' | sort"
```

### Step 3.2: Smoke test blog URLs

```powershell
$urls = @(
    "https://destill.ai/blog/your-agi-agent-is-naked",
    "https://destill.ai/blog/your-ai-safety-benchmark-is-lying-to-you",
    "https://destill.ai/blog/the-night-ai-almost-poisoned-our-patent",
    "https://destill.ai/blog/the-ai-brain-has-no-background-processes",
    "https://destill.ai/blog/from-containment-theory-to-code-the-monotonic-ratchet",
    "https://destill.ai/blog/2026-03-20_42-knowledge-domains-ni-stack/Blog.html",
    "https://destill.ai/ni-dashboard",
    "https://destill.ai/rosetta",
    "https://destill.ai/Compliance/rosettastone.html"
)

$pass = 0; $warn = 0
foreach ($url in $urls) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        Write-Host "   OK HTTP $($r.StatusCode): $url" -ForegroundColor Green
        $pass++
    } catch {
        Write-Warning "   WARN: $url — $($_.Exception.Message)"
        $warn++
    }
}
Write-Host ""
Write-Host "   Smoke tests: $pass passed, $warn warnings" -ForegroundColor $(if ($warn -eq 0) { "Green" } else { "Yellow" })
```

---

## Nginx Blog Configuration

The existing Nginx config already handles blog routes via `try_files $uri $uri.html $uri/ /index.html`.
This means:
- `/blog/your-agi-agent-is-naked` → `/var/www/destill/blog/your-agi-agent-is-naked.html` ✅
- `/blog/2026-03-20_42-knowledge-domains-ni-stack/Blog.html` → direct path ✅

If blog routes return 404, add this location block to the Nginx config:

```nginx
location /blog/ {
    try_files $uri $uri.html $uri/Blog.html $uri/ =404;
}
```

---

## Quick Reference

| Source | Destination | Content |
|--------|-------------|---------|
| `VC-EXIT/destill-landing/*.html` | `/var/www/destill/` | Landing pages |
| `NI-Flythrough-Public/` | `/var/www/destill/` | 3D Agent Flythrough |
| `website/blog/*.html` | `/var/www/destill/blog/` | Standalone blog articles |
| `website/blog/images/` | `/var/www/destill/blog/images/` | Blog hero images |
| `Documentation/Content/Blog/YYYY-*` | `/var/www/destill/blog/YYYY-*/` | Campaign blog articles |
