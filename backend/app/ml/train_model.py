import os
import pickle
import pandas as pd

from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# ----------------------------------
# Load Dataset
# ----------------------------------

BASE_DIR = os.path.dirname(__file__)
DATASET_PATH = os.path.join(BASE_DIR, "training_data.csv")

df = pd.read_csv(DATASET_PATH)

print("\nDataset Loaded Successfully")
print(df.head())

# ----------------------------------
# Features & Target
# ----------------------------------

X = df[["execution_time", "rows_scanned", "has_join"]]
y = df["priority"]

# ----------------------------------
# Train-Test Split
# ----------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# ----------------------------------
# Create Model
# ----------------------------------

model = DecisionTreeClassifier(
    criterion="entropy",
    max_depth=6,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)

# ----------------------------------
# Train
# ----------------------------------

model.fit(X_train, y_train)

# ----------------------------------
# Test Accuracy
# ----------------------------------

predictions = model.predict(X_test)

print("\nAccuracy :", accuracy_score(y_test, predictions))

print("\nClassification Report\n")
print(classification_report(y_test, predictions))

# ----------------------------------
# Save Model
# ----------------------------------

MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

with open(MODEL_PATH, "wb") as f:
    pickle.dump(model, f)

print("\nModel Saved Successfully")
print(MODEL_PATH)