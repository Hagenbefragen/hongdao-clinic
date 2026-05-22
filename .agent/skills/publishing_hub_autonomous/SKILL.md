---
name: "Sovereign Autonomous Publishing Hub"
description: "Enables fully automated, serverless content publishing to X (Twitter), Instagram, TikTok, and Threema. Manages OAuth PKCE access token refresh cycles, long-lived Meta Graph token renewals, and client-side NaCl (libsodium) E2E message encryption to prevent biometric and text leaks."
---

# Sovereign Autonomous Publishing Hub Skill

> **Purpose:** To enable the agent to post structured content autonomously to social platforms (X, Instagram, TikTok) and secure messaging systems (Threema) without human-in-the-loop dependencies, ensuring local-first data privacy and secure token rotation.

---

## 1. PLATFORM CONFIGURATIONS & SCOPES

To post without manual user confirmation, developer applications must be created on each platform. The initial authorization must be completed once by the administrator to generate the baseline access and refresh tokens.

### 1.1 X (Twitter) API v2
* **Developer Portal:** [developer.x.com](https://developer.x.com)
* **Authentication:** OAuth 2.0 Authorization Code Flow with PKCE.
* **App Permissions:** Set to **Read and Write**.
* **Required Scopes:**
  * `tweet.read`
  * `tweet.write`
  * `offline.access` (CRITICAL: grants the `refresh_token` required for automated rotation).

### 1.2 Instagram Content Publishing API
* **Meta Developer Portal:** [developers.facebook.com](https://developers.facebook.com)
* **App Type:** Business or Consumer.
* **Account Type:** Instagram Business or Creator account connected to an active Facebook Page owned by the developer app admin.
* **Required Scopes:**
  * `instagram_basic`
  * `instagram_content_publish`
  * `pages_read_engagement`
  * `pages_show_list`

### 1.3 TikTok Content Posting API v2
* **TikTok Developer Portal:** [developers.tiktok.com](https://developers.tiktok.com)
* **App Approval:** App must be approved for the **Content Posting API** product.
* **Required Scopes:**
  * `video.upload`
  * `video.publish`

### 1.4 Threema Gateway API
* **Gateway Portal:** [threema.ch/en/developer](https://threema.ch/en/developer)
* **Account Setup:** Register as a developer/business, buy credits, and obtain:
  * **API Identity:** An 8-character ID starting with an asterisk (e.g., `*YOURID`).
  * **API Secret:** (For Basic mode) A 16-character alphanumeric string.
  * **Private/Public Keypair:** (For End-to-End mode) NaCl-compatible keys.

---

## 2. CONFIGURATION & DATABASE SCHEMAS

The credentials and rotation states must be stored securely. Do not hardcode secret keys. Use environment variables and a persistent local database (SQLite/encrypted JSON).

### 2.1 Environment Configuration (`.env`)
```bash
# X (Twitter) App Credentials
X_CLIENT_ID="your_x_client_id"
X_CLIENT_SECRET="your_x_client_secret"

# Meta (Instagram) App Credentials
META_APP_ID="your_meta_app_id"
META_APP_SECRET="your_meta_app_secret"
META_INSTAGRAM_BUSINESS_ACCOUNT_ID="your_instagram_business_account_id"

# TikTok App Credentials
TIKTOK_CLIENT_KEY="your_tiktok_client_key"
TIKTOK_CLIENT_SECRET="your_tiktok_client_secret"

# Threema Gateway Credentials
THREEMA_IDENTITY="*YOURID"
THREEMA_SECRET="your_threema_basic_secret"
THREEMA_PRIVATE_KEY="hex_encoded_32_byte_private_key"
THREEMA_PUBLIC_KEY="hex_encoded_32_byte_public_key"
```

### 2.2 Storage Schema (SQLite Standard)
```sql
CREATE TABLE IF NOT EXISTS publishing_tokens (
    platform TEXT PRIMARY KEY,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at INTEGER NOT NULL, -- Unix timestamp (milliseconds)
    updated_at INTEGER NOT NULL
);
```

---

## 3. PROGRAMMATIC TOKEN REFRESH LOGIC (AUTONOMOUS POSTING)

Since access tokens expire (X = 2 hours, Instagram = 60 days, TikTok = 24 hours), the agent must check and refresh credentials programmatically before each publication run.

### 3.1 X Token Rotation (Node.js)
```javascript
const axios = require('axios');

async function getValidXToken(db) {
  const row = await db.get("SELECT * FROM publishing_tokens WHERE platform = 'x'");
  const now = Date.now();

  // If token is valid for another 5 minutes, reuse it
  if (row && (row.expires_at - now) > 300000) {
    return row.access_token;
  }

  console.log("X Access Token expired or near expiry. Refreshing...");
  
  const basicAuth = Buffer.from(`${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64');
  
  try {
    const response = await axios.post('https://api.twitter.com/2/oauth2/token', 
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: row.refresh_token
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        }
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const newExpiresAt = Date.now() + (expires_in * 1000);

    await db.run(
      `INSERT INTO publishing_tokens (platform, access_token, refresh_token, expires_at, updated_at) 
       VALUES ('x', ?, ?, ?, ?) 
       ON CONFLICT(platform) DO UPDATE SET 
         access_token=excluded.access_token, 
         refresh_token=excluded.refresh_token, 
         expires_at=excluded.expires_at, 
         updated_at=excluded.updated_at`,
      [access_token, refresh_token, newExpiresAt, Date.now()]
    );

    return access_token;
  } catch (error) {
    console.error("X token refresh failed:", error.response?.data || error.message);
    throw new Error("X token refresh failed. Manual re-auth required.");
  }
}
```

### 3.2 Meta / Instagram Long-Lived Token Refresh (Node.js)
Long-lived tokens are valid for 60 days. They can be refreshed once per day if they are at least 24 hours old. Periodically executing this extends validity indefinitely.

```javascript
async function getValidInstagramToken(db) {
  const row = await db.get("SELECT * FROM publishing_tokens WHERE platform = 'instagram'");
  const now = Date.now();

  // Check if token is expired (60 days) or close to expiring (within 7 days)
  if (row && (row.expires_at - now) > 7 * 24 * 60 * 60 * 1000) {
    // Check if we should proactively extend it (e.g. token updated more than 24h ago)
    if (now - row.updated_at > 24 * 60 * 60 * 1000) {
      proactivelyExtendInstagramToken(row.access_token, db).catch(console.error);
    }
    return row.access_token;
  }

  throw new Error("Instagram long-lived token has expired or is missing. Human re-authorization required.");
}

async function proactivelyExtendInstagramToken(currentToken, db) {
  try {
    const response = await axios.get('https://graph.facebook.com/v19.0/oauth/access_token', {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: process.env.META_APP_ID,
        client_secret: process.env.META_APP_SECRET,
        fb_exchange_token: currentToken
      }
    });

    const { access_token, expires_in } = response.data;
    const newExpiresAt = Date.now() + (expires_in ? expires_in * 1000 : 60 * 24 * 60 * 60 * 1000);

    await db.run(
      `INSERT INTO publishing_tokens (platform, access_token, refresh_token, expires_at, updated_at) 
       VALUES ('instagram', ?, NULL, ?, ?) 
       ON CONFLICT(platform) DO UPDATE SET 
         access_token=excluded.access_token, 
         expires_at=excluded.expires_at, 
         updated_at=excluded.updated_at`,
      [access_token, newExpiresAt, Date.now()]
    );
    console.log("Instagram long-lived token extended successfully.");
  } catch (error) {
    console.error("Proactive Instagram token extension failed:", error.response?.data || error.message);
  }
}
```

### 3.3 TikTok Token Rotation (Node.js)
```javascript
async function getValidTikTokToken(db) {
  const row = await db.get("SELECT * FROM publishing_tokens WHERE platform = 'tiktok'");
  const now = Date.now();

  if (row && (row.expires_at - now) > 600000) {
    return row.access_token;
  }

  console.log("TikTok Access Token near expiry. Refreshing using 365-day refresh token...");

  try {
    const response = await axios.post('https://open.tiktokapis.com/v2/oauth/token/', 
      new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: row.refresh_token
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token, expires_in, refresh_expires_in } = response.data;
    const newExpiresAt = Date.now() + (expires_in * 1000);

    // Save access token and update the refresh token (as it can rotate too)
    await db.run(
      `INSERT INTO publishing_tokens (platform, access_token, refresh_token, expires_at, updated_at) 
       VALUES ('tiktok', ?, ?, ?, ?) 
       ON CONFLICT(platform) DO UPDATE SET 
         access_token=excluded.access_token, 
         refresh_token=excluded.refresh_token, 
         expires_at=excluded.expires_at, 
         updated_at=excluded.updated_at`,
      [access_token, refresh_token, newExpiresAt, Date.now()]
    );

    return access_token;
  } catch (error) {
    console.error("TikTok token refresh failed:", error.response?.data || error.message);
    throw new Error("TikTok token refresh failed. Manual re-auth required.");
  }
}
```

---

## 4. PUBLISHING ENDPOINTS & STEP-BY-STEP FLOWS

### 4.1 X (Twitter) Post Publish
* **URL:** `POST https://api.x.com/2/tweets`
* **Headers:**
  * `Authorization: Bearer <access_token>`
  * `Content-Type: application/json`
* **JSON Payload:**
  ```json
  {
    "text": "Sovereign on-device TCM analysis is here. Check the details. https://destill.ai"
  }
  ```

### 4.2 Instagram Feed Publish
Posting to Instagram requires creating a media container, polling its processing status, and then publishing it.

#### Step A: Initialize Media Container
* **URL:** `POST https://graph.facebook.com/v19.0/${META_INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`
* **Headers:** `Authorization: Bearer <access_token>`
* **Parameters (JSON/URL-Encoded):**
  * `image_url`: Absolute path to a public image (e.g., `https://destill.ai/campaigns/hero.png`)
  * `caption`: Captions including hashtags.
* **Response:** `{ "id": "container_id_string" }`

#### Step B: Poll Status
* **URL:** `GET https://graph.facebook.com/v19.0/${container_id}?fields=status_code`
* **Headers:** `Authorization: Bearer <access_token>`
* **Logic:** Poll every 5 seconds. Proceed only when `status_code` equals `"FINISHED"`. Reject if it becomes `"ERROR"`.

#### Step C: Publish Container
* **URL:** `POST https://graph.facebook.com/v19.0/${META_INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`
* **Parameters:**
  * `creation_id`: The `container_id` returned in Step A.
* **Response:** `{ "id": "ig_post_id_string" }` (Indicates success).

### 4.3 TikTok Video Publish
#### Step A: Initialize Upload
* **URL:** `POST https://open.tiktokapis.com/v2/post/publish/video/init/`
* **Headers:**
  * `Authorization: Bearer <access_token>`
  * `Content-Type: application/json; charset=UTF-8`
* **Body:**
  ```json
  {
    "post_info": {
      "title": "On-device biometric scanning. #TCM #biohacking",
      "privacy_level": "PUBLIC_TO_EVERYONE",
      "disable_duet": false,
      "disable_stitch": false,
      "disable_comment": false,
      "video_cover_timestamp_ms": 1000
    },
    "source_info": {
      "source": "FILE_UPLOAD",
      "video_size": 25482910
    }
  }
  ```
* **Response:** Returns `publish_id` and `upload_url`.

#### Step B: Upload File
* **Method:** `PUT`
* **URL:** `<upload_url>` (received in Step A)
* **Headers:**
  * `Content-Type`: `video/mp4`
  * `Content-Length`: Video size in bytes
* **Body:** Raw binary video data stream.

---

## 5. THREEMA GATEWAY CRYPTOGRAPHY (END-TO-END MODE)

To post privately to Threema without letting the gateway server read the message text, implement NaCl E2E encryption locally. The client encrypts the text using the receiver's public key and the sender's private key.

### 5.1 Symmetric Key & Cryptography Protocol (libsodium / tweetnacl)

```javascript
const nacl = require('tweetnacl');
const axios = require('axios');

// Hex helper functions
const hexToBytes = hex => new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
const bytesToHex = bytes => Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');

/**
 * Encrypts and transmits an E2E Threema message
 * @param {string} recipientThreemaId - Receiver's 8-character ID
 * @param {string} recipientPublicKeyHex - Receiver's 32-byte public key (Hex)
 * @param {string} messageText - The message to send
 */
async function sendThreemaE2E(recipientThreemaId, recipientPublicKeyHex, messageText) {
  const senderPrivateKey = hexToBytes(process.env.THREEMA_PRIVATE_KEY);
  const recipientPublicKey = hexToBytes(recipientPublicKeyHex);

  // 1. Prepare Threema E2E Message Payload
  // Type 0x01 = Text Message. Payload padding ensures uniform size to prevent traffic analysis.
  const textBytes = Buffer.from(messageText, 'utf-8');
  
  // Header: 1 byte type + padded length
  const typeByte = 0x01;
  const paddingLength = 48 - (textBytes.length % 16); // PKCS7-like block padding
  const padding = Buffer.alloc(paddingLength, paddingLength);
  
  const plaintextPayload = Buffer.concat([
    Buffer.from([typeByte]), 
    textBytes, 
    padding
  ]);

  // 2. Encrypt Payload using NaCl Box (Secretbox)
  // Threema uses a random 24-byte nonce
  const nonce = nacl.randomBytes(24);
  const encryptedPayload = nacl.box(
    new Uint8Array(plaintextPayload),
    nonce,
    recipientPublicKey,
    senderPrivateKey
  );

  // 3. Construct API Body
  const apiParams = new URLSearchParams({
    from: process.env.THREEMA_IDENTITY,
    to: recipientThreemaId,
    nonce: bytesToHex(nonce),
    box: bytesToHex(encryptedPayload)
  });

  try {
    const response = await axios.post('https://msgapi.threema.ch/send_e2e', apiParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log(`Threema E2E Message Sent. Message ID: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error("Threema E2E failed:", error.response?.data || error.message);
    throw error;
  }
}
```

---

## 6. ERROR HANDLING, RETRIES, AND RECOVERABILITY

Autonomous background operations must handle rate limiting and network failures without crashing.

1. **Rate Limiting (HTTP 429):**
   * Implement an Exponential Backoff strategy with jitter.
   * Do not exceed 5 publish requests per platform within 15 minutes.
2. **Expired Refresh Tokens (HTTP 400/401):**
   * If a refresh token request fails with `invalid_grant` (due to password change or app de-authorization), write an emergency alert file `EMERGENCY_REAUTH.json` in the root folder.
   * Halt subsequent automated posting to that platform until manual verification is resolved.
3. **Threema Out-Of-Credits (HTTP 402):**
   * Check response body. If error status is 402, notify the administration to top up the Gateway API balance.

---

## 7. WHEN TO INVOKE THIS SKILL

This skill MUST be invoked when:
* Automating the multi-channel content publication pipeline (Phase 5 of `/createcontent`).
* Reviewing API authentication status and checking if token refresh schedules are running correctly.
* Integrating a new secure communications channel for direct membership notifications via Threema E2E encryption.
* Troubleshooting API publishing failures or token verification errors.
