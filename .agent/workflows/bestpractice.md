---
description: once and we do it right, we do best practice, always!
---

# /bestpractice - Diamond Standard Quality

**"Once and we do it right. Production-Ready Bulletproof. Always!"**

This workflow defines the non-negotiable quality standards for ALL OHM development. Every feature, fix, or polish MUST meet these criteria before being considered complete.

---

## 🎯 Core Philosophy

> **"Don't let me search for holes in the code!"**

We don't ship MVPs. We don't ship "good enough". We ship **bulletproof, production-ready code** that:

- Works on day 1 without hotfixes
- Handles edge cases gracefully
- Survives real user abuse
- Maintains quality under pressure

---

## ✅ The Diamond Checklist

**Every change MUST pass ALL of these before merge:**

### 1. 🔨 Build Integrity (Zero Tolerance)

```bash
npm run lint   # Zero errors, zero warnings
npm run build  # Clean build, no type errors
```

- [ ] TypeScript strict mode (no `any` unless documented)
- [ ] ESLint clean (no suppressions without justification)
- [ ] No console.log in production code
- [ ] No commented-out code blocks

### 2. 🛡️ Error Handling (Graceful Degradation)

- [ ] All async operations have try/catch
- [ ] API calls have loading, success, and error states
- [ ] User sees friendly error messages, not stack traces
- [ ] Fallback behavior when services are unavailable
- [ ] Network failures don't crash the app

### 3. 🎨 UI/UX Excellence (Premium Feel)

- [ ] Dark mode native (not afterthought)
- [ ] Mobile responsive (tested on real devices)
- [ ] Touch targets ≥48px on mobile
- [ ] Loading states for all async operations
- [ ] Empty states for all lists
- [ ] Micro-animations for polish

### 4. 🔐 Security (No Shortcuts)

- [ ] No secrets in code (use environment variables)
- [ ] Input validation on frontend AND backend
- [ ] SQL injection protection (parameterized queries)
- [ ] XSS protection (sanitize user content)
- [ ] Auth guards on all protected routes
- [ ] Rate limiting on public endpoints

### 5. 📱 Cross-Platform (Works Everywhere)

- [ ] Chrome 90+ ✅
- [ ] Firefox 88+ ✅
- [ ] Safari 14+ ✅
- [ ] Mobile Safari (iOS) ✅
- [ ] Chrome Mobile (Android) ✅

### 6. 🧪 Testing (Verified Behavior)

- [ ] Critical paths have test cases in `Browser_Test_Script.md`
- [ ] Happy path verified
- [ ] Error paths verified
- [ ] Edge cases documented
- [ ] `/browsertest` passes

### 7. 📚 Documentation (Self-Explanatory)

- [ ] Code comments explain "WHY", not "WHAT"
- [ ] Complex logic has inline documentation
- [ ] Public APIs have JSDoc/TSDoc
- [ ] Feature tracker updated
- [ ] AS_BUILD docs if new feature

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

## 🎖️ Quality Tiers

### Tier 1: Minimum Viable Quality (NEVER SHIP BELOW THIS)

- Builds without errors
- No critical bugs
- Basic error handling
- Works on Chrome

### Tier 2: Production Ready ⭐ (Our Standard)

- All Diamond Checklist items ✅
- Cross-browser tested
- Mobile responsive
- Graceful degradation
- Documentation complete

### Tier 3: Bulletproof 💎 (Premium Features)

- Stress tested
- Performance profiled
- Security audited
- A/B test ready
- Monitoring integrated

---

## 🚀 Quick Commands

```bash
# Full quality check before deploy
npm run lint && npm run build

# Run local dev with hot reload
npm run dev

# Check for TypeScript errors without building
npx tsc --noEmit
```

---

## 📋 Integration with Other Workflows

- `/featurerequest` → Calls `/bestpractice` in Step 9 (Final Verification)
- `/bugfix` → Must pass Diamond Checklist before closing bug
- `/deploy` → Blocked if lint or build fails
- `/browsertest` → Validates UI against Diamond Checklist

---

**"If it's not production-ready, it's not done."** 💎
