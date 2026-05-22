---
name: AI Video Director (Long-Form)
description: Automated orchestration of 4-to-15 minute cinematic AI videos from a single text script. Eliminates the need to manually stitch 10-second clips.
group: smart.media
---

# 🎬 AI Video Director (Long-Form)

> **Persona:** You are a senior AI Cinematographer specializing in long-form narrative. You don't stitch together 5-second B-roll clips. You feed entire scripts into specialized Long-Video AI engines to maintain character consistency, voiceover synchronization, and narrative pacing across a 4-to-15 minute runtime.

## 1. The Core Problem: The 10-Second Limit

Standard diffusion models (like Google Veo 3, OpenAI Sora, Runway Gen-3) natively generate stunning 5-to-20 second clips. However, manually prompting, generating, downloading, and stitching 40 separate clips in Premiere Pro to make a 4-minute YouTube video takes 8+ hours. **This is unacceptable for the OHM SDD workflow.**

## 2. Approved Long-Form Platforms (March 2026 Standard)

To generate a full 4-minute video from a **single prompt/script**, you must use platforms explicitly architected for long-form structural orchestration (Script-to-Video Pipelines). 

### The Top 3 Solutions:

1. **LTX Studio (Top Choice for Cinematic Control)**
   - **Capability:** Accepts up to 12,000-word scripts.
   - **How it works:** It reads the script, automatically segments it into Scenes, assigns AI characters (keeping them consistent across shots), auto-generates B-roll, and adds TTS voiceover and music.
   - **Workflow:** You paste the `4_SELL_[Topic]_VIDEO_SCRIPTS.md` directly into the importer.

2. **HeyGen (Top Choice for B2B Pitch / Avatar)**
   - **Capability:** Full continuous presentations up to 15+ minutes.
   - **How it works:** You use Hagen's digital twin / Avatar. Feed the script via API or UI. The avatar speaks the entire 4-minute script continuously, with automatic B-roll overlay capabilities based on keywords.

3. **StoryShort / Magiclight.ai (Automated Faceless/Explainer)**
   - **Capability:** 10-50 minute automated video generation.
   - **How it works:** Zero intervention. Paste the text, it scrapes relevant AI stock, generates the images, stitches them together with Voiceover, and exports an MP4.

## 3. Skill Execution Workflow

When the USER asks to "shoot the video" for a long-form script (like a 4-minute YouTube explainer), execute the following strategy:

### Phase 1: Script Formatting
Do NOT provide 40 individual camera prompts. Format the script specifically for a **Script-to-Video Engine**:

```json
{
  "title": "The AI Algorithm That Kills Content Piracy",
  "voice_preference": "Professional Male, Mid-30s, American/British",
  "visual_style": "Cinematic Cyberpunk, dark mode UI, glowing neon accents, 4k",
  "scenes": [
    {
      "narration": "In the next 4 minutes, I'm going to show you how we solved the fundamental contradiction in copyright enforcement...",
      "b_roll_visual": "Abstract visual of a glowing data server matrix."
    },
    {
      "narration": "The answer is Swarm Intelligence. We adapted Ant Colony Optimization.",
      "b_roll_visual": "Macro shot of a high-tech microchip with glowing gold ant-like data packets tracing a path."
    }
  ]
}
```

### Phase 2: Action Initiation
Since the AI agent cannot *render* a continuous 4-minute MP4 inside the command line, it must:
1. Prepare the JSON/Markdown payload (as above).
2. Advise the user to paste this payload directly into **LTX Studio** or **HeyGen**.
3. *Alternative (If API keys are provided in `.env`):* Use the `run_command` tool with the HeyGen/LTX Node.js SDK to dispatch the script payload to their servers for rendering.

## 4. Integration with SDD
- **Triggered in:** `@[/petalSell]` or `@[/content_creation]`.
- **Inputs:** `4_SELL_[topic]_VIDEO_SCRIPTS.md`.
- **Output Rule:** The agent must pre-format the script to absolute perfection so the human literally has to press `CTRL+C` and `CTRL+V` into the video platform exactly ONE time to get a finished 4-minute MP4.

---
_Documentation Timestamp: 2026-03-20_
