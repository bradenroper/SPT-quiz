'use client'

/**
 * TASK 1 — PART B: FreeResponseQuestion Component
 *
 * Implement a React component that renders a free response question.
 *
 * PROPS:
 *   question  — FreeResponseQuestion
 *               The question to display. It includes:
 *                 question.text  (string) the question prompt
 *
 *   onAnswer  — (submission: { textResponse: string }) => void
 *               Call this function when the user submits their typed answer.
 *               Pass the text the user typed.
 *
 *   disabled  — boolean
 *               When true, the question has already been answered.
 *               Prevent the user from submitting again.
 *
 * REQUIREMENTS:
 *   1. Display question.text as the question prompt.
 *   2. Render a text input where the user can type their answer.
 *   3. Provide a way to submit (a button, or pressing Enter).
 *      When submitted, call onAnswer({ textResponse: value }).
 *   4. Do not allow submission of an empty string.
 *   5. When disabled is true, the input and submit must be non-interactive.
 *
 * SUGGESTED MUI COMPONENTS (import from '@mui/material'):
 *   Typography, TextField, Button
 *
 * You may use MUI components, Tailwind utility classes, or both for styling.
 */

import type { FreeResponseQuestion } from '@/app/lib/types'

interface Props {
  question: FreeResponseQuestion
  onAnswer: (submission: { textResponse: string }) => void
  disabled: boolean
}

export default function FreeResponseQuestion({ question, onAnswer, disabled }: Props) {
  // TODO: Implement this component.
  // Hint: use React useState to track the current value of the text input.

  return (
    <div>
      {/* Replace this placeholder with your implementation */}
      <p style={{ color: '#999', fontStyle: 'italic' }}>
        FreeResponseQuestion not yet implemented.
      </p>
      <p>{question.text}</p>
    </div>
  )
}
