---
description: Generate beautifully formatted HTML explanations for AEGIS layers
---

# /LayerExplanation Workflow

This workflow automates the generation of beautifully formatted, easy-to-understand explanations for the various layers and subsystems of the UNIFIED NI STACK, using the "Scythe Inoculation / Monotonic Ratchet" metaphor structure.

It updates `c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\Layer_Explanations.html`.

## Step 1: Identify Target Layers

Determine which layers need explanations added to the HTML document. (e.g., TLA, CRI, ICS, QFAI-C, specific D-layers).

## Step 2: Use the Explanation Metaphor Structure

For each layer, you MUST use this structure:

1. **Title and Subtitle**: Name of the layer and a 1-sentence intuition.
2. **What's a [Metaphor]?**: Explain the concept using a real-world metaphor (like a ratchet, an immune system, a traffic light).
3. **The Problem It Solves**: Explain the specific attack vector (e.g., Boiling Frog, Grandparent exploit) it counters.
4. **How It Works**: Explain technical mechanics simply, referencing specific thresholds or concepts (e.g., 38° Max Rule).
5. **Business / Security Impact**: Explain _why_ this matters to an enterprise or investor.

## Step 3: Insert into the HTML

Use the `multi_replace_file_content` or `replace_file_content` tools to append the generated HTML into the grid in `c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\Layer_Explanations.html`.

Look for the `<!-- INSERT_LAYERS_HERE -->` marker or append it inside the main grid. Ensure the HTML follows the existing Tailwind-like inline CSS structure of the dashboard.

## Step 4: Quality Check

Ensure the explanations are punchy, avoid deep jargon where a metaphor works better, and directly tie back to patent claims or knowledge domains where relevant.
