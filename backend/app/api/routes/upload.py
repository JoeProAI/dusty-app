from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict
import zipfile
import io
import logging

from app.services.esx_parser import ESXParser

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/upload")
async def upload_esx_file(file: UploadFile = File(...)) -> Dict:
    """
    Upload and parse an Xactimate ESX file
    
    Returns:
        - file_id: Unique identifier for the uploaded file
        - metadata: Basic file information
        - preview: Parsed estimate data preview
    """
    if not file.filename.endswith('.esx'):
        raise HTTPException(status_code=400, detail="File must be an .esx file")
    
    try:
        contents = await file.read()
        
        if len(contents) > 52428800:
            raise HTTPException(status_code=413, detail="File too large (max 50MB)")
        
        parser = ESXParser()
        result = await parser.parse_esx(contents, file.filename)
        
        logger.info(f"Successfully parsed ESX file: {file.filename}")
        
        return {
            "file_id": result["file_id"],
            "filename": file.filename,
            "size": len(contents),
            "metadata": result["metadata"],
            "preview": result["preview"],
            "status": "parsed"
        }
        
    except zipfile.BadZipFile:
        raise HTTPException(status_code=400, detail="Invalid ESX file (not a valid ZIP archive)")
    except Exception as e:
        logger.error(f"Error parsing ESX file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
