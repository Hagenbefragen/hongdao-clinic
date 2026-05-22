---
name: Sovereign Backgrounds
description: Design and implement meditative, brainwave-entraining background animations for the OHM ecosystem. From Alpha (8-12Hz) relaxation to Theta (4-8Hz) flow states.
group: smart.frontend
---

# 🌌 Sovereign Backgrounds — Meditative Animation Skill

> Generate immersive, consciousness-expanding background animations that guide users from **Beta alertness** through **Alpha relaxation** into **Theta flow states**. Every background should feel like entering a temple.

---

## PART 1: THE 12 COMMANDMENTS OF SOVEREIGN BACKGROUNDS

### Commandment 1: "BRAINWAVE ENTRAINMENT"

- Animations must **never be jarring**. All motion follows the brainwave spectrum:
  - **Beta (13-30 Hz):** Use for loading states only, fast particle motion
  - **Alpha (8-12 Hz):** Default resting frequency — gentle pulsing at 0.1-0.125s per cycle
  - **Theta (4-8 Hz):** Deep meditative — breathing animations at 0.125-0.25s per cycle
  - **Delta (0.5-4 Hz):** Near-stillness — 0.25-2s per cycle, for sleep/vault screens
- The **Schumann Resonance (7.83 Hz)** is the golden center — use `126ms` cycle time as the sacred default

### Commandment 2: "SACRED GEOMETRY"

- All layouts follow **Fibonacci spirals** (φ = 1.618033...)
- **Flower of Life** patterns for mandala backgrounds
- **Vesica Piscis** for overlapping glow circles
- **Metatron's Cube** for grid-based particle connections
- The **Golden Ratio** must appear in sizing: 1.0 → 1.618 → 2.618 → 4.236

### Commandment 3: "CHROMATIC SOVEREIGNTY"

- Use the **7 Chakra Color Map** for emotional resonance:
  ```
  Root (Muladhara):     hsl(0, 70%, 50%)    — Grounding, stability
  Sacral (Svadhisthana): hsl(30, 80%, 55%)   — Creativity, flow
  Solar (Manipura):      hsl(45, 90%, 55%)   — Power, sovereignty
  Heart (Anahata):       hsl(150, 60%, 45%)  — Connection, love
  Throat (Vishuddha):    hsl(200, 70%, 50%)  — Communication, truth
  Third Eye (Ajna):      hsl(260, 60%, 55%)  — Intuition, wisdom
  Crown (Sahasrara):     hsl(280, 50%, 65%)  — Oneness, transcendence
  ```
- Never use plain red, blue, or green. Always HSL-tuned to chakra harmony.

### Commandment 4: "BREATHING MOTION"

- Every background must include a **breathing cycle**:
  - Inhale: 4 seconds (expand, brighten by 5-10%)
  - Hold: 2 seconds (gentle shimmer)
  - Exhale: 6 seconds (contract, dim by 5-10%)
  - Hold: 2 seconds (stillness)
- Total cycle: **14 seconds** — this maps to ~4.3 bpm (deep relaxation)
- Use `cubic-bezier(0.45, 0, 0.55, 1)` — the `--ease-calm` from Bliss Design

### Commandment 5: "DEPTH & PARALLAX"

- Minimum 3 layers: far background (slowest), mid nebula, near particles
- Far layer: 0.1x scroll speed / 0.001 rotation
- Mid layer: 0.3x scroll speed / 0.003 rotation
- Near layer: 1.0x scroll speed / 0.01 rotation
- Creates a **natural 3D depth** without requiring WebGL

### Commandment 6: "PERFORMANCE FIRST"

- Canvas-based: Max 60fps on mobile, degrade to 30fps automatically
- CSS-only variant must exist for every canvas background (fallback)
- Use `requestAnimationFrame` with frame skipping on low-end devices
- Max particle count: 150 (mobile), 500 (desktop)
- Always set `pointer-events: none` and `aria-hidden: true`

### Commandment 7: "COLOR TEMPERATURE SHIFT"

- Backgrounds gradually shift warm↔cool based on time:
  - Morning (6-12): Warm golden tones (Solar Plexus / Sacral)
  - Afternoon (12-18): Balanced teal/green (Heart center)
  - Evening (18-24): Cool violet/indigo (Third Eye / Crown)
  - Night (0-6): Deep space black/violet (Delta)
- Override: User's current chakra/mood selection takes priority

### Commandment 8: "ORGANIC, NOT MECHANICAL"

- No straight lines. All motion follows **Perlin noise** or **simplex noise**
- Particles should drift like **bioluminescent plankton** in still water
- Gradients should pulse like a **living heartbeat**, not flash like a strobe
- Use sine/cosine combined waves for natural oscillation

### Commandment 9: "SOUND-LIGHT COHERENCE" (Future)

- Background animation speed should be able to sync with audio BPM
- Ambient sound frequency maps to color: 432Hz → Gold, 528Hz → Green (Heart)
- When voice is detected in VC, particles gently pulse with vocal energy

### Commandment 10: "PROGRESSIVE REVELATION"

- Never show the full effect immediately
- Phase 1 (0-3s): Fade from black, reveal first layer
- Phase 2 (3-8s): Second layer appears, breathing begins
- Phase 3 (8-15s): Full depth revealed, sacred geometry fades in
- Phase 4 (15s+): Steady meditative state, minimal change

### Commandment 11: "ACCESSIBILITY & SAFETY"

- `prefers-reduced-motion`: Show static gradient only, no animation
- Never flash faster than 3Hz (photosensitive epilepsy guideline)
- Always provide `aria-hidden="true"` on background containers
- Contrast ratio between background and text must remain ≥ 4.5:1

### Commandment 12: "PARADISE DNA"

- Every background should evoke a **specific natural environment**:
  - 🌅 Sunrise over ocean → Golden warmth rising
  - 🌌 Deep space nebula → Cosmic sovereignty
  - 🌿 Forest canopy → Green dappled light
  - 🌊 Ocean depth → Bioluminescent particles
  - 🏔️ Mountain altitude → Crisp clarity with distant stars
  - 🔥 Campfire → Warm amber particles dancing

---

## PART 2: THE OHM BACKGROUND LIBRARY (As-Built)

### Existing Components

| #   | Name                          | File                                            | Type      | Description                                                                                                     | Used By                                                      |
| --- | ----------------------------- | ----------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | **SupernovaBackground**       | `shared/SupernovaBackground.tsx`                | React+CSS | Star particles colliding → supernova glow. 4 palettes (cosmic/golden/rose/aurora). Configurable intensity 0-100 | ConnectTab, Alchemy, Echo, OHM Algorithm, Disruption portals |
| 2   | **PleiadianGalaxyBackground** | `layout/PleiadianGalaxyBackground.tsx`          | Canvas    | 800 stars in 3D spiral galaxy with perspective projection. Deep violet gradient. 3-arm spiral. Slow rotation    | App.tsx shell, MeshInitializer                               |
| 3   | **LavaLampBackground**        | `layout/LavaLampBackground.tsx`                 | CSS-only  | 3 floating blobs (violet/pink/blue) with blur(80px). Rainbow hue rotation 45-60s cycle. Glass overlay layer     | General fallback                                             |
| 4   | **QuantumField**              | `marketing/quantum/visuals/QuantumField.tsx`    | Canvas    | 150 Fibonacci-spiral biophotons with connection lines. Mouse-responsive resonance. Indigo-purple palette        | Quantum Landing Page                                         |
| 5   | **GoldenSunFlower**           | `marketing/quantum/visuals/GoldenSunFlower.tsx` | React+SVG | Radial golden sunrise with Flower of Life SVG geometry. Progress-driven (0-1). Dark vignette overlay            | Quantum Landing Page sunrise                                 |
| 6   | **CosmicBackground**          | `website/src/components/CosmicBackground.tsx`   | Canvas    | Clone of PleiadianGalaxy for website repo. Same 800-star 3D spiral                                              | Website (Alchemy page)                                       |

### New Backgrounds To Build

| #   | Name                       | Mood       | Frequency Target     | Description                                                                                         |
| --- | -------------------------- | ---------- | -------------------- | --------------------------------------------------------------------------------------------------- |
| 7   | **ZenGardenBackground**    | Stillness  | Theta (6Hz)          | Minimal raked sand lines with occasional pebble ripples. Muted earth tones. Breathing sand patterns |
| 8   | **OceanDepthBackground**   | Flow       | Alpha (10Hz)         | Bioluminescent particles drifting in deep ocean currents. Teal/cyan palette. Gentle wave motion     |
| 9   | **ForestCanopyBackground** | Connection | Alpha (8Hz)          | Dappled green light filtering through leaves. Firefly particles at night. Seasonal color shifts     |
| 10  | **BreathOfLifeBackground** | Meditation | Theta (4Hz)          | Expanding/contracting mandala with breathing cycle. 14s full cycle. Soft gold/white                 |
| 11  | **AuroraFlowBackground**   | Wonder     | Alpha-Theta (7.83Hz) | Northern lights curtain effect. Schumann resonance timing. Green/pink/violet waves                  |
| 12  | **SacredFireBackground**   | Warmth     | Alpha (12Hz)         | Campfire particles rising. Amber/orange warmth. Ember glow at bottom. Safe, grounding               |

---

## PART 3: IMPLEMENTATION PATTERNS

### Standard Interface (All Backgrounds)

```tsx
interface SovereignBackgroundProps {
  /** Animation intensity 0-100 (0 = static gradient, 100 = full animation) */
  intensity?: number;
  /** Override default color palette */
  palette?:
    | "cosmic"
    | "golden"
    | "emerald"
    | "ocean"
    | "earth"
    | "aurora"
    | "fire";
  /** Enable breathing cycle (default: true) */
  breathing?: boolean;
  /** Target brainwave frequency in Hz (default: 7.83 Schumann) */
  frequency?: number;
  /** Additional CSS classes */
  className?: string;
}
```

### CSS-Only Fallback Pattern

```css
/* Every canvas background must have this CSS-only fallback */
.sovereign-bg-fallback {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    hsl(260, 30%, 12%) 0%,
    hsl(240, 20%, 6%) 50%,
    hsl(0, 0%, 0%) 100%
  );
}

/* Breathing animation (prefers-reduced-motion respects this) */
@media (prefers-reduced-motion: no-preference) {
  .sovereign-bg-fallback::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(168, 85, 247, 0.05) 0%,
      transparent 60%
    );
    animation: sovereign-breathe 14s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  }
}

@keyframes sovereign-breathe {
  0% {
    transform: scale(1);
    opacity: 0.3;
  } /* Hold */
  28% {
    transform: scale(1.1);
    opacity: 0.5;
  } /* Inhale 4s */
  43% {
    transform: scale(1.1);
    opacity: 0.5;
  } /* Hold 2s */
  86% {
    transform: scale(1);
    opacity: 0.3;
  } /* Exhale 6s */
  100% {
    transform: scale(1);
    opacity: 0.3;
  } /* Hold 2s */
}
```

### Canvas Performance Guard

```typescript
// Always include this in canvas backgrounds
const getOptimalParticleCount = () => {
  if (typeof navigator === "undefined") return 100;
  const cores = navigator.hardwareConcurrency || 2;
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  if (isMobile) return Math.min(cores * 25, 150);
  return Math.min(cores * 75, 500);
};

// Frame rate throttling
let lastFrameTime = 0;
const targetFPS = 30; // Mobile-friendly default
const frameInterval = 1000 / targetFPS;

const animate = (timestamp: number) => {
  if (timestamp - lastFrameTime < frameInterval) {
    requestAnimationFrame(animate);
    return;
  }
  lastFrameTime = timestamp;
  // ... render logic
};
```

---

## PART 4: USAGE GUIDE

### Quick Start

```tsx
import { SupernovaBackground } from '@/components/shared/SupernovaBackground';
import { PleiadianGalaxyBackground } from '@/components/layout/PleiadianGalaxyBackground';

// For a landing page with cosmic depth:
<PleiadianGalaxyBackground />
<YourContent />

// For a feature page with warm supernova energy:
<SupernovaBackground palette="golden" intensity={60} />
<YourContent />

// For a meditative page with minimal motion:
<SupernovaBackground palette="aurora" intensity={20} showSupernova={false} />
<YourContent />
```

### Choosing the Right Background

| Page Purpose                    | Recommended Background          | Intensity | Palette          |
| ------------------------------- | ------------------------------- | --------- | ---------------- |
| Landing page (first impression) | PleiadianGalaxy or QuantumField | 80-100    | cosmic           |
| Feature portal                  | SupernovaBackground             | 40-60     | varies by portal |
| Dashboard / working area        | LavaLamp or none                | 20-30     | muted            |
| Meditation / wellness           | ZenGarden or BreathOfLife       | 10-20     | earth/golden     |
| Payment / serious actions       | Static gradient only            | 0         | n/a              |
| Gift pages (delight moments)    | GoldenSunFlower or AuroraFlow   | 50-70     | golden/aurora    |

---

## PART 5: BRAINWAVE SCIENCE REFERENCE

### Frequency Bands & Their Effects

```
Band      Hz Range    Effect                    Design Implication
─────────────────────────────────────────────────────────────────
Gamma     30-100 Hz   Hyper focus, insight       Rapid particle bursts (loading only)
Beta      13-30 Hz    Active thinking            Default web browsing, subtle motion
Alpha     8-12 Hz     Relaxed awareness          Gentle breathing, soft particle drift
Theta     4-8 Hz      Deep meditation, flow      Slow mandala rotation, minimal change
Delta     0.5-4 Hz    Deep sleep, healing        Near-static, color shifts over minutes
Schumann  7.83 Hz     Earth's resonance          THE sacred timing (128ms per cycle)
```

### Converting Hz to CSS Animation Duration

```
frequency_hz → animation_duration_ms = 1000 / frequency_hz
7.83 Hz → 127.7ms ≈ 128ms (one pulsation cycle)

For visible breathing: use 4-8 full cycles as one "breath"
Example: 7.83 Hz × 4 cycles = ~0.51 seconds visible pulse period
         7.83 Hz × 14 cycles = ~1.79 seconds (one full breathing animation)
```
