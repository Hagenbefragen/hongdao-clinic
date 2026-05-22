---
description: Create publish-ready content for ALL pipelines from a single topic (Blog, LinkedIn, Medium, X, Video, Email). Always multi-channel, strictly Trust Architect, always human-approved before publishing.
---

# /createcontent — Omni-Channel Content Pipeline

> **Rule**: Produce for ALL channels simultaneously. Output to single folder: `c:\ohm\Documentation\Content\Blog\YYYY-MM-DD_{SLUG}\`
> **Tone**: Trust Architect (Evidence over hype, share limitations, cite details, no "best/revolutionary").

## Phase 1: Signal Analysis
Analyze topic for Market, Patent (2,061+ claims), Competitive, and Trust angles. Start ONLY after this.

## 🔴 Phase 1.5: POCC IMAGE GATE (MANDATORY)
> **⚠️ HARD BLOCKER: Generate the TOP Hero Image BEFORE writing ANY channel content.**

1. **Analyze topic** & distill into two visual concepts (Infographic Hero + Aesthetic Footer).
2. **Generate Hero Image** via `generate_image`. It MUST be a precise infographic of the invention showing the problem and solution intuitively (often split screen VS. pictures). Clear, clean, and uses correct English words. Save as `{SLUG}_hero.png`.
3. **Generate Footer Image** via `generate_image` based on the NI-Stack Visual Signature Style Guide below. Save as `{SLUG}_footer.png`.
4. **Save** both to `c:\ohm\Documentation\Content\Blog\YYYY-MM-DD_{SLUG}\` and copy to `...\Blog\images\`.
5. **VERIFY** both exist using PowerShell:
   `Test-Path "c:\ohm\Documentation\Content\Blog\YYYY-MM-DD_{SLUG}\{SLUG}_hero.png"`
   `Test-Path "c:\ohm\Documentation\Content\Blog\YYYY-MM-DD_{SLUG}\{SLUG}_footer.png"`
6. **STOP** if `Test-Path` returns `False`.

### POCC Checklist
| Check | Status |
|---|---|
| 1. Hero infographic image generated (`generate_image`) | ☐ |
| 2. Footer aesthetic image generated (`generate_image`) | ☐ |
| 3. Both images saved to campaign folder | ☐ |
| 4. Both images copied to `images/` archive | ☐ |
| 5. Both `Test-Path` checks pass (`True`) | ☐ |

## Visual Assets Strategy
* **Image 1 (TOP Hero):** Precise Infographic. It must intuitively explain the problem and solution. Use clear, clean infographic layouts (e.g., Split Screen "VS." pictures). Ensure any text generated uses correct English words. Save as `{SLUG}_hero.png`. Embed before TL;DR.
* **Image 2 (FOOTER):** Authentic Aesthetic Artwork. Generated dynamically using the Style Guide below. Save as `{SLUG}_footer.png`. Embed before bio.

### NI-Stack Visual Signature Style Guide (For FOOTER Image Only)
**Core:** Natural Intelligence, fractal growth, sacred geometry, crystalline order. NO neon cyberpunk/circuit boards/robots/text overlays.
**Prompt Elements (Pick >= 3):**
1. *Natural Forms*: Fern fractals, Fibonacci spirals, mycelium, nautilus, leaf venation.
2. *Sacred Geometry*: Flower of Life (EXACTLY ONE OUTER RING of 6 circles + 1 center. Two rings forbidden), Metatron, Torus fields.
3. *Crystalline*: Quartz lattice, diamond bonds, Bose-Einstein patterns.
4. *Field Intelligence*: Toroidal fields, wave interference, plasma vortices.
5. *Organic Growth*: Tree rings, seed time-lapse, wood wide web.
**Colors:** Emerald green (`#0D6B3E`), warm gold (`#C5A547`), soft rose (`#D4A0A0`). Background: Dark earth/midnight.

## Phase 2: Core Package (All Channels)

### 2.1 Blog Article (`Blog.html`)
* **Format:** Standalone HTML, max 760px width. Beweisführung tone (evidence).
* **Structure:** Hero Header > Executive Summary (TL;DR) > Start with WHY (Explain the problem and why it's important for a normal guy on the street) > Content / Tech Analysis > Deeper Pattern > Questions > Images > Footer with **DESTILL.ai** branding, licensing inquiries email (`IP@destill.ai`), and Hagen & Destill.ai LinkedIn.
* **Rules:** `<abbr>` tooltips for ALL abbreviations. 
* **Toltec Design CSS:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap');
:root { --bg: #0d1b2a; --surface: #132238; --card: #1a2d45; --border: #2a3f5f; --text: #e8eaf0; --muted: #8b9cb8; --accent: #c5a547; --amber: #d4a25c; --pearl: #f0ede8; --emerald: #0d6b3e; --rose: #d4a0a0; --crystal: #6aa5c7; --gold-glow: 0 0 30px rgba(197,165,71,0.2); }
```
* **HTML Component Snippets:**
```html
<div class="koan">"Quote/Insight" <span class="attr">— Name</span></div>

<div class="agreement">
  <div class="agreement-header"><div class="agreement-num">1</div><div class="agreement-title">Concept Title</div></div>
  <div class="agreement-body"><span class="toltec">Perspective 1:</span> ...<br><br><span class="ai">Perspective 2:</span> ...</div>
</div>
```

### 2.2 LinkedIn
* **`LinkedIn_post.md`:** 150-300 words. Hook 1-2 lines. Bridge. Max 3 hashtags. NO links in body (put in comment). MUST mention **DESTILL.ai** instead of OHM. Add "For IP licensing inquiries: IP@destill.ai" at the end.
* **`LinkedIn_comment.md`:** 100-250 words. Add unique technical insight. Include target post URL.

### 2.3 Medium (`Medium.md`)
* Adapt blog to markdown format. "⚡ Executive Summary" at top. Standard markdown `![alt](image)` embeds. End with conversation invite. 

### 2.4 X / Twitter (`X_thread.md`)
* Tweet 1: Hook (280 chars max). No hashtags.
* Threads 2-5: Insights, Questions. Link at end. Max 2 hashtags.

### 2.5 Instagram (`Instagram.md`)
* **Post:** Square (`{SLUG}_ig_post.png`). Hook < 125 chars. Emoji bullets. 15-25 hashtags. No links.
* **Story:** Vertical layout idea. 3-5 slides (Hook, insight, CTA/poll).

### 2.6 TikTok (`TikTok.md`)
* Portrait image (`{SLUG}_tiktok.png`). 50-150 words. Short punchy hook. Conversational tone. Max 5 hashtags.

### 2.7 Reddit & Discord (`Reddit_Discord.md`)
* **Reddit:** Target r/MachineLearning, r/artificial. Evidence-only, no clickbait/hype/emojis. Disclose affiliation. Use Reddit markdown.
* **Discord:** Embed format. ~2000 char max. Bulleted key findings. Emojis welcome. Discussion prompt.

### 2.8 Bluesky (`Bluesky.md`)
* Max 300 chars per post. Thread OK. Include links. Mandatory alt-text. Max 1 hashtag. Tech/developer tone.

### 2.9 TechPro Platforms (`TechPro.md`)
* **Hacker News:** Factual title. Submit link to destill.ai. Include founder comment IMMEDIATELY. NO Show HN unless OSS. Engage comments.
* **dev.to:** Conversational tech series. Markdown, code snippets. Tags: #aisafety #security.

### 2.10 Academic Platforms (`Academic.md`)
* **arXiv:** Abstract format (Problem > Method > Results), TPR/FPR metrics.
* **ResearchGate:** Project update post citing methodology. 
* **Mastodon:** scholar.social / mathstodon.xyz. Alt-text mandatory, academic tone.
* MUST include **OHM Summit Invitation Hook** for researchers.

### 2.11 Telegram Broadcast (`Telegram.md`)
* **Instructions:** Add bot via `@BotFather`, get API Token, make bot Admin in `t.me/destillAIpublic`.
* **Payload:** POST to `chat_id=@destillAIpublic`. Short Title/Hook + Conversational Technical Summary + Call-to-action link. NO marketing hype.

## Phase 3: Blitz Expansion
* Trigger via `blitz` flag.
* Generate `Video_scripts.md` (Explainer 2-3m, TikTok 30s hooks).
* Generate `DACH.md` (DE/AT/CH localization, "Ehrlichkeit" tone).
* Generate `Email.md` (Campaign digest).

## Phase 4: Human Review
Present exact checklist table to user:
```markdown
| Channel | File | Status |
|---|---|---|
| Blog (HTML) | Blog.html | ✅ Ready |
| LinkedIn | Post / Comment | ✅ Ready |
| Medium | Medium.md | ✅ Ready |
| X Thread | X_thread.md | ✅ Ready |
| Instagram | Insta (Post+Story) | ✅ Ready |
| TikTok | TikTok.md | ✅ Ready |
| Reddit+Discord | Reddit_Discord.md | ✅ Ready |
| Telegram | Telegram.md | ✅ Ready |
| Bluesky | Bluesky.md | ✅ Ready |
| TechPro | HN + dev.to | ✅ Ready |
| Academic | arXiv+RG+Mastodon | ✅ Ready |
| Visuals | Images Verified | ✅ Ready |
**Approve?** Say "publish" to deploy.
```

## Phase 5: Publish & Verify (turbo-all)
Only post-approval, execute browser commands/HTTP to live-publish to active networks, then verify crawling via `crawler_verifier`.

## Tone Guidelines & Story Structure (Trust Architect)
✅ **ALWAYS TELL THE STORY:** So the user doesn't have to specify it in the prompt, ALWAYS structure the content by starting with WHY. Explain the problem we are solving and why it is important in simple terms ("for a normal guy on the street"). Build the narrative from the problem to our specific architectural solution.
✅ DO: Show evidence, cite specific numbers, acknowledge limits, ask questions.
❌ DON'T: Hype, attack companies, use vague superlatives, tell readers what to think.
