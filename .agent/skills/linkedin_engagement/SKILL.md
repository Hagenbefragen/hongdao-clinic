---
name: LinkedIn Engagement Autopilot
description: Generate thought-leadership LinkedIn comments that position OHM's NI-Stack as the answer to AI governance, security, and efficiency challenges. Semi-automated with human approval before posting.
group: smart.ai
---

# LinkedIn Engagement Autopilot

## Purpose

Transform LinkedIn engagement from manual effort into an AI-powered thought leadership pipeline. Every comment positions OHM's NI-Stack as the industry answer to AI challenges — naturally, without sounding like spam.

## When to Use

- User pastes a LinkedIn post and wants a contextual comment
- User asks to engage with AI/security/governance content on LinkedIn
- User triggers `/linkedin` workflow

## Comment Generation Rules

### 1. TONE

- **Peer-level**: Never sell. Contribute to the conversation.
- **Specific**: Reference exact numbers from NI-Stack (42 layers, 72% compression, 12-Sigma, 366 claims).
- **Generous**: Give value first. Share an insight the audience hasn't considered.
- **Authentic**: Sound like Hagen — a founder who builds, not a marketer who pitches.

### 2. STRUCTURE (The 3-Part Comment)

```
[HOOK]     → Agree with or build on the post's key insight (1-2 sentences)
[VALUE]    → Share a concrete example from NI-Stack that's relevant (2-4 sentences)
[BRIDGE]   → Invite further conversation or pose a thought-provoking question (1 sentence)
```

### 3. POSITIONING MAP

Match the post's topic to the right NI-Stack angle:

| Post Topic                | NI-Stack Angle                            | Key Numbers                             |
| ------------------------- | ----------------------------------------- | --------------------------------------- |
| AI Governance / GRC       | 105-agent autonomous governance cascade    | ISO 42001, EU AI Act Art. 50/53 mapped  |
| AI Safety / Alignment     | Pre-LLM filtering prevents harm upstream  | 12-Sigma catch rate, 0 false negatives  |
| AI Energy / Green AI      | Token compression saves compute           | 72% token reduction, QFAI-C compression |
| AI Security / Red Team    | Multi-layer defense-in-depth              | 42 detectors, SIREN feedback loops      |
| RLHF / Human-in-Loop      | NI = guardrails, RLHF = driver training   | Autonomous vs annotation-dependent      |
| AI Regulation / EU AI Act | Built-in compliance architecture          | Constitutional AI + legal layer         |
| AI Cost / ROI             | Prompt filtering = token savings          | 72% cost reduction per inference        |
| AI Trust / Ethics         | Transparent cascade = explainable defense | Living ecosystem visualization          |
| AI Patents / IP           | 366+ patentable innovations               | USPTO provisional filed                 |
| AI at Scale / Enterprise  | Handles 1B+ inference load                | Zero human bottleneck                   |

### 4. HASHTAG STRATEGY

Always include 2-3 relevant hashtags matching the post's topic:

- Core: `#NIStack` `#NaturalIntelligence` `#ResponsibleAI`
- Governance: `#AIGovernance` `#GRC` `#Compliance`
- Security: `#AISafety` `#CyberSecurity` `#RedTeaming`
- Green: `#GreenAI` `#SustainableAI` `#EnergyEfficiency`
- Scale: `#EnterpriseAI` `#AIatScale` `#MLOps`

### 5. ANTI-SPAM RULES

- ❌ Never start with "Great post!" alone (add substance)
- ❌ Never link to website in comments (looks spammy)
- ❌ Never use more than 5 hashtags
- ❌ Never exceed 300 words (LinkedIn truncates)
- ❌ Never copy-paste the same comment structure twice
- ✅ Always add a unique insight the author hasn't mentioned
- ✅ Always reference specific technical details (not vague claims)
- ✅ Always end with engagement (question or open invitation)

### 6. KNOWLEDGE BASE (Quick Reference)

The agent should pull from these KIs when generating comments:

- `ohm_unified_natural_intelligence_stack` → Architecture, layers, benchmarks
- `ohm_ai_governance_compliance_and_risk` → ISO 42001, EU AI Act, Munich Re
- `ohm_sovereign_intellectual_property_foundation` → Patent claims, IP strategy
- `ohm_quantum_physics_and_natural_intelligence` → Heim theory, QFVC, Game theory, Biomimicry, Knowledge domains

### 7. OUTPUT FORMAT

```markdown
## 💬 LinkedIn Comment Draft

**For post by:** [Author Name]
**Topic detected:** [AI Governance / Safety / Energy / etc.]
**NI-Stack angle:** [Matching angle from positioning map]

---

[The generated comment text, ready to copy-paste]

---

**Hashtags:** #Tag1 #Tag2 #Tag3
**Estimated engagement:** [High/Medium/Low based on topic relevance]
**Copy to clipboard:** ✅ Ready
```

## Future Enhancements (Phase 2)

- [ ] Browser automation: Open LinkedIn, navigate to post, paste comment
- [ ] LinkedIn API integration (requires Developer App approval)
- [ ] Post scanning: Auto-detect relevant posts in feed
- [ ] Engagement analytics: Track which comments get most replies
- [ ] A/B testing: Compare comment styles for engagement rates
