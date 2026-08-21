import type { PredictionInput, PredictionResponse } from '../types/prediction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function predictPrice(input: PredictionInput): Promise<PredictionResponse> {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (Array.isArray(errorData.detail)) {
            const messages = errorData.detail.map(
                (err: { loc: string[]; msg: string }) => `${err.loc[err.loc.length - 1]}: ${err.msg}`
            );
            throw new Error(messages.join(' | '));
        }

        throw new Error(errorData.detail || 'Failed to predict house price');
    }

    return response.json();
}

export const getLocations = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) throw new Error('فشل في جلب المناطق');
    return response.json();
};