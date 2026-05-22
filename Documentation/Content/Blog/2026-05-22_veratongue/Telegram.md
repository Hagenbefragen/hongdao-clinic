# Telegram Broadcast Setup & Payload

## Instructions
1. Message `@BotFather` on Telegram to create a bot and secure your HTTP API Token.
2. Add your newly created bot as an Administrator to your channel `t.me/destillAIpublic` with the permission to post messages.
3. Broadcast messages programmatically using an HTTP POST request to:
   `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`
   with JSON payload:
   `{"chat_id": "@destillAIpublic", "text": "...", "parse_mode": "HTML"}`

---

## Payload (parse_mode: HTML)

<b>VeraTongue: On-Device Tongue Topography Analysis</b>

We have published the technical blueprint for the VeraTongue scanner. The system maps the surface of the tongue to evaluate systemic hydration, circulation, and digestion without cloud dependencies.

<b>Core pipeline layers:</b>
1. <b>7 Quality Gates:</b> Real-time checks for luminance, focus sharpness (Laplacian variance), and white balance (D65 light standard ratio) before image processing.
2. <b>CIELAB K-means:</b> Converts RGB frames locally to CIELAB space and uses a local 3-centroid cluster to segment the tongue body from coating.
3. <b>Maciocia Topography:</b> Coordinates-based canvas segmentation mapping the Heart, Lung, Spleen/Stomach, Liver/Gallbladder, and Kidney zones.

All processing runs completely client-side in a sandboxed canvas. No biometric data is sent to external servers.

Read the technical spec and review the diagrams:
https://destill.ai
