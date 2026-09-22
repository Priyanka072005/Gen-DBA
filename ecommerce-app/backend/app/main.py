from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import products
from app.routes import orders
from app.routes import customers

app = FastAPI(
    title="GenShop API",
    description="E-commerce backend for GenShop",
    version="1.0.0"
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

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


# ---------------------------------------------------------
# ROUTES
# ---------------------------------------------------------

app.include_router(products.router)
app.include_router(orders.router)
app.include_router(customers.router)

# ---------------------------------------------------------
# ROOT
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "GenShop API is running"
    }