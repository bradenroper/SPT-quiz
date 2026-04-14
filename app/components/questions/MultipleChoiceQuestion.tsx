'use client'

/**
 * TASK 1 — PART A: MultipleChoiceQuestion Component
 *
 * Implement a React component that renders a multiple choice question.
 *
 * PROPS:
 *   question  — MultipleChoiceQuestion
 *               The question to display. It includes:
 *                 question.text            (string) the question prompt
 *                 question.options         (Option[]) array of answer choices
 *                 question.options[n].id   (number)  unique id for each option
 *                 question.options[n].text (string)  the option label
 *
 *   onAnswer  — (submission: { selectedOptionId: number }) => void
 *               Call this function when the user selects an option.
 *               Pass the id of the chosen option.
 *
 *   disabled  — boolean
 *               When true, the question has already been answered.
 *               Prevent the user from changing their selection.
 *
 * REQUIREMENTS:
 *   1. Display question.text as the question prompt.
 *   2. Render each option in question.options as a selectable element
 *      (button, radio button, etc.).
 *   3. When an option is clicked, call onAnswer({ selectedOptionId: option.id }).
 *   4. When disabled is true, all options must be non-interactive.
 *
 * SUGGESTED MUI COMPONENTS (import from '@mui/material'):
 *   Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button
 *
 * You may use MUI components, Tailwind utility classes, or both for styling.
 */

import type { MultipleChoiceQuestion } from '@/app/lib/types'

interface Props {
  question: MultipleChoiceQuestion
  onAnswer: (submission: { selectedOptionId: number }) => void
  disabled: boolean
}

export default function MultipleChoiceQuestion({ question, onAnswer, disabled }: Props) {
  // TODO: Implement this component.
  // Hint: use React useState to track which option the user has selected.

  return (
    <div>
      {/* Replace this placeholder with your implementation */}
      <p style={{ color: '#999', fontStyle: 'italic' }}>
        MultipleChoiceQuestion not yet implemented.
      </p>
      <p>{question.text}</p>
    </div>
  )
}
