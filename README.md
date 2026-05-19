# IqraSofts — Professional Software Development

A modern full-stack application with a React (Vite) frontend and an Express.js + Google Gemini AI-powered backend, deployed on Vercel.

## 📁 Project Structure

```
IqraSofts/
├── frontend/              # React 18 + Vite SPA
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-level page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # API helpers & validation
│   │   └── lib/           # Shared libraries
│   └── public/
│       └── pictures/      # Static images & logo
├── backend/
│   └── api/               # Express.js API (Contacts + AI Chat)
│       ├── src/
│       │   ├── routes/    # chat.js, contacts.js
│       │   ├── models/    # Mongoose schemas
│       │   └── middleware/ # Error handling, validation
│       ├── vercel.json    # Backend Vercel deployment
│       ├── env.example    # Example environment variables
│       └── package.json
├── vercel.json            # Root deployment config
└── package.json           # Root scripts
```

## 🎨 Frontend Architecture

A responsive Single Page Application (SPA) built with **React 18**, **Vite**, and **React Router**.

### 📄 Pages
- **Home (`/`)** — Landing page with hero, services preview, process, about, leadership, and contact sections.
- **Services (`/services`)** — Full breakdown of all digital services offered by IqraSofts.
- **Projects (`/projects`)** — Portfolio showcasing client projects and case studies.
- **Team (`/team`)** — Team members, roles, and expertise.
- **Blog (`/blog`)** — Articles and technology insights.
- **Contact (`/contact`)** — Functional contact form integrated with the backend API.

### 🧩 Core Components
- **`Layout.jsx`** — Navigation bar, footer, and page wrapper.
- **`ChatWidget.jsx`** — AI-powered floating chatbot available on every page.
- **Reusable UI**: `ProjectCard`, `ServiceCard`, `TeamMember`, `BlogPostCard`, `PageHero`, `SectionHeader`.
- **`ScrollReveal.jsx`** — Smooth scroll-triggered reveal animations.

## ⚙️ Backend Architecture

A single **Express.js** server deployed on Vercel handles all backend operations.

### 🤖 AI Chat Route (`POST /chat`)
- Uses **Google Gemini** (`gemini-2.0-flash`) via the `@google/generative-ai` SDK.
- Receives conversation history from the frontend, injects a professional IqraSofts system prompt, and returns the AI reply.
- Requires the `GEMINI_API_KEY` environment variable.

### 📬 Contacts Route (`POST /contacts`)
- Saves contact form submissions to **MongoDB** via Mongoose.
- Requires the `MONGODB_URI` environment variable.

### 🏥 Health Check (`GET /health`)
- Returns server uptime, timestamp, and database connection status.

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
npm run dev:frontend    # React app on http://localhost:5173
npm run dev:api         # Express API on http://localhost:3001
```

## 🔧 Configuration

### Backend API (`.env` in `backend/api/`)

Create a `.env` file using `env.example` as a template:

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/iqrasofts
GEMINI_API_KEY=your-google-gemini-api-key
CORS_ORIGIN=https://iqrasofts.vercel.app
```

> **⚠️ Important:** The `GEMINI_API_KEY` is required for the AI chat to work.  
> Get a free key at: https://aistudio.google.com/apikey

### Frontend
Vite config lives at `frontend/vite.config.js`. No `.env` required for local development.

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + React Router |
| AI Chat | Google Gemini (`gemini-2.0-flash`) |
| API Server | Express.js + MongoDB + Mongoose |
| Deployment | Vercel (Frontend + Backend) |
| Process Manager | Concurrently |

## 🌐 URLs

| Service | Local | Production |
|---------|-------|-----------|
| Frontend | http://localhost:5173 | https://iqrasofts.vercel.app |
| API Server | http://localhost:3001 | https://iqrasofts-backend.vercel.app |

## 📝 Notes

- MongoDB must be running locally for the contact form to work in development.
- The Gemini API key must be set in both `backend/api/.env` (local) and in Vercel Environment Variables (production).
- All services support hot-reload in development mode.

---

© 2026 IqraSofts Technologies. All Rights Reserved.
