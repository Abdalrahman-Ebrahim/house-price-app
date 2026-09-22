import React from 'react';
import type { PredictionResponse } from '../types/prediction';

interface ResultCardProps {
    result: PredictionResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    return (
        <div style={styles.card}>
            <h3 style={styles.title}>Estimated Price (USD):</h3>
            <p style={styles.price}>
                {result.predicted_price.toLocaleString()} {result.currency || 'USD'}
            </p>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    card: {
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        textAlign: 'center',
        marginTop: '20px',
    },
    title: {
        margin: '0 0 10px 0',
        color: '#166534',
        fontSize: '18px',
    },
    price: {
        margin: 0,
        color: '#15803d',
        fontSize: '24px',
        fontWeight: 'bold',
    },
};