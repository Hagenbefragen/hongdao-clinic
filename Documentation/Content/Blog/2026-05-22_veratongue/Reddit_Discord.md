# Reddit Post (Target: r/MachineLearning or r/artificial)

**Title:** [Project] VeraTongue: An On-Device CIELAB K-Means Segmentation Engine for Traditional Chinese Medicine (TCM) Topographical Analysis

**Disclosures:** I am affiliated with DESTILL.ai, the team behind this development.

**Abstract & Implementation Overview:**
Traditional Chinese Medicine (TCM) diagnostic treatises (e.g., Giovanni Maciocia's topography) map the human tongue surface into 9 distinct organ-aligned zones. We have implemented a serverless, browser-native pipeline called **VeraTongue** that digitizes this methodology entirely on-device, resolving the privacy issues of biometric image uploads.

### Technical Architecture
The core engine consists of two pipeline stages running locally in WebGL/Canvas:

1. **7-Gate Input Quality Verification:**
   To maintain diagnostic repeatability across consumer-grade camera sensors, raw frames must pass seven strict threshold gates before analysis. 
   - *Luminance Gate:* Validates mean brightness stays between 45 and 220.
   - *White Balance Gate:* Assesses standard D65 illuminant alignment by ensuring the Blue/Red mean channel ratio falls between 0.5 and 1.5.
   - *Sharpness Gate:* Applies a Laplacian edge detection check, requiring a variance greater than 100 to filter out motion blur.
   - *Obstruction Gate:* Rejects frames containing lip/finger skin-tone profiles in the upper 15% zone.

2. **CIELAB Segmenter (K-means, k=3):**
   Once verified, the bounding box of the tongue is converted from sRGB to CIELAB (Lab) space. We apply K-means clustering to segment the tongue body from the coating:
   - *Tongue Body:* Isolated via the highest positive $a^*$ (redness) centroid.
   - *Tongue Coating:* Segmented using the highest lightness ($L^*$) centroid relative to the tongue body mask.
   - *Diagnostic Output:* Edge detection maps crack density per zone, and localized chroma analysis measures red spot distributions.

The system maps the tongue into coordinate zones corresponding to Heart (0-8% height), Lung (8-25%), Spleen/Stomach (25-65% center), Liver/Gallbladder (25-65% sides), and Kidney (65-100% root).

We welcome code review and feedback on our calibration methods under variable light sources.

**Full Technical Write-up (HTML blog, diagrams, formulas):** [Link to Blog.html / DESTILL.ai]

***

# Discord Message (Embed Format)

### 🗺️ VeraTongue: Sovereign On-Device Tongue Analysis

We have just released the technical blueprint and local implementation files for **VeraTongue**—our serverless tongue topography analysis system! 

Here are the key takeaways:
* **Zero Cloud Dependency:** The image analysis runs 100% inside your local browser context using canvas K-means segmentation. No biometric data is uploaded.
* **7 Quality Gates:** Enforces rigid white balance, brightness, resolution, and blur thresholds before analysis to guarantee repeatable readings.
* **Organ Topography:** Implements the classical Maciocia map, dividing the tongue canvas into 9 zones to analyze Spleen, Stomach, Heart, Liver, and Kidneys.
* **8-Axis Metrics:** Automatically measures color, coating thickness, moisture level, scalloping, and sublingual vein pressure.

**🛠️ How it was built (TRIZ Principles):**
1. *Principle 35 (Parameter change)* rejects bad frames before they hit the algorithm.
2. *Principle 1 (Segmentation)* isolates canvas sections for parallel processing.
3. *Principle 17 (Another dimension)* separates TCM archetypes from Western pathology to fit educational regulatory frameworks.

👉 **Read the full spec and check out the diagrams:** [Link to Blog.html]
💬 **Discussion Prompt:** How do you see on-device computer vision changing daily personal health telemetry? Let us know in #general!
