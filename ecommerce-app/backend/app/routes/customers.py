from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.customers import Customer
from app.services.gen_dba_monitor import log_query_to_gen_dba


router = APIRouter(prefix="/customers", tags=["Customers"])


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_customers(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query_text = f"""
SELECT *
FROM customers
LIMIT {limit}
OFFSET {skip}
""".strip()

    log_query_to_gen_dba(query_text)

    customers = (
        db.query(Customer)
        .offset(skip)
        .limit(limit)
        .all()
    )

    return customers


@router.get("/count")
def get_customer_count(
    db: Session = Depends(get_db)
):
    query_text = """
SELECT COUNT(*)
FROM customers
""".strip()

    log_query_to_gen_dba(query_text)

    count = db.query(Customer).count()

    return {
        "total_customers": count
    }


@router.get("/{customer_id}")
def get_customer(
    customer_id: str,
    db: Session = Depends(get_db)
):
    safe_customer_id = customer_id.replace("'", "''")

    query_text = f"""
SELECT *
FROM customers
WHERE customer_id = '{safe_customer_id}'
LIMIT 1
""".strip()

    log_query_to_gen_dba(query_text)

    customer = (
        db.query(Customer)
        .filter(Customer.customer_id == customer_id)
        .first()
    )

    if not customer:
        return {
            "message": "Customer not found"
        }

    return customer