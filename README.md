# IqraSoft - Professional Software Development

A modern full-stack application with React frontend and AI-powered backend services.

## 📁 Project Structure

```
IqraSofts/
├── frontend/              # React app with Vite
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/               # Backend services
│   ├── ai/               # FastAPI AI Service (LLM, ChatBot)
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   └── .env
│   └── api/              # Express.js API Server (Contacts, MongoDB)
│       ├── src/
│       ├── package.json
│       └── .env
├── pictures/             # Static assets
├── vercel.json           # Deployment config
└── package.json          # Root scripts for all services
```

## 🚀 Quick Start

### Install all dependencies
```bash
npm run install:all
```

### Run all services (recommended)
```bash
npm run dev
```

### Run individual services
```bash
npm run dev:frontend    # Only React app (port 5173)
npm run dev:ai         # Only FastAPI AI (port 5050)
npm run dev:api        # Only Express API (port 3001)
```

## 🔧 Configuration

### Frontend (.env - auto-configured)
- Vite config: `frontend/vite.config.js`
- React Router configured in `frontend/src/`

### Backend - AI Service (.env required)
```
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4o-mini
CORS_ORIGINS=http://localhost:5173,http://localhost:3001
```

### Backend - API Service (.env required)
```
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/iqrasoft
AI_SERVICE_URL=http://127.0.0.1:5050
```

## 📦 Tech Stack

- **Frontend**: React 18 + Vite + React Router
- **AI Backend**: FastAPI + OpenAI API
- **API Backend**: Express.js + MongoDB + Mongoose
- **Process Manager**: Concurrently

## 🌐 Ports

- Frontend: `http://localhost:5173`
- AI Service: `http://127.0.0.1:5050`
- API Server: `http://127.0.0.1:3001`

## 📝 Notes

- Make sure MongoDB is running for API service
- Add your OpenAI API key to `backend/ai/.env`
- All services support hot-reload in development mode
