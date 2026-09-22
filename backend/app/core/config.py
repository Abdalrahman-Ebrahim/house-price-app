from pathlib import Path
from typing import List

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings:
    PROJECT_NAME: str = "House Price Prediction API"
    MODEL_PATH: str = str(BASE_DIR / "models" / "house_price.pkl")
    LOCATIONS_PATH: str = str(BASE_DIR / "models" / "locations.json")
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*",
    ]

settings = Settings()