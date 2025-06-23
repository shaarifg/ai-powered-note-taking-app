# Server – NoteVerse Backend

Express.js backend powering NoteVerse with AI processing, MongoDB, and secure JWT Auth.

---

## Tech Stack

| Purpose            | Library / Tool                   |
| ------------------ | -------------------------------- |
| Server Framework   | Express.js                       |
| Language           | Node.js (v20+)                   |
| Database           | MongoDB + Mongoose               |
| Authentication     | JWT                              |
| Middleware         | CORS                             |
| AI Integration     | OpenRouter API (DeepSeek R1)     |
| Body Parsing       | express.json, express.urlencoded |
| Error Handling     | Custom AppError & Middleware     |
| Environment Config | dotenv                           |
| Dev Tools          | nodemon                          |

---

## Local Setup

```bash
cd server
npm install
npm start
```

> Make sure `.env` is available at the root:

```env
MONGO_URI=mongodb://localhost:27017/noteverse
OPENROUTER_API=https://openrouter.ai/api/v1/chat/completions
AI_MODEL=deepseek/deepseek-r1:free
JWT_SECRET=your_jwt_secret_here
PORT=8181
NODE_ENV=development
API_PREFIX=/api
```

---

## Folder Structure

```
project-root/
├── server/                  # All backend logic lives here
│   ├── controllers/         # Request handlers (e.g., noteController.js)
│   ├── routes/              # Express routers (e.g., noteRoutes.js)
│   ├── models/              # Mongoose schemas (e.g., noteModel.js)
│   ├── services/            # Business logic, AI service, etc.
│   ├── middlewares/         # Error handling, auth guards, validators
│   ├── utils/               # AppError, JWT utils, constants
│   ├── app.js               # Express app config (NO `listen` here)                         ├──  .env                    # Environment variables
├── server.js                # Vercel entry point (NO `listen` here either)
├── vercel.json              # Vercel deployment config
├── package.json             # Dependencies and scripts
└── README.md
```

---

## Auth Flow

- User signs up / sing in → JWT issued
- JWT is validated via middleware for protected routes
- `AuthContext` on frontend handles session

---

## AI Enhancement

- Uses OpenRouter API
- Validates and pre-checks bad/gibberish input
- Supports multiple prompts: grammar fix, expand, summarize
- Title is extracted from enhanced content, not embedded in HTML

---

## Features

| Feature              | Description                         |
| -------------------- | ----------------------------------- |
| Note CRUD            | Create, read, update, delete notes  |
| AI-Powered Enhancer  | AI-enhances note content            |
| Drag Position Update | Stores real-time position for notes |
| Auth Middleware      | Secures routes with token check     |
| Error Handling       | Custom AppError with status codes   |

---

## Dev Commands

```bash
npm run start:dev    # Start dev server with nodemon
```
