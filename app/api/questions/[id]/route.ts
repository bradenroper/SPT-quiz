import { prisma } from '@/app/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const questionId = parseInt(id, 10)

  if (isNaN(questionId)) {
    return Response.json({ error: 'Invalid question id' }, { status: 400 })
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { options: true },
  })

  if (!question) {
    return Response.json({ error: 'Question not found' }, { status: 404 })
  }

  // Strip server-only fields
  const { correctAnswer, explanation, options, ...q } = question
  const sanitized = {
    ...q,
    ...(q.type === 'multiple_choice'
      ? { options: options.map(({ isCorrect: _ic, questionId: _qid, ...opt }) => opt) }
      : {}),
  }

  return Response.json(sanitized)
}
