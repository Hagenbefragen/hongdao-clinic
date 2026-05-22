---
name: Diamond Standard — Agent Philosophy & Code Patterns
description: The spiritual laws, mindset rules, and code patterns that define OHM Diamond Standard quality. Reference material for /bestpractice — the HOW and WHY behind bulletproof execution.
---

# 💎 Diamond Standard — Agent Philosophy & Code Patterns

## Purpose

This skill contains the **reference material** that underpins the `/bestpractice` workflow. While `/bestpractice` defines WHAT to check and WHEN, this skill defines HOW to think and WHY certain patterns exist.

**Read this skill when:**
- Starting a new session (internalize the mindset)
- Reviewing code quality (check patterns)
- Making architectural decisions (apply philosophy)
- Unsure whether something meets OHM quality standards

---

## 🦅 Toltec Wisdom

> **Full reference:** Read `toltec_wisdom` skill for the complete Five Agreements.
> **Summary:** Verify before claiming · Diagnose without ego · READ before EXECUTE · One clean version > 11 rushed · Listen to the code, not your assumptions.

---

## 🧠 Agent Mindset (Before You Touch Code)

> Derived from [Karpathy's LLM Coding Pitfalls](https://x.com/karpathy/status/2015883857489522876) — adapted for OHM Diamond Standard.

1. **Surface Assumptions** — State what you assume explicitly. If multiple interpretations exist, present them — don't pick silently. If uncertain, ask.
2. **Simplicity First** — No features beyond what was asked. No abstractions for single-use code. No speculative "flexibility." If 200 lines can be 50, rewrite it. Ask: "Would a senior engineer say this is overcomplicated?"
3. **Surgical Changes** — Only touch what the request requires. Don't "improve" adjacent code, comments, or formatting. Match existing style. If you notice unrelated dead code, mention it — don't delete it. Every changed line must trace directly to the user's request.
4. **Verifiable Goals** — Transform every task into `[Step] → verify: [check]` format. "Fix the bug" → "Write a test that reproduces it, then make it pass." Weak criteria ("make it work") require clarification first.

---

## 🚫 Forbidden Patterns

### Code Smells (Never Ship These)

```typescript
// ❌ NEVER: any type without documentation
const data: any = response.data;

// ❌ NEVER: Empty catch blocks
try { ... } catch (e) { }

// ❌ NEVER: Console.log in production
console.log('debug:', value);

// ❌ NEVER: Hardcoded secrets
const apiKey = 'sk-1234567890';

// ❌ NEVER: Magic numbers without explanation
if (value > 42) { ... }

// ❌ NEVER: Commented-out code blocks
// const oldImplementation = () => { ... }
```

### Architecture Violations

- ❌ Never modify core VC/Stream files directly (use plugins)
- ❌ Never bypass XomBankService for treasury operations
- ❌ Never use mock API calls in production components (use real endpoints)
- ❌ Never silently cap XOM/currency amounts without user feedback
- ❌ Never store PII unencrypted
- ❌ Never use `!important` in CSS without justification
- ❌ Never nest callbacks more than 2 levels deep

---

## ✅ Required Patterns

### TypeScript

```typescript
// ✅ DO: Explicit types
interface UserData {
  id: string;
  name: string;
  email?: string;
}

// ✅ DO: Descriptive error handling
try {
  const result = await api.fetchUser(userId);
  return result;
} catch (error) {
  logger.error("Failed to fetch user", { userId, error });
  throw new UserFetchError("Unable to load user data");
}

// ✅ DO: Guard clauses
if (!user) {
  return <EmptyState message="No user found" />;
}
```

### React

```tsx
// ✅ DO: Loading, Error, Success states
const { data, isLoading, error } = useQuery(...);

if (isLoading) return <Skeleton />;
if (error) return <ErrorState message={error.message} />;
if (!data) return <EmptyState />;

return <DataView data={data} />;
```

### API

```typescript
// ✅ DO: Input validation
@Post('create')
async create(@Body() dto: CreateItemDto) {
  // Validation happens automatically via class-validator
  return this.service.create(dto);
}

// ✅ DO: Consistent error responses
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User with ID xyz not found"
  }
}
```

---

## 🔄 Pre-Commit Ritual

Before EVERY commit, run through this mentally:

1. **Would I be embarrassed if this went viral?**
2. **Could a malicious user break this?**
3. **Does this work on my phone?**
4. **What happens when the network fails?**
5. **Is this the code I want to maintain in 2 years?**

If any answer is "maybe" or "no", fix it first.

---

## Integration

This skill is the reference companion to `/bestpractice`. The workflow orchestrates WHEN to check quality. This skill defines the PHILOSOPHY and PATTERNS that inform those checks.

- **Toltec Wisdom** → Internalized at session start, enforced by HCS (Honest Completion Statement)
- **Agent Mindset** → Applied before every code change
- **Forbidden/Required Patterns** → Referenced during Diamond Checklist items 1-4
- **Pre-Commit Ritual** → Applied before every `git commit`
