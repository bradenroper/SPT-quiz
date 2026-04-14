'use client'

/**
 * TASK 1 — PART C: TrueFalseQuestion Component
 *
 * Implement a React component that renders a true/false question.
 *
 * PROPS:
 *   question  — TrueFalseQuestion
 *               The question to display. It includes:
 *                 question.text  (string) the question prompt
 *
 *   onAnswer  — (submission: { booleanResponse: boolean }) => void
 *               Call this function when the user picks True or False.
 *               Pass true for "True", false for "False".
 *
 *   disabled  — boolean
 *               When true, the question has already been answered.
 *               Prevent the user from changing their selection.
 *
 * REQUIREMENTS:
 *   1. Display question.text as the question prompt.
 *   2. Render exactly two options: "True" and "False".
 *   3. When "True" is clicked:  call onAnswer({ booleanResponse: true }).
 *      When "False" is clicked: call onAnswer({ booleanResponse: false }).
 *   4. When disabled is true, both options must be non-interactive.
 *
 * SUGGESTED MUI COMPONENTS (import from '@mui/material'):
 *   Typography, Button, ToggleButton, ToggleButtonGroup
 *
 * You may use MUI components, Tailwind utility classes, or both for styling.
 */

import type { TrueFalseQuestion } from '@/app/lib/types'

interface Props {
  question: TrueFalseQuestion
  onAnswer: (submission: { booleanResponse: boolean }) => void
  disabled: boolean
}

export default function TrueFalseQuestion({ question, onAnswer, disabled }: Props) {
  // TODO: Implement this component.

  return (
    <div>
      {/* Replace this placeholder with your implementation */}
      <p style={{ color: '#999', fontStyle: 'italic' }}>
        TrueFalseQuestion not yet implemented.
      </p>
      <p>{question.text}</p>
    </div>
  )
}
