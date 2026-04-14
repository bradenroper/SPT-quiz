'use client'

import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ReplayIcon from '@mui/icons-material/Replay'
import QuestionRenderer from '@/app/components/questions/QuestionRenderer'
import { useQuestions } from '@/app/hooks/useQuestions'
import { useAnswer } from '@/app/hooks/useAnswer'
import type { AnswerResult } from '@/app/lib/types'

type PartialAnswer =
  | { selectedOptionId: number }
  | { textResponse: string }
  | { booleanResponse: boolean }

export default function QuizPage() {
  const { questions, loading, error } = useQuestions()
  const { submitAnswer, loading: submitting } = useAnswer()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AnswerResult>>({})

  if (loading) {
    return (
      <Container maxWidth="sm" className="py-16 text-center">
        <CircularProgress />
        <Typography variant="body1" className="mt-4">
          Loading questions…
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="sm" className="py-10">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Container>
    )
  }

  if (questions.length === 0) {
    return (
      <Container maxWidth="sm" className="py-10">
        <Alert severity="info">No questions found. Run npm run db:seed to add them.</Alert>
      </Container>
    )
  }

  const question = questions[currentIndex]
  const answeredResult = answers[question.id]
  const answeredCount = Object.keys(answers).length
  const progressPct = Math.round((answeredCount / questions.length) * 100)
  const quizComplete = answeredCount === questions.length

  function retakeQuiz() {
    setAnswers({})
    setCurrentIndex(0)
  }

  async function handleAnswer(partial: PartialAnswer) {
    if (answers[question.id]) return // already answered

    const submission = { questionId: question.id, ...partial }
    const result = await submitAnswer(submission)
    if (result) {
      setAnswers((prev) => ({ ...prev, [question.id]: result }))
    }
  }

  const difficultyColor: Record<string, 'success' | 'warning' | 'error'> = {
    easy: 'success',
    medium: 'warning',
    hard: 'error',
  }

  return (
    <Container maxWidth="sm" className="py-8">
      {/* Header */}
      <Box className="flex items-center justify-between mb-2">
        <Typography variant="h6" fontWeight={600}>
          Question {currentIndex + 1} of {questions.length}
        </Typography>
        <Box className="flex gap-2 items-center">
          <Chip
            label={question.category}
            size="small"
            variant="outlined"
          />
          <Chip
            label={question.difficulty}
            size="small"
            color={difficultyColor[question.difficulty] ?? 'default'}
          />
        </Box>
      </Box>

      {/* Progress bar */}
      <Box className="mb-6">
        <LinearProgress
          variant="determinate"
          value={progressPct}
          sx={{ height: 6, borderRadius: 3 }}
        />
        <Typography variant="caption" color="text.secondary">
          {answeredCount} / {questions.length} answered
        </Typography>
      </Box>

      {/* Question card */}
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 3,
          mb: 3,
          minHeight: 200,
        }}
      >
        {submitting ? (
          <Box className="flex justify-center items-center h-32">
            <CircularProgress size={32} />
          </Box>
        ) : (
          <QuestionRenderer
            question={question}
            onAnswer={handleAnswer}
            disabled={!!answeredResult || submitting}
          />
        )}
      </Box>

      {/* Answer feedback */}
      {answeredResult && (
        <Alert
          severity={answeredResult.correct ? 'success' : 'error'}
          icon={
            answeredResult.correct ? (
              <CheckCircleIcon fontSize="inherit" />
            ) : (
              <CancelIcon fontSize="inherit" />
            )
          }
          className="mb-4"
        >
          <AlertTitle>{answeredResult.correct ? 'Correct!' : 'Incorrect'}</AlertTitle>
          {!answeredResult.correct && answeredResult.correctAnswer && (
            <Typography variant="body2">
              Correct answer: <strong>{answeredResult.correctAnswer}</strong>
            </Typography>
          )}
          {answeredResult.explanation && (
            <Typography variant="body2" className="mt-1">
              {answeredResult.explanation}
            </Typography>
          )}
        </Alert>
      )}

      {/* Quiz complete banner */}
      {quizComplete && (
        <Alert severity="info" className="mb-4">
          <AlertTitle>Quiz complete!</AlertTitle>
          You answered all {questions.length} questions.{' '}
          {Object.values(answers).filter((a) => a.correct).length} /{' '}
          {questions.length} correct.
        </Alert>
      )}

      {/* Navigation */}
      <Box className="flex justify-between">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Previous
        </Button>
        <Box className="flex gap-2">
          {quizComplete && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ReplayIcon />}
              onClick={retakeQuiz}
            >
              Retake Quiz
            </Button>
          )}
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            disabled={currentIndex === questions.length - 1 || !answeredResult}
            onClick={() => setCurrentIndex((i) => i + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
