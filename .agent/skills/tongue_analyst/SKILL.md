---
name: "VeraTongue Sovereign Tongue Analyst"
description: "World-class tongue topography analyst skill based on Giovanni Maciocia, Bernard Jensen, and modern AI-assisted TCM diagnostics. Performs organ-level zone mapping, coating/body separation, morphological assessment, sublingual vein analysis, and generates WHO-grade PDF reports. Enforces 7-gate image quality preconditions before any analysis. Always apply this skill when generating VeraTongue PDF reports."
---

# VeraTongue Sovereign Tongue Analyst Skill

> **Purpose:** Transform raw tongue photographs into WHO-grade wellness assessment reports with organ-level precision, using the combined wisdom of Classical TCM (Maciocia, Kirschbaum, Deadman), Western clinical pathology, and modern computer vision. This skill is the SINGLE SOURCE OF TRUTH for all VeraTongue analysis and PDF generation.

---

## 1. THEORETICAL FOUNDATION

### 1.1 The Maciocia Tongue Map (Organ Zone Topography)

The tongue is a mirror of the body's internal organ systems. Based on Giovanni Maciocia's definitive work "Tongue Diagnosis in Chinese Medicine" (2nd Ed.), the tongue is divided into **9 diagnostic zones** mapped to the Three Burners (San Jiao):

```
┌─────────────────────────────────────────────┐
│                 TONGUE MAP                   │
│                                              │
│              ┌───────────┐                   │
│              │   HEART   │  ← Very Tip       │
│              │  (心 xīn)  │                   │
│              ├───────────┤                   │
│              │   LUNG    │  ← Behind Tip     │
│              │  (肺 fèi)  │                   │
│     ┌────────┼───────────┼────────┐          │
│     │ LIVER  │  SPLEEN   │ LIVER  │          │
│     │  /GB   │ /STOMACH  │  /GB   │ ← Middle │
│     │(肝 gān)│ (脾胃)     │(胆 dǎn)│          │
│     └────────┼───────────┼────────┘          │
│              │  KIDNEY   │  ← Root           │
│              │ /BLADDER  │                   │
│              │ /INTESTINE│                   │
│              │  (肾 shèn) │                   │
│              └───────────┘                   │
└─────────────────────────────────────────────┘
```

**Zone Coordinates (Percentage of tongue length from tip):**

| Zone | Location | Organs | Burner |
|------|----------|--------|--------|
| Z1 | 0-8% from tip | Heart (心) | Upper Jiao |
| Z2 | 8-25% from tip | Lung (肺) | Upper Jiao |
| Z3-L | Left side, 25-65% | Liver (肝) | Middle Jiao |
| Z3-R | Right side, 25-65% | Gallbladder (胆) | Middle Jiao |
| Z4 | Center, 25-65% | Spleen/Stomach (脾胃) | Middle Jiao |
| Z5 | 65-100% (root) | Kidney (肾) | Lower Jiao |
| Z6 | Deep root | Bladder/Intestines | Lower Jiao |

### 1.2 The 8 Diagnostic Dimensions

Every tongue analysis MUST evaluate all 8 dimensions. Each dimension maps to specific pathological patterns:

#### Dimension 1: BODY COLOR (舌色 shé sè)
| Color | TCM Pattern | Western Correlation |
|-------|------------|---------------------|
| Pale pink | Normal / Healthy | Adequate circulation |
| Pale / White | Qi/Blood/Yang deficiency | Anemia, hypothyroidism, poor circulation |
| Red | Heat (excess or deficiency) | Inflammation, infection, dehydration |
| Deep red / Crimson | Extreme heat, Yin deficiency | Severe dehydration, high fever |
| Purple / Dusky | Blood stasis, Qi stagnation | Poor microcirculation, venous congestion |
| Blue-purple | Cold stagnation, severe stasis | Cyanosis, cardiovascular compromise |
| Orange-red | Stomach heat with dampness | GERD, gastritis |

#### Dimension 2: TONGUE SHAPE (舌形 shé xíng)
| Shape | TCM Pattern | Western Correlation |
|-------|------------|---------------------|
| Normal (medium, fits mouth) | Balanced constitution | Healthy tissue |
| Swollen / Enlarged | Spleen Qi/Yang deficiency, Dampness | Hypothyroidism, allergic reaction, sleep apnea |
| Thin / Narrow | Blood/Yin deficiency | Dehydration, cachexia, chronic illness |
| Stiff / Rigid | Wind, Heat in Pericardium | Neurological issues, stroke risk |
| Flaccid / Limp | Qi/Blood deficiency | Extreme fatigue, malnutrition |
| Deviated (crooked) | Internal Wind | Stroke, Bell's palsy, neurological deficit |
| Short (can't extend fully) | Internal Cold or severe deficiency | Neuromotor dysfunction |
| Long (extends easily past chin) | Heart Heat | Constitutional variant |

#### Dimension 3: TOOTH MARKS (齿痕 chǐ hén)
| Pattern | TCM Interpretation | Western Correlation |
|---------|-------------------|---------------------|
| No marks | Normal | Adequate tongue size |
| Mild scalloping | Early Spleen Qi deficiency | Mild tissue edema |
| Deep indentations | Spleen Yang deficiency with Dampness | Sleep apnea, bruxism, hypothyroid |
| Unilateral marks | Qi stagnation on one side | TMJ disorder, dental malocclusion |

#### Dimension 4: COATING (苔 tāi)
| Coating | TCM Pattern | Western Correlation |
|---------|------------|---------------------|
| Thin white (normal) | Healthy Stomach Qi | Normal oral flora |
| Thick white | Cold-Dampness, Spleen Yang deficiency | Candidiasis, poor digestion |
| Yellow | Heat in Stomach/Intestines | Bacterial overgrowth, GERD, infection |
| Gray/Black | Extreme heat or cold | Severe illness, antibiotic use |
| Greasy/Oily | Phlegm-Dampness | Metabolic syndrome, high cholesterol |
| Dry coating | Yin deficiency, fluid depletion | Dehydration, Sjögren's syndrome |
| Peeled (no coating) | Stomach/Kidney Yin deficiency | Atrophic gastritis, B12 deficiency |
| Geographic (patchy) | Stomach Yin deficiency with Heat | Benign migratory glossitis |
| Rootless coating | Kidney essence depletion | Chronic illness, elderly decline |

#### Dimension 5: CRACKS & FISSURES (裂纹 liè wén)
| Pattern | TCM Interpretation | Clinical Note |
|---------|-------------------|---------------|
| Central vertical crack (to tip) | Heart Yin deficiency | Emotional stress, insomnia |
| Central vertical crack (mid) | Stomach Yin deficiency | Chronic gastritis, poor diet |
| Transverse cracks (sides) | Spleen Yin deficiency | Chronic fatigue |
| Random scattered cracks | Blood deficiency | Iron/B12 deficiency |
| Deep fissured (scrotal tongue) | Severe Yin/blood deficiency | Often constitutional, benign |
| Ice-crack pattern | Kidney Yin depletion | Chronic degenerative conditions |

#### Dimension 6: SUBLINGUAL VEINS (舌下络脉 shé xià luò mài)
| Pattern | TCM Interpretation | Clinical Significance |
|---------|-------------------|-----------------------|
| Thin, light blue | Normal | Healthy circulation |
| Distended, dark | Blood stasis | Cardiovascular risk factors |
| Tortuous / Varicose | Severe Qi/Blood stagnation | Age-related, hypertension |
| Purple nodules | Extreme stasis | Investigate cardiovascular health |
| One side darker | Unilateral stagnation | Localized pathology |

#### Dimension 7: MOISTURE (津液 jīn yè)
| Level | TCM Pattern | Clinical Note |
|-------|------------|---------------|
| Moist (normal sheen) | Healthy fluids | Well-hydrated |
| Wet / Dripping | Dampness excess, Yang deficiency | Edema tendency |
| Dry | Yin deficiency, heat consuming fluids | Dehydration, diabetes |
| Sticky | Phlegm-dampness | Metabolic issues |
| Mirror-like (shiny, no coat) | Stomach Yin completely depleted | Severe chronic condition |

#### Dimension 8: MOVEMENT & TREMOR
| Pattern | TCM Interpretation | Clinical Note |
|---------|-------------------|---------------|
| Still and stable | Normal | Healthy neuromotor |
| Trembling | Liver Wind, Spleen Qi deficiency | Anxiety, Parkinson's, essential tremor |
| Protruding/licking | Heart/Spleen heat | Behavioral, pediatric conditions |
| Deviated on protrusion | Internal Wind | Neurological assessment needed |

---

## 2. IMAGE QUALITY PRECONDITIONS — THE 7 GATES

**No analysis shall proceed unless ALL 7 gates pass.** These gates are non-negotiable. The app must enforce them BEFORE any diagnostic algorithm runs.

### Gate 1: TONGUE DETECTION
- **Requirement:** A tongue-shaped object must be detected in the frame using color heuristics (R > G × 1.15 AND R > B × 1.15 for ≥10% of guide area pixels).
- **Failure:** "No tongue detected. Please open your mouth and extend your tongue fully."
- **Implementation:** Canvas pixel sampling within the tongue guide overlay boundary.

### Gate 2: TONGUE EXTENSION
- **Requirement:** The tongue must fill ≥40% of the guide area vertically.
- **Failure:** "Please extend your tongue further to expose the root zone (Kidney area)."
- **Implementation:** Measure the contiguous vertical span of tongue-colored pixels.

### Gate 3: LIGHTING / BRIGHTNESS
- **Requirement:** Average brightness of the guide area must be between 45 and 220 (on 0-255 scale).
- **Failure (dark):** "Lighting too low. Please move to a brighter area."
- **Failure (bright):** "Lighting too bright / washed out. Please reduce direct light."
- **Implementation:** Calculate mean (R+G+B)/3 across guide area pixels.

### Gate 4: COLOR TEMPERATURE / WHITE BALANCE
- **Requirement:** The ratio of average Blue to average Red channel should be between 0.5 and 1.5 (to detect extreme warm/cool bias).
- **Failure:** "Color temperature out of range. Avoid fluorescent or candlelight. Use daylight or D65 standard."
- **Implementation:** Compare mean(B) / mean(R) ratio across guide area.

### Gate 5: RESOLUTION
- **Requirement:** Camera feed must be ≥640×480 pixels minimum. Ideal: 1280×720.
- **Failure:** "Camera resolution too low for accurate topography mapping."
- **Implementation:** Check `video.videoWidth` and `video.videoHeight`.

### Gate 6: MOTION BLUR
- **Requirement:** The captured frame must have sufficient edge contrast (Laplacian variance > threshold).
- **Failure:** "Image is blurry. Please hold your device steady."
- **Implementation:** Compute Laplacian variance on grayscale canvas data. If variance < 100, reject.

### Gate 7: OBSTRUCTION CHECK
- **Requirement:** The upper portion (0-15%) of the guide area should not be dominated by lip/skin-colored pixels.
- **Failure:** "Lips or fingers are obstructing the tongue. Please tilt your device."
- **Implementation:** Check if the top 15% of the guide area has >80% skin-tone pixels (high R, moderate G, low B differentiation).

---

## 3. ZONE-LEVEL ANALYSIS ALGORITHM

Once all 7 gates pass, the analysis engine proceeds through these steps:

### Step 1: Tongue Segmentation
- Convert the guide area to **Lab color space** (L*a*b*).
- Use K-means clustering (k=3) to separate: background, tongue body, tongue coating.
- The cluster with highest a* (red-green axis, toward red) = tongue body.
- The cluster with highest L* (lightness) on the tongue = coating.

### Step 2: Zone Extraction
Using the tongue's bounding box within the guide:
- **Z1 (Heart):** Top 8% of tongue height, center 50% width.
- **Z2 (Lung):** 8-25% height, center 60% width.
- **Z3-L (Liver):** 25-65% height, left 25% width.
- **Z3-R (Gallbladder):** 25-65% height, right 25% width.
- **Z4 (Spleen/Stomach):** 25-65% height, center 50% width.
- **Z5 (Kidney):** 65-100% height, center 70% width.

### Step 3: Per-Zone Color Analysis
For each zone, compute:
- **Mean H, S, V** (HSV color space) for body color classification.
- **Mean L*, a*, b*** for coating analysis.
- **Coating ratio:** % of zone pixels classified as coating vs. body.
- **Crack density:** Edge detection within zone, normalized by zone area.
- **Red spot density:** Count of high-saturation red pixels (H < 15° or H > 345°, S > 60%).

### Step 4: Pattern Matching
Map each zone's metrics to the diagnostic tables in Section 1.2 using rule-based thresholds:

```
IF zone.mean_hue IN [0°, 30°] AND zone.mean_saturation > 50%:
    body_color = "Red" → Heat pattern
ELIF zone.mean_saturation < 20% AND zone.mean_value > 180:
    body_color = "Pale" → Deficiency pattern
```

### Step 5: Constitutional Archetype Synthesis
After all 6 zones are scored, compute the Five Element (五行) archetype:
- Fire score = Z1(Heart).heat_index × 2 + overall_redness
- Water score = Z5(Kidney).coldness_index × 2 + overall_moisture
- Earth score = Z4(Spleen).dampness_index × 2 + coating_thickness
- Metal score = Z2(Lung).dryness_index × 2 + coating_absence
- Wood score = (Z3L + Z3R).stagnation_index × 2 + sublingual_veins

---

## 4. PDF REPORT STRUCTURE

Every VeraTongue PDF report MUST contain these sections in this order:

### Page 1: Cover
- VeraTongue logo + "Sovereign Health Mirror™"
- Timestamp + Device ID (anonymized)
- "Zero-Cloud Biometric Analysis — No PII Transmitted"
- Constitutional Archetype name + Element symbol

### Page 2: Tongue Photograph with Zone Overlay
- Original photograph with the 9-zone grid overlay
- Color-coded zones: Red circles for areas of concern, Green for healthy
- SVG legend lines connecting zones to organ labels
- Quality gate scores (all 7 gates: PASS)

### Page 3: Organ-Level Diagnostic Breakdown
For EACH of the 6 zones, provide:
```
┌─────────────────────────────────────────┐
│ ZONE: Heart (心) — Tip of Tongue        │
│ Body Color: Slightly Red                │
│ Coating: Thin white (normal)            │
│ TCM Pattern: Mild Heart Heat            │
│ Confidence: 72%                         │
│ Wellness Tip: Practice calming breathwork│
│               before sleep. Avoid       │
│               stimulants after 3pm.     │
└─────────────────────────────────────────┘
```

### Page 4: 8-Axis Radar Chart
- Visual radar/spider chart showing all 8 diagnostic dimensions
- Comparison to "ideal" baseline
- Trend data if longitudinal scans exist

### Page 5: Wellness Recommendations
- **Diet:** Specific foods to add/avoid based on constitution
- **Lifestyle:** Exercise, sleep, stress management
- **TCM Remedies:** Classical herbal formula suggestions (disclaimer: consult practitioner)
- **Western Correlations:** Any flags that warrant professional consultation

### Page 6: Methodology & Disclaimer
- "Based on Giovanni Maciocia's Tongue Diagnosis in Chinese Medicine"
- "86-chart Zunge Corpus + 8-dimension rule engine"
- "NOT a medical device. For wellness self-discovery only."
- "Supported Languages: EN / DE / ES / PT / CN"
- "Want more languages? Donate XOM to support development!"

---

## 5. LANGUAGE MATRIX

All report text MUST be available in 5 native languages. The system auto-detects browser locale.

| Key | EN | DE | ES | PT | CN |
|-----|----|----|----|----|-----|
| archetype_fire | Fire Constitution | Feuer-Konstitution | Constitución de Fuego | Constituição de Fogo | 火体质 |
| archetype_water | Water Constitution | Wasser-Konstitution | Constitución de Agua | Constituição de Água | 水体质 |
| archetype_earth | Earth Constitution | Erde-Konstitution | Constitución de Tierra | Constituição de Terra | 土体质 |
| archetype_metal | Metal Constitution | Metall-Konstitution | Constitución de Metal | Constituição de Metal | 金体质 |
| archetype_wood | Wood Constitution | Holz-Konstitution | Constitución de Madera | Constituição de Madeira | 木体质 |
| heart_zone | Heart (Tip) | Herz (Spitze) | Corazón (Punta) | Coração (Ponta) | 心（舌尖） |
| lung_zone | Lung (Behind Tip) | Lunge (Hinter Spitze) | Pulmón (Detrás de la Punta) | Pulmão (Atrás da Ponta) | 肺（舌尖后） |
| liver_zone | Liver (Left Side) | Leber (Linke Seite) | Hígado (Lado Izquierdo) | Fígado (Lado Esquerdo) | 肝（左侧） |
| gb_zone | Gallbladder (Right Side) | Gallenblase (Rechte Seite) | Vesícula (Lado Derecho) | Vesícula (Lado Direito) | 胆（右侧） |
| spleen_zone | Spleen/Stomach (Center) | Milz/Magen (Mitte) | Bazo/Estómago (Centro) | Baço/Estômago (Centro) | 脾胃（中间） |
| kidney_zone | Kidney (Root) | Niere (Wurzel) | Riñón (Raíz) | Rim (Raiz) | 肾（舌根） |
| donate_msg | Want more languages? Donate XOM! | Mehr Sprachen? Spende XOM! | ¿Más idiomas? ¡Dona XOM! | Mais idiomas? Doe XOM! | 想要更多语言？捐赠XOM！ |
| disclaimer | Not a medical device | Kein Medizinprodukt | No es un dispositivo médico | Não é um dispositivo médico | 非医疗器械 |

---

## 6. TRIZ CONTRADICTIONS DISSOLVED

| # | Contradiction | TRIZ Principle | Resolution |
|---|-------------|----------------|------------|
| 1 | Clinical accuracy vs. consumer camera hardware | Principle 35 (Parameter changes) | 7-gate quality system rejects bad input BEFORE analysis |
| 2 | Deep organ-level detail vs. no server processing | Principle 1 (Segmentation) | Zone-by-zone pixel analysis runs entirely on-device canvas |
| 3 | Scientific rigor vs. non-medical disclaimer | Principle 17 (Another dimension) | Report clearly separates "TCM Pattern" from "Western Correlation" |
| 4 | Multi-language support vs. development cost | Principle 24 (Intermediary) | 5 core languages native, additional via XOM donation model |
| 5 | Reproducibility vs. varying lighting | Principle 10 (Preliminary action) | Gate 4 (White Balance) normalizes color temperature before analysis |
| 6 | Privacy vs. practitioner peer review | Principle 3 (Local quality) | Only semantic vectors (never images) leave device for LLM Oracle |

---

## 7. REFERENCES

1. **Maciocia, Giovanni.** *Tongue Diagnosis in Chinese Medicine*, 2nd Edition. Eastland Press, 2004.
2. **Kirschbaum, Barbara.** *Atlas of Chinese Tongue Diagnosis*, 2nd Edition. Eastland Press, 2010.
3. **Deadman, Peter.** *A Manual of Acupuncture*. Journal of Chinese Medicine Publications, 2007.
4. **Jensen, Bernard.** *Iridology: The Science and Practice in the Healing Arts*, Vol II. Bernard Jensen International, 1982.
5. **Li, N. et al.** "Tongue image quality assessment based on deep learning." *Frontiers in Medicine*, 2023.
6. **Hu, M.C. et al.** "Automated tongue diagnosis using multi-task learning." *IEEE Trans. Biomed. Eng.*, 2021.
7. **Zhang, B. et al.** "Computer-aided tongue diagnosis system." *Artificial Intelligence in Medicine*, 2017.
8. **WHO Traditional Medicine Strategy 2014-2023.** World Health Organization, Geneva.
9. **CIELAB Color Space Standard.** ISO 11664-4:2008.
10. **D65 Illuminant Standard.** ISO 10526:1999/CIE S 005/E-1998.

---

## 8. WHEN TO INVOKE THIS SKILL

This skill MUST be invoked whenever:
- Generating a VeraTongue PDF report
- Implementing or updating tongue analysis logic in `veratongue_app.html`
- Adding new diagnostic dimensions or archetypes
- Reviewing image quality gate thresholds
- Translating wellness recommendations to new languages
- Training the master dashboard peer-review system
- Generating content for the Methodology & Limitations Whitepaper
