from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
import logging

from app.services.roofplan_generator import RoofplanGenerator
from app.services.fml_generator import FMLGenerator
from app.services.ai_mapper import AIMapper

router = APIRouter()
logger = logging.getLogger(__name__)

class ConversionRequest(BaseModel):
    file_id: str
    output_type: str
    mapping_overrides: Optional[Dict[str, str]] = None
    use_ai_mapping: bool = True

class ConversionResponse(BaseModel):
    conversion_id: str
    output_type: str
    download_url: str
    warnings: List[str]
    mapped_items: int
    unmapped_items: int

@router.post("/convert/roofplan", response_model=ConversionResponse)
async def convert_to_roofplan(request: ConversionRequest):
    """
    Convert parsed ESX data to Symbility Roofplan XML
    """
    try:
        generator = RoofplanGenerator()
        
        if request.use_ai_mapping:
            mapper = AIMapper()
            mapped_data = await mapper.map_roof_data(request.file_id)
        else:
            mapped_data = await generator.get_stored_data(request.file_id)
        
        result = await generator.generate(
            mapped_data,
            overrides=request.mapping_overrides
        )
        
        logger.info(f"Generated Roofplan XML for file_id: {request.file_id}")
        
        return ConversionResponse(
            conversion_id=result["conversion_id"],
            output_type="roofplan_xml",
            download_url=result["download_url"],
            warnings=result.get("warnings", []),
            mapped_items=result["mapped_items"],
            unmapped_items=result["unmapped_items"]
        )
        
    except Exception as e:
        logger.error(f"Error generating Roofplan XML: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/convert/floorplan", response_model=ConversionResponse)
async def convert_to_floorplan(request: ConversionRequest):
    """
    Convert parsed ESX data to Symbility FML floor plan
    """
    try:
        generator = FMLGenerator()
        
        if request.use_ai_mapping:
            mapper = AIMapper()
            mapped_data = await mapper.map_floor_data(request.file_id)
        else:
            mapped_data = await generator.get_stored_data(request.file_id)
        
        result = await generator.generate(
            mapped_data,
            overrides=request.mapping_overrides
        )
        
        logger.info(f"Generated FML for file_id: {request.file_id}")
        
        return ConversionResponse(
            conversion_id=result["conversion_id"],
            output_type="fml",
            download_url=result["download_url"],
            warnings=result.get("warnings", []),
            mapped_items=result["mapped_items"],
            unmapped_items=result["unmapped_items"]
        )
        
    except Exception as e:
        logger.error(f"Error generating FML: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
