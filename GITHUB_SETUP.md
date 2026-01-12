# GitHub Setup Guide

Quick guide to push your project to GitHub.

## Option 1: GitHub Desktop (Easiest)

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Install and sign in** with your GitHub account
3. **Add repository**:
   - File → Add Local Repository
   - Choose `c:\Projects\Dusty App`
   - Click "Create Repository"
4. **Initial commit**:
   - Summary: "Initial commit: Xactimate to Symbility Converter"
   - Click "Commit to main"
5. **Publish to GitHub**:
   - Click "Publish repository"
   - Name: `dusty-app` or `xactimate-symbility-converter`
   - Description: "Convert Xactimate ESX to Symbility XML/FML"
   - **Keep private** (contains API setup)
   - Click "Publish repository"

Done! Your code is now on GitHub.

## Option 2: Command Line (GitHub CLI)

### Install GitHub CLI

Download from: https://cli.github.com/

### Push to GitHub

```powershell
cd "c:\Projects\Dusty App"

# Authenticate
gh auth login

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Xactimate to Symbility Converter"

# Create GitHub repo
gh repo create dusty-app --private --source=. --remote=origin --push
```

## Option 3: Command Line (Manual)

### Create repo on GitHub.com

1. Go to https://github.com/new
2. Repository name: `dusty-app`
3. Private repository
4. Don't initialize with README (we have one)
5. Click "Create repository"

### Push code

```powershell
cd "c:\Projects\Dusty App"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/dusty-app.git

# Push
git branch -M main
git push -u origin main
```

## Verify Upload

1. Go to your GitHub repository
2. Check files are uploaded
3. Verify `.gitignore` is working (no `node_modules`, `venv`, `.env`)

## Important: Environment Variables

**NEVER commit**:
- `.env` files with actual API keys
- `node_modules/`
- `venv/` or `env/`
- `*.log` files

The `.gitignore` file is configured to prevent this.

## Next Steps

After pushing to GitHub:
1. Go to [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) for deployment
2. Set up GitHub Actions (already configured)
3. Enable branch protection (optional)

## Troubleshooting

### "fatal: not a git repository"
```powershell
git init
```

### "Permission denied (publickey)"
- Use GitHub Desktop instead, or
- Set up SSH keys: https://docs.github.com/en/authentication

### Files not uploading
```powershell
git status  # Check what's being tracked
git add .   # Add everything
git commit -m "Add all files"
git push
```

### Large files error
- ESX files shouldn't be committed
- Add `*.esx` to `.gitignore` if needed
- Use Git LFS for files >100MB

## Working with Branches

```powershell
# Create new feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push branch
git push -u origin feature/new-feature

# Create pull request on GitHub.com
```

## Daily Workflow

```powershell
# Before starting work
git pull

# Make changes to files

# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Your Repository URL

After setup, your repo will be at:
```
https://github.com/YOUR-USERNAME/dusty-app
```

Share this with collaborators or Claude Code for assistance.
