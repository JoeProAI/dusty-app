# API Documentation

Base URL: `http://localhost:8000`

## Endpoints

### Health Check

**GET** `/health`

Check if API is operational.

**Response**
```json
{
  "status": "healthy"
}
```

### Upload ESX File

**POST** `/api/upload`

Upload and parse an Xactimate ESX file.

**Request**
- Content-Type: `multipart/form-data`
- Body: `file` (ESX file, max 50MB)

**Response**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "filename": "estimate.esx",
  "size": 1048576,
  "metadata": {
    "xml_files_found": 2,
    "estimate_found": true,
    "roof_data_found": true,
    "floor_plan_found": true
  },
  "preview": {
    "structure": {
      "estimate.xml": ["Estimate", "Claim", "LineItems"]
    },
    "summary": "ESX file successfully parsed"
  },
  "status": "parsed"
}
```

**Errors**
- `400` - Invalid file type or corrupted ESX
- `413` - File too large
- `500` - Processing error

### Convert to Roofplan XML

**POST** `/api/convert/roofplan`

Generate Symbility Roofplan XML from parsed ESX data.

**Request**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "output_type": "roofplan",
  "use_ai_mapping": true,
  "mapping_overrides": {
    "XM-ROOF-001": "SYMB-RF-001"
  }
}
```

**Response**
```json
{
  "conversion_id": "660e9511-f30c-52e5-b827-557766551111",
  "output_type": "roofplan_xml",
  "download_url": "/api/downloads/660e9511-f30c-52e5-b827-557766551111.xml",
  "warnings": [
    "3 items could not be mapped automatically"
  ],
  "mapped_items": 47,
  "unmapped_items": 3
}
```

### Convert to FML Floor Plan

**POST** `/api/convert/floorplan`

Generate Symbility FML from parsed ESX floor plan data.

**Request**
```json
{
  "file_id": "550e8400-e29b-41d4-a716-446655440000",
  "output_type": "floorplan",
  "use_ai_mapping": true,
  "mapping_overrides": {}
}
```

**Response**
```json
{
  "conversion_id": "770e9622-g40d-63f6-c938-668877662222",
  "output_type": "fml",
  "download_url": "/api/downloads/770e9622-g40d-63f6-c938-668877662222.fml",
  "warnings": [],
  "mapped_items": 12,
  "unmapped_items": 0
}
```

### List Templates

**GET** `/api/templates`

Get all saved mapping templates.

**Response**
```json
[
  {
    "id": "tpl-001",
    "name": "Residential Standard",
    "description": "Standard residential mapping",
    "mappings": {
      "XM-ROOF-001": "SYMB-RF-001"
    },
    "created_at": "2026-01-11T21:00:00Z"
  }
]
```

### Create Template

**POST** `/api/templates`

Save a new mapping template.

**Request**
```json
{
  "name": "My Custom Template",
  "description": "Custom mappings for commercial properties",
  "mappings": {
    "XM-ROOF-001": "SYMB-RF-001",
    "XM-WALL-002": "SYMB-WL-002"
  }
}
```

### Get Conversion History

**GET** `/api/history?limit=50&offset=0`

Retrieve conversion history.

**Response**
```json
[
  {
    "id": "conv-001",
    "filename": "estimate.esx",
    "conversion_type": "roofplan",
    "created_at": "2026-01-11T20:30:00Z",
    "status": "completed",
    "warnings_count": 2
  }
]
```

## Error Responses

All errors follow this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

**Common Status Codes**
- `400` - Bad request (invalid input)
- `404` - Resource not found
- `413` - Payload too large
- `500` - Internal server error

## Rate Limiting

Currently no rate limiting implemented. For production deployment, consider:
- 100 requests/minute per IP
- 50 MB max file size
- 10 concurrent uploads per user

## Authentication

Currently no authentication required for local development. For production:
- Add API key header: `X-API-Key: your-key-here`
- Implement JWT tokens for user sessions
- Add OAuth2 for enterprise deployments
