from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.products import Product
from app.services.gen_dba_monitor import log_query_to_gen_dba


router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_products(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query_text = f"""
SELECT *
FROM products
LIMIT {limit}
OFFSET {skip}
""".strip()

    log_query_to_gen_dba(query_text)

    products = (
        db.query(Product)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return products


@router.get("/search")
def search_products(
    category: str,
    db: Session = Depends(get_db)
):
    safe_category = category.replace("'", "''")

    query_text = f"""
SELECT *
FROM products
WHERE product_category_name = '{safe_category}'
LIMIT 20
""".strip()

    log_query_to_gen_dba(query_text)

    products = (
        db.query(Product)
        .filter(Product.product_category_name == category)
        .limit(20)
        .all()
    )

    return products


@router.get("/categories")
def get_categories(
    db: Session = Depends(get_db)
):
    query_text = """
SELECT DISTINCT product_category_name
FROM products
WHERE product_category_name IS NOT NULL
ORDER BY product_category_name
""".strip()

    log_query_to_gen_dba(query_text)

    categories = (
        db.query(Product.product_category_name)
        .filter(Product.product_category_name.isnot(None))
        .distinct()
        .order_by(Product.product_category_name)
        .all()
    )

    return [category[0] for category in categories]


@router.get("/count")
def get_product_count(
    db: Session = Depends(get_db)
):
    query_text = """
SELECT COUNT(*)
FROM products
""".strip()

    log_query_to_gen_dba(query_text)

    count = db.query(Product).count()

    return {
        "total_products": count
    }


@router.get("/{product_id}")
def get_product(
    product_id: str,
    db: Session = Depends(get_db)
):
    safe_product_id = product_id.replace("'", "''")

    query_text = f"""
SELECT *
FROM products
WHERE product_id = '{safe_product_id}'
LIMIT 1
""".strip()

    log_query_to_gen_dba(query_text)

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