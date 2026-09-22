import requests


GEN_DBA_API_URL = "http://127.0.0.1:8000/query"


def log_query_to_gen_dba(
    query_text: str,
    database_name: str = "target_db",
    user_name: str = "GenShop"
):
    """
    Register a real GenShop SQL query in Gen-DBA.

    Gen-DBA will later analyze the query using:
    - execution time
    - EXPLAIN plan
    - rule-based performance analysis
    - AI recommendations
    """

    payload = {
        "query_text": query_text,
        "database_name": database_name,
        "user_name": user_name
    }

    try:
        response = requests.post(
            GEN_DBA_API_URL,
            json=payload,
            timeout=3
        )

        if response.status_code == 200:
            data = response.json()

            print(
                f"[Gen-DBA] Query registered successfully. "
                f"Query ID: {data.get('query_id')}"
            )

            return data

        print(
            f"[Gen-DBA] Query registration failed: "
            f"{response.status_code}"
        )

    except requests.exceptions.RequestException as error:
        print(f"[Gen-DBA] Monitoring unavailable: {error}")

    return None