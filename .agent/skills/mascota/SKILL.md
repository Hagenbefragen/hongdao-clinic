---
name: OHM Mascota
description: Trigger and control the OHM mascota to guide users through the ecosystem (onboarding, claims, features).
group: smart.frontend
---

# OHM Mascota Skill

The OHM Mascota is a friendly animal guide that helps users navigate the OHM ecosystem. This skill documents how to trigger, customize, and extend the mascota system.

## 🦜 Available Mascots

The system includes 12 mascots users can choose from:

| ID      | Name     | Emoji | Default Greeting               |
| ------- | -------- | ----- | ------------------------------ |
| parrot  | Polly    | 🦜    | "Ahoy! Welcome to the stream!" |
| cat     | Whiskers | 🐱    | "Meow! Great to see you here!" |
| dog     | Buddy    | 🐕    | "Woof! Welcome, friend!"       |
| dolphin | Splash   | 🐬    | "Click-click! Dive right in!"  |
| owl     | Sage     | 🦉    | "Hoo-hoo! Welcome, wise one."  |
| fox     | Finn     | 🦊    | "Hey there! Glad you joined!"  |
| rabbit  | Hoppy    | 🐰    | "Hop hop! Welcome to OHM!"     |
| penguin | Waddles  | 🐧    | "Waddle waddle! Stay cool!"    |
| koala   | Kiki     | 🐨    | "G'day mate! Relax and enjoy." |
| panda   | Bamboo   | 🐼    | "Ni hao! Find your balance."   |
| unicorn | Sparkle  | 🦄    | "✨ Magic awaits you!"         |
| phoenix | Ember    | 🔥    | "Rise with me! Welcome!"       |

## 📍 Mascota Locations

### 1. StreamMascotPlugin (VC/Streams)

**Location:** `frontend/components/vc/plugins/StreamMascotPlugin.tsx`
**Context:** Guest onboarding in streams

Features:

- Auto-starts for new guests
- Context-aware welcome (knows invite source)
- 360° camera detection
- Interactive demo animations (clicks, reactions, bids)
- Progress dots for multi-step tours

**Trigger programmatically:**

```typescript
// Force show mascot (reset welcomed state)
localStorage.removeItem("ohm_mascot_welcomed_rooms");
```

### 2. AccountClaimModal (Identity Security)

**Location:** `frontend/components/modals/AccountClaimModal.tsx`
**Context:** Guest account upgrade

Features:

- Guides through 3 sovereignty options (Email, Wallet, OHM File)
- Provides contextual help for each method
- Shows error recovery guidance
- Celebrates successful claim

### 3. MainLayout Navigation (Coming Soon)

**Planned Location:** `frontend/components/MainLayout/MascotGuide.tsx`
**Context:** First-time user navigation

Planned features:

- Explains main menu sections
- Guides to profile setup
- Introduces Trust Graph
- Shows XOM earning opportunities

## 🎯 Triggering Mascota Guidance

### At Signup (Mascot Selection)

Users should choose their preferred mascot during onboarding. This happens in the registration flow:

**Location:** `frontend/components/screens/WelcomeScreen.tsx` or `RegistrationWizard`

```typescript
// Show mascot selector during onboarding
import { MascotSelector } from "@/components/mascot/MascotSelector";

// In onboarding step
<MascotSelector
  onSelect={(mascotId) => {
    localStorage.setItem("ohm_mascot_preference", mascotId);
    // Continue to next step
  }}
  title="Choose Your Guide"
  subtitle="This friendly companion will help you navigate OHM!"
/>;
```

**Implementation Checklist:**

- [x] Add `MascotSelector` component ✅ `frontend/components/mascot/MascotSelector.tsx`
- [x] Include in registration wizard (Step 3) ✅ `ProfileCreationWizard.tsx`
- [x] Store preference in localStorage ✅ + Profile.preferredMascot for backend sync
- [x] Show selected mascot in first onboarding message ✅ via MascotGuide

### Via URL Parameters

```
?mascot=tour     # Start full onboarding tour
?mascot=feature  # Highlight specific feature
?mascot=claim    # Prompt identity claim
```

### Via sessionStorage

```typescript
// Trigger specific guidance
sessionStorage.setItem("ohm_mascot_trigger", "claim");
sessionStorage.setItem("ohm_mascot_trigger", "invite");
sessionStorage.setItem("ohm_mascot_trigger", "xom");
```

### Via React Hook (Recommended)

```typescript
// Import the hook
import { useMascota } from "@/hooks/useMascota";

// Use in component
const { showMascot, hideMascot, setMessage } = useMascota();

// Trigger guidance
showMascot({
  message: "Want to claim your account? I'll guide you!",
  action: () => setShowClaimModal(true),
  actionLabel: "Claim Now",
});
```

## 🧩 Extending Mascota

### Adding New Onboarding Steps

Edit `StreamMascotPlugin.tsx`:

```typescript
const MY_NEW_STEPS: OnboardingStep[] = [
  {
    id: "my-feature",
    message: "🌟 Check out this awesome new feature!",
    highlight: '[data-plugin-id="my-plugin"]',
    duration: 4000,
    demoAction: "click",
    position: "bottom-left",
  },
];

// Merge with base steps
const steps = useMemo(() => {
  return [...ONBOARDING_STEPS, ...MY_NEW_STEPS];
}, []);
```

### Adding Context-Aware Messages

```typescript
// In getContextAwareWelcome()
if (inviteContext?.source === "retreat") {
  return {
    ...baseStep,
    message: `Welcome from OHM Retreats! 🏝️ Ready for your digital wellness journey?`,
  };
}
```

### Mascot Personality Customization

```typescript
// User selects mascot via preferences
localStorage.setItem("ohm_mascot_preference", "owl");

// Load with fallback
const mascotId = localStorage.getItem("ohm_mascot_preference") || "parrot";
const mascot = MASCOTS.find((m) => m.id === mascotId);
```

## 📋 Mascota Guidelines

### DO:

- ✅ Use friendly, encouraging language
- ✅ Keep messages under 100 characters when possible
- ✅ Provide actionable next steps
- ✅ Celebrate user achievements
- ✅ Explain "why" not just "what"

### DON'T:

- ❌ Interrupt critical actions (payments, calls)
- ❌ Show mascot to returning users (unless forced)
- ❌ Use technical jargon
- ❌ Block the UI for too long
- ❌ Show more than 3 messages in quick succession

## 🎨 Styling

The mascot uses these CSS classes:

```css
.mascot-highlight {
  animation: mascot-pulse 1s ease-in-out infinite;
  box-shadow: 0 0 20px 5px rgba(99, 102, 241, 0.5);
}

.mascot-avatar {
  animation: mascot-bounce 2s ease-in-out infinite;
}
```

## 🔗 Related Files

- `frontend/hooks/useMascota.tsx` - Global mascota hook ✅ CREATED
- `frontend/hooks/useAppTour.ts` - MainLayout navigation tour ✅ CREATED
- `frontend/components/mascot/MascotGuide.tsx` - Speech bubble overlay ✅ CREATED + TTS
- `frontend/components/mascot/MascotHelpButton.tsx` - Floating help button ✅ CREATED
- `frontend/components/mascot/MascotSelector.tsx` - Signup selector ✅ CREATED
- `frontend/components/mascot/steps/MascotStep.tsx` - Wizard step ✅ CREATED
- `frontend/components/settings/MascotSettings.tsx` - Settings panel ✅ CREATED + i18n
- `frontend/components/mascot/i18n.ts` - Multi-language translations ✅ CREATED
- `frontend/components/mascot/personalities.ts` - Personality system ✅ CREATED
- `frontend/components/mascot/useMascotTTS.ts` - Voice announcements ✅ CREATED
- `frontend/components/mascot/index.ts` - Barrel exports ✅ CREATED
- `frontend/hooks/useInviteContext.ts` - Detects user entry source
- `frontend/components/vc/plugins/pluginTypes.ts` - VCPlugin interface
- `frontend/context/AppContext.tsx` - Global state for user/mascot prefs

## 📝 Development Steps

### Completed ✅

1. [x] Create `useMascota` hook for global control
2. [x] Add `MascotSelector` component for signup
3. [x] Add `MascotStep` to ProfileCreationWizard (Step 3)
4. [x] Add `MascotGuide` overlay to App.tsx
5. [x] Add `MascotHelpButton` floating button
6. [x] Store preference in `Profile.preferredMascot` for backend sync
7. [x] Create `MascotSettings` panel in Settings tab
8. [x] Create `useAppTour` hook skeleton for MainLayout navigation
9. [x] **Voice announcements (TTS integration)** - `useMascotTTS.ts`
10. [x] **Multi-language support (i18n)** - 5 languages: EN, DE, ES, FR, ZH
11. [x] **Mascot personality variations** - 12 unique personality types

### Languages Supported 🌍

| Code | Language | Flag |
| ---- | -------- | ---- |
| en   | English  | 🇬🇧   |
| de   | Deutsch  | 🇩🇪   |
| es   | Español  | 🇪🇸   |
| fr   | Français | 🇫🇷   |
| zh   | 中文     | 🇨🇳   |

### Personality Types 🎭

| Mascot     | Type        | Enthusiasm |
| ---------- | ----------- | ---------- |
| 🦜 Parrot  | adventurous | high       |
| 🐱 Cat     | curious     | medium     |
| 🐕 Dog     | loyal       | high       |
| 🐬 Dolphin | playful     | high       |
| 🦉 Owl     | wise        | low        |
| 🦊 Fox     | clever      | medium     |
| 🐰 Rabbit  | energetic   | high       |
| 🐧 Penguin | calm        | low        |
| 🐨 Koala   | relaxed     | low        |
| 🐼 Panda   | balanced    | medium     |
| 🦄 Unicorn | magical     | high       |
| 🔥 Phoenix | fierce      | high       |
