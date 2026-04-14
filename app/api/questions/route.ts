import { prisma } from '@/app/lib/db'

export async function GET() {
  const questions = await prisma.question.findMany({
    include: { options: true },
    orderBy: { id: 'asc' },
  })

  // Strip server-only fields before sending to the client
  const sanitized = questions.map(({ correctAnswer, explanation, options, ...q }) => ({
    ...q,
    ...(q.type === 'multiple_choice'
      ? { options: options.map(({ isCorrect: _ic, questionId: _qid, ...opt }) => opt) }
      : {}),
  }))

  return Response.json(sanitized)
}
