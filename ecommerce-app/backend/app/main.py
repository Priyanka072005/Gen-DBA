from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import products

app = FastAPI(
    title="GenShop API",
    description="E-commerce backend for GenShop",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Product routes
app.include_router(products.router)


@app.get("/")
def root():
    return {
        "message": "GenShop API is running"
    }