# Video Scripts for VeraTongue

## 1. 2-3 Minute Technical Explainer Video

**Title:** VeraTongue: Deep-Dive into Sovereign On-Device Diagnostics
**Visual Style:** Modern, minimal dark theme, showcasing code snippets, diagrams (tongue zones, quality gates), and a screen recording of the app.

---

### [0:00 - 0:30] Introduction (The Why)
* **Visual:** Close-up of a smartphone displaying the camera scanning guide overlay. A green bounding box fits around the user's tongue. As they extend it, a sidebar updates in real time.
* **Speaker:** "How do we understand what’s going on inside our body on a daily basis? Wearables measure physical movement and heart rate. But they don't capture metabolic changes, digestive health, or hydration levels. Traditional Chinese Medicine has used a natural indicator for centuries: the human tongue. VeraTongue digitizes this diagnostic mirror using modern computer vision—completely on your device."

---

### [0:30 - 1:15] Stage 1: The 7 Quality Gates
* **Visual:** The 7 quality gates infographic is shown. Each gate highlights sequentially as a green checkmark appears.
* **Speaker:** "Accuracy starts with clean input. The engine forces the camera feed through 7 non-negotiable checks. The tongue detection gate scans for specific red-to-green pixel ratios. The extension gate verifies the Kidney zone at the root is visible. We check brightness, sharpness using Laplacian edge detection, and normalize white balance against the D65 standard. If a frame fails any check, the scan pauses. This guarantees consistent readings without professional clinical lighting."

---

### [1:15 - 2:00] Stage 2: K-Means Segmentation & Mapping
* **Visual:** An animation showing the cropped tongue canvas converting from sRGB colors to the CIELAB (Lab) color space, then splitting into three clusters (Background, Body, Coating).
* **Speaker:** "Once validated, the cropped tongue region is converted to Lab color space. A local K-means algorithm segments the image. By locating the highest positive $a^*$ cluster, the system defines the tongue body redness. The highest lightness cluster identifies the coating. Next, the canvas is divided into the 9 classical organ zones mapped by Giovanni Maciocia. The tip correlates to the Heart; the center to Spleen and Stomach; the sides to Liver; and the root to Kidneys."

---

### [2:00 - 2:30] Conclusion & Privacy
* **Visual:** The digital signature footer animation fades in. The text 'Zero-Cloud Biometrics' is highlighted.
* **Speaker:** "VeraTongue maps these findings across 8 diagnostic axes, generating a local constitutional report. Because all calculations run client-side in a sandboxed canvas, no facial images or health profiles are ever uploaded. Discover the technical specifications and try the local HTML build today at destill.ai."

---

## 2. 30-Second TikTok / Reels Hook Variants

### Variant A (Focus: Biohacking & Daily Routine)
* **Visual:** Fast cuts of a user waking up, scanning their tongue with the app, showing the Spleen/Stomach center analysis.
* **Hook:** "If you’re not checking your tongue first thing in the morning, you’re missing a direct map of your digestion."
* **Script:** "Your tongue changes color and texture depending on hydration, diet, and stress. VeraTongue lets you track these changes locally using your phone camera. No servers, completely private. Check the link in bio to read the spec!"

### Variant B (Focus: Privacy & Tech)
* **Visual:** A laptop showing the CIELAB conversion code, panning to a phone screen.
* **Hook:** "Here's how we built a biometric health scanner that doesn't upload a single photo to the cloud."
* **Script:** "VeraTongue runs K-means segmentation directly in the browser's canvas memory. It checks focus, lighting, and D65 white balance ratios locally, mapping your tongue surface to 9 organ zones. Clean, private tech. Learn more at destill.ai."
