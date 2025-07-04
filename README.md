## 🧠 NoteVerse – AI-Powered Note-Taking App

A modern full-stack application with **Vite + React + TailwindCSS** on the frontend, and **Node.js + Express + MongoDB** backend. AI-enhanced notes are powered by **OpenRouter (DeepSeek)**.

---

## 🚀 Running Locally (main branch)

```
# 1. Start frontend
cd client
npm install
npm run dev

# 2. Start backend
cd ../server
npm install
npm run start:dev

```

---

### 🔧 Tech Stack

| Layer      | Stack                                         |
| ---------- | --------------------------------------------- |
| Frontend   | React (Hooks) + Vite + Tailwind CSS           |
| Backend    | Node.js + Express.js                          |
| AI Engine  | OpenRouter (DeepSeek R1 model)                |
| Database   | MongoDB (Mongoose)                            |
| Deployment | Vercel (Monorepo with client + server)        |
| Auth       | JWT-based, Context-managed (`AuthContext`)    |
| Real-Time  | Notes drag-and-drop with position persistence |

---

### 🖥️ Local Development Setup

#### Prerequisites

- **Node.js** v20.x+
- **MongoDB** (local or Atlas cluster)
- `npm`

---

### 🔑 Environment Setup

- Root `.env` file with the following variables:

```

# Client-side

VITE_OPENROUTER_API_KEY=...

# Server-side

PORT=8000
MONGO_URI=mongodb://localhost:27017/noteverse
OPENROUTER_API=https://openrouter.ai/api/v1/chat/completions
AI_MODEL=deepseek/deepseek-r1:free
JWT_SECRET=your_jwt_secret

```

---

### 📁 Folder Structure

```

noteverse/
│
├── client/ # Frontend (Vite + React)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── api/
│ │ ├── utils/
│ │ └── App.jsx
│ └── index.html
│
├── server/ # Backend (Express.js)
│ ├── src/
│ ├── ├──controllers/
│ ├── ├── routes/
│ ├── models/
│ ├── services/
│ └── app.js
└── README.md
└── .gitignore

```

---

## 🧠 AI Enhancements

- Prompts supported:

  - Fix grammar
  - Expand idea
  - Summarize note (adds `## Summary`)

- AI response is shown inline and accepted with a single click.
- Notes title is auto-generated based on content (not duplicated inside the content).
