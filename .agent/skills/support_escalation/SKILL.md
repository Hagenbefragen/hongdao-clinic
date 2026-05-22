---
name: Support Escalation
description: 4-tier support model (Self-serve → AI → Human → Specialist). FAQ auto-generation, sentiment analysis, SLA framework, and ticket priority scoring.
group: smart.security
---

# 🆘 Support Escalation — Sovereign Support Architect

> **Persona:** You are a Head of Support who believes 80% of tickets should never exist. You design self-serve systems that resolve issues before users even think to complain. When they do reach out, every interaction builds trust.

## 1. The 4-Tier Support Model

```
┌──────────────────────────────────────────┐
│          TIER 4: SPECIALIST              │ ← Dev team, security, legal
│          (Bugs, security, compliance)     │    SLA: 24h
│          ~2% of issues                    │
├──────────────────────────────────────────┤
│       TIER 3: HUMAN SUPPORT              │ ← Ambassadors, team members
│       (Complex: billing, account issues)  │    SLA: 4h
│       ~8% of issues                       │
├──────────────────────────────────────────┤
│    TIER 2: AI SUPPORT (CLAWDBOT)         │ ← AI-powered responses
│    (FAQ, how-to, troubleshooting)         │    SLA: Instant
│    ~30% of issues                         │
├──────────────────────────────────────────┤
│ TIER 1: SELF-SERVE                       │ ← Docs, FAQ, tooltips
│ (Search, knowledge base, in-app help)     │    SLA: Instant
│ ~60% of issues                            │
└──────────────────────────────────────────┘
```

---

## 2. Tier 1: Self-Serve Excellence

### 2.1 Knowledge Base Structure

```
📚 Help Center
├── 🚀 Getting Started
│   ├── Create your account
│   ├── Set up your profile
│   ├── Understand Trust Scores
│   └── Your first stream room
├── 💰 Billing & XOM
│   ├── How XOM works
│   ├── Purchase XOM
│   ├── Refund policy
│   └── Subscription management
├── 🎥 Streaming
│   ├── Create a room
│   ├── Invite viewers
│   ├── Recording & downloads
│   └── Troubleshooting audio/video
├── 🤖 Digital Twin
│   ├── Setup your DT
│   ├── Train your DT
│   ├── Heritage transfer
│   └── Privacy settings
├── 🔒 Security & Privacy
│   ├── Two-factor authentication
│   ├── Data export (GDPR)
│   ├── Delete account
│   └── Report abuse
└── 🐛 Known Issues
    ├── Current bugs (with workarounds)
    └── Planned fixes (with timeline)
```

### 2.2 In-App Contextual Help

| Element | Where | Trigger |
|---------|-------|---------|
| **Tooltip** | Next to complex UI elements | Hover/tap |
| **Inline Help** | Settings, billing pages | Always visible |
| **Tutorial Overlay** | First use of any feature | Automatic (dismissible) |
| **Search** | Header of all pages | Keyboard shortcut (⌘K / Ctrl+K) |

---

## 3. Tier 2: AI Support (Clawdbot)

### 3.1 AI Triage Rules

```typescript
interface SupportQuery {
  text: string;
  category: 'billing' | 'technical' | 'account' | 'feature' | 'abuse';
  sentiment: 'positive' | 'neutral' | 'frustrated' | 'angry';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

// Decision logic
if (query.category === 'abuse' || query.priority === 'critical') {
  escalateToTier4(); // Security/legal
} else if (query.sentiment === 'angry' || query.category === 'billing') {
  escalateToTier3(); // Human touch needed
} else if (knowledgeBaseMatch(query.text)) {
  respondWithArticle(); // Tier 2 self-resolve
} else {
  escalateToTier3(); // Unknown → human
}
```

### 3.2 AI Response Quality Rules

| Rule | Why |
|------|-----|
| Never hallucinate features | "I'm not sure about that — let me connect you with a team member" |
| Acknowledge frustration | "I understand this is frustrating. Let me help." |
| Provide article links | Always reference knowledge base articles |
| Know escalation limit | After 2 failed attempts → auto-escalate to Tier 3 |
| Log all interactions | Every AI conversation saved for quality review |

---

## 4. Tier 3: Human Support

### 4.1 Agent Response Templates

| Scenario | Template |
|----------|---------|
| **Greeting** | "Hi [Name]! Thanks for reaching out. I'm [Agent], and I'm here to help. 🌟" |
| **Investigating** | "I'm looking into this for you right now. I'll have an update within [time]." |
| **Resolution** | "Great news — [explain fix]. Let me know if there's anything else!" |
| **Escalation** | "This needs our specialist team. I'm escalating this now — you'll hear back within [time]. Reference: #[ticket-id]" |
| **Apology** | "I'm sorry for the inconvenience. Here's what we're doing to fix it: [action]" |

### 4.2 Tone Guidelines

| Do | Don't |
|-----|-------|
| Use their name | Use "Dear User" or "Customer" |
| Be warm and human | Be robotic or generic |
| Own mistakes ("We messed up") | Blame ("You did X wrong") |
| Provide next steps | Leave them hanging |
| Follow up proactively | Wait for them to ask again |

---

## 5. Priority Scoring

### 5.1 Priority Matrix

| Factor | Weight | Low (1) | Medium (2) | High (3) | Critical (4) |
|--------|--------|---------|-----------|----------|--------------|
| **Impact** | 40% | Single user | Group | All users | Data loss/security |
| **Urgency** | 30% | No deadline | Days | Hours | Minutes |
| **Sentiment** | 20% | Happy/neutral | Slightly frustrated | Frustrated | Angry/threatening |
| **Revenue** | 10% | Free user | Growth tier | Pro tier | Sovereign/Enterprise |

```
Priority Score = (Impact × 0.4) + (Urgency × 0.3) + (Sentiment × 0.2) + (Revenue × 0.1)

Score 1-1.5: Low    → Respond within 24h
Score 1.5-2.5: Med  → Respond within 4h
Score 2.5-3.5: High → Respond within 1h
Score 3.5-4: Crit   → Respond within 15min
```

---

## 6. SLA Framework

| Tier | Response Time | Resolution Time | CSAT Target |
|------|-------------|----------------|------------|
| Sovereign | 15 min | 2 hours | 98% |
| Pro | 1 hour | 8 hours | 95% |
| Growth | 4 hours | 24 hours | 90% |
| Free | 24 hours | 72 hours | 85% |

---

## 7. FAQ Auto-Generation

### From Ticket Analysis

```
1. Collect top 50 support tickets from last 30 days
2. Cluster by topic using Clawdbot classification
3. Identify top 10 repeated questions
4. Generate FAQ entries:
   - Question (from user words, not internal jargon)
   - Short answer (1-2 sentences)
   - Detailed answer (steps, screenshots)
   - Related articles (internal links)
5. Publish to knowledge base
6. Add in-app tooltip at relevant UI points
7. Train Clawdbot with new FAQ entries
```

---

## 8. Integration Points

| Skill | When to Invoke | Purpose |
|-------|---------------|---------|
| `mascota` | In-app help | Parrot guide for self-serve |
| `community_builder` | Community support channel | Ambassador-powered Tier 2.5 |
| `content_alchemist` | Knowledge base content | SEO-optimized help articles |
| `audit_master` | Support quality audit | BPC Dimension 15 scoring |

---

**Usage:** Invoke when designing support systems, creating knowledge bases, or optimizing ticket resolution.
**Version:** 1.0 (Feb 2026)
