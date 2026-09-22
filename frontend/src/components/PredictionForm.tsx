import React, { useState, useEffect } from 'react';
import type { PredictionInput } from '../types/prediction';
import { getLocations } from '../services/predictionClient';

interface PredictionFormProps {
    onSubmit: (input: PredictionInput) => void;
    isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
    const [location, setLocation] = useState<string>('');
    const [carpetSqft, setCarpetSqft] = useState<number | ''>('');
    const [bhk, setBhk] = useState<number>(2);
    const [bathroom, setBathroom] = useState<number>(2);
    const [floorNum, setFloorNum] = useState<number>(1);
    const [balcony, setBalcony] = useState<number>(1);
    const [furnishing, setFurnishing] = useState<string>('Unfurnished');
    const [transaction, setTransaction] = useState<string>('Resale');
    const [locationsList, setLocationsList] = useState<string[]>([]);

    useEffect(() => {
        getLocations()
            .then((data) => setLocationsList(Array.isArray(data) ? data : []))
            .catch((err) => console.error('Error fetching locations:', err));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!location || !carpetSqft || carpetSqft <= 0) return;

        onSubmit({
            location,
            carpet_area_sqft: Number(carpetSqft),
            bhk: Number(bhk),
            bathroom: Number(bathroom),
            floor_num: Number(floorNum),
            balcony: Number(balcony),
            furnishing,
            transaction,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
                <label style={styles.label}>Location</label>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    style={styles.input}
                >
                    <option value="">Select Location...</option>
                    {locationsList.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>

            <div style={styles.field}>
                <label style={styles.label}>Carpet Area (SqFt)</label>
                <input
                    type="number"
                    min="100"
                    placeholder="e.g. 1000"
                    value={carpetSqft}
                    onChange={(e) => setCarpetSqft(e.target.value ? Number(e.target.value) : '')}
                    required
                    style={styles.input}
                />
            </div>

            <div style={styles.row}>
                <div style={styles.field}>
                    <label style={styles.label}>Bedrooms (BHK)</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={bhk}
                        onChange={(e) => setBhk(Number(e.target.value))}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Bathrooms</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={bathroom}
                        onChange={(e) => setBathroom(Number(e.target.value))}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.row}>
                <div style={styles.field}>
                    <label style={styles.label}>Floor Number</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={floorNum}
                        onChange={(e) => setFloorNum(Number(e.target.value))}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Balcony</label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        value={balcony}
                        onChange={(e) => setBalcony(Number(e.target.value))}
                        required
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.row}>
                <div style={styles.field}>
                    <label style={styles.label}>Furnishing Status</label>
                    <select
                        value={furnishing}
                        onChange={(e) => setFurnishing(e.target.value)}
                        style={styles.input}
                    >
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Furnished">Furnished</option>
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Transaction Type</label>
                    <select
                        value={transaction}
                        onChange={(e) => setTransaction(e.target.value)}
                        style={styles.input}
                    >
                        <option value="Resale">Resale</option>
                        <option value="New Property">New Property</option>
                    </select>
                </div>
            </div>

            <button type="submit" disabled={isLoading} style={styles.button}>
                {isLoading ? 'Calculating...' : 'Predict Price'}
            </button>
        </form>
    );
};

const styles: Record<string, React.CSSProperties> = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '24px',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    field: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
    label: { fontSize: '14px', fontWeight: 600, color: '#334155' },
    input: {
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        fontSize: '15px',
        color: '#0f172a',
        backgroundColor: '#ffffff',
    },
    row: { display: 'flex', gap: '16px' },
    button: {
        marginTop: '8px',
        padding: '12px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};