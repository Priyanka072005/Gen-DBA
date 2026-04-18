from pydantic import BaseModel

class QueryCreate(BaseModel):
    query_text: str
    database_name: str
    user_name: str