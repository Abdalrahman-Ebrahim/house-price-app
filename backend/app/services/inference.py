import joblib
import numpy as np
import pandas as pd
from ..core.config import settings

class ModelService:
    def __init__(self):
        self.model = None

    def load_model(self):
        self.model = joblib.load(settings.MODEL_PATH)

    def predict(self, df: pd.DataFrame) -> float:
        if self.model is None:
            raise ValueError("Model is not loaded.")
        
        log_pred = self.model.predict(df)[0]
        real_price = float(np.expm1(log_pred))
        return round(real_price, 2)

model_service = ModelService()