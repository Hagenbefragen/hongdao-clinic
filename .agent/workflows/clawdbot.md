---
description: Clawdbot AI Assistant - Create skills, configure LLM, build integrations
---

# /clawdbot - Sovereign AI Assistant Workflow

**Your AI, Your Data, Your Choice.**

// turbo-all

---

## 🎯 Quick Start

### 1. Use Clawdbot in Your Code

```typescript
import { useClawdbot } from "@/lib/clawdbot";

const MyComponent = () => {
  const { messages, sendMessage, isLoading } = useClawdbot({
    llm: {
      tier: "local", // 'local' | 'byok' | 'ohm'
      provider: "ollama", // 'ollama' | 'claude' | 'gemini'
      model: "llama3",
    },
    persistSession: true,
  });

  return (
    <button onClick={() => sendMessage("Hello!")}>
      {isLoading ? "Thinking..." : "Ask AI"}
    </button>
  );
};
```

### 2. Choose Your LLM Tier

| Tier      | Provider       | Cost           | Privacy |
| --------- | -------------- | -------------- | ------- |
| **Local** | Ollama         | FREE           | Maximum |
| **BYOK**  | Claude/Gemini  | Your API cost  | High    |
| **OHM**   | Claude via OHM | 2x cost in XOM | Medium  |

---

## 📝 Creating Skills

Skills are Markdown files with YAML frontmatter that extend Clawdbot's capabilities.

### Skill Template

```markdown
---
name: My Awesome Skill
trigger: message # 'message' | 'schedule' | 'file_upload' | 'event'
patterns: ["/mycommand"] # For message triggers
schedule: "0 9 * * *" # For schedule triggers (cron)
platforms: [ohmchat] # Where skill is active
author: your-handle
version: 1.0.0
price: 0 # XOM cost (0 = free)
---

# Skill Title

Describe what the skill does...

## Instructions

1. When user says [pattern], do [action]
2. Format response as [format]
3. Include [elements]

## Context Required

- User's name
- Current time
- Recent messages

## Example Output
```

Hello {userName}! Here's your summary...

```

```

### Skill Types

#### 1. Command Skills (Message Trigger)

```markdown
---
name: Trust Score Checker
trigger: message
patterns: ["/trust", "my trust score", "show trust"]
---

# Trust Score Skill

When triggered, retrieve and display the user's trust score breakdown.

## Response Format

- Total Score: X/100
- Breakdown by category
- Recent changes
- Tips to improve
```

#### 2. Scheduled Skills

```markdown
---
name: Weekly Digest
trigger: schedule
schedule: "0 9 * * 1" # Every Monday 9 AM
---

# Weekly Digest

Generate a summary of:

- XOM earned this week
- Trust score changes
- New connections
- Upcoming retreats
```

#### 3. Event-Based Skills

```markdown
---
name: New Vouch Handler
trigger: event
event: vouch_received
---

# Vouch Received

When user receives a new vouch:

1. Notify them
2. Suggest reciprocating
3. Update trust context
```

### Skill Locations

```
frontend/lib/clawdbot/skills/
├── builtin/               # OHM default skills
│   ├── morning-briefing.md
│   ├── ohm-commands.md
│   └── code-review.md
├── community/             # Community shared skills
│   └── [skill-name].md
└── custom/                # User's private skills
    └── [my-skill].md
```

---

## 🔧 LLM Provider Configuration

### Local (Ollama) - Maximum Privacy

```typescript
const config: ClawdbotConfig = {
  llm: {
    tier: "local",
    provider: "ollama",
    model: "llama3",
    ollamaUrl: "http://localhost:11434", // Optional
  },
};
```

**Setup:**

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull models
ollama pull llama3
ollama pull codellama   # For code tasks
ollama pull mistral     # Alternative
```

### BYOK (Bring Your Own Key)

```typescript
const config: ClawdbotConfig = {
  llm: {
    tier: "byok",
    provider: "claude",
    model: "claude-3-sonnet-20240229",
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
};
```

**Supported Providers:**

- `claude` - Anthropic Claude (claude-3-sonnet, claude-3-opus)
- `gemini` - Google Gemini (gemini-pro, gemini-1.5-pro)
- `openai` - OpenAI GPT (gpt-4, gpt-4-turbo)

### OHM-Hosted (Pay with XOM)

```typescript
const config: ClawdbotConfig = {
  llm: {
    tier: "ohm",
    provider: "claude",
    model: "claude-3-sonnet-20240229",
    // No API key needed - uses OHM's keys
  },
};
```

**Pricing:**

- 0.02 XOM per 1K tokens (2x Claude's base price)
- Deducted from user's XOM balance
- Transparent cost shown in UI

---

## 🔌 Integration Patterns

### With Digital Twin

```typescript
import { useClawdbot } from "@/lib/clawdbot";
import { useDigitalTwin } from "@/lib/twin";

const TwinChat = () => {
  const { personality, voiceProfile } = useDigitalTwin();
  const { sendMessage } = useClawdbot({
    systemPrompt: personality.prompt,
    llm: { tier: "local", provider: "ollama", model: "llama3" },
  });

  // Clawdbot now speaks as the user's Twin
};
```

### With Messenger Hub

```typescript
import { useClawdbot } from "@/lib/clawdbot";
import { useMessengerHub } from "@/lib/messenger-hub";

const UnifiedInbox = () => {
  const { messages } = useMessengerHub();
  const { sendMessage } = useClawdbot({
    /* config */
  });

  const generateReply = async (incomingMsg) => {
    const context = `Platform: ${incomingMsg.platform}\nFrom: ${incomingMsg.sender}`;
    await sendMessage(
      `Suggest reply to: "${incomingMsg.text}"\nContext: ${context}`,
    );
  };
};
```

### With Retreat Concierge

```typescript
const RetreatAI = ({ retreatId }) => {
  const { sendMessage } = useClawdbot({
    systemPrompt: `You are the AI concierge for retreat ${retreatId}. 
                       Help guests with questions about schedule, location, and amenities.
                       Be warm, friendly, and spiritually aligned.`,
    llm: { tier: "ohm", provider: "claude", model: "claude-3-sonnet" },
  });
};
```

---

## 🧪 Testing Skills

### Manual Test

```typescript
// In browser console or test file
import { ClawdbotCore, createClawdbot } from "@/lib/clawdbot";

const bot = createClawdbot({
  llm: { tier: "local", provider: "ollama", model: "llama3" },
});

// Test skill trigger
const response = await bot.chat("/trust");
console.log(response.content);
```

### Automated Test

```typescript
// __tests__/clawdbot/skills.test.ts
describe("OHM Commands Skill", () => {
  it("responds to /trust command", async () => {
    const bot = createClawdbot(testConfig);
    const response = await bot.chat("/trust");

    expect(response.content).toContain("Trust Score");
  });
});
```

---

## 📦 Publishing to ClawdHub

### 1. Prepare Your Skill

- Test thoroughly
- Add clear documentation
- Include example outputs
- Set appropriate price

### 2. Submit PR

```bash
# Fork clawdhub repo
git clone https://github.com/ohm-ecosystem/clawdhub.git
cd clawdhub/skills/community

# Add your skill
cp ~/my-skill.md ./

# Submit
git add .
git commit -m "feat(skill): Add my-skill"
git push origin main
# Create PR on GitHub
```

### 3. Review Process

1. Community review (7 days)
2. OHM team approval
3. Published to registry
4. Start earning XOM!

---

## 🚨 Best Practices

### Do ✅

- Keep skills focused on ONE task
- Provide clear examples
- Handle edge cases gracefully
- Test with multiple LLM providers
- Include error messaging

### Don't ❌

- Don't request sensitive data unnecessarily
- Don't make external API calls without user consent
- Don't store conversation data externally
- Don't hardcode API keys in skills
- Don't create skills that could harm users

### Security Checklist

- [ ] No PII exposure in prompts
- [ ] API keys stored encrypted
- [ ] Memory never sent to cloud (unless OHM tier)
- [ ] Skills validated before execution
- [ ] Rate limiting on expensive operations

---

## 📊 Monitoring & Analytics

### Session Stats

```typescript
const { totalTokens, totalCost } = useClawdbot(config);

// Display to user
<span>
  Tokens: {totalTokens} | Cost: ${totalCost.toFixed(4)}
</span>;
```

### Skill Usage (For Creators)

Access via ClawdHub dashboard:

- Install count
- Daily active users
- Revenue earned
- User ratings

---

## 🔗 Related

- [CLAWDBOT_WIN_WIN.md](../Documentation/Benefits/CLAWDBOT_WIN_WIN.md) - Full ecosystem benefits
- [CLAWDBOT_OHM_INTEGRATION_PLAN.md](../Documentation/Plans/CLAWDBOT_OHM_INTEGRATION_PLAN.md) - Technical roadmap
- [/ai_strategy](./ai_strategy.md) - BYOK and pricing guidelines
- [/bestpractice](./bestpractice.md) - Code quality standards

---

_Clawdbot: Sovereign AI for a Decentralized World._
