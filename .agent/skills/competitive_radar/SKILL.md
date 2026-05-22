---
name: Competitive Radar
description: Monitor competitor patent filings, product launches, and technology moves for OHM's core domains. Early warning system that ensures we're never blindsided.
group: smart.ai
---

# 📡 Competitive Radar — "Know What They Filed Before They Ship It"

## Purpose

Systematic competitor monitoring across **patents, products, research, and hiring signals**. Provides early warning when competitors move into OHM's technology domains.

## When to Trigger

- Weekly: automated patent filing scan
- When a competitor announces a new AI safety/alignment feature
- Before any patent filing (validate our claims don't overlap)
- During strategic planning sessions
- When `horizon_scanner` identifies a new technology trend

## Competitors to Monitor

### Tier 1 (Direct competitors in AI alignment/safety)

| Company         | Focus Areas                                | Patent Authority |
| --------------- | ------------------------------------------ | ---------------- |
| OpenAI          | RLHF, Constitutional AI, Evals             | USPTO, EPO       |
| Anthropic       | Constitutional AI, RLAIF, Interpretability | USPTO            |
| Google DeepMind | Gemini safety, alignment research          | USPTO, WIPO      |
| Meta AI         | Llama safety, open-source alignment        | USPTO            |

### Tier 2 (Sovereign/local AI)

| Company   | Focus Areas              |
| --------- | ------------------------ |
| Ollama    | Local inference runtime  |
| LM Studio | Local model management   |
| Jan.ai    | Privacy-first AI         |
| Mozilla   | Trustworthy AI standards |

### Tier 3 (Compression/efficiency)

| Company     | Focus Areas             |
| ----------- | ----------------------- |
| Together AI | Efficient inference     |
| Cerebras    | Hardware-accelerated AI |
| Groq        | Low-latency inference   |

## Monitoring Dimensions

### 1. Patent Filings

**Search queries for USPTO/EPO/WIPO:**

```
"AI alignment" AND "self-improving"
"prompt injection" AND "detection"
"token compression" AND "fibonacci" OR "golden ratio"
"12-dimensional" AND "alignment"
"sovereign AI" AND "local inference"
"negentropic" OR "negentropy" AND "artificial intelligence"
```

**Action:** Flag any filing that overlaps with OHM's 45 inventions

### 2. Product Launches

- Monitor: Product Hunt, Hacker News, TechCrunch
- Track: features that solve problems OHM solves differently
- **Key question:** "Does their approach invalidate our patent claims?"

### 3. Research Papers

- Monitor: arXiv (cs.AI, cs.CL, cs.CR), Nature Machine Intelligence
- Track: new techniques for alignment, compression, drift detection
- **Key question:** "Does this paper describe our approach as prior art?"

### 4. Hiring Signals

- Monitor: LinkedIn job postings for key terms
- Track: "alignment engineer", "AI safety", "prompt security"
- **Key question:** "Are they building a team for what we already built?"

## Output Format

```markdown
# COMPETITIVE RADAR REPORT — [Month Year]

## 🔴 Alerts (Requires Immediate Action)

[Patents filed or products launched that overlap with OHM IP]

## 🟡 Watch (Monitor Closely)

[Research papers or hiring signals in our domains]

## 🟢 Clear (No Threats)

[Domains where OHM maintains clear whitespace]

## Opportunity Signals

[Competitor weaknesses we can exploit]

## Recommended Actions

1. [Specific response to each alert]
```

## Integration

- **Feeds into:** `triz_whitespot` (competitor gaps = our opportunities)
- **Feeds into:** `patent_claim_generator` (ensure claims don't overlap)
- **Feeds into:** `strategic_advisor` (competitive positioning)
- **Receives from:** `horizon_scanner` (technology trends to track)
