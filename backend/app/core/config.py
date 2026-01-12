from pydantic_settings import BaseSettings
from typing import List, Union
from pydantic import field_validator

class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    XAI_API_KEY: str = ""
    DATABASE_URL: str = "sqlite+aiosqlite:///./dusty_converter.db"
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    MAX_UPLOAD_SIZE: int = 52428800
    LOG_LEVEL: str = "INFO"
    
    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',')]
        elif isinstance(v, list):
            return v
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
