from sqlalchemy import Column, String, DateTime
from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    order_id = Column(String(50), primary_key=True)
    customer_id = Column(String(50))
    order_status = Column(String(30))

    order_purchase_timestamp = Column(DateTime)
    order_approved_at = Column(DateTime)

    order_delivered_carrier_date = Column(DateTime)
    order_delivered_customer_date = Column(DateTime)

    order_estimated_delivery_date = Column(DateTime)