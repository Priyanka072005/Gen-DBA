from sqlalchemy import text
from app.models.query_model import QueryLog, ExecutionPlan
import time

# 🔥 ML IMPORT
from app.ml.predictor import predict_priority


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
        # 🔥 SWITCH DATABASE
        db.execute(text(f"USE {query.database_name}"))

        # 🔥 EXECUTION TIME
        start_time = time.time()
        db.execute(text(query.query_text)).fetchall()
        end_time = time.time()

        execution_time = end_time - start_time

        # Save execution time
        query.execution_time = execution_time
        db.commit()

        # 🔥 EXPLAIN
        explain_query = f"EXPLAIN {query.query_text}"
        result = db.execute(text(explain_query)).fetchall()

        issues = []
        plan_data = []

        for row in result:
            row_dict = dict(row._mapping)
            plan_data.append(row_dict)

            # 🔥 Issue detection
            if row_dict.get("type") == "ALL":
                issues.append("Full Table Scan detected")

            if row_dict.get("rows") and row_dict.get("rows") > 100:
                issues.append("High rows scanned")

            if "JOIN" in query.query_text.upper() and row_dict.get("rows", 0) > 500:
                issues.append("Inefficient JOIN detected")

            # Save execution plan
            new_plan = ExecutionPlan(
                query_id=query_id,
                cost=row_dict.get("rows"),
                rows_processed=row_dict.get("rows"),
                scan_type=row_dict.get("type"),
                execution_details=str(row_dict)
            )
            db.add(new_plan)

        db.commit()

        # 🔥 FEATURES FOR ML
        rows_scanned = plan_data[0].get("rows", 0) if plan_data else 0
        has_join = 1 if "JOIN" in query.query_text.upper() else 0

        # 🤖 ML PREDICTION
        priority = predict_priority(
            execution_time,
            rows_scanned,
            has_join
        )

        # 🔥 ML-BASED SUGGESTION
        if priority == "HIGH":
            suggestion = "Query is expensive. Use indexing, avoid full scan, optimize joins"

        elif priority == "MEDIUM":
            suggestion = "Query can be optimized using filters or indexing"

        else:
            suggestion = "Query is efficient"

        # 🔥 FINAL RESPONSE
        return {
            "query": query.query_text,
            "execution_time": execution_time,
            "execution_plan": plan_data,
            "issues": issues if issues else ["No major issues"],
            "suggestion": suggestion,
            "priority": priority
        }

    except Exception as e:
        return {
            "query": query.query_text,
            "execution_time": 0,
            "execution_plan": [],
            "issues": ["Error occurred"],
            "suggestion": str(e),
            "priority": "LOW"
        }