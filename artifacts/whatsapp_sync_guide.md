# WhatsApp Live Sync Bridge — User Guide

This guide explains how to connect your WhatsApp account to your local development environment and use it to sync prompts, design notes, and image assets directly into your workspace.

---

## 1. How It Works

1. **Local Server & Listener:** When you start your local development server (`node server.js`), it spawns a background WhatsApp automation process (`whatsapp_listener.js`).
2. **Authentication:** On first startup, the listener generates a login QR code. You scan this code with your WhatsApp app on your phone.
3. **Real-time Syncing:** Once connected, the listener monitors incoming messages. Any text or media you send is instantly parsed, saved locally, and logged in a structured format.
4. **Agent Integration:** When you collaborate with your AI agent (Antigravity), the agent reads this log and implements your requested edits automatically.

---

## 2. Setting Up the Connection

1. **Start the server:** Run the dev server on your machine:
   ```bash
   node server.js
   ```
2. **Open the Dashboard:** 
   - Open your browser and go to: [http://localhost:8080/whatsapp_sync.html](http://localhost:8080/whatsapp_sync.html)
   - Alternatively, open the main clinic homepage at [http://localhost:8080/](http://localhost:8080/). A orange-red floating badge labeled **💬 WhatsApp Sync** will appear in the bottom-left corner. Click it to open the dashboard.
3. **Scan the QR Code:**
   - On the dashboard, a QR code will be displayed.
   - Open WhatsApp on your phone.
   - Go to **Settings > Linked Devices > Link a Device**.
   - Scan the QR code displayed on your screen.
4. **Connection Active:** Once scanned, the status card on the dashboard will turn green showing **Ready / Connected**. The QR code will disappear, and you are ready to sync!

---

## 3. Syncing Prompts and Change Requests

To request changes or send instructions, simply type a message in WhatsApp:

* **Text Request Example:**
  > *"Change the font size of the hero title to be slightly larger and make the background color of the consult section a lighter cream."*
* **Where it goes:** The message immediately appears on the **Live Message Inbox** timeline in your dashboard under a **Pending** status.

---

## 4. Syncing Images and Assets

To upload a new image (e.g., a replacement photo for a treatment or a retreat section):

1. Attach the image file in WhatsApp and add a caption describing what it is:
   > *[Attached Image] "Use this image for the Child Space gallery"*
2. **Where it goes:** 
   - The image is downloaded and saved locally to: `c:\Nanjing\images\whatsapp_imports\wa_[timestamp]_[random].png` (or `.jpg`, matching the original format).
   - An entry appears in the inbox timeline showing a thumbnail preview, the caption text, and a **Copy** button to copy the local workspace path of the file to your clipboard.

---

## 5. Completing the Loop with your AI Agent

Since the bridge stores all messages in `whatsapp_inbox.json` and download files locally, you can direct your AI agent to apply these changes.

**Example Agent Command:**
> *"Hey, check the WhatsApp sync inbox and apply any pending change requests."*

The agent will read the JSON, check for messages with a `"status": "pending"`, execute the edits (such as updating text or swapping images), and mark the requests as **Applied** in the inbox.
