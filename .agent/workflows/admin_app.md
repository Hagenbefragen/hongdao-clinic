---
description: Guide for using the OHM Admin App (User Management, Trust Web, Clearance)
---

# 👑 OHM Admin App Workflow

**Trigger:** `/admin_app` or `@[admin]`
**Purpose:** Manage users, visualize the Trust Web, and assign Clearance Levels.

---

## 1. Accessing the Admin Panel

1.  **Login** as a user with `GenesisCreator` role.
2.  Navigate to the **Admin Dashboard** (Shield Icon).
3.  Access the code via `frontend/components/AdminTab.tsx`.

---

## 2. User Management Features

### 📋 User List & Clearance
The Admin App provides a consolidated view of all registered users:
*   **Name & Email:** Identified from profile and auth data.
*   **Clearance Level (0-5):**
    *   `0` - Observer
    *   `5` - Genesis Creator (Highest)
*   **Role:** `standard`, `admin`, `GenesisCreator`.

### 🕸️ Trust Web Visualization
Verify the referral integrity:
*   **Referrer Column:** Shows who invited whom.
*   **Audit Check:** Ensure no circular references or "orphan" admins.
*   **Visual Check:** Look for "Hagen" duplicates or suspicious referral chains.

---

## 3. Managing Clearance Levels

To promote a user (e.g., to **Core Guardian**):
1.  Find user in the list.
2.  Click **"Edit Role/Clearance"**.
3.  Select new level (e.g., Level 4).
4.  **Confirm:** This grants them access to sensitive Admin APIs.

---

## 4. Server Health Monitoring (Netdata)

We use **Netdata** for real-time infrastructure monitoring (CPU, RAM, LiveKit Latency).
It runs on the server at `127.0.0.1:19999` but is **firewalled** from public access for security.

### 🛡️ How to Access Netdata Securely (SSH Tunnel)

To view the dashboard on your local machine:

1.  **Open a Terminal/PowerShell** on your local machine.
2.  **Run the Tunnel Command** (Map remote port 19999 to local port 19999):
    ```powershell
    ssh -L 19999:localhost:19999 -i "C:\ohm\ohm_deploy_key" root@188.245.235.51
    ```
3.  **Open Browser:**
    Go to: `http://localhost:19999`

### 📊 What to Watch
*   **System Overview:** CPU Load (should be <80% on avg).
*   **Redis:** Memory fragmentation.
*   **LiveKit (UDP):** Packet loss rate.
*   **Ollama:** RAM usage when Models are loaded (Main bottleneck).

---

## 5. Troubleshooting "Duplicate Hagens"

If you see multiple users named "Hagen":
1.  **Check IDs:** Are they different IDs? (e.g., `1` vs `42`)
2.  **Check Emails:** `hagen@ohm.com` vs `hagen.test@gmail.com`.
3.  **Check Roles:** Only ONE should have `GenesisCreator` ideally, or all real ones.
4.  **Action:** Delete/Kick fake or test accounts using the **Kick** button.

---

## 6. Deployment

Updates to the Admin App require full stack deployment:
```bash
# Frontend
cd frontend && npm run build
# Backend (if API changed)
cd backend && npm run build
# Deploy
/deploy_app
```
