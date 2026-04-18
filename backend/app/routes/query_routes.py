from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.config.database import get_db
from backend.app.schemas.query_schema import QueryCreate
from backend.app.services.query_service import create_query

router = APIRouter()

@router.post("/query")
def add_query(query: QueryCreate, db: Session = Depends(get_db)):
    return create_query(db, query)

@router.get("/queries")
def get_queries(db: Session = Depends(get_db)):
    from backend.app.models.query_model import QueryLog
    return db.query(QueryLog).all()