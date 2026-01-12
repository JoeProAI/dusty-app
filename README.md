# Xactimate to Symbility Converter

A professional-grade application for converting Xactimate ESX files to Symbility-compatible Roofplan XML and FML floor plan formats.

## Overview

This application solves the critical problem of converting insurance estimates from Xactimate format into formats that Symbility/CoreLogic Claims Estimate can import, specifically:

- **Roofplan XML**: For roof measurements and diagrams
- **FML (Floor Markup Language)**: For interior floor plans and room layouts

## Key Features

- **ESX File Parser**: Extract and parse Xactimate ESX files (ZIP-compressed containers)
- **AI-Powered Mapping**: Intelligent conversion using OpenAI/XAI to map Xactimate codes to Symbility equivalents
- **Diagram Generation**: Visual preview and export of roof plans and floor plans
- **Schema Validation**: Ensure output files meet Symbility import requirements
- **Batch Processing**: Convert multiple estimates efficiently
- **Conversion Templates**: Save and reuse mapping configurations
- **History Tracking**: Audit trail of all conversions

## Architecture

### Tech Stack

**Backend**
- Python 3.11+ with FastAPI
- Pydantic for data validation
- XMLtoDict/lxml for XML processing
- OpenAI SDK for AI features
- SQLite for local data storage

**Frontend**
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- shadcn/ui components
- Konva.js for canvas-based diagram rendering
- React Query for state management

**AI Integration**
- OpenAI GPT-4 for intelligent code mapping
- XAI Grok for validation and inference
- Fallback logic for offline operation

## Project Structure

```
dusty-app/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core business logic
│   │   ├── models/         # Data models
│   │   ├── services/       # Service layer
│   │   └── utils/          # Utilities
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities
│   │   ├── services/       # API clients
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
├── docs/                   # Documentation
│   ├── API.md             # API documentation
│   ├── ARCHITECTURE.md    # System architecture
│   ├── DEVELOPMENT.md     # Development guide
│   └── SCHEMAS.md         # XML/FML schemas
├── examples/              # Example files
│   ├── sample.esx         # Sample Xactimate file
│   ├── sample-roof.xml    # Sample Roofplan XML
│   └── sample-floor.fml   # Sample FML
└── scripts/               # Utility scripts
    └── setup.sh           # Environment setup
```

## Deployment Options

### Option 1: GitHub + Vercel (Recommended for Production)

**Frontend**: Deploy to Vercel (free)  
**Backend**: Deploy to Railway ($5-10/month)

See **[DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)** for complete setup guide.

**Your Repository**: https://github.com/JoeProAI/dusty-app

**Quick Start**:
```bash
# Already pushed to GitHub ✓
# Repository: JoeProAI/dusty-app

# Next steps:
# 1. Deploy frontend to Vercel (via dashboard)
# 2. Deploy backend to Railway (via dashboard)
```

### Option 2: Local Development

**Prerequisites**:
- Python 3.11+
- Node.js 18+
- OpenAI API key

See **[SETUP.md](./SETUP.md)** for detailed local setup.

**Quick Start**:
```bash
# Backend
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
cp .env.example .env
# Add API keys to .env
uvicorn app.main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Access at http://localhost:5173

## Usage Workflow

1. **Upload ESX**: Drag and drop Xactimate ESX file
2. **AI Analysis**: System extracts and analyzes estimate data
3. **Review Mapping**: Verify AI-suggested code mappings
4. **Generate Output**: Export Roofplan XML and/or FML files
5. **Import to Symbility**: Use generated files in Claims Estimate

## Development Status

See [TODO.md](./TODO.md) for current development progress and next steps.

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Schema Reference](./docs/SCHEMAS.md)

## Security & Privacy

- **Local Processing**: All file processing happens locally
- **No Data Upload**: Estimate data never leaves your machine except for AI API calls
- **API Key Security**: Keys stored in environment variables
- **HIPAA Considerations**: Suitable for handling insurance claim data

## License

Proprietary - Built for Dustin's insurance workflow needs.

## Support

For questions or issues, contact the development team or review documentation in `/docs`.
