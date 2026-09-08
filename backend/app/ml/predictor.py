import os
import pickle

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)


def predict_priority(execution_time, rows_scanned, has_join):
    """
    Predict query priority.

    Parameters
    ----------
    execution_time : float
    rows_scanned : int
    has_join : int
        0 = No JOIN
        1 = JOIN Present

    Returns
    -------
    LOW / MEDIUM / HIGH
    """

    features = [[
        float(execution_time),
        int(rows_scanned),
        int(has_join)
    ]]

    prediction = model.predict(features)

    return prediction[0]