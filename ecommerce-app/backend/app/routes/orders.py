from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.orders import Order
from app.services.gen_dba_monitor import log_query_to_gen_dba


router = APIRouter(prefix="/orders", tags=["Orders"])


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_orders(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query_text = f"""
SELECT *
FROM orders
LIMIT {limit}
OFFSET {skip}
""".strip()

    log_query_to_gen_dba(query_text)

    orders = (
        db.query(Order)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return orders


@router.get("/status/{status}")
def get_orders_by_status(
    status: str,
    db: Session = Depends(get_db)
):
    safe_status = status.replace("'", "''")

    query_text = f"""
SELECT *
FROM orders
WHERE order_status = '{safe_status}'
LIMIT 50
""".strip()

    log_query_to_gen_dba(query_text)

    orders = (
        db.query(Order)
        .filter(Order.order_status == status)
        .limit(50)
        .all()
    )

    return orders


@router.get("/count")
def get_order_count(
    db: Session = Depends(get_db)
):
    query_text = """
SELECT COUNT(*)
FROM orders
""".strip()

    log_query_to_gen_dba(query_text)

    count = db.query(Order).count()

    return {
        "total_orders": count
    }


@router.get("/{order_id}")
def get_order(
    order_id: str,
    db: Session = Depends(get_db)
):
    safe_order_id = order_id.replace("'", "''")

    query_text = f"""
SELECT *
FROM orders
WHERE order_id = '{safe_order_id}'
LIMIT 1
""".strip()

    log_query_to_gen_dba(query_text)

    order = (
        db.query(Order)
        .filter(Order.order_id == order_id)
        .first()
    )

    if not order:
        return {
            "message": "Order not found"
        }

    return order