# Student Programmer Performance Task

Welcome! This is a pre-built trivia quiz application. Your job is to complete two programming tasks described below. Everything else (ie. the database, API endpoints, routing, and quiz shell) is already working.

## Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Your Tasks](#your-tasks)
    - [Task 1](#task-1-question-components)
    - [Task 2](#task-2-analytics-dashboard)
- [Project Structure](#project-structure)
- [UI Libraries](#available-ui-libraries)
- [Use of AI](#use-of-ai-tools)
- [Useful Commands](#useful-commands)

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- A code editor (VS Code recommended)


## Setup

Instead of forking this repository, you will copy this repository via the _Use this template_ option and add me ([bradenroper](https://github.com/bradenroper)) as a collaborator. See instructions provided by email for more information.

After creating the repository, setup is fairly straightforward:

```bash
# install dependencies
npm install
# run the development server, app can then be viewed in your browser
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

A prepopulated database (`/prisma/dev.db`) should be included by default, and the application has built in functions to clear the database or repopulate it with dummy data for your conveninece. However, should you need commands to rerun database migrations, those can be see at the bottom of this document.


## Your Tasks

### Task 1: Question Components

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


### Task 2: Analytics Dashboard

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


## Use of AI tools

AI tools are not banned from this task, though if you wish to use them, make sure that you are prepared to explain your development process and rationale.

## Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run db:reset` | Reset and re-seed the database |
| `npm run db:studio` | Open Prisma Studio to inspect the database |
| `npm run build` | Build for production (checks for TypeScript errors, but isn't required) |
