from sqlalchemy import text
from app.models.query_model import QueryLog, ExecutionPlan


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


def analyze_query(db, query_id):
    query = db.query(QueryLog).filter(QueryLog.query_id == query_id).first()

    if not query:
        return {"error": "Query not found"}

    try:
        explain_query = f"EXPLAIN {query.query_text}"
        result = db.execute(text(explain_query)).fetchall()

        issues = []
        plan_data = []
        suggestion = "Query is optimized"

        for row in result:
            row_dict = dict(row._mapping)
            plan_data.append(row_dict)

            # 🔥 RULE 1: Full Table Scan
            if row_dict.get("type") == "ALL":
                issues.append("Full Table Scan detected")
                suggestion = "Create index on column used in WHERE condition"

            # 🔥 RULE 2: Too many rows scanned
            if row_dict.get("rows") and row_dict.get("rows") > 100:
                issues.append("High rows scanned")
                suggestion = "Optimize query or add indexing"

            # 💾 SAVE EXECUTION PLAN
            new_plan = ExecutionPlan(
                query_id=query_id,
                cost=row_dict.get("rows"),
                rows_processed=row_dict.get("rows"),
                scan_type=row_dict.get("type"),
                execution_details=str(row_dict)
            )
            db.add(new_plan)

        db.commit()

        return {
            "query": query.query_text,
            "execution_plan": plan_data,
            "issues": issues if issues else ["No major issues"],
            "suggestion": suggestion
        }

    except Exception as e:
        return {"error": str(e)}