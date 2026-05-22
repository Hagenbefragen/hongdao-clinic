---
description: How to correctly deploy and debug the Destill API Server (Standalone Stack Build & Infrastructure)
---

# Destill Server Deployment & Debugging Workflow

This workflow documents the exact procedure for packaging, deploying, and debugging the Destill Standalone NestJS Stack on the Hetzner Production server, incorporating the hard-earned lessons from the March 2026 deployment crisis.

## 1. Local Packaging (The Backslash Trap)

**CRITICAL:** NEVER use PowerShell's `Compress-Archive` to zip files intended for Linux deployment. It writes Windows backslashes (`\`) into the zip headers. When extracted on Hetzner, Linux creates flat files with literal backslashes (e.g., `src\user\user.ts`) instead of folders.

**Correct Procedure (in Git Bash):**
```bash
# Must be executed in Git Bash or WSL, NOT PowerShell
cd /c/ohm/destill-stack/backend
tar -czvf src.tar.gz src/
```

## 2. Server Deployment & Extraction

Upload the tarball and cleanly extract it:
```bash
scp -i /c/ohm/ohm_deploy_key -o StrictHostKeyChecking=no /c/ohm/destill-stack/backend/src.tar.gz root@78.46.219.101:/root/destill-live/backend/src.tar.gz

ssh -i /c/ohm/ohm_deploy_key -o StrictHostKeyChecking=no root@78.46.219.101 "cd /root/destill-live/backend && rm -rf src/ && tar -xzvf src.tar.gz"
```

## 3. Dependency Resolution (The Sibling Dependency Trap)

If your backend code (`destill-stack/backend`) imports code from a sibling architectural folder (`destill-stack/shared`), Node module resolution on the server WILL NOT LOOK IN THE BACKEND FOLDER.

If `shared/aegis-v2/npu-safety-layer.ts` requires `onnxruntime-node`, you *must* explicitly install it in the `shared` folder on the production environment.
```bash
ssh -i /c/ohm/ohm_deploy_key -o StrictHostKeyChecking=no root@78.46.219.101 "cd /root/destill-live/shared && npm init -y && npm install onnxruntime-node"
```

## 4. Entity TypeORM Loading Isolation

When running an isolated backend (like the Destill AI Safety wrapper vs the OHM Consumer app), root-level entity autoloading may skip dependencies.
If an entity (`ResonanceReport`) depends on `User`, you **MUST** ensure `User` is explicitly registered in the feature array, even if the primary app handles it normally.
```typescript
// Example: agent-dating.module.ts
import { User } from '../user/user.entity'; // Always use explicit relative paths

@Module({
  imports: [
    TypeOrmModule.forFeature([ResonanceReport, User]) // User is mandatory
  ]
})
```

## 5. Build and Restart

Once the dependencies and typescript configurations are accurate:
```bash
ssh -i /c/ohm/ohm_deploy_key -o StrictHostKeyChecking=no root@78.46.219.101 "cd /root/destill-live/backend && npm run build && pm2 restart destill-backend"
```

## 6. Verification
To verify the Destill server started without the dreaded `cookieParser is not a function` error or database metadata errors:
```bash
ssh -i /c/ohm/ohm_deploy_key -o StrictHostKeyChecking=no root@78.46.219.101 "pm2 logs destill-backend --lines 50 --nostream"
ssh -i /c/ohm/ohm_deploy_key -o StrictHostKeyChecking=no root@78.46.219.101 "curl -s http://localhost:3010/api/v1/quickattack/stats"
```
