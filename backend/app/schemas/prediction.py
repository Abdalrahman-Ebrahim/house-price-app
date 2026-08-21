from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    location: str = Field(..., example="whitefield")
    carpet_area_sqft: float = Field(..., gt=0, example=1200.0)
    floor_num: int = Field(..., ge=0, example=3)
    bathroom: int = Field(..., ge=1, example=2)
    balcony: int = Field(..., ge=0, example=1)
    furnishing: str = Field(..., example="Semi-Furnished")
    transaction: str = Field(..., example="Resale")

class PredictionResponse(BaseModel):
    predicted_price: float