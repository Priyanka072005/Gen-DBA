from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import engine, Base
from app.routes.query_routes import router as query_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Gen-DBA is running"}


# DB Test
@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            return {
                "status": "Database connected",
                "result": [row[0] for row in result]
            }
    except Exception as e:
        return {"error": str(e)}


# Include routes
app.include_router(query_router)


# Create tables
@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)