# Next Steps - Ready to Deploy! 🚀

Your code is on GitHub: **https://github.com/JoeProAI/dusty-app**

## Deploy in 10 Minutes

### Step 1: Deploy Frontend to Vercel (5 min)

1. **Go to Vercel**: https://vercel.com/signup
   - Sign in with your GitHub account (JoeProAI)

2. **Import Project**:
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose **`JoeProAI/dusty-app`**

3. **Configure Build**:
   - Framework Preset: **Vite**
   - Root Directory: **Leave as default (./)** 
   - Vercel will auto-detect from vercel.json

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Copy your Vercel URL (e.g., `https://dusty-app.vercel.app`)

**Result**: Frontend is live! (FREE)

---

### Step 2: Deploy Backend to Railway (5 min)

1. **Go to Railway**: https://railway.app
   - Sign in with GitHub

2. **New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose **`JoeProAI/dusty-app`**

3. **Configure**:
   - Railway auto-detects Python
   - Root Directory: **`backend`**
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variables** (Settings → Variables):
   ```
   OPENAI_API_KEY=sk-your-openai-key-here
   XAI_API_KEY=your-xai-key-here
   CORS_ORIGINS=https://dusty-app.vercel.app,https://dusty-app-*.vercel.app
   DATABASE_URL=sqlite+aiosqlite:///tmp/dusty_converter.db
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy your Railway URL (e.g., `https://dusty-app-production.up.railway.app`)

**Result**: Backend API is live! (~$5-10/month)

---

### Step 3: Connect Frontend to Backend (2 min)

1. **Update Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add variable (use your actual Railway URL from Step 2):
     ```
     VITE_API_URL=https://your-actual-backend-url.railway.app
     ```
   - Select all environments (Production, Preview, Development)
   - Click "Save"
   
   **NOTE**: Do NOT add OPENAI_API_KEY to Vercel - that goes in Railway only!

2. **Redeploy Frontend**:
   - Go to Deployments tab
   - Click "..." on latest deployment → Redeploy
   - OR: Push any small change to GitHub (auto-deploys)

**Result**: Frontend can now talk to backend! ✅

---

## Test Your Live App

1. Visit your Vercel URL: `https://dusty-app.vercel.app`
2. Try uploading a test ESX file
3. Check browser console for errors (F12)
4. Verify conversion works end-to-end

---

## Troubleshooting

### Frontend shows blank page
- Check browser console (F12)
- Verify build succeeded in Vercel dashboard
- Check Vercel logs

### API calls fail
- Verify `VITE_API_URL` is set in Vercel
- Check `CORS_ORIGINS` includes your Vercel URL in Railway
- Test backend directly: `https://your-backend.railway.app/health`

### Backend not responding
- Check Railway logs
- Verify environment variables are set
- Test health endpoint: `/health` should return `{"status":"healthy"}`

### File upload fails
- Check file size (Railway: 100MB limit)
- Verify CORS settings
- Check Railway logs for errors

---

## Your URLs

After deployment, bookmark these:

- **Live App**: https://dusty-app.vercel.app
- **Backend API**: https://dusty-app-production.up.railway.app
- **GitHub Repo**: https://github.com/JoeProAI/dusty-app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard

---

## Automatic Updates

Now whenever you push to GitHub:
- GitHub Actions runs tests
- Vercel auto-deploys frontend
- Railway auto-deploys backend

Just `git push` and your changes go live!

---

## Get Your API Keys

### OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)
4. Add to Railway environment variables

### XAI API Key (Optional)
1. Go to: https://x.ai/
2. Sign up for API access
3. Copy your key
4. Add to Railway environment variables

---

## Estimated Costs

**Monthly**:
- Vercel Frontend: **FREE**
- Railway Backend: **$5-10** (usage-based)
- OpenAI API: **$0.03 per conversion** (pay-as-you-go)

**Total**: ~$10-15/month for moderate use

---

## What's Next?

After deployment works:

1. **Configure custom domain** (optional)
2. **Add error tracking** (Sentry)
3. **Set up monitoring** (Vercel Analytics)
4. **Implement remaining features** (see TODO.md)
5. **Add real XML/FML schemas** (Phase 3)

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Project Issues**: https://github.com/JoeProAI/dusty-app/issues

You can also share this repository URL with Claude Code or other developers for assistance.

---

## Success Checklist

- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Environment variables configured (both platforms)
- [ ] `VITE_API_URL` set in Vercel
- [ ] `CORS_ORIGINS` set in Railway
- [ ] Frontend redeployed after env vars
- [ ] Tested file upload
- [ ] Tested conversion flow

Once all checked, you're live! 🎉
