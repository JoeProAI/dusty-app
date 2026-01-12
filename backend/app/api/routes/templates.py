from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class Template(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    mappings: Dict[str, str]
    created_at: Optional[str] = None

@router.get("/templates", response_model=List[Template])
async def list_templates():
    """Get all saved mapping templates"""
    return []

@router.post("/templates", response_model=Template)
async def create_template(template: Template):
    """Save a new mapping template"""
    return template

@router.get("/templates/{template_id}", response_model=Template)
async def get_template(template_id: str):
    """Get a specific template by ID"""
    raise HTTPException(status_code=404, detail="Template not found")

@router.delete("/templates/{template_id}")
async def delete_template(template_id: str):
    """Delete a template"""
    return {"status": "deleted"}
