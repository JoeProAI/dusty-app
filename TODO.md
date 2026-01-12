# Development TODO

## Phase 1: Foundation & Setup ⏳ IN PROGRESS

### Project Structure
- [x] Create README.md
- [x] Create TODO.md
- [ ] Create architecture documentation
- [ ] Set up backend project structure
- [ ] Set up frontend project structure
- [ ] Create development environment setup scripts

### Backend Foundation
- [ ] Initialize FastAPI project
- [ ] Set up project dependencies (requirements.txt)
- [ ] Configure CORS and middleware
- [ ] Create base API structure
- [ ] Set up SQLite database
- [ ] Create Pydantic models for data validation
- [ ] Add logging configuration

### Frontend Foundation
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install and configure TailwindCSS
- [ ] Set up shadcn/ui components
- [ ] Create base layout and routing
- [ ] Configure API client (axios/fetch)
- [ ] Set up React Query
- [ ] Create TypeScript types

## Phase 2: ESX File Processing 📦 PENDING

### File Upload & Extraction
- [ ] Create file upload component (drag-and-drop)
- [ ] Backend endpoint: POST /api/upload
- [ ] ZIP extraction service
- [ ] XML parser for Xactimate files
- [ ] File validation logic
- [ ] Error handling for corrupted files

### Data Models
- [ ] Define Xactimate estimate schema
- [ ] Define room/measurement models
- [ ] Define line item models
- [ ] Create database schema for parsed data
- [ ] Build data preview component

### Testing
- [ ] Unit tests for ZIP extraction
- [ ] Unit tests for XML parsing
- [ ] Integration test with sample ESX
- [ ] Frontend upload component tests

## Phase 3: Symbility Output Generation 🎯 PENDING

### Roofplan XML Generator
- [ ] Research Symbility Roofplan XML schema
- [ ] Create XML builder service
- [ ] Map roof measurements to XML structure
- [ ] Add slope, pitch, ridge calculations
- [ ] Implement facet/plane geometry
- [ ] Schema validation logic
- [ ] Export endpoint: POST /api/convert/roofplan

### FML Generator
- [ ] Research FML format specification
- [ ] Create FML builder service
- [ ] Map floor plan data to FML structure
- [ ] Handle room dimensions and connections
- [ ] Add door/window placement
- [ ] Schema validation logic
- [ ] Export endpoint: POST /api/convert/floorplan

### Testing
- [ ] Unit tests for XML generation
- [ ] Unit tests for FML generation
- [ ] Validation tests against Symbility schemas
- [ ] End-to-end conversion tests

## Phase 4: AI Integration 🤖 PENDING

### OpenAI Integration
- [ ] Set up OpenAI SDK
- [ ] Create API key management
- [ ] Build code mapping prompt engineering
- [ ] Implement item code translation service
- [ ] Add measurement inference logic
- [ ] Create validation assistant
- [ ] Add retry logic and error handling

### XAI Integration (Optional)
- [ ] Set up XAI SDK
- [ ] Create fallback logic
- [ ] Implement validation checks
- [ ] Add cost tracking

### Mapping Intelligence
- [ ] Build Xactimate → Symbility mapping database
- [ ] Create learning system for mappings
- [ ] Implement confidence scoring
- [ ] Add manual override capability
- [ ] Create mapping review UI

### Testing
- [ ] Mock API tests
- [ ] Integration tests with live APIs
- [ ] Test prompt variations
- [ ] Validate mapping accuracy

## Phase 5: Visual Diagram Editor 🎨 PENDING

### Canvas Rendering
- [ ] Set up Konva.js or similar canvas library
- [ ] Create roof diagram renderer
- [ ] Create floor plan renderer
- [ ] Add measurement labels
- [ ] Implement zoom/pan controls

### Interactive Editing
- [ ] Add measurement editing
- [ ] Implement room resizing
- [ ] Add annotation tools
- [ ] Create undo/redo system
- [ ] Save diagram state

### Preview & Export
- [ ] Real-time preview as XML/FML
- [ ] Export to PNG/PDF for documentation
- [ ] Print-friendly layouts

### Testing
- [ ] Component tests for canvas
- [ ] Interaction tests
- [ ] Export validation tests

## Phase 6: Templates & History 📋 PENDING

### Template System
- [ ] Database schema for templates
- [ ] Save mapping configuration
- [ ] Load saved templates
- [ ] Template management UI
- [ ] Import/export templates

### Conversion History
- [ ] Database schema for history
- [ ] Track all conversions
- [ ] Store input/output pairs
- [ ] Create history browser UI
- [ ] Add search/filter
- [ ] Export audit logs

### Testing
- [ ] CRUD tests for templates
- [ ] History tracking tests
- [ ] UI component tests

## Phase 7: Polish & Production 🚀 PENDING

### Error Handling
- [ ] Comprehensive error messages
- [ ] User-friendly error UI
- [ ] Logging and debugging
- [ ] Sentry or error tracking integration

### Performance
- [ ] Optimize large file handling
- [ ] Add progress indicators
- [ ] Implement caching
- [ ] Lazy loading for UI
- [ ] Background processing for large conversions

### Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] User guide
- [ ] Developer setup guide
- [ ] Schema documentation
- [ ] Troubleshooting guide

### Security
- [ ] Input validation
- [ ] File size limits
- [ ] API key encryption
- [ ] Rate limiting
- [ ] CORS configuration

### Testing
- [ ] E2E tests with Playwright
- [ ] Load testing
- [ ] Security audit
- [ ] Browser compatibility testing

### Deployment
- [ ] Production build configuration
- [ ] Environment setup instructions
- [ ] Docker containerization (optional)
- [ ] CI/CD pipeline
- [ ] Monitoring setup

## Notes for Claude Code Collaboration

If working with Claude Code or another developer, here are key handoff points:

### Backend Handoff
- Review `backend/app/core/` for business logic
- Check `backend/app/services/` for AI integration points
- Validate XML/FML generation in `backend/app/services/converters/`
- Test endpoints in `backend/tests/`

### Frontend Handoff
- Review design tokens in `frontend/src/styles/tokens.css`
- Check component library in `frontend/src/components/`
- Validate canvas rendering in `frontend/src/components/diagrams/`
- Test user flows end-to-end

### Integration Points
- API contract defined in `docs/API.md`
- Data models in `backend/app/models/` and `frontend/src/types/`
- Error handling strategy in `docs/ARCHITECTURE.md`

### Questions for Handoff
- Schema validation approach?
- Preferred canvas library (Konva vs custom)?
- State management patterns?
- Testing coverage requirements?
