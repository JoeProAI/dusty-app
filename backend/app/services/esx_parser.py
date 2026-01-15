import zipfile
import io
import uuid
import xmltodict
import zlib
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
            
            # Check for nested XACTDOC.ZIPXML structure
            xactdoc_files = [f for f in file_list if 'XACTDOC' in f.upper() and 'ZIP' in f.upper()]
            
            xml_files = []
            estimate_data = {}
            
            if xactdoc_files:
                # Extract and parse nested XACTDOC file
                logger.info(f"Found nested XACTDOC file: {xactdoc_files[0]}")
                nested_content = zf.read(xactdoc_files[0])
                
                # Try as ZIP first
                try:
                    with zipfile.ZipFile(io.BytesIO(nested_content)) as nested_zf:
                        nested_file_list = nested_zf.namelist()
                        logger.info(f"Nested ZIP contains {len(nested_file_list)} files: {nested_file_list}")
                        
                        xml_files = [f for f in nested_file_list if f.lower().endswith('.xml')]
                        
                        for xml_file in xml_files:
                            content = nested_zf.read(xml_file)
                            try:
                                parsed = xmltodict.parse(content)
                                estimate_data[xml_file] = parsed
                            except Exception as e:
                                logger.warning(f"Could not parse {xml_file}: {e}")
                except zipfile.BadZipFile:
                    # Not a ZIP file, try multiple decompression methods
                    logger.info("XACTDOC file is not a ZIP, attempting decompression")
                    decompressed = None
                    
                    # Try raw DEFLATE decompression (used in PKZip)
                    try:
                        decompressed = zlib.decompress(nested_content, -zlib.MAX_WBITS)
                        logger.info(f"Successfully decompressed XACTDOC with raw DEFLATE, size: {len(decompressed)} bytes")
                    except:
                        pass
                    
                    # Try standard zlib decompression
                    if not decompressed:
                        try:
                            decompressed = zlib.decompress(nested_content)
                            logger.info(f"Successfully decompressed XACTDOC with zlib, size: {len(decompressed)} bytes")
                        except:
                            pass
                    
                    # Try skipping first 4 bytes (might be a header) and decompress
                    if not decompressed and len(nested_content) > 4:
                        try:
                            decompressed = zlib.decompress(nested_content[4:], -zlib.MAX_WBITS)
                            logger.info(f"Successfully decompressed XACTDOC after skipping header, size: {len(decompressed)} bytes")
                        except:
                            pass
                    
                    if decompressed:
                        logger.info(f"Decompression successful, size: {len(decompressed)} bytes")
                        
                        # Try different encodings and find XML start
                        xml_content = None
                        for encoding in ['utf-8', 'latin-1', 'utf-16', 'cp1252']:
                            try:
                                decoded = decompressed.decode(encoding)
                                # Find XML start tag
                                xml_start = decoded.find('<?xml')
                                if xml_start == -1:
                                    xml_start = decoded.find('<')
                                if xml_start >= 0:
                                    xml_content = decoded[xml_start:]
                                    logger.info(f"Found XML content using {encoding} encoding at position {xml_start}")
                                    break
                            except:
                                continue
                        
                        if not xml_content:
                            xml_content = decompressed
                        
                        parsed = xmltodict.parse(xml_content)
                        estimate_data[xactdoc_files[0]] = parsed
                        xml_files = [xactdoc_files[0]]
                    
                    if not xml_files:
                        # Not compressed, try parsing as raw XML
                        logger.info("Not compressed, attempting to parse as XML directly")
                        try:
                            parsed = xmltodict.parse(nested_content)
                            estimate_data[xactdoc_files[0]] = parsed
                            xml_files = [xactdoc_files[0]]
                        except Exception as e:
                            logger.error(f"Failed to parse XACTDOC as XML: {e}")
                            logger.error(f"First 100 bytes: {nested_content[:100]}")
                            raise ValueError(f"XACTDOC file could not be parsed: {e}")
                    except Exception as e:
                        logger.error(f"Failed to process decompressed XACTDOC: {e}")
                        logger.error(f"First 200 bytes of decompressed: {decompressed[:200] if 'decompressed' in locals() else 'N/A'}")
                        raise ValueError(f"XACTDOC file could not be parsed: {e}")
            else:
                # Direct XML files in root
                xml_files = [f for f in file_list if f.lower().endswith('.xml')]
                
                for xml_file in xml_files:
                    content = zf.read(xml_file)
                    try:
                        parsed = xmltodict.parse(content)
                        estimate_data[xml_file] = parsed
                    except Exception as e:
                        logger.warning(f"Could not parse {xml_file}: {e}")
            
            if not xml_files:
                logger.error(f"No XML files found. Files in archive: {file_list}")
                raise ValueError(f"No XML files found in ESX archive. Found {len(file_list)} files: {', '.join(file_list[:10])}")
            
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
