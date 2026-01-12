import zipfile
import io
import uuid
import xmltodict
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class ESXParser:
    """
    Parse Xactimate ESX files (ZIP-compressed containers with XML data)
    """
    
    async def parse_esx(self, file_contents: bytes, filename: str) -> Dict[str, Any]:
        """
        Extract and parse ESX file
        
        Args:
            file_contents: Raw bytes of the ESX file
            filename: Original filename
            
        Returns:
            Dictionary with parsed data including file_id, metadata, and preview
        """
        file_id = str(uuid.uuid4())
        
        with zipfile.ZipFile(io.BytesIO(file_contents)) as zf:
            file_list = zf.namelist()
            logger.info(f"ESX contains {len(file_list)} files: {file_list}")
            
            xml_files = [f for f in file_list if f.endswith('.xml')]
            
            if not xml_files:
                raise ValueError("No XML files found in ESX archive")
            
            estimate_data = {}
            for xml_file in xml_files:
                content = zf.read(xml_file)
                try:
                    parsed = xmltodict.parse(content)
                    estimate_data[xml_file] = parsed
                except Exception as e:
                    logger.warning(f"Could not parse {xml_file}: {e}")
            
            metadata = self._extract_metadata(estimate_data)
            preview = self._create_preview(estimate_data)
            
            return {
                "file_id": file_id,
                "filename": filename,
                "metadata": metadata,
                "preview": preview,
                "raw_data": estimate_data
            }
    
    def _extract_metadata(self, data: Dict) -> Dict[str, Any]:
        """Extract basic metadata from parsed XML"""
        metadata = {
            "xml_files_found": len(data),
            "estimate_found": False,
            "roof_data_found": False,
            "floor_plan_found": False
        }
        
        for xml_file, content in data.items():
            if isinstance(content, dict):
                if any(key in str(content.keys()).lower() for key in ['estimate', 'claim', 'project']):
                    metadata["estimate_found"] = True
                if any(key in str(content.keys()).lower() for key in ['roof', 'slope', 'facet']):
                    metadata["roof_data_found"] = True
                if any(key in str(content.keys()).lower() for key in ['room', 'floor', 'level']):
                    metadata["floor_plan_found"] = True
        
        return metadata
    
    def _create_preview(self, data: Dict) -> Dict[str, Any]:
        """Create a preview of the estimate data"""
        preview = {
            "structure": {},
            "summary": "ESX file successfully parsed"
        }
        
        for xml_file, content in data.items():
            if isinstance(content, dict):
                preview["structure"][xml_file] = list(content.keys())[:5]
        
        return preview
