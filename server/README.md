# 📙 Server – NoteVerse Backend

Express.js backend powering NoteVerse with AI processing, MongoDB, and secure Auth.

---

## 🛠 Tech Stack

| Purpose            | Library / Tool                   |
| ------------------ | -------------------------------- |
| Server Framework   | Express.js                       |
| Language           | Node.js (v20+)                   |
| Database           | MongoDB + Mongoose               |
| Authentication     | JWT                              |
| Middleware         | CORS, Helmet, Morgan             |
| AI Integration     | OpenRouter API (DeepSeek R1)     |
| Body Parsing       | express.json, express.urlencoded |
| Error Handling     | Custom AppError & Middleware     |
| Environment Config | dotenv                           |
| Dev Tools          | nodemon                          |

---

## 🚀 Local Setup

```bash
cd server
npm install
npm start
```

> Make sure `.env` is available at the root:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/noteverse
OPENROUTER_API=https://openrouter.ai/api/v1/chat/completions
AI_MODEL=deepseek/deepseek-r1:free
JWT_SECRET=your_jwt_secret_here
```

---

## 📁 Folder Structure

```
server/
├── controllers/         # Request handlers
├── routes/              # API route files
├── models/              # Mongoose schemas
├── services/            # AI service, auth utils
├── middlewares/         # Error, auth, validation
├── utils/               # AppError, JWT helpers
├── index.js             # App entry point
└── .env                 # Environment variables
```

---

## 🔐 Auth Flow

- User signs up / logs in → JWT issued
- JWT is validated via middleware for protected routes
- `AuthContext` on frontend handles session

---

## 🧠 AI Enhancement

- Uses OpenRouter API
- Validates and pre-checks bad/gibberish input
- Supports multiple prompts: grammar fix, expand, summarize
- Title is extracted from enhanced content, not embedded in HTML

---

## ✅ Features

| Feature              | Description                         |
| -------------------- | ----------------------------------- |
| Note CRUD            | Create, read, update, delete notes  |
| AI-Powered Enhancer  | AI-enhances note content            |
| Drag Position Update | Stores real-time position for notes |
| Auth Middleware      | Secures routes with token check     |
| Error Handling       | Custom AppError with status codes   |

---

## 🧪 Dev Commands

```bash
npm start     # Start dev server with nodemon
```
