# Setup Guide

Complete step-by-step guide to get the Xactimate to Symbility Converter running.

## Prerequisites

- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **OpenAI API Key** - [Get one](https://platform.openai.com/api-keys)
- **XAI API Key** (optional) - [Get one](https://x.ai/)

## Step 1: Clone/Navigate to Project

```powershell
cd "c:\Projects\Dusty App"
```

## Step 2: Backend Setup

### Create Virtual Environment

```powershell
cd backend
python -m venv venv
```

### Activate Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

If you get an execution policy error, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Install Dependencies

```powershell
pip install -r requirements.txt
```

### Configure Environment

```powershell
cp .env.example .env
```

Edit `.env` and add your API keys:
```
OPENAI_API_KEY=sk-your-key-here
XAI_API_KEY=your-xai-key-here
```

### Test Backend

```powershell
uvicorn app.main:app --reload
```

Visit http://localhost:8000 - you should see:
```json
{
  "name": "Xactimate to Symbility Converter",
  "version": "1.0.0",
  "status": "operational"
}
```

## Step 3: Frontend Setup

### Open New Terminal

Keep backend running, open a new PowerShell window:

```powershell
cd "c:\Projects\Dusty App\frontend"
```

### Install Dependencies

```powershell
npm install
```

This will take a few minutes. All TypeScript lint errors will resolve after this completes.

### Start Development Server

```powershell
npm run dev
```

Visit http://localhost:5173

## Step 4: Verify Installation

You should see:
- **Backend** running at http://localhost:8000
- **Frontend** running at http://localhost:5173
- No TypeScript errors in the IDE

## Troubleshooting

### Backend Issues

**Module not found**
```powershell
pip install -r requirements.txt --force-reinstall
```

**Port 8000 already in use**
```powershell
uvicorn app.main:app --reload --port 8001
```
Update frontend proxy in `vite.config.ts` to match.

### Frontend Issues

**npm install fails**
```powershell
npm cache clean --force
npm install
```

**Port 5173 already in use**
```powershell
npm run dev -- --port 5174
```

**TypeScript errors persist after npm install**
```powershell
# Restart your IDE/TypeScript server
# In VS Code: Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### API Key Issues

**OpenAI 401 Unauthorized**
- Verify your API key is correct in `.env`
- Check your OpenAI account has credits
- Restart the backend after updating `.env`

## Next Steps

1. **Upload a test ESX file** at http://localhost:5173
2. **Review TODO.md** for development roadmap
3. **Check docs/API.md** for endpoint documentation
4. **Run tests** (when implemented): `pytest` in backend, `npm test` in frontend

## Development Workflow

### Terminal 1 - Backend
```powershell
cd "c:\Projects\Dusty App\backend"
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

### Terminal 2 - Frontend
```powershell
cd "c:\Projects\Dusty App\frontend"
npm run dev
```

### Making Changes

- **Backend changes**: Auto-reload enabled
- **Frontend changes**: Hot module replacement enabled
- **Environment changes**: Restart both servers

## Production Build

### Backend
```powershell
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```powershell
cd frontend
npm run build
npm run preview
```

Build output in `frontend/dist/`
