# Iqrasofts - Professional Software Development

A modern full-stack application with React frontend and AI-powered backend services.

## 📁 Project Structure

```
Iqrasofts/
├── frontend/              # React app with Vite
│   ├── src/
│   ├── public/
│   │   └── pictures/      # Static assets (moved here)
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
├── vercel.json           # Deployment config
└── package.json          # Root scripts for all services
```

## 🎨 Frontend Architecture

The frontend is a modern, responsive Single Page Application (SPA) built with React 18, Vite, and React Router. It features a modular component-based design:

### 📄 Pages
- **Home (`/`)**: The main landing page showcasing the company overview, core values, and quick links.
- **Services (`/services`)**: Details about the software development and IT services provided by Iqrasofts.
- **Projects (`/projects`)**: A portfolio showcasing previous work, client projects, and case studies.
- **Team (`/team`)**: Introduces the core team members, their roles, and expertise.
- **Blog (`/blog`)**: Articles, insights, and news related to technology and software development.
- **Contact (`/contact`)**: A functional contact form for inquiries, integrated with the backend API.

### 🧩 Core Components
- **`Layout.jsx`**: The main wrapper component containing the navigation bar and footer.
- **`ChatWidget.jsx`**: An interactive AI-powered chatbot widget available across all pages.
- **UI Elements**: Reusable components such as `ProjectCard`, `ServiceCard`, `TeamMember`, `BlogPostCard`, `PageHero`, and `SectionHeader` for a consistent design.
- **Animations**: Uses `ScrollReveal.jsx` to trigger smooth reveal animations as users scroll down the page.

## ⚙️ Backend Architecture

The application uses a microservices-inspired dual-backend approach to separate AI processing from standard database operations.

### 🤖 AI Service (`/backend/ai`)
A fast, lightweight Python server built with **FastAPI** to handle the AI assistant operations.
- **Role**: Acts as the official AI Assistant for Iqrasofts to handle lead generation, answer service questions, and act as a digital consultant.
- **Core Technology**: Python, FastAPI, and the `openai` SDK.
- **Endpoints**:
  - `GET /health`: Basic health check endpoint.
  - `POST /chat`: Receives message history, validates inputs (role/content length), injects a professional system prompt, and communicates with the configured OpenAI model (e.g., `gpt-4o-mini`).
- **Features**: Includes CORS middleware and strictly validates inputs using Pydantic models (`ChatRequest`, `ChatMessage`).

### 🔌 API Service (`/backend/api`)
A robust Node.js server built with **Express.js** to handle standard data and routing.
- **Role**: Manages persistent data such as user contact submissions and acts as an intermediate routing layer if needed.
- **Core Technology**: Node.js, Express.js, MongoDB (via Mongoose).
- **Structure**:
  - **Models**: Defines database schemas (e.g., `Contact.js` for storing inquiry details).
  - **Routes**: Modular routing files (`chat.js` for proxying chat requests or local logic, `contacts.js` for handling contact form submissions).
  - **Middleware**: Custom handlers for error catching and request parsing.

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
