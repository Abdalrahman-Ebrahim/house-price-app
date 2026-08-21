export interface PredictionInput {
    location: string;
    carpet_area_sqft: number;
    bhk: number;
    bathroom: number;
    floor_num: number;
    balcony: number;
    furnishing: string;
    transaction: string;
}

export interface PredictionResponse {
    predicted_price: number;
    currency?: string;
}