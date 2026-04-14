export type QuestionType = 'multiple_choice' | 'free_response' | 'true_false'
export type Difficulty = 'easy' | 'medium' | 'hard'

/**
 * A single answer option for a multiple choice question.
 * Note: isCorrect is intentionally not included here — it is only
 * revealed server-side after an answer is submitted.
 */
export interface Option {
  id: number
  text: string
}

export interface BaseQuestion {
  id: number
  text: string
  type: QuestionType
  category: string
  difficulty: Difficulty
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice'
  options: Option[]
}

export interface FreeResponseQuestion extends BaseQuestion {
  type: 'free_response'
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false'
}

export type Question = MultipleChoiceQuestion | FreeResponseQuestion | TrueFalseQuestion

/**
 * The payload sent when a student submits an answer.
 * Only one of the response fields should be populated, depending on question type:
 *   - multiple_choice: selectedOptionId
 *   - free_response:   textResponse
 *   - true_false:      booleanResponse
 */
export interface AnswerSubmission {
  questionId: number
  selectedOptionId?: number
  textResponse?: string
  booleanResponse?: boolean
}

/**
 * The result returned after submitting an answer.
 */
export interface AnswerResult {
  correct: boolean
  explanation?: string
  correctAnswer?: string
}

export interface QuestionBreakdown {
  questionId: number
  questionText: string
  type: QuestionType
  totalAnswers: number
  correctAnswers: number
  accuracy: number
}

export interface TypeBreakdown {
  type: QuestionType
  totalAnswers: number
  correctAnswers: number
  accuracy: number
}

export interface AnalyticsData {
  totalAnswers: number
  correctAnswers: number
  accuracy: number
  questionBreakdown: QuestionBreakdown[]
  typeBreakdown: TypeBreakdown[]
}
