---
name: RunPod Deployer
description: Automates RunPod custom endpoint setup for AI models with Docker build, push, and endpoint creation
group: smart.devops
---

# RunPod Deployer Skill

**Purpose**: Automate the complete RunPod serverless endpoint deployment process including Docker build, push, and endpoint configuration.

## When to Use This Skill

- Deploying custom AI models to RunPod serverless
- Setting up GPU-accelerated inference endpoints
- Creating production-ready AI services with auto-scaling

## Prerequisites

- Docker Desktop running
- RunPod account credentials
- Docker Hub account
- Project with Dockerfile and handler.py ready

## Skill Execution Steps

### Step 1: Build Docker Image

Check if Dockerfile exists and build the image:

```powershell
# Navigate to project directory
cd $PROJECT_DIR

# Build Docker image
docker build -t $IMAGE_NAME:latest .
```

**Expected Output**: "Successfully built" message with image ID

### Step 2: Login to Docker Hub

```powershell
# Login to Docker Hub
# Use credentials from environment or prompt
docker login -u $DOCKER_USERNAME
```

**Input Required**: Docker Hub password

### Step 3: Tag and Push Image

```powershell
# Tag image for Docker Hub
docker tag $IMAGE_NAME:latest $DOCKER_USERNAME/$IMAGE_NAME:latest

# Push to Docker Hub
docker push $DOCKER_USERNAME/$IMAGE_NAME:latest
```

**Expected Output**: Push progress and final digest

### Step 4: Create RunPod Endpoint (Browser Automation)

Use browser automation to:

1. Navigate to https://www.runpod.io/console/serverless
2. Login with provided credentials
3. Click "New Endpoint"
4. Configure:
   - Name: From project config
   - Docker Image: $DOCKER_USERNAME/$IMAGE_NAME:latest
   - GPU: RTX 4090 or A100
   - Workers: Min 0, Max 3
   - Idle Timeout: 5 seconds
   - Execution Timeout: 600 seconds
5. Click "Deploy"
6. Wait for deployment
7. Extract Endpoint ID
8. Generate/retrieve API key

### Step 5: Configure Local Service

Update .env file with RunPod credentials:

```powershell
# Update .env file
$envContent = Get-Content "$SERVICE_DIR\.env"
$envContent = $envContent -replace 'RUNPOD_API_KEY=.*', "RUNPOD_API_KEY=$API_KEY"
$envContent = $envContent -replace 'RUNPOD_ENDPOINT_ID=.*', "RUNPOD_ENDPOINT_ID=$ENDPOINT_ID"
$envContent = $envContent -replace 'AI_TRAINING_MODE=.*', 'AI_TRAINING_MODE=runpod'
$envContent | Set-Content "$SERVICE_DIR\.env"
```

### Step 6: Test Endpoint

```powershell
# Test RunPod endpoint
$response = Invoke-RestMethod -Method POST `
    -Uri "https://api.runpod.ai/v2/$ENDPOINT_ID/health" `
    -Headers @{"Authorization" = "Bearer $API_KEY"}

if ($response.status -eq "healthy") {
    Write-Host "✅ Endpoint is healthy!"
} else {
    Write-Host "❌ Endpoint health check failed"
}
```

### Step 7: Deploy Service

```powershell
# Deploy the service to production
cd $REPO_ROOT
.\deploy.ps1
```

## Configuration Parameters

- `PROJECT_DIR`: Path to runpod directory (e.g., c:\OHM\ohm-avatar-service\runpod)
- `SERVICE_DIR`: Path to service root (e.g., c:\OHM\ohm-avatar-service)
- `REPO_ROOT`: Repository root (e.g., c:\OHM)
- `IMAGE_NAME`: Docker image name (e.g., ohm-echomimic)
- `DOCKER_USERNAME`: Docker Hub username
- `RUNPOD_EMAIL`: RunPod account email
- `RUNPOD_PASSWORD`: RunPod account password
- `GPU_TYPE`: GPU to use (rtx4090, a100, etc.)

## Error Handling

- **Docker build fails**: Check Dockerfile syntax, ensure base images are accessible
- **Docker push fails**: Verify Docker Hub login, check image size limits
- **RunPod login fails**: Verify credentials, check 2FA requirements
- **Endpoint creation fails**: Check GPU availability, verify Docker image accessibility
- **Health check fails**: Wait for cold start, check logs in RunPod dashboard

## Success Criteria

- [ ] Docker image built successfully
- [ ] Image pushed to Docker Hub
- [ ] RunPod endpoint created
- [ ] Endpoint ID retrieved
- [ ] API key configured
- [ ] Health check passes
- [ ] Service deployed with RunPod integration

## Example Usage

```powershell
# Set configuration
$config = @{
    PROJECT_DIR = "c:\OHM\ohm-avatar-service\runpod"
    SERVICE_DIR = "c:\OHM\ohm-avatar-service"
    REPO_ROOT = "c:\OHM"
    IMAGE_NAME = "ohm-echomimic"
    DOCKER_USERNAME = "ohmprotocol"
    RUNPOD_EMAIL = "lebensfluss.ev@gmail.com"
    GPU_TYPE = "rtx4090"
}

# Execute skill
# (Skill execution will be automated)
```

## Security Considerations

- Never commit RunPod API keys or passwords
- Use environment variables for sensitive data
- Rotate API keys regularly
- Monitor RunPod usage dashboard for unexpected charges
- Set billing alerts in RunPod

## Troubleshooting

### Issue: "Docker daemon not running"

```powershell
# Start Docker Desktop
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
Start-Sleep -Seconds 30
```

### Issue: "Image pull rate limit exceeded"

- Login to Docker Hub first
- Use authenticated pulls
- Consider Docker Hub Pro account

### Issue: "RunPod endpoint not responding"

- Wait 30-60 seconds for cold start
- Check RunPod logs in dashboard
- Verify Docker image is publicly accessible

## Post-Deployment

After successful deployment:

1. Test with sample avatar upload
2. Monitor first training job
3. Check GPU utilization in RunPod dashboard
4. Verify costs match expectations (~$0.03/avatar)
5. Set up billing alerts

---

**Created**: 2026-01-28  
**Version**: 1.0.0  
**Owner**: Antigravity Agent
