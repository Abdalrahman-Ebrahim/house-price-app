import json
import pandas as pd
from ..core.config import settings
from ..schemas.prediction import PredictionRequest

def load_allowed_locations() -> set:
    try:
        with open(settings.LOCATIONS_PATH, "r") as f:
            return set(json.load(f))
    except FileNotFoundError:
        return set()

ALLOWED_LOCATIONS = load_allowed_locations()

def prepare_input_dataframe(request: PredictionRequest) -> pd.DataFrame:
    location = request.location.lower().strip()
    if location not in ALLOWED_LOCATIONS:
        location = "other"

    data = {
        "carpet_area_sqft": [request.carpet_area_sqft],
        "floor_num": [request.floor_num],
        "bathroom": [request.bathroom],
        "balcony": [request.balcony],
        "location_grouped": [location],
        "Furnishing": [request.furnishing],
        "Transaction": [request.transaction]
    }
    return pd.DataFrame(data)