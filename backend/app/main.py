from fastapi import FastAPI
from backend.app.config.database import engine 
from sqlalchemy import text

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Gen-DBA is running"}


# 🔥 DB TEST ROUTE (VERY IMPORTANT)
@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            return {"status": "Database connected", "result": [row[0] for row in result]}
    except Exception as e:
        return {"error": str(e)}
    
from backend.app.routes.query_routes import router as query_router

app.include_router(query_router)