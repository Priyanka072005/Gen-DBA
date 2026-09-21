from sqlalchemy import Column, String, Integer
from app.database import Base


class Product(Base):
    __tablename__ = "products"

    product_id = Column(String(50), primary_key=True)
    product_category_name = Column(String(100))
    product_name_length = Column(Integer)
    product_description_length = Column(Integer)
    product_photos_qty = Column(Integer)
    product_weight_g = Column(Integer)
    product_length_cm = Column(Integer)
    product_height_cm = Column(Integer)
    product_width_cm = Column(Integer)