from fastapi import FastAPI

from app.database import engine
from app.routes.products import router as products_router

app = FastAPI(title="E-commerce Application")


@app.get("/")
def home():
    return {
        "message": "E-commerce API is running"
    }


@app.get("/db-test")
def db_test():
    try:
        with engine.connect():
            return {
                "status": "success",
                "message": "Database connected successfully"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


app.include_router(products_router)