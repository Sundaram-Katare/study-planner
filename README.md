# 📚 Planix

Planix is a full-stack web app that turns any syllabus into a personalized, day-wise study roadmap using Gemini AI.  
Users enter their syllabus, number of days, and hours per day, and the app generates structured daily cards with topics, subtasks, time estimates, and revision suggestions.

---

## ✨ Features

- **AI-generated study plans**
  - Paste syllabus text, choose days and hours per day.
  - Gemini AI splits your content into logical topics and daily chunks.
- **Day-wise study cards**
  - One card per day.
  - Each card contains:
    - Topics to study
    - Estimated time
    - Actionable subtasks
    - Optional revision section
- **Progress statuses**
  - Each card has a status badge:
    - 🟦 To Do
    - 🟧 In Progress
    - 🟩 Done
  - Simple click-to-cycle; no Kanban board, just day-wise cards.
- **User authentication**
  - Secure sign-in / sign-up with Clerk.
  - Each user has their own set of study plans.
- **Persistent storage**
  - PostgreSQL + Prisma ORM for users, plans, and daily cards.
- **Modern UI**
  - Next.js App Router + TypeScript + Tailwind CSS.
  - Clean landing page with hero section and feature highlights.
  - Dashboard listing all study plans with progress bars.

---

## 🧱 Tech Stack

| Layer         | Technology              |
|--------------|-------------------------|
| Framework    | Next.js (App Router)    |
| Language     | TypeScript              |
| Styling      | Tailwind CSS            |
| Auth         | Clerk                   |
| Database     | PostgreSQL              |
| ORM          | Prisma                  |
| AI           | Google Gemini API       |
| Deployment   | **Vercel** (recommended)    |

---

## Getting Started

### 1. Clone the repo
```bash
  git clone https://github.com/your-username/ai-study-planner.git
```

### 2. Move to the project directory
```bash
 cd study-planner
```

### 3. Install dependencies
```bash
 npm install
```

### 4. Configure env variables in `.env.local`
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

Database
DATABASE_URL=postgresql://username:password@localhost:5432/study_planner

Gemini
GEMINI_API_KEY=your_gemini_api_key
```

### 5. Run development server
```bash
 npm run dev
```

---

## 🧠 How the Planix Works

1. User enters:
   - Syllabus text
   - Number of days
   - Hours available per day
2. Backend calls Gemini with a structured prompt to:
   - Break syllabus into topics and subtasks
   - Distribute work across days
   - Estimate time per day
   - Add revision days where needed
3. The JSON response is stored in PostgreSQL as `StudyPlan` and `DailyCard` records.
4. The frontend renders day-wise cards with status badges and lets the user update progress.

---

## 📜 License

This project is for educational and personal use.  
Ensure compliance with the terms of the Gemini, Clerk, and any other APIs you use.
