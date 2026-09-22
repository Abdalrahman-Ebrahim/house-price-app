import { useState } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { predictPrice } from './services/predictionClient';
import type { PredictionInput, PredictionResponse } from './types/prediction';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const USD_EXCHANGE_RATE = 83.5;

  const handlePredict = async (input: PredictionInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictPrice(input);
      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculatedPriceInUSD =
    result && typeof result.predicted_price === 'number'
      ? result.predicted_price / USD_EXCHANGE_RATE
      : null;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🏠 House Price Predictor</h1>
        <p style={styles.subtitle}>Predict house prices using AI models</p>
      </header>

      <main>
        <PredictionForm onSubmit={handlePredict} isLoading={loading} />

        {error && (
          <div style={styles.errorBox}>
            ❌ {error}
          </div>
        )}

        {calculatedPriceInUSD !== null && (
          <div style={styles.resultBox}>
            <h2 style={styles.resultTitle}>Estimated Price (USD):</h2>
            <p style={styles.priceText}>
              ${' '}
              {calculatedPriceInUSD.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '40px 16px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: 0,
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    marginTop: '8px',
  },
  errorBox: {
    maxWidth: '500px',
    margin: '20px auto 0',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    textAlign: 'center',
    fontSize: '14px',
  },
  resultBox: {
    maxWidth: '500px',
    margin: '20px auto 0',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    textAlign: 'center',
  },
  resultTitle: {
    fontSize: '18px',
    color: '#166534',
    margin: '0 0 8px 0',
  },
  priceText: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#15803d',
    margin: 0,
  },
};