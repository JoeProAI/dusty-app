# Development Guide

## Getting Started

Follow [SETUP.md](../SETUP.md) first to get the development environment running.

## Project Structure

```
dusty-app/
├── backend/              Python FastAPI backend
│   ├── app/
│   │   ├── api/         Route handlers
│   │   ├── core/        Configuration
│   │   ├── models/      Data schemas
│   │   └── services/    Business logic
│   └── tests/           Backend tests
├── frontend/            React TypeScript frontend
│   ├── src/
│   │   ├── components/  React components
│   │   ├── pages/       Page components
│   │   ├── services/    API clients
│   │   └── types/       TypeScript types
│   └── public/          Static assets
└── docs/                Documentation
```

## Development Workflow

### Adding a New Backend Endpoint

1. **Define route** in `backend/app/api/routes/`
```python
@router.post("/new-endpoint")
async def new_endpoint(data: RequestModel):
    return {"result": "success"}
```

2. **Create service** in `backend/app/services/`
```python
class NewService:
    async def process(self, data):
        return processed_data
```

3. **Add schema** in `backend/app/models/schemas.py`
```python
class RequestModel(BaseModel):
    field: str
```

4. **Register router** in `backend/app/main.py`
```python
app.include_router(new_router, prefix="/api", tags=["new"])
```

### Adding a New Frontend Component

1. **Create component** in `frontend/src/components/`
```tsx
export default function NewComponent() {
  return <div>Component</div>
}
```

2. **Add types** in `frontend/src/types/index.ts`
```typescript
export interface NewData {
  field: string
}
```

3. **Create API service** in `frontend/src/services/api.ts`
```typescript
export async function fetchNewData(): Promise<NewData> {
  const response = await api.get('/new-endpoint')
  return response.data
}
```

4. **Use React Query hook**
```tsx
const { data, isLoading } = useQuery({
  queryKey: ['newData'],
  queryFn: fetchNewData
})
```

## Code Style

### Backend (Python)

**Formatting**: Black
```powershell
black backend/app
```

**Linting**: Ruff
```powershell
ruff check backend/app
```

**Type Checking**: mypy (optional)
```powershell
mypy backend/app
```

### Frontend (TypeScript)

**Formatting**: Prettier (via npm script)
```powershell
npm run format
```

**Linting**: ESLint
```powershell
npm run lint
```

## Testing

### Backend Tests

**Run all tests**
```powershell
cd backend
pytest
```

**Run with coverage**
```powershell
pytest --cov=app --cov-report=html
```

**Test structure**
```python
def test_parse_esx():
    parser = ESXParser()
    result = await parser.parse_esx(sample_data, "test.esx")
    assert result["file_id"]
    assert result["metadata"]["estimate_found"]
```

### Frontend Tests (To Be Implemented)

**Run tests**
```powershell
npm test
```

**Component test example**
```typescript
test('uploads file on drop', async () => {
  render(<HomePage />)
  const file = new File(['content'], 'test.esx')
  // Test dropzone interaction
})
```

## Debugging

### Backend

**Add logging**
```python
import logging
logger = logging.getLogger(__name__)
logger.info(f"Processing file: {filename}")
```

**VS Code launch.json**
```json
{
  "name": "FastAPI",
  "type": "python",
  "request": "launch",
  "module": "uvicorn",
  "args": ["app.main:app", "--reload"]
}
```

### Frontend

**React DevTools**: Install browser extension

**Network inspection**: Browser DevTools → Network tab

**React Query DevTools**: Already configured in development

## AI Integration Development

### Testing AI Mapping

**Mock responses** for testing without API calls:
```python
class MockAIMapper(AIMapper):
    async def suggest_mappings(self, codes, context):
        return {
            "XM-ROOF-001": "SYMB-RF-001",
            "XM-WALL-002": "SYMB-WL-002"
        }
```

**Test with real API**:
1. Ensure `.env` has valid `OPENAI_API_KEY`
2. Use small test datasets to minimize cost
3. Log all prompts and responses
4. Track token usage

## Database Development

Currently using in-memory storage. To add SQLite:

1. **Create models** in `backend/app/models/database.py`
```python
from sqlalchemy import Column, String
class Conversion(Base):
    __tablename__ = "conversions"
    id = Column(String, primary_key=True)
```

2. **Initialize database**
```python
from sqlalchemy.ext.asyncio import create_async_engine
engine = create_async_engine(settings.DATABASE_URL)
```

3. **Add migration support** (Alembic)

## Performance Optimization

### Backend

- Use `async`/`await` for I/O operations
- Stream large files instead of loading to memory
- Cache AI responses in database
- Add Redis for distributed caching

### Frontend

- Use `React.lazy()` for code splitting
- Memoize expensive computations
- Virtualize long lists
- Optimize images and assets

## Common Issues

### Backend won't start

**Check Python version**
```powershell
python --version  # Should be 3.11+
```

**Reinstall dependencies**
```powershell
pip install -r requirements.txt --upgrade
```

### Frontend build fails

**Clear node_modules**
```powershell
rm -rf node_modules
npm install
```

**Check Node version**
```powershell
node --version  # Should be 18+
```

### API calls failing

**Check backend is running**: http://localhost:8000/health

**Check CORS configuration** in `backend/app/main.py`:
```python
allow_origins=["http://localhost:5173"]
```

## Git Workflow

**Branch naming**
- `feature/description`
- `bugfix/description`
- `docs/description`

**Commit messages**
- `feat: add roofplan XML generation`
- `fix: correct facet area calculation`
- `docs: update API documentation`

## Collaboration with Claude Code

When handing off to Claude Code or another developer:

1. **Point to specific files** needing work
2. **Reference TODO.md** for context
3. **Highlight integration points** in ARCHITECTURE.md
4. **Share test cases** for validation

### Example Handoff

> "Need help implementing the diagram canvas. Check:
> - `frontend/src/components/diagrams/` (create this)
> - Use Konva.js per package.json
> - Integrate with ConversionPage.tsx
> - See TODO.md Phase 5 for requirements"

## Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Query**: https://tanstack.com/query/latest
- **TailwindCSS**: https://tailwindcss.com/docs
- **OpenAI API**: https://platform.openai.com/docs
- **Symbility Docs**: (Contact CoreLogic for API/schema docs)
