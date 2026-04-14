'use client'

import type {
  Question,
  MultipleChoiceQuestion,
  FreeResponseQuestion,
  TrueFalseQuestion,
} from '@/app/lib/types'
import MultipleChoiceQuestionComponent from './MultipleChoiceQuestion'
import FreeResponseQuestionComponent from './FreeResponseQuestion'
import TrueFalseQuestionComponent from './TrueFalseQuestion'

type MultipleChoiceAnswer = { selectedOptionId: number }
type FreeResponseAnswer = { textResponse: string }
type TrueFalseAnswer = { booleanResponse: boolean }
type PartialAnswer = MultipleChoiceAnswer | FreeResponseAnswer | TrueFalseAnswer

interface QuestionRendererProps {
  question: Question
  onAnswer: (partial: PartialAnswer) => void
  disabled: boolean
}

/**
 * Dispatches to the correct question component based on question.type.
 * This component is pre-built — you do not need to modify it.
 *
 * When a student component calls onAnswer, this renderer enriches the
 * submission with the questionId before forwarding it to the quiz page.
 */
export default function QuestionRenderer({
  question,
  onAnswer,
  disabled,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'multiple_choice':
      return (
        <MultipleChoiceQuestionComponent
          question={question as MultipleChoiceQuestion}
          onAnswer={(partial) => onAnswer(partial)}
          disabled={disabled}
        />
      )
    case 'free_response':
      return (
        <FreeResponseQuestionComponent
          question={question as FreeResponseQuestion}
          onAnswer={(partial) => onAnswer(partial)}
          disabled={disabled}
        />
      )
    case 'true_false':
      return (
        <TrueFalseQuestionComponent
          question={question as TrueFalseQuestion}
          onAnswer={(partial) => onAnswer(partial)}
          disabled={disabled}
        />
      )
    default:
      return (
        <p style={{ color: 'red' }}>
          Unknown question type: {(question as Question).type}
        </p>
      )
  }
}
