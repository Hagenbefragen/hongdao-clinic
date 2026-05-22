---
description: Create a World-Class CEO/Founder Meeting Briefing Dashboard
---

# 📅 /briefing — Meeting Briefing Dashboard Creation

// turbo-all

> _"Victory is won before the battle. The world's top CEOs don't read notes—they pilot dashboards."_

## 🎯 Purpose
To systemize and operationalize high-stakes meeting preparation. This workflow generates a standalone, interactive HTML dashboard that serves as a mini-CRM, situational awareness map, script interface, and artifact presentation tool (all in one screen).

## 📊 The "World-Class Briefing" Standard
A world-class briefing must contain 6 distinct layers:
1. **Logistics & Profile:** The "Who", "Where", and key psychological triggers of the counterpart.
2. **The North Star Objective:** Exactly what success looks like (What is the "Ask"?).
3. **The Script / Narrative Arc:** The literal flow of the meeting (Rapport -> Context -> Pivot -> The Ask).
4. **Red Lines & Traps:** What NOT to share. IP protection boundaries.
5. **Interactive Artifacts:** Real-time access to the exact documents, dashboards, or ONE-Pagers needed to prove your point *during* the chat.
6. **Execution CRM:** In-app timeline, notes, action items, and follow-up accountability. Let the dashboard BE the CRM entry.
7. **Devil's Advocate Handbooks:** Pre-computation of the counterpart's strongest objections and your exact tactical counters.

## 🧠 Required Agent Skills
When executing this workflow, the Agent MUST invoke or simulate the following skills:
- `horizon_scanner`: To read the counterpart's latest market context.
- `blind_spot_detector`: To identify strict IP "Red Lines" and what the CEO must NOT say.
- `devils_advocate`: To predict the top 3 reasons the counterpart will reject the pitch, and prepare specific, sovereign counter-arguments.

## 🛠️ Step-by-Step Execution

1. **Understand the Counterpart (Sense & Read):**
   - Read the counterpart's active files, recent conversations, or related `FEAT-XXX` research to understand the current negotiation pivot logic.
   - 🔴 **MANDATORY ENRICHMENT RULE:** When provided with a URL or profile for the counterpart, you MUST NOT stop at the single page or just their LinkedIn. You MUST follow and read at least 3-5 relevant sub-links (e.g., "About", "Projects", "Interviews", "Publications") to deeply enrich the psychological profile and identify non-obvious conversation pivots.
   - Run `devils_advocate` internally to determine their exact counter-arguments.
   - Run `blind_spot_detector` to define the Red Lines.

2. **Generate the Briefing HTML:**
   - Create a folder for the counterpart under `c:\ohm\Documentation\MEETING_Briefings\[Contact-Name]\`
   - Create a `[Contact]_Briefing_Dashboard.html` using the **OHM Dark-Mode Glassmorphism** standard.
   - Implement JavaScript tab-switching so the user can easily switch between the Script, CRM notes, and embedded `<iframe>` artifacts (e.g., Red Team API, NI Dashboard).
   - 🔴 **MANDATORY LIVE CHECK:** You MUST verify that any urls (like the NI Dashboard) actually resolve. You MUST verify that the stats listed in the scripts reflect the current `VXX` run from `AGENTS.md` (e.g., 114 agents, V98 metrics). Do NOT let the CEO walk into a meeting with outdated stats!
   
3. **Embed Critical Artifacts:**
   - Instead of linking out, embed known resources (e.g., the NI Dashboard on `destill.ai` or local `.html` evidence files).
   - *CRITICAL RULE:* Always remind the user if an artifact needs to be shown from a specific sovereign domain (e.g., "Must be on destill.ai, NOT ohm").

4. **Add the CRM "State":**
   - Ensure the HTML has input fields for the user to take meeting notes, log NDA status, check off the "Red Lines", and type action items real-time. (Bonus: Provide a "Download Notes as JSON/Markdown" button).

5. **Open for Review:**
   - Instruct the user to open the newly generated Briefing Dashboard.
