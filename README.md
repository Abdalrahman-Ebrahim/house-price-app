# 🏡 Real Estate House Price Prediction

An end-to-end Machine Learning web application designed to predict real estate house prices. This project features a trained ML regression pipeline, a high-performance **FastAPI** backend for serving predictions, and an interactive **React (Vite + TypeScript)** frontend interface.

---

## 📌 Features

* **Data Analysis & Modeling**: Jupyter Notebooks covering Data Preprocessing, EDA, Feature Engineering, and Model Training.
* **RESTful API**: Built with **FastAPI** for scalable and fast model inference.
* **Modern UI**: Developed using **React**, **TypeScript**, and **Vite** for a responsive user experience.
* **Location & Feature Input**: Dynamic forms for entering key property parameters and location metrics.

---

## 🛠️ Tech Stack

* **Machine Learning & Analytics**: Python, Pandas, NumPy, Scikit-Learn, Joblib
* **Backend Framework**: FastAPI, Uvicorn, Pydantic
* **Frontend Framework**: React, TypeScript, Vite, CSS3
* **Version Control**: Git, GitHub

---

## 📁 Repository Structure

```text
house-price-app/
├── backend/                # FastAPI backend service
│   ├── app/                # Application routes, schemas, & logic
│   ├── models/             # Metadata & feature encoders
│   ├── tests/              # API unit tests
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend application
│   ├── src/                # UI Components & API Clients
│   ├── package.json        # Node dependencies
│   └── vite.config.ts      # Vite configuration
├── models/                 # Model artifacts storage (.gitignore handled)
├── notebooks/              # Data analysis & model training notebooks
└── .gitignore              # Ignored files configuration
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
* Python 3.9+
* Node.js 18+ & npm

### 2️⃣ Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload
```
> The API will be running at `[http://127.0.0.1:8000](http://127.0.0.1:8000)`

### 3️⃣ Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
> The frontend will be running at `http://localhost:5173`

---

## 👤 Author

* **Abdalrahman Ebrahim Hassan Ebrahim** - AI & Machine Learning Engineering Student