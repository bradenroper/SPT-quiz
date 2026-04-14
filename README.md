# Trivia App — Student Programmer Performance Task

Welcome! This is a pre-built trivia quiz application. Your job is to complete two programming tasks described below. Everything else — the database, API endpoints, routing, and quiz shell — is already working.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- A code editor (VS Code recommended)

---

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> The database is included in the repo and pre-seeded with 12 trivia questions. `npm install` generates the Prisma client automatically via a `postinstall` hook.

---

## Your Tasks

### Task 1 — Question Components

Implement the three React components that render each question type. Open each file and follow the instructions in the comment at the top.

| File | Question Type |
|---|---|
| `app/components/questions/MultipleChoiceQuestion.tsx` | Renders a question with selectable answer options |
| `app/components/questions/FreeResponseQuestion.tsx` | Renders a question with a text input |
| `app/components/questions/TrueFalseQuestion.tsx` | Renders a question with True / False buttons |

Each component receives:
- `question` — the question data (text, options, etc.)
- `onAnswer` — a callback to call when the user submits their answer
- `disabled` — set to `true` after the question has been answered

Once implemented, test your components at [http://localhost:3000/quiz](http://localhost:3000/quiz).

---

### Task 2 — Analytics Dashboard

Build a statistics dashboard on the analytics page. Use the pre-built `useAnalytics()` hook to fetch data and display overall accuracy, per-type breakdowns, and a per-question table. Read the comment at the top of the file for details.

**File to edit:** `app/analytics/page.tsx`

The hook provides:

```ts
const { data, loading, error } = useAnalytics()

data.totalAnswers          // total answers submitted
data.correctAnswers        // number of correct answers
data.accuracy              // overall accuracy percentage (e.g. 72.5)

data.typeBreakdown         // accuracy broken down by question type
// [{ type, totalAnswers, correctAnswers, accuracy }]

data.questionBreakdown     // accuracy for each individual question
// [{ questionId, questionText, type, totalAnswers, correctAnswers, accuracy }]
```

Your dashboard should display at minimum:
1. A loading state while data is fetching
2. The three overall stats (total answers, correct answers, accuracy)
3. Per-type breakdown
4. Per-question breakdown as a list or table

View your dashboard at [http://localhost:3000/analytics](http://localhost:3000/analytics).

> **Tip:** The analytics page has two pre-built buttons — **Load Demo Data** and **Clear All Data** — that you can use to populate or wipe answer data while building your dashboard.

---

## Project Structure

```
app/
├── api/                        Pre-built API routes (do not modify)
│   ├── questions/              GET /api/questions
│   ├── questions/[id]/         GET /api/questions/:id
│   ├── questions/[id]/answer/  POST /api/questions/:id/answer
│   ├── analytics/              GET /api/analytics
│   └── answers/                DELETE /api/answers
│       └── reset/              POST /api/answers/reset
├── components/
│   └── questions/
│       ├── MultipleChoiceQuestion.tsx  ← Task 1
│       ├── FreeResponseQuestion.tsx    ← Task 1
│       ├── TrueFalseQuestion.tsx       ← Task 1
│       └── QuestionRenderer.tsx        Pre-built dispatcher
├── analytics/
│   └── page.tsx                        ← Task 2
├── quiz/
│   └── page.tsx                Pre-built quiz shell
├── hooks/                      Pre-built data hooks
│   ├── useQuestions.ts
│   ├── useAnswer.ts
│   └── useAnalytics.ts
└── lib/
    └── types.ts                TypeScript interfaces
```

---

## Available UI Libraries

Both are already installed and ready to use.

- **[MUI (Material UI)](https://mui.com/material-ui/)** — component library (`Button`, `TextField`, `Table`, `Card`, etc.)
- **[Tailwind CSS](https://tailwindcss.com/docs)** — utility classes for spacing, layout, and color

---

## Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run db:reset` | Drop and recreate the database, re-seed questions, clear all answers |
| `npm run db:studio` | Open Prisma Studio to inspect the database |
| `npm run build` | Build for production (checks for TypeScript errors) |
