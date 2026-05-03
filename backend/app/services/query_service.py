from sqlalchemy import text
from app.models.query_model import QueryLog, ExecutionPlan
import time


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
        # 🔥 SWITCH TO TARGET DATABASE
        db.execute(text(f"USE {query.database_name}"))

        # 🔥 Measure execution time
        start_time = time.time()
        db.execute(text(query.query_text)).fetchall()
        end_time = time.time()

        execution_time = end_time - start_time

        # Save execution time
        query.execution_time = execution_time
        db.commit()

        # 🔥 EXPLAIN QUERY
        explain_query = f"EXPLAIN {query.query_text}"
        result = db.execute(text(explain_query)).fetchall()

        issues = []
        plan_data = []
        suggestion = "Query is optimized"

        for row in result:
            row_dict = dict(row._mapping)
            plan_data.append(row_dict)

            # 🔥 Issue Detection
            if row_dict.get("type") == "ALL":
                issues.append("Full Table Scan detected")
                suggestion = "Create index on column used in WHERE condition"

            if row_dict.get("rows") and row_dict.get("rows") > 100:
                issues.append("High rows scanned")
                suggestion = "Optimize query or add indexing"

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

        # 🔥 SAFE handling if no plan data
        rows_scanned = plan_data[0].get("rows", 0) if plan_data else 0
        frequency = query.frequency if query.frequency else 1

        # 🔥 Impact Score (improved weight)
        impact_score = (execution_time * 10) + (rows_scanned * 0.05) + (frequency * 2)

        # 🔥 Priority Logic (better thresholds)
        if impact_score > 100:
            priority = "HIGH"
        elif impact_score > 30:
            priority = "MEDIUM"
        else:
            priority = "LOW"

        # ✅ FINAL RESPONSE (ALWAYS SAFE FOR FRONTEND)
        return {
            "query": query.query_text,
            "execution_time": execution_time,
            "execution_plan": plan_data,
            "issues": issues if issues else ["No major issues"],
            "suggestion": suggestion,
            "impact_score": impact_score,
            "priority": priority
        }

    except Exception as e:
        # 🔥 IMPORTANT: frontend crash avoid
        return {
            "query": query.query_text,
            "execution_time": 0,
            "execution_plan": [],
            "issues": ["Error occurred"],
            "suggestion": str(e),
            "impact_score": 0,
            "priority": "LOW"
        }