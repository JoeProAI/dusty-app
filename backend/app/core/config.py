from pydantic_settings import BaseSettings
from typing import List
from pydantic import field_validator

class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    XAI_API_KEY: str = ""
    DATABASE_URL: str = "sqlite+aiosqlite:///./dusty_converter.db"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    MAX_UPLOAD_SIZE: int = 52428800
    LOG_LEVEL: str = "INFO"
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS_ORIGINS string into a list"""
        if not self.CORS_ORIGINS or not self.CORS_ORIGINS.strip():
            return ["http://localhost:5173", "http://localhost:3000"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(',') if origin.strip()]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
