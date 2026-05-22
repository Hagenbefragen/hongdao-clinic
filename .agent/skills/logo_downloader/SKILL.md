---
description: Download real SVG/PNG brand logos for LLM providers and autonomous agent frameworks. Optimized for dark-background dashboards.
---

# 🖼️ Logo Downloader — Real Brand Logos for Dashboard Use

## Purpose

Download official or high-quality brand logos for LLM providers and autonomous agent frameworks. Logos are optimized for:
- Dark background dashboards (white/light versions)
- Small display sizes (32-48px)
- Canvas/SVG rendering

## Logo Sources (Preferred Order)

1. **Official brand assets pages** (e.g., openai.com/brand)
2. **GitHub repos** — many companies host SVG logos in their public repos
3. **SVGPorn / SimpleIcons** — curated SVG logo collections
4. **WorldVectorLogo** — alternative SVG source

### SimpleIcons API (Most Reliable)

SimpleIcons provides 3000+ brand SVGs via CDN:

```
https://cdn.simpleicons.org/{slug}
https://cdn.simpleicons.org/{slug}/{color}
```

Examples:
- `https://cdn.simpleicons.org/openai/white` → White OpenAI logo
- `https://cdn.simpleicons.org/anthropic/white` → White Anthropic logo
- `https://cdn.simpleicons.org/meta/white` → White Meta logo

### Logo Inventory (Current Targets)

| Brand | SimpleIcons Slug | Alt Source | Category |
|-------|-----------------|-----------|----------|
| OpenAI | `openai` | openai.com/brand | LLM |
| Anthropic (Claude) | `anthropic` | anthropic.com | LLM |
| Meta (LLaMA) | `meta` | meta.com/brand | LLM |
| Google (Gemini) | `google` | google.com | LLM |
| Mistral | `mistralai` | mistral.ai | LLM |
| xAI (Grok) | `x` | x.ai | LLM |
| Qwen (Alibaba) | N/A | qwen.ai | LLM |
| DeepSeek | N/A | deepseek.com | LLM |
| AutoGPT | `autogpt` | github.com/Significant-Gravitas | Agent |
| CrewAI | N/A | crewai.com | Agent |
| LangChain | `langchain` | langchain.com | Agent |

## Storage Convention

```
Documentation/VC-EXIT/live-NI-Dashboard/assets/logos/
  {name}_w.svg     — White/light version (for dark backgrounds)
  {name}.svg       — Full color version (optional)
```

## Execution Steps

1. **Check SimpleIcons** for the brand slug
2. **Download SVG** to `assets/logos/{name}_w.svg`
3. **If no SimpleIcons slug**, create a high-quality placeholder:
   - Circle with brand color
   - First 2-3 letters of brand name in bold white text
   - Keep viewBox="0 0 48 48" for consistency
4. **Verify** all logos load in browser via ni-flythrough.html

## Quality Requirements

- SVG format preferred (scales perfectly at 32-48px)
- PNG fallback: 96x96px minimum, transparent background
- White or light-colored for dark dashboard backgrounds
- No trademark violations — use for editorial/agnostic display purposes

## Brands That Need Real Logo Downloads

The following brands don't have SimpleIcons slugs and need manual download:
- **Qwen**: Download from qwen.ai or Alibaba Cloud branding
- **DeepSeek**: Download from deepseek.com
- **CrewAI**: Download from crewai.com or GitHub

## Integration

After downloading, update `ni-flythrough.html`:
1. Add `<img id="logo-{name}" src="assets/logos/{name}_w.svg" ...>` to hidden container
2. Add to `logoNames[]` and `logos[]` arrays in the canvas draw section
3. Verify rendering at 32px display size
