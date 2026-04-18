from sqlalchemy import Column, Integer, Text, Float, String, TIMESTAMP
from backend.app.config.database import Base

class QueryLog(Base):
    __tablename__ = "query_logs"

    query_id = Column(Integer, primary_key=True, index=True)
    query_text = Column(Text, nullable=False)
    execution_time = Column(Float)
    frequency = Column(Integer, default=1)
    database_name = Column(String(100))
    user_name = Column(String(100))