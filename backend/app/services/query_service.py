from sqlalchemy import text
from app.models.query_model import QueryLog, ExecutionPlan
import time

# ML IMPORT
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
    query = (
        db.query(QueryLog)
        .filter(QueryLog.query_id == query_id)
        .first()
    )

    if not query:
        return {"error": "Query not found"}

    try:
        # ---------------------------------------------------------
        # 1. READ-ONLY QUERY VALIDATION
        # ---------------------------------------------------------
        query_text = query.query_text.strip()

        if not query_text.upper().startswith("SELECT"):
            return {
                "query": query_text,
                "execution_time": 0,
                "execution_plan": [],
                "issues": ["Only SELECT queries are allowed"],
                "suggestion": "Gen-DBA analyzer works in read-only mode.",
                "priority": "LOW"
            }

        # ---------------------------------------------------------
        # 2. SWITCH DATABASE
        # ---------------------------------------------------------
        db.execute(
            text(f"USE `{query.database_name}`")
        )

        # ---------------------------------------------------------
        # 3. EXECUTION TIME
        # ---------------------------------------------------------
        start_time = time.time()

        result_data = db.execute(
            text(query_text)
        ).fetchall()

        end_time = time.time()

        execution_time = end_time - start_time

        query.execution_time = execution_time
        db.commit()

        # ---------------------------------------------------------
        # 4. EXPLAIN QUERY
        # ---------------------------------------------------------
        explain_query = f"EXPLAIN {query_text}"

        result = db.execute(
            text(explain_query)
        ).fetchall()

        issues = []
        plan_data = []

        # ---------------------------------------------------------
        # 5. ANALYZE EXECUTION PLAN
        # ---------------------------------------------------------
        for row in result:

            row_dict = dict(row._mapping)

            plan_data.append(row_dict)

            scan_type = row_dict.get("type")
            rows_examined = row_dict.get("rows") or 0
            possible_keys = row_dict.get("possible_keys")
            used_key = row_dict.get("key")
            extra = row_dict.get("Extra") or ""

            # Full table scan
            if scan_type == "ALL":
                issues.append("Full Table Scan detected")

            # High rows examined
            if rows_examined > 1000:
                issues.append("High number of rows examined")

            # Possible missing index
            if (
                possible_keys is None
                and used_key is None
                and scan_type == "ALL"
            ):
                issues.append("Possible missing index")

            # Filesort
            if "Using filesort" in extra:
                issues.append("Filesort detected")

            # Temporary table
            if "Using temporary" in extra:
                issues.append("Temporary table usage detected")

            # Save execution plan
            new_plan = ExecutionPlan(
                query_id=query_id,
                cost=rows_examined,
                rows_processed=rows_examined,
                scan_type=scan_type,
                execution_details=str(row_dict)
            )

            db.add(new_plan)

        # Remove duplicate issues
        issues = list(dict.fromkeys(issues))

        db.commit()

        # ---------------------------------------------------------
        # 6. CALCULATE PLAN METRICS
        # ---------------------------------------------------------
        rows_scanned = sum(
            row.get("rows", 0) or 0
            for row in plan_data
        )

        has_join = (
            1
            if " JOIN " in f" {query_text.upper()} "
            else 0
        )

        # ---------------------------------------------------------
        # 7. ML PRIORITY
        # ---------------------------------------------------------
        priority = predict_priority(
            execution_time,
            rows_scanned,
            has_join
        )

        # ---------------------------------------------------------
        # 8. RULE-BASED SUGGESTION
        # ---------------------------------------------------------
        if "Full Table Scan detected" in issues:

            suggestion = (
                "Consider adding an appropriate index on the columns "
                "used in WHERE, JOIN, ORDER BY, or GROUP BY conditions."
            )

        elif "High number of rows examined" in issues:

            suggestion = (
                "Review filtering conditions and indexing to reduce "
                "the number of rows examined."
            )

        elif "Filesort detected" in issues:

            suggestion = (
                "Review ORDER BY columns and consider an appropriate "
                "index to reduce filesort operations."
            )

        elif "Temporary table usage detected" in issues:

            suggestion = (
                "Review GROUP BY, DISTINCT, or ORDER BY operations "
                "and check whether suitable indexes can reduce "
                "temporary table usage."
            )

        elif "Possible missing index" in issues:

            suggestion = (
                "Review the query predicates and consider adding "
                "an index on frequently filtered columns."
            )

        else:

            suggestion = (
                "No major execution-plan issues detected. "
                "Continue monitoring query performance."
            )

        # ---------------------------------------------------------
        # 9. FINAL RESPONSE
        # ---------------------------------------------------------
        return {
            "query": query_text,
            "execution_time": execution_time,
            "rows_returned": len(result_data),
            "rows_scanned": rows_scanned,
            "execution_plan": plan_data,
            "issues": issues if issues else ["No major issues"],
            "suggestion": suggestion,
            "priority": priority
        }

    except Exception as e:

        db.rollback()

        return {
            "query": query.query_text,
            "execution_time": 0,
            "execution_plan": [],
            "issues": ["Error occurred"],
            "suggestion": str(e),
            "priority": "LOW"
        }