# NoteVerse Frontend

Modern AI-powered note editor built with **React**, **Vite**, and **TailwindCSS**, optimized for speed and UX.

---

## 🛠 Tech Stack

| Purpose            | Library / Tool                 |
| ------------------ | ------------------------------ |
| Framework          | React 18 (with Hooks)          |
| Build Tool         | Vite                           |
| Styling            | TailwindCSS + Custom Theme     |
| Icons              | FontAwesome                    |
| Routing            | React Router DOM               |
| State Management   | React Context API              |
| Editor             | TipTap Rich Text Editor        |
| Markdown Rendering | ReactMarkdown + GFM Plugins    |
| Drag & Drop        | React Flow (for canvas layout) |
| HTTP Requests      | Native Fetch API               |
| AI Enhancements    | OpenRouter (DeepSeek R1)       |
| Authentication     | AuthContext + JWT              |
| API Integration    | `/api/*` proxied to backend    |

---

## 🚀 Local Setup

```bash
cd client
npm install
npm run dev
```

> Make sure `.env` is available at the root:

```env
VITE_API_BASE_URL=api_here
```

---

## Features

- **Authentication**

- JWT stored in memory (no localStorage)
- AuthContext manages login/session

- **Note Creation**

- Title & Rich Text Content (TipTap)
- AI Enhancements: grammar fix, expand, summarize
- AI-generated title (not duplicated in content)

- **AI Enhancer Panel**

- Prompts: fix grammar, expand, summarize
- Accept/Replace content with styled response
- Spinner + disable states during AI call

- **Drag-and-Drop Notes Board**

- Canvas with draggable note cards
- Real-time position sync to backend

- **UX Enhancements**

- Skeleton loaders
- Responsive layout
- Smooth transitions

---

## Dev Commands

```bash
npm run dev       # Start dev server
npm build     # Production build
```
