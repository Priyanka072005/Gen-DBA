from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.query_schema import QueryCreate
from app.services.query_service import create_query
from app.services.query_service import analyze_query

router = APIRouter()

@router.post("/query")
def add_query(query: QueryCreate, db: Session = Depends(get_db)):
    return create_query(db, query)

@router.get("/queries")
def get_queries(db: Session = Depends(get_db)):
    from app.models.query_model import QueryLog
    return db.query(QueryLog).all()


@router.get("/analyze/{query_id}")
def analyze(query_id: int, db: Session = Depends(get_db)):
    return analyze_query(db, query_id)

