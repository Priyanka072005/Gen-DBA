from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.products import Product

router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get products with pagination
@router.get("/")
def get_products(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    products = (
        db.query(Product)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return products


# Search products by category
@router.get("/search")
def search_products(
    category: str,
    db: Session = Depends(get_db)
):
    products = (
        db.query(Product)
        .filter(Product.product_category_name == category)
        .limit(20)
        .all()
    )

    return products


# Get all product categories
@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = (
        db.query(Product.product_category_name)
        .filter(Product.product_category_name.isnot(None))
        .distinct()
        .order_by(Product.product_category_name)
        .all()
    )

    return [
        category[0]
        for category in categories
    ]


# Get total product count
@router.get("/count")
def get_product_count(db: Session = Depends(get_db)):
    count = db.query(Product).count()

    return {
        "total_products": count
    }


# Get single product by ID
@router.get("/{product_id}")
def get_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.product_id == product_id)
        .first()
    )

    if not product:
        return {
            "message": "Product not found"
        }

    return product