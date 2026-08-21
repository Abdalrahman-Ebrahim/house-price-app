from fastapi import APIRouter, HTTPException
from ...schemas.prediction import PredictionRequest, PredictionResponse
from ...services.preprocessing import prepare_input_dataframe
from ...services.inference import model_service

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/predict", response_model=PredictionResponse)
def predict_price(request: PredictionRequest):
    try:
        input_df = prepare_input_dataframe(request)
        prediction = model_service.predict(input_df)
        return PredictionResponse(predicted_price=prediction)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

import json
from fastapi import APIRouter
from app.core.config import settings

@router.get("/locations")
def get_locations():
    with open(settings.LOCATIONS_PATH, "r") as f:
        data = json.load(f)
    if isinstance(data, dict) and "locations" in data:
        return data["locations"]
    return data    