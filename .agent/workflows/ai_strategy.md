---
description: AI Strategy - BYOK, Markup, and Local Options for all AI features
---
# /ai_strategy - The "Sovereign AI" Framework

**"Your AI, Your Choice, Your Data."**

// turbo-all

## 🎯 Core Principle

OHM provides THREE tiers for ALL AI features, ensuring:
1. **User Sovereignty** - Control over data and costs
2. **OHM Sustainability** - Guaranteed profit on hosted services
3. **Privacy Options** - Local AI for maximum sovereignty

---

## 🏗️ The 3-Tier AI Architecture

### Tier 1: 🔑 BYOK (Bring Your Own Key) - "Sovereign Mode"
**User provides their own API key. OHM charges nothing for AI usage.**

| Provider | OAuth Login | API Key Input | Status |
|----------|-------------|---------------|--------|
| Google Gemini | ✅ Google OAuth | ✅ API Key | Recommended |
| OpenAI/ChatGPT | ❌ No OAuth | ✅ API Key | Supported |
| Anthropic Claude | ❌ No OAuth | ✅ API Key | Supported |
| Stability AI | ❌ No OAuth | ✅ API Key | Supported |

**Implementation:**
```typescript
// User stores their own API key (encrypted in their profile)
interface UserAIConfig {
    provider: 'gemini' | 'openai' | 'anthropic' | 'stability';
    apiKey: string; // Encrypted with user's key, NOT OHM's
    usageThisMonth: number;
    lastUsed: Date;
}
```

**Benefits:**
- Zero cost to OHM
- User pays provider directly
- Full transparency
- User owns their API quota

---

### Tier 2: 🏢 OHM-Hosted AI - "Convenience Mode"
**OHM provides the API. User pays 2x infrastructure cost.**

| Cost Component | Calculation | Example |
|----------------|-------------|---------|
| Provider Cost | Actual API cost | $0.01 per 1K tokens |
| OHM Markup | 2x Provider Cost | +$0.01 |
| **User Pays** | **Total** | **$0.02 per 1K tokens** |

**Pricing Formula:**
```
User Price = Provider Cost × 2.0
OHM Profit = 50% of User Price (guaranteed)
```

**XOM Integration:**
- Users pay in XOM tokens
- Real-time conversion rate: 1 XOM = $0.10 (adjustable)
- Example: 1000 tokens = 0.2 XOM

**Implementation:**
```typescript
// OHM-hosted AI billing
interface AIBillingRecord {
    userId: number;
    provider: string;
    tokensUsed: number;
    providerCostUsd: number;
    markup: 2.0; // Fixed 100% markup
    totalCostUsd: number;
    xomCharged: number;
    timestamp: Date;
}
```

---

### Tier 3: 🏠 Local AI (Ollama) - "Ghost Mode"
**AI runs locally. Zero external API calls. Maximum privacy.**

| Model | Use Case | Hardware Req |
|-------|----------|--------------|
| Llama 3 8B | Text generation | 8GB RAM |
| LLaVA | Image understanding | 16GB RAM |
| Mistral 7B | Code/chat | 8GB RAM |

**Implementation:**
```typescript
// Local AI config
interface LocalAIConfig {
    enabled: boolean;
    ollamaUrl: 'http://localhost:11434';
    preferredModel: 'llama3' | 'llava' | 'mistral';
    fallbackToCloud: boolean; // If local fails
}
```

**Benefits:**
- Zero data leaves device
- No usage fees
- Works offline
- GDPR/privacy compliant by design

---

## 📋 Implementation Checklist

When implementing ANY AI feature, ALWAYS:

### 1. Provider Selection UI
```jsx
<AIProviderSelector
    tiers={[
        { id: 'byok', label: '🔑 Use My Own Key', cost: 'Free' },
        { id: 'ohm', label: '🏢 OHM AI', cost: '2x markup' },
        { id: 'local', label: '🏠 Local (Ollama)', cost: 'Free' },
    ]}
    onSelect={(tier) => setAITier(tier)}
/>
```

### 2. Google OAuth for Gemini (BYOK)
```typescript
// Enable "Sign in with Google" to access user's Gemini quota
const googleScopes = [
    'https://www.googleapis.com/auth/generative-language.retriever',
    'https://www.googleapis.com/auth/generative-language.tuning',
];
```

### 3. Cost Transparency Modal
Before ANY AI operation, show:
```jsx
<CostPreviewModal>
    <p>This operation will use approximately:</p>
    <ul>
        <li>~2,000 tokens</li>
        <li>Provider cost: $0.02</li>
        <li>OHM fee: $0.02</li>
        <li>Total: 0.4 XOM</li>
    </ul>
    <Checkbox label="Don't show this again for small operations" />
    <Button>Proceed</Button>
</CostPreviewModal>
```

### 4. Usage Dashboard
Every user sees:
```jsx
<AIUsageDashboard>
    <StatCard label="This Month" value="45,230 tokens" />
    <StatCard label="XOM Spent" value="12.5 XOM" />
    <StatCard label="Provider" value="🔑 Your Gemini Key" />
    <Button>Switch to Local AI</Button>
</AIUsageDashboard>
```

---

## 🔐 Security Requirements

### API Key Storage (BYOK)
- [ ] Keys encrypted with user's passphrase (NOT OHM master key)
- [ ] Keys NEVER sent to OHM backend
- [ ] Keys stored in browser localStorage/IndexedDB only
- [ ] Option to use OAuth tokens instead of raw keys

### OHM-Hosted Keys
- [ ] Stored in `.env` (never in code)
- [ ] Loaded via `ConfigService`
- [ ] Rate-limited per user
- [ ] Usage logged for billing

---

## 💰 Pricing Table

| Feature | BYOK Cost | OHM-Hosted (2x) | Local |
|---------|-----------|-----------------|-------|
| **Chat/Text** | Free | 0.02 XOM/1K tokens | Free |
| **Image Gen** | Free | 0.5 XOM/image | N/A |
| **Voice Clone** | Free | 1 XOM/minute | Free* |
| **Sentiment Analysis** | Free | 0.01 XOM/analysis | Free |
| **Predictions** | Free | 0.05 XOM/prediction | Free |

*Local voice requires Piper setup

---

## 📊 Billing Integration

### XomBankService Integration
```typescript
// Charge user for AI usage
async chargeAIUsage(
    userId: number,
    operation: string,
    providerCost: number
): Promise<{ success: boolean; xomCharged: number }> {
    const markup = 2.0;
    const totalCostUsd = providerCost * markup;
    const xomRate = 0.10; // 1 XOM = $0.10
    const xomAmount = totalCostUsd / xomRate;
    
    return this.xomBankService.deduct(userId, xomAmount, `AI: ${operation}`);
}
```

---

## 🎨 UI Components Required

1. **AIProviderCard** - Display tier options
2. **APIKeyInput** - Secure key entry with validation
3. **UsageGauge** - Real-time token/cost display
4. **CostEstimator** - Preview before expensive operations
5. **BillingHistory** - Transaction log

---

## ✅ Compliance Checklist

Before shipping ANY AI feature:

- [ ] All 3 tiers implemented (BYOK, OHM, Local)
- [ ] Cost transparency shown BEFORE operation
- [ ] Usage tracking in place
- [ ] XOM billing integration (if OHM-hosted)
- [ ] Privacy policy updated with AI data handling
- [ ] Local fallback option available
- [ ] Google OAuth configured (for BYOK Gemini)
- [ ] Rate limits implemented

---

## 🚀 Quick Start for Developers

When adding a new AI feature:

1. **Check `/ai_strategy`** - Follow this workflow
2. **Add Provider Selection** - Let user choose tier
3. **Implement All 3 Providers** - BYOK, OHM, Local
4. **Add Billing Hooks** - For OHM-hosted tier
5. **Show Cost Preview** - Transparency is mandatory
6. **Update Pricing Table** - In this document

---

**"AI should empower, not exploit. Transparent pricing, sovereign choice."**
