# Hacker News Post Guide

**Factual Title:** VeraTongue: An On-Device CIELAB K-Means Tongue Segmentation Engine for TCM Topography
**URL:** `https://destill.ai`

**Founder Launch Comment (to post immediately after submission):**
> We built VeraTongue to explore a simple thesis: biometric wellness monitoring should not require sending raw facial or oral imagery to centralized cloud servers.
> 
> The application runs entirely client-side. First, it enforces a 7-gate validation pipeline to normalize white balance (aligning with D65 illuminants) and reject blurry frames using Laplacian variance checks. Second, it segments the tongue body and coating using K-means clustering (k=3) in the CIELAB color space. Finally, it divides the tongue canvas into coordinate-based organ zones to generate a 5-element wellness report.
> 
> By running this in-browser without database backups, the user maintains absolute sovereignty over their health data. We would love to hear feedback on our local white-balance normalization logic and how to improve sensor calibration under warm fluorescent lighting.

***

# dev.to Post

**Title:** Building an On-Device Biometric Scanner with Canvas and CIELAB Color Space
**Tags:** #javascript #webdev #security #aisafety

How do you build a private biometric application that performs complex visual segmentation without sending a single byte of user data to the cloud?

In this post, we walk through the engineering details of the **VeraTongue** engine—a serverless, browser-native tongue topography scanner. The system maps the tongue surface into 9 distinct organ-aligned zones (based on classical Traditional Chinese Medicine topography) using raw HTML5 canvas manipulation.

### Step 1: Normalizing Inputs (The 7-Gate Quality Checks)
Before running our segmentation algorithms, we must ensure environmental conditions are stable. Here is how we verify white balance and focus sharpness on the client side:

```javascript
// Check motion blur using Laplacian variance on grayscale data
function checkSharpness(ctx, width, height) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const gray = new Float32Array(width * height);
  
  for (let i = 0; i < data.length; i += 4) {
    gray[i/4] = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
  }
  
  // Apply a discrete Laplacian kernel
  let lapVar = 0;
  // ... (calculate variance across pixels) ...
  return lapVar > 100; // Passes if above threshold
}
```

### Step 2: Tongue Segmentation in CIELAB Space
RGB is poor for color thresholding because brightness and chroma are coupled. Instead, we convert pixel values to CIELAB ($L^*a^*b^*$) space:

```javascript
function rgb2lab(r, g, b) {
  // Normalize RGB values
  let rNormal = r / 255, gNormal = g / 255, bNormal = b / 255;
  // Apply gamma correction
  rNormal = (rNormal > 0.04045) ? Math.pow((rNormal + 0.055) / 1.055, 2.4) : rNormal / 12.92;
  gNormal = (gNormal > 0.04045) ? Math.pow((gNormal + 0.055) / 1.055, 2.4) : gNormal / 12.92;
  bNormal = (bNormal > 0.04045) ? Math.pow((bNormal + 0.055) / 1.055, 2.4) : bNormal / 12.92;

  // Convert to XYZ space relative to D65 standard
  let x = rNormal * 0.4124 + gNormal * 0.3576 + bNormal * 0.1805;
  let y = rNormal * 0.2126 + gNormal * 0.7152 + bNormal * 0.0722;
  let z = rNormal * 0.0193 + gNormal * 0.1192 + bNormal * 0.9505;

  x /= 0.95047; y /= 1.00000; z /= 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + (16/116);
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + (16/116);
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + (16/116);

  let L = (116 * y) - 16;
  let a = 500 * (x - y);
  let bVal = 200 * (y - z);

  return [L, a, bVal];
}
```

By converting the guide bounding box to Lab, we run a local K-means clustering ($k=3$). The cluster with the highest $a^*$ value represents the tongue body, and the cluster with the highest $L^*$ value on the tongue represents the coating.

This allows us to calculate an accurate coating-to-body ratio in real time without sending biometric data to external servers.

Read our full architectural blueprint, complete with interactive HTML guides and anatomical diagrams at [DESTILL.ai](https://destill.ai).
