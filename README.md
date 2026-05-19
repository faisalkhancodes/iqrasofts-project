# IqraSofts — Professional Software Development

A modern full-stack application with a React (Vite) frontend and an Express.js backend with a **100% self-contained AI Chat Engine** — no external API keys required.

## 📁 Project Structure

```
IqraSofts/
├── frontend/                  # React 18 + Vite SPA
│   ├── src/
│   │   ├── components/        # ChatWidget, Layout, etc.
│   │   ├── pages/             # Home, Blog, Projects, Team, Contact, Services
│   │   ├── hooks/             # Scroll reveal & smooth links
│   │   ├── utils/             # API helpers & validation
│   │   └── data/              # Static fallback data
│   └── public/
│       └── pictures/          # Logo and team images
├── backend/
│   └── api/                   # Express.js REST API
│       ├── src/
│       │   ├── db.js          # MongoDB connection module
│       │   ├── index.js       # Main server entry point
│       │   ├── routes/
│       │   │   ├── chat.js    # 🤖 Self-contained AI chat engine
│       │   │   ├── contacts.js
│       │   │   ├── projects.js
│       │   │   └── blog.js
│       │   ├── models/        # Mongoose schemas
│       │   │   ├── Contact.js
│       │   │   ├── Project.js
│       │   │   └── BlogPost.js
│       │   └── middleware/    # Error handling & validation
│       ├── seed.js            # Database seeder script
│       ├── env.example        # Example environment variables
│       ├── vercel.json        # Backend Vercel deployment config
│       └── package.json
├── vercel.json                # Root deployment config
└── package.json               # Root scripts
```

## 🎨 Frontend

A responsive Single Page Application built with **React 18**, **Vite**, and **React Router**.

### Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, services, process, about, leadership, contact |
| `/services` | Full breakdown of all services |
| `/projects` | Portfolio loaded **live from MongoDB** |
| `/blog` | Blog posts loaded **live from MongoDB** |
| `/team` | Team members and expertise |
| `/contact` | Contact form integrated with backend API |

### Key Components
- **`ChatWidget.jsx`** — Floating AI chat, works on every page
- **`Layout.jsx`** — Navigation header and footer
- **`ScrollReveal.jsx`** — Smooth scroll-triggered animations

## ⚙️ Backend API

A single **Express.js** server with **zero external AI dependencies**.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server & database status |
| `POST` | `/chat` | 🤖 AI chat (self-contained engine) |
| `POST` | `/contacts` | Save contact form submission |
| `GET` | `/projects` | Fetch all projects from MongoDB |
| `GET` | `/blog` | Fetch all blog posts from MongoDB |

## 🤖 AI Chat Engine (No API Key!)

The AI chat assistant is **fully self-contained** — built with a smart **rule-based pattern-matching engine** directly in `src/routes/chat.js`.

### How It Works
1. User message is converted to lowercase
2. Engine scores each knowledge-base entry by keyword matches + priority
3. Best-scoring response is returned instantly
4. Graceful fallback if no match found

### Knowledge Base Covers
- 👋 Greetings & general queries
- 🏢 About IqraSofts
- 💻 Web Development services
- 📝 WordPress development
- 🛒 Shopify / E-commerce
- 🛡️ Cybersecurity services
- 🎨 UI/UX Design
- 📱 Mobile App Development
- 💰 Pricing & quotes
- 📞 Contact information
- 🗂️ Portfolio & projects
- 👥 Team members
- 📋 Work process & timeline
- ⚙️ Tech stack
- 📈 SEO & digital marketing

**No API key. No quota limits. No failures. Always instant.** ⚡

## 🗄️ Database

MongoDB Atlas hosts three collections:

| Collection | Contents |
|------------|----------|
| `contacts` | Contact form submissions |
| `projects` | Portfolio projects |
| `blogposts` | Blog articles |

### Seeding the Database
```bash
cd backend/api
node seed.js
```

## 🚀 Quick Start

### Install all dependencies
```bash
npm run install:all
```

### Run all services
```bash
npm run dev
```

### Run individually
```bash
npm run dev:frontend    # React app — http://localhost:5173
npm run dev:api         # Express API — http://localhost:3001
```

## 🔧 Configuration

Create `backend/api/.env` using `env.example` as a template:

```env
PORT=3001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=iqrasofts
CORS_ORIGIN=https://iqrasofts.vercel.app
```

> **Note:** No external AI API key is required. The chat engine runs entirely on the server.

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + React Router |
| AI Chat | Custom rule-based engine (no external API) |
| API Server | Express.js + MongoDB + Mongoose |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend + Backend) |

## 🌐 URLs

| Service | Local | Production |
|---------|-------|-----------|
| Frontend | http://localhost:5173 | https://iqrasofts.com |
| API Server | http://localhost:3001 | https://iqrasofts-backend.vercel.app |

## 📝 Notes

- Only `MONGODB_URI` is required in `.env` — no external AI key needed
- The AI chat handles 17+ topic categories out of the box
- To add new chat responses, edit `backend/api/src/routes/chat.js` under `KNOWLEDGE_BASE`

---

© 2026 IqraSofts Technologies. All Rights Reserved.
