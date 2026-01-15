from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.config import settings
from app.api.routes import upload, conversion, templates, history

logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Xactimate to Symbility Converter API")
    yield
    logger.info("Shutting down API")

app = FastAPI(
    title="Xactimate to Symbility Converter",
    description="Convert Xactimate ESX files to Symbility Roofplan XML and FML formats",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api", tags=["upload"])
app.include_router(conversion.router, prefix="/api", tags=["conversion"])
app.include_router(templates.router, prefix="/api", tags=["templates"])
app.include_router(history.router, prefix="/api", tags=["history"])

@app.get("/")
async def root():
    return {
        "name": "Xactimate to Symbility Converter",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
