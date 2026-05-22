---
name: Crawler Verifier & Social Publisher
description: Automates the loop of Content Creation -> Social Publishing -> Crawler Detection Verification.
group: smart.backend
---

# 🕸️ Crawler Verifier & Social Publisher Skill

## 🎯 Purpose

To automate the end-to-end verification of the **Resonance Crawler System**. This skill uploads content (QFVC Streams) to social platforms (YouTube, Telegram) and then queries the internal Crawler API to verify if the content was detected, analyzed, and indexed correctly.

## 🛠️ Requirements

- **YouTube Account**: OAuth2 credentials or Browser Session (User Provided)
- **Telegram Bot Token**: For publishing to Test Channel
- **Crawler API Access**: Internal endpoint (e.g. `/api/crawler/status` or DB access)
- **QFVC Recording**: A local video file artifact

## 🔄 Workflow

### 1. Upload Phase (Manual or Semi-Auto)

Due to anti-bot measures, YouTube upload is best handled via:

- **Option A**: Manual Upload (User Action)
- **Option B**: YouTube Data API (Requires API Key/OAuth)
- **Option C**: Browser Automation (Flaky, not recommended)

**Recommendation**: Use **Option B** (API) for robust testing.

### 2. Publish Phase (Telegram)

Use the Telegram Bot API to post the video link.

- **Input**: Video URL (YouTube Link)
- **Action**: Post to `@ohm_test_channel`
- **Payload**: `New Stream Detected! #QFVC #OHM [Link]`

### 3. Detection Verification Phase

Poll the Crawler API/Database for the URL.

- **Query**: `SELECT * FROM internal_crawler_logs WHERE url = '[Video URL]'`
- **Verify**:
  - `status`: "INDEXED"
  - `resonance_score`: > 0
  - `qfvc_detected`: TRUE

## 📝 Usage for Agent

```markdown
// To trigger this skill:

1. Obtain the YouTube URL of the uploaded stream.
2. Run the `publish_and_verify.ps1` script (to be created).
3. Report the time-to-detection (Latency).
```

## 📂 File Structure

- `scripts/publish_telegram.ps1`: PowerShell script to post to Telegram
- `scripts/check_crawler.ps1`: PowerShell script to query DB/API
- `config/credentials.json`: (To be created by User) - contains API Keys
