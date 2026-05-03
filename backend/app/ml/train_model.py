import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import pickle

# Sample training data (you can expand later)
data = {
    "execution_time": [0.1, 0.5, 1.2, 2.5, 0.05, 3.0],
    "rows_scanned": [10, 200, 5000, 20000, 5, 50000],
    "has_join": [0, 0, 1, 1, 0, 1],
    "priority": ["LOW", "MEDIUM", "HIGH", "HIGH", "LOW", "HIGH"]
}

df = pd.DataFrame(data)

X = df[["execution_time", "rows_scanned", "has_join"]]
y = df["priority"]

model = DecisionTreeClassifier()
model.fit(X, y)

# Save model
with open("app/ml/model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved!")