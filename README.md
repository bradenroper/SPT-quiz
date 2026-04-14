# Trivia App — Student Programmer Performance Task

Welcome! This is a pre-built trivia quiz application. Your job is to complete two programming tasks described below. Everything else — the database, API endpoints, routing, and quiz shell — is already working.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- A code editor (VS Code recommended)

---

## Setup

Run these commands in order from the project root:

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** `npm run db:migrate` automatically seeds the database with 12 trivia questions the first time it runs. If you ever need to reset the data, run `npm run db:reset`.

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

Build a statistics dashboard using data from the pre-built `useAnalytics()` hook.

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
// [{ questionId, questionText, totalAnswers, correctAnswers, accuracy }]
```

Your dashboard should display at minimum:
1. A loading state while data is fetching
2. The three overall stats (total answers, correct answers, accuracy)
3. Per-type breakdown
4. Per-question breakdown as a list or table

View your dashboard at [http://localhost:3000/analytics](http://localhost:3000/analytics).

---

## Project Structure

```
app/
├── api/                        Pre-built API routes (do not modify)
│   ├── questions/              GET /api/questions
│   ├── questions/[id]/         GET /api/questions/:id
│   ├── questions/[id]/answer/  POST /api/questions/:id/answer
│   └── analytics/              GET /api/analytics
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
| `npm run db:reset` | Reset and re-seed the database |
| `npm run db:studio` | Open Prisma Studio to inspect the database |
| `npm run build` | Build for production (checks for TypeScript errors) |
