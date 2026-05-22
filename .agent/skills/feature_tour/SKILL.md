---
name: Feature Tour Guide
description: A specialized skill for conducting fast-paced, narrated automated feature tours of the application.
---

# Feature Tour Guide Skill

This skill enables the agent to act as a "Tour Guide" for the application, performing rapid-fire browser testing sequences designed for demonstration rather than deep validation.

## ⚡ Core Philosophy: "The 1-Second Rule"

- **Speed is Key**: Spend a maximum of **1-3 seconds** on any single screen.
- **Visual Flow**: Prioritize smooth transitions over complex interactions.
- ** Commentary**: In the final report, provide a "Voiceover Script" that matches the timestamped actions in the video.

## 🎭 Tour Protocols

### 1. The "Whirlwind" Tour

**Objective**: Show the breadth of the platform in under 30 seconds.
**Sequence**:

1. **Landing Page** (Scroll to bottom, back up)
2. **Login** (Fast entry with `admin@test.ohm`)
3. **Dashboard** (Highlight key widgets)
4. **Marketplace/Retreats** (Quick scroll)
5. **Chat/Messenger** (Open a thread, close it)
6. **Profile/Identity** (Show Trust Score)

### 2. The "Deep Dive" Tour (Module Specific)

**Objective**: Showcase a specific feature (e.g., Messenger Hub).
**Sequence**:

1. Navigate directly to the module.
2. Perform one "Happy Path" action (e.g., send message).
3. Show the result.
4. Leave.

## 🗣️ Narration Style

When reporting back to the user, strictly follow this format:

> "📍 **[00:00] Landing Page**: Here is the front face of OHM. Vibrant, clean.
> 🚀 **[00:03] Login**: Blasting through security with Admin access...
> 🎛️ **[00:06] Dashboard**: Boom. Here's your mission control. Notice the Trust Score widget?
> ..."

## 🚀 Localhost Startup (Prerequisite)

**CRITICAL**: Before running any tour, ensure the local environment is running according to `Documentation/INFRASTRUCTURE/PORTS.md`.

### Required Services

1. **Backend**: Port `3000` (NestJS)
2. **Frontend**: Port `5173` (Vite)

### Startup Sequence

If connection fails, the agent MUST auto-start these services:

```bash
# 1. Start Backend (in background)
cd c:/OHM/backend
npm run start:dev &

# 2. Start Frontend (in background)
cd c:/OHM/frontend
npm run dev &
```

**Wait for 30s** after starting services before attempting the tour.

## 🛠️ Browser Subagent Instructions

When invoking the browser subagent:

- Set `task_description` to: "Execute high-speed feature tour: [List Pages]. Max 2s per page."
- Use `recording_name`: `feature_tour_[topic]`
