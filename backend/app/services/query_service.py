from backend.app.models.query_model import QueryLog

def create_query(db, query_data):
    new_query = QueryLog(
        query_text=query_data.query_text,
        database_name=query_data.database_name,
        user_name=query_data.user_name
    )
    
    db.add(new_query)
    db.commit()
    db.refresh(new_query)

    return new_query