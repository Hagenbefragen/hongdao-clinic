---
name: Blind Spot Detector
description: Systematic blind spot detection and analysis for any system, feature, dashboard, or innovation. Identifies what you're NOT measuring, NOT seeing, and NOT defending against — before the market does.
group: smart.security
---

# 🔍 Blind Spot Detector — "What Are We Missing?"

## Purpose

Every system has invisible weaknesses. This skill **systematically identifies and classifies** blind spots across 8 detection dimensions. It's the inverse of an audit — instead of scoring what exists, it reveals **what doesn't exist yet**.

> "The most dangerous failures come from problems you didn't know to look for."

## When to Trigger

- Before any major release (`/productionlaunch`)
- After completing an audit (`/audit_BP`) — to find what the audit missed
- When a feature reaches "done" status — challenge: is it really done?
- When preparing for VC/investor presentations — they WILL find your blind spots
- When a competitor launches a new feature — what did they see that you didn't?

## The 8 Blind Spot Dimensions

### 1. 📊 Measurement Gaps

**Question:** "What metrics are we NOT tracking that we should be?"

- Are there KPIs mentioned in strategy docs but never implemented?
- Are there dashboards showing vanity metrics instead of actionable ones?
- Is there a "success" metric without a corresponding "failure" metric?

**Detection Method:**

```
Search strategy docs for mentioned KPIs:
  grep -r "KPI\|metric\|measure\|track\|monitor" Documentation/ --include="*.md"
Then cross-reference with actual implementations:
  grep -r "metric\|counter\|gauge\|histogram" backend/src/ --include="*.ts"
Gap = Strategy mentions - Actual implementations
```

### 2. 🛡️ Defense Gaps

**Question:** "What attack vectors exist that we have NO defense against?"

- Is there injection protection but no rate limiting?
- Is there authentication but no authorization?
- Is there encryption at rest but not in transit (or vice versa)?
- Are there public endpoints without throttling?

**Detection Method:**

```
Map all @Public() decorated endpoints → verify each has @Throttle()
Map all file upload endpoints → verify file type + size validation
Map all user inputs → verify sanitization (XSS, SQLi, NoSQLi)
Map all external API calls → verify timeout + circuit breaker
```

### 3. 🧪 Testing Gaps

**Question:** "What code paths have ZERO test coverage?"

- Which modules have no unit tests at all?
- Which edge cases (null, empty, overflow, unicode) are untested?
- Which integration paths (A → B → C) have never been tested end-to-end?
- Is there regression testing for previously fixed bugs?

**Detection Method:**

```
Find all .service.ts files without corresponding .spec.ts files
Find all error handling blocks (catch) that are never tested
Find all feature flags that have no fallback test
```

### 4. 👤 User Experience Gaps

**Question:** "What happens when the user does something unexpected?"

- What's the experience when the backend is down?
- What happens on a 2G connection?
- What's the accessibility score for screen readers?
- What happens with very long names, RTL text, or emoji in inputs?

### 5. 📈 Scalability Gaps

**Question:** "What breaks at 10x or 100x current load?"

- Which database queries lack indexes for large datasets?
- Which in-memory structures grow unbounded?
- Which synchronous operations become bottlenecks under concurrency?
- Is there a message queue for async operations?

### 6. 🔄 Recovery Gaps

**Question:** "What happens when things go wrong?"

- Is there automatic retry with backoff for transient failures?
- Is there data backup and verified restore procedure?
- Is there a rollback plan for failed deployments?
- Are there circuit breakers for external dependencies?

### 7. 🌍 Ecosystem Gaps

**Question:** "What external dependencies could break us?"

- Which npm packages are unmaintained (>1 year without update)?
- Which APIs could change their pricing or terms?
- Which hardware requirements could become unavailable?
- Are there single-provider dependencies (e.g., only works on Apple Silicon)?

### 8. 📋 Documentation Gaps

**Question:** "What knowledge exists only in someone's head?"

- Are there undocumented environment variables?
- Are there architectural decisions without ADRs?
- Are there deployment steps that require tribal knowledge?
- Are there configuration values whose purpose is unclear?

## Output Format

For each blind spot found, produce:

```markdown
### BLIND SPOT: [Name]

- **Dimension:** [1-8 from above]
- **Severity:** 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low
- **Impact if exploited:** [What happens if this blind spot is hit]
- **Evidence:** [How we detected this gap]
- **Recommendation:** [Specific action to close the gap]
- **Effort:** S/M/L
- **Dependencies:** [What needs to happen first]
```

## Composite Blind Spot Score

Calculate: `Blind Spot Index = (gaps found × severity weight) / dimensions assessed`

| Rating        | Score | Meaning                                |
| ------------- | ----- | -------------------------------------- |
| 🟢 VIGILANT   | < 3   | Few blind spots, well-defended         |
| 🟡 AWARE      | 3-6   | Known gaps being addressed             |
| 🟠 EXPOSED    | 7-10  | Significant undefended areas           |
| 🔴 VULNERABLE | > 10  | Critical gaps require immediate action |

Weights: 🔴=4, 🟠=3, 🟡=2, 🔵=1

## Integration with Other Skills

- Feeds into: `audit_master` (adds missing dimensions)
- Feeds into: `devils_advocate` (stress-tests found gaps)
- Feeds into: `launch_guardian` (blocks launch if 🔴 gaps exist)
- Receives from: `security_audit` (known vulnerability data)
- Receives from: `data_sovereignty_audit` (interior data gaps)

## Example: NI Dashboard V2 Blind Spots Found

| #   | Blind Spot                                 | Dimension     | Severity  |
| --- | ------------------------------------------ | ------------- | --------- |
| 1   | No failure rate metric                     | Measurement   | 🟠 High   |
| 2   | No human calibration ground truth          | Testing       | 🟠 High   |
| 3   | Only 1 hardware config tested              | Scalability   | 🟡 Medium |
| 4   | No TCO comparison for decision-makers      | Documentation | 🟡 Medium |
| 5   | No composite trajectory proves improvement | Measurement   | 🟡 Medium |

All 5 were addressed in V2 via the Strategic Dashboard tab.
