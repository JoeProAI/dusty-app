# Deploying to Vercel + GitHub

Complete guide to deploy the Xactimate to Symbility Converter to Vercel with GitHub integration.

## Prerequisites

1. **GitHub Account**: [Sign up](https://github.com/signup)
2. **Vercel Account**: [Sign up](https://vercel.com/signup) (use GitHub login)
3. **Git installed**: [Download](https://git-scm.com/downloads)

## Step 1: Create GitHub Repository

### Option A: GitHub Desktop (Easier)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. File → Add Local Repository
4. Choose `c:\Projects\Dusty App`
5. Click "Create Repository"
6. Publish repository to GitHub
7. Make it **Private** (contains API keys setup)

### Option B: Command Line

```powershell
cd "c:\Projects\Dusty App"

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Xactimate to Symbility Converter"

# Create GitHub repo (using GitHub CLI)
gh repo create dusty-app --private --source=. --remote=origin

# Push to GitHub
git push -u origin main
```

## Step 2: Prepare for Deployment

### Update Frontend Build Script

The `frontend/package.json` already has the build script configured. Verify it includes:

```json
{
  "scripts": {
    "build": "tsc && vite build"
  }
}
```

### Verify CORS Settings

In `backend/app/core/config.py`, the CORS origins should include your future Vercel URL:

```python
CORS_ORIGINS: List[str] = [
    "http://localhost:5173",
    "https://your-app.vercel.app"  # Add after deployment
]
```

## Step 3: Deploy to Vercel

### Via Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select **`JoeProAI/dusty-app`** from your GitHub repositories
5. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

6. Click **"Deploy"**

### Add Environment Variables

**IMPORTANT**: Add these in Vercel dashboard, NOT in vercel.json

In Vercel dashboard → Project → Settings → Environment Variables, add:

```
VITE_API_URL=https://your-backend-url.railway.app
```

Mark as **Production**, **Preview**, and **Development** environments.

Backend environment variables (OPENAI_API_KEY, etc.) should be added to Railway, not Vercel.

## Step 4: Configure Backend API

Vercel serverless functions work differently. We need to adjust the backend.

### Update for Vercel Serverless

The backend will run as serverless functions. The `vercel.json` configuration handles routing.

**Important**: Vercel's free tier has:
- 10 second execution limit per request
- 50MB max deployment size
- Serverless function limits

For production with large ESX files, consider:
- **Vercel Pro** ($20/month)
- **Railway** (alternative backend hosting)
- **Render** (alternative with persistent storage)

## Step 5: Alternative Architecture (Recommended)

Since the backend handles file uploads and AI processing, a better setup is:

### Split Deployment

**Frontend on Vercel** (free):
- Fast static hosting
- Automatic deployments
- CDN distribution

**Backend on Railway/Render** (paid):
- Longer execution times
- Persistent storage
- Better for file processing

### Railway Setup (Alternative)

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables
7. Deploy

**Cost**: ~$5-10/month with execution time-based billing

## Step 6: Connect Frontend to Backend

After deploying backend (Railway/Render), get the URL (e.g., `https://your-app.railway.app`)

Update `frontend/vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend.railway.app',  // Your backend URL
        changeOrigin: true,
      },
    },
  },
})
```

Or update API client to use production URL:

```typescript
// frontend/src/services/api.ts
const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://your-backend.railway.app/api'
    : '/api',
})
```

## Step 7: Automatic Deployments

With GitHub integration:
- **Push to `main`** → Deploys to production
- **Pull Request** → Creates preview deployment
- **Push to branch** → Preview deployment

GitHub Actions (already configured) will:
1. Run tests
2. Build frontend
3. Deploy to Vercel automatically

## Step 8: GitHub Secrets

Add these secrets to GitHub (Settings → Secrets and variables → Actions):

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
OPENAI_API_KEY=sk-your-key
XAI_API_KEY=your-xai-key
```

Get Vercel tokens from: [vercel.com/account/tokens](https://vercel.com/account/tokens)

## Recommended Final Architecture

```
┌─────────────────────┐
│   Vercel (Frontend) │
│   your-app.vercel.app
│   - React UI        │
│   - Static assets   │
└──────────┬──────────┘
           │ HTTPS
           ▼
┌─────────────────────┐
│  Railway (Backend)  │
│  your-app.railway.app
│  - FastAPI          │
│  - ESX processing   │
│  - OpenAI calls     │
└─────────────────────┘
```

**Costs**:
- Vercel: Free
- Railway: $5-10/month
- OpenAI API: Pay per use (~$0.03/conversion)

**Total**: ~$10-15/month for production use

## Environment Variables Summary

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend.railway.app
```

### Railway/Render (Backend)
```
OPENAI_API_KEY=sk-your-key
XAI_API_KEY=your-xai-key
CORS_ORIGINS=https://your-app.vercel.app,https://your-app-*.vercel.app
PORT=8000
```

## Testing Deployment

1. Visit your Vercel URL
2. Upload a test ESX file
3. Check browser console for errors
4. Verify API calls reach backend
5. Test conversion workflow

## Troubleshooting

### Frontend builds but shows blank page
- Check browser console for errors
- Verify API URL is correct
- Check CORS settings in backend

### API calls fail with CORS error
- Add Vercel URL to `CORS_ORIGINS` in backend
- Redeploy backend after updating

### File uploads fail
- Check file size limits (Railway: 100MB, Vercel: 4.5MB for serverless)
- Consider using presigned S3 URLs for large files

### Backend timeout errors
- Vercel free tier: 10s limit (upgrade or use Railway)
- Railway: 60s default (increase in settings)

## Alternative: Docker + DigitalOcean

For full control and lower costs:

1. Create `Dockerfile`
2. Deploy to DigitalOcean App Platform ($5/month)
3. Single deployment, simpler setup
4. No serverless limitations

See `DEPLOY_DOCKER.md` for this approach (can create if needed).

## Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Create Vercel project
- [ ] Add environment variables to Vercel
- [ ] Deploy backend to Railway
- [ ] Update frontend API URL
- [ ] Test upload and conversion
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring (optional)

## Next Steps

After deployment:
1. Monitor Vercel analytics
2. Set up error tracking (Sentry)
3. Configure custom domain
4. Add usage analytics
5. Set up backup strategy

Your app will be live at: `https://your-app-name.vercel.app`
