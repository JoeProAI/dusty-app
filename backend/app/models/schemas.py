from pydantic import BaseModel, Field
from typing import Optional, Dict, List, Any
from datetime import datetime

class EstimateMetadata(BaseModel):
    xml_files_found: int
    estimate_found: bool
    roof_data_found: bool
    floor_plan_found: bool

class EstimatePreview(BaseModel):
    structure: Dict[str, List[str]]
    summary: str

class UploadResponse(BaseModel):
    file_id: str
    filename: str
    size: int
    metadata: EstimateMetadata
    preview: EstimatePreview
    status: str

class RoofMeasurement(BaseModel):
    facet_id: str
    slope: Optional[float] = None
    area: Optional[float] = None
    pitch: Optional[str] = None
    ridge_length: Optional[float] = None
    measurements: Dict[str, Any] = Field(default_factory=dict)

class Room(BaseModel):
    room_id: str
    name: str
    length: Optional[float] = None
    width: Optional[float] = None
    height: Optional[float] = None
    area: Optional[float] = None
    perimeter: Optional[float] = None

class MappingRule(BaseModel):
    xactimate_code: str
    symbility_code: str
    confidence: Optional[float] = None
    ai_suggested: bool = False

class ConversionWarning(BaseModel):
    severity: str
    message: str
    field: Optional[str] = None
    suggestion: Optional[str] = None
