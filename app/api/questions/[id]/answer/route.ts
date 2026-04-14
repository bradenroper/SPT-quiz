import { prisma } from '@/app/lib/db'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const questionId = parseInt(id, 10)

  if (isNaN(questionId)) {
    return Response.json({ error: 'Invalid question id' }, { status: 400 })
  }

  const body = await request.json()
  const { selectedOptionId, textResponse, booleanResponse } = body

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { options: true },
  })

  if (!question) {
    return Response.json({ error: 'Question not found' }, { status: 404 })
  }

  let isCorrect = false
  let correctAnswerText: string | undefined

  if (question.type === 'multiple_choice') {
    if (selectedOptionId === undefined || selectedOptionId === null) {
      return Response.json(
        { error: 'selectedOptionId is required for multiple_choice questions' },
        { status: 400 }
      )
    }
    const selectedOption = question.options.find((o) => o.id === selectedOptionId)
    if (!selectedOption) {
      return Response.json({ error: 'Option not found' }, { status: 400 })
    }
    isCorrect = selectedOption.isCorrect
    correctAnswerText = question.options.find((o) => o.isCorrect)?.text

    await prisma.answer.create({
      data: { questionId, selectedOptionId, isCorrect },
    })
  } else if (question.type === 'true_false') {
    if (booleanResponse === undefined || booleanResponse === null) {
      return Response.json(
        { error: 'booleanResponse is required for true_false questions' },
        { status: 400 }
      )
    }
    isCorrect = booleanResponse.toString() === question.correctAnswer
    correctAnswerText = question.correctAnswer === 'true' ? 'True' : 'False'

    await prisma.answer.create({
      data: { questionId, booleanResponse, isCorrect },
    })
  } else if (question.type === 'free_response') {
    if (!textResponse || typeof textResponse !== 'string') {
      return Response.json(
        { error: 'textResponse is required for free_response questions' },
        { status: 400 }
      )
    }
    isCorrect =
      textResponse.trim().toLowerCase() === question.correctAnswer.toLowerCase()
    correctAnswerText = question.correctAnswer

    await prisma.answer.create({
      data: { questionId, textResponse, isCorrect },
    })
  }

  return Response.json({
    correct: isCorrect,
    explanation: question.explanation ?? undefined,
    correctAnswer: correctAnswerText,
  })
}
