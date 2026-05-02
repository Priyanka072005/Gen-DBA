from sqlalchemy import Column, Integer, Text, Float, String, TIMESTAMP
from backend.app.config.database import engine, Base
from sqlalchemy import Column, Integer, Float, String, Text

class QueryLog(Base):
    __tablename__ = "query_logs"

    query_id = Column(Integer, primary_key=True, index=True)
    query_text = Column(Text, nullable=False)
    execution_time = Column(Float)
    frequency = Column(Integer, default=1)
    database_name = Column(String(100))
    user_name = Column(String(100))



class ExecutionPlan(Base):
    __tablename__ = "execution_plans"

    plan_id = Column(Integer, primary_key=True, index=True)
    query_id = Column(Integer)
    cost = Column(Float)
    rows_processed = Column(Integer)
    scan_type = Column(String(50))
    join_type = Column(String(50))
    execution_details = Column(Text)