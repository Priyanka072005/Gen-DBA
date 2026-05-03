import pickle
import os

model_path = os.path.join(os.path.dirname(__file__), "model.pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)


def predict_priority(execution_time, rows_scanned, has_join):
    prediction = model.predict([[execution_time, rows_scanned, has_join]])
    return prediction[0]