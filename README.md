# PromptSmith MVP

PromptSmith is a lightweight AI-powered prompt engineering tool that transforms simple user ideas into structured, high-quality prompts suitable for use with large language models like ChatGPT or Gemini.

This project focuses on clarity, usability, and structured prompt generation without requiring users to understand advanced prompt engineering techniques.

---

## 🚀 Live Concept

**Core Idea:**
Users provide a rough idea → AI refines the intention → Prompt engine structures it → Final professional prompt is generated.

No database.
No overcomplicated infrastructure.
Just a clean, stateless AI workflow.

---

## ✨ Features

- Convert simple ideas into detailed, structured prompts
- AI-powered intent refinement
- Clean prompt formatting logic
- Local prompt history (browser-based)
- Stateless backend architecture
- Clean separation of frontend and backend
- Ready for future scalability

---

## 🧠 How It Works

1. User enters a rough idea (e.g., “build a notes app”).
2. Backend sends the idea to the AI refinement layer.
3. The idea is expanded into a clear and structured objective.
4. Prompt engine formats it into a professional-grade prompt.
5. Final prompt is returned to the frontend.
6. Prompt is stored locally in browser history (optional).

---

## 🏗️ Project Structure

```
prompt-smith/
│
├── client/                   # Frontend (HTML, CSS, JS)
│   ├── builder.html
│   ├── dashboard.html
│   ├── css/
│   └── js/
│
├── server/                   # Backend (Node.js + Express)
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- Axios (for API requests)

### AI Integration
- Google Gemini API (for idea refinement)

### Storage
- Browser `localStorage` (no database used in MVP)

---

## 🖥️ Running the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/prompt-smith.git
cd prompt-smith
```

---

### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

---

### 3️⃣ Create Environment File

Inside the `/server` directory, create a file named:

```
.env
```

Add the following:

```
GEMINI_API_KEY=your_actual_gemini_api_key
```

⚠️ Never commit this file to GitHub.

---

### 4️⃣ Start the Backend Server

```bash
node server.js
```

The server will run at:

```
http://localhost:5000
```

---

### 5️⃣ Open the Frontend

Open `client/builder.html` using:
- VS Code Live Server, or
- Directly in your browser.

---

## 📌 Example Usage

Input:
```
Build a todo app
```

Generated Output:
- Structured task description
- Clear objective
- Defined scope
- Technical clarity
- Output formatting instructions

---

## 🎯 Design Philosophy

PromptSmith MVP is intentionally:

- Minimal
- Stateless
- Lightweight
- Fast to iterate
- Infrastructure-independent

It focuses on validating the workflow before adding database or deployment complexity.

---

## 🔮 Future Enhancements

- Optional database persistence
- Template presets
- Prompt versioning
- Authentication system
- Cloud deployment
- UI enhancements
- Export features

---

## ⚠️ Disclaimer

This project is an MVP built for experimentation, learning, and workflow validation.  
It is not production-hardened and does not include advanced security or scaling infrastructure.

---

## 📜 License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
