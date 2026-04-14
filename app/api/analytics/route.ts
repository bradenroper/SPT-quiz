import { prisma } from '@/app/lib/db'
import type { QuestionType } from '@/app/lib/types'

export async function GET() {
  const [totalAnswers, correctAnswers, questions] = await Promise.all([
    prisma.answer.count(),
    prisma.answer.count({ where: { isCorrect: true } }),
    prisma.question.findMany({
      include: { answers: true },
      orderBy: { id: 'asc' },
    }),
  ])

  const accuracy =
    totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 1000) / 10 : 0

  const questionBreakdown = questions.map((q) => {
    const qTotal = q.answers.length
    const qCorrect = q.answers.filter((a) => a.isCorrect).length
    return {
      questionId: q.id,
      questionText: q.text,
      totalAnswers: qTotal,
      correctAnswers: qCorrect,
      accuracy:
        qTotal > 0 ? Math.round((qCorrect / qTotal) * 1000) / 10 : 0,
    }
  })

  const types: QuestionType[] = ['multiple_choice', 'free_response', 'true_false']
  const typeBreakdown = types.map((type) => {
    const typeQuestions = questions.filter((q) => q.type === type)
    const typeAnswers = typeQuestions.flatMap((q) => q.answers)
    const typeTotal = typeAnswers.length
    const typeCorrect = typeAnswers.filter((a) => a.isCorrect).length
    return {
      type,
      totalAnswers: typeTotal,
      correctAnswers: typeCorrect,
      accuracy:
        typeTotal > 0 ? Math.round((typeCorrect / typeTotal) * 1000) / 10 : 0,
    }
  })

  return Response.json({
    totalAnswers,
    correctAnswers,
    accuracy,
    questionBreakdown,
    typeBreakdown,
  })
}
