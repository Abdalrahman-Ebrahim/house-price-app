from fastapi.testclient import TestClient
from backend.app.main import app

def test_health_check():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}

def test_prediction_endpoint():
    with TestClient(app) as client:
        payload = {
            "location": "whitefield",
            "carpet_area_sqft": 1200.0,
            "floor_num": 3,
            "bathroom": 2,
            "balcony": 1,
            "furnishing": "Semi-Furnished",
            "transaction": "Resale"
        }
        response = client.post("/predict", json=payload)
        assert response.status_code == 200
        assert "predicted_price" in response.json()
        assert isinstance(response.json()["predicted_price"], (int, float))