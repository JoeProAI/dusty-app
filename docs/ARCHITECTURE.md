# Architecture Overview

## System Design

```
┌─────────────────┐         ┌──────────────────┐
│   Frontend      │◄───────►│    Backend       │
│   React + TS    │  HTTP   │  FastAPI + Py    │
│   Port 5173     │         │    Port 8000     │
└─────────────────┘         └──────────────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌──────────────────┐
│  React Query    │         │   SQLite DB      │
│  State Mgmt     │         │   Local Storage  │
└─────────────────┘         └──────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │   OpenAI/XAI     │
                            │   AI Services    │
                            └──────────────────┘
```

## Backend Architecture

### Layers

**1. API Layer** (`app/api/routes/`)
- Route handlers
- Request validation
- Response formatting

**2. Service Layer** (`app/services/`)
- Business logic
- ESX parsing
- XML/FML generation
- AI mapping

**3. Model Layer** (`app/models/`)
- Pydantic schemas
- Data validation
- Type definitions

**4. Core Layer** (`app/core/`)
- Configuration
- Shared utilities
- Database connections

### Data Flow

```
ESX Upload → Parse ZIP → Extract XML → Store Data
                                        ↓
                         AI Mapping ← Parse Structure
                                        ↓
                         Generate XML/FML → Download
```

## Frontend Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── ValidationRail (signature element)
│   ├── Navigation
│   └── Main Content
│       ├── HomePage
│       ├── ConversionPage
│       ├── HistoryPage
│       └── TemplatesPage
```

### State Management

**React Query** handles:
- Server state caching
- Automatic refetching
- Optimistic updates
- Error handling

**Local State** via `useState`:
- Form inputs
- UI toggles
- Transient data

### Design System

**Tokens** (`tailwind.config.js`):
- Colors: Technical precision palette
- Typography: IBM Plex Mono + Inter
- Spacing: 4px base unit
- Motion: Fast/base/slow durations

**Signature Element**: ValidationRail
- Vertical progress indicator
- Phase visualization (parse/map/validate/export)
- State-driven styling

## Data Models

### ESX Structure

```typescript
{
  file_id: string
  metadata: {
    xml_files_found: number
    estimate_found: boolean
    roof_data_found: boolean
    floor_plan_found: boolean
  }
  rooms?: Room[]
  roof_measurements?: RoofMeasurement[]
}
```

### Symbility Roofplan XML

```xml
<RoofPlan version="1.0">
  <Metadata>
    <Source>Xactimate Converter</Source>
    <ConversionId>uuid</ConversionId>
  </Metadata>
  <Facets>
    <Facet id="1">
      <Slope>6/12</Slope>
      <Area>1500</Area>
    </Facet>
  </Facets>
</RoofPlan>
```

### Symbility FML

```xml
<FloorPlan version="1.0">
  <Rooms>
    <Room id="1">
      <Name>Living Room</Name>
      <Dimensions>
        <Length>15.5</Length>
        <Width>12.0</Width>
      </Dimensions>
    </Room>
  </Rooms>
</FloorPlan>
```

## AI Integration

### OpenAI Usage

**Purpose**: Intelligent code mapping

**Workflow**:
1. Extract Xactimate item codes from ESX
2. Send to GPT-4 with context
3. Receive Symbility equivalent suggestions
4. Validate and apply mappings

**Prompt Structure**:
```
System: You are an insurance estimating expert
User: Map these Xactimate codes to Symbility equivalents:
      [codes] with context [estimate type, region, etc.]
```

**Fallback**: If AI unavailable, use static mapping table

### Cost Management

- Cache AI responses per code combination
- Batch similar requests
- Set token limits
- Track usage per conversion

## Security Considerations

### Current (Development)

- No authentication
- Local file processing
- API keys in `.env`

### Production Requirements

- API key authentication
- File upload validation
- Rate limiting
- HTTPS only
- Audit logging
- PII/PHI handling compliance

## Performance

### Backend

- Async file processing
- Streaming large XML files
- Connection pooling for DB
- Response caching

### Frontend

- Code splitting by route
- Lazy loading for canvas
- React Query caching
- Optimistic UI updates

## Testing Strategy

### Backend Tests

- Unit: Service functions
- Integration: API endpoints
- E2E: Full conversion flow

### Frontend Tests

- Unit: Component logic
- Integration: User flows
- E2E: Playwright scenarios

## Deployment

### Local Development

- Backend: `uvicorn` with reload
- Frontend: Vite dev server
- Hot reload enabled

### Production Options

**Option 1: Single Server**
- Build frontend to static files
- Serve via FastAPI StaticFiles
- Single deployment

**Option 2: Separate Hosting**
- Backend: Cloud VPS or PaaS
- Frontend: Netlify/Vercel
- CORS configuration

**Option 3: Desktop App**
- Package with Electron
- Bundle both backend/frontend
- Offline-capable
