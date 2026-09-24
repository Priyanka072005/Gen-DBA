from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.services.gen_dba_monitor import log_query_to_gen_dba


router = APIRouter(prefix="/home", tags=["Home"])


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_home_data(
    db: Session = Depends(get_db)
):
    # ---------------------------------------------------------
    # PRODUCT COUNT
    # ---------------------------------------------------------

    product_count_query = """
SELECT COUNT(*)
FROM products
""".strip()

    log_query_to_gen_dba(product_count_query)

    product_count = db.execute(
        text(product_count_query)
    ).scalar()

    # ---------------------------------------------------------
    # CUSTOMER COUNT
    # ---------------------------------------------------------

    customer_count_query = """
SELECT COUNT(*)
FROM customers
""".strip()

    log_query_to_gen_dba(customer_count_query)

    customer_count = db.execute(
        text(customer_count_query)
    ).scalar()

    # ---------------------------------------------------------
    # ORDER COUNT
    # ---------------------------------------------------------

    order_count_query = """
SELECT COUNT(*)
FROM orders
""".strip()

    log_query_to_gen_dba(order_count_query)

    order_count = db.execute(
        text(order_count_query)
    ).scalar()

    # ---------------------------------------------------------
    # PRODUCT CATEGORIES
    # ---------------------------------------------------------

    categories_query = """
SELECT DISTINCT product_category_name
FROM products
WHERE product_category_name IS NOT NULL
  AND product_category_name <> '#N/A'
ORDER BY product_category_name
""".strip()

    log_query_to_gen_dba(categories_query)

    categories = db.execute(
        text(categories_query)
    ).scalars().all()

    # ---------------------------------------------------------
    # FEATURED PRODUCTS
    # ---------------------------------------------------------

    featured_products_query = """
SELECT
    product_id,
    product_category_name,
    product_weight_g,
    product_photos_qty
FROM products
WHERE product_category_name IS NOT NULL
LIMIT 8
""".strip()

    log_query_to_gen_dba(featured_products_query)

    featured_products = db.execute(
        text(featured_products_query)
    ).mappings().all()

    return {
        "statistics": {
            "products": product_count,
            "customers": customer_count,
            "orders": order_count
        },
        "categories": categories,
        "featured_products": [
            dict(product)
            for product in featured_products
        ]
    }