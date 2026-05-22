---
description: Generate AI-powered LinkedIn engagement comments using NI-Stack knowledge
---

# /linkedin - LinkedIn Engagement Workflow

// turbo-all

## Overview

Generate thought-leadership LinkedIn comments that position OHM's NI-Stack as the answer to AI challenges. Semi-automated: AI generates → you approve → you post.

## Usage

1. User pastes a LinkedIn post text
2. Agent reads the `linkedin_engagement` skill: `.agent/skills/linkedin_engagement/SKILL.md`
3. Agent detects the topic (governance, safety, energy, etc.)
4. Agent generates a contextual comment using NI-Stack knowledge
5. User copies comment and posts on LinkedIn

## Quick Trigger Examples

- "Write a LinkedIn comment for this AI governance post"
- "Generate engagement for this AI safety discussion"
- "/linkedin [paste post text]"

## Steps

### 1. Read Skill Instructions

```bash
cat .agent/skills/linkedin_engagement/SKILL.md
```

### 2. Detect Post Topic

Analyze the pasted post for:

- Primary topic (governance, safety, energy, cost, scale)
- Author's key insight
- Hashtags used
- Audience type (CTO, GRC, Developer, Researcher)

### 3. Generate Comment

Follow the 3-Part Structure from the skill:

- **HOOK**: Build on the author's insight
- **VALUE**: Share relevant NI-Stack evidence
- **BRIDGE**: Invite conversation

### 4. Present for Approval

Show the comment with:

- Topic detected
- NI-Stack angle used
- The comment text (ready to copy)
- Suggested hashtags

### 5. (Optional) Open LinkedIn Tool

```bash
start http://localhost:8765/linkedin-tool.html
```

Or use the HTML tool at `Documentation/VC-EXIT/live-NI-Dashboard/linkedin-tool.html`
