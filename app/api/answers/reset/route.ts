import { prisma } from '@/app/lib/db'

/**
 * POST /api/answers/reset
 *
 * Clears all answers and inserts a fixed set of demo answers so the
 * analytics dashboard has interesting data to display.
 */
export async function POST() {
  await prisma.answer.deleteMany()

  const questions = await prisma.question.findMany({
    include: { options: true },
    orderBy: { id: 'asc' },
  })

  // How many of the 7 responses per question should be correct.
  // Ordered to match the seed question sequence:
  //  1. Great Wall visible (TF)       — tricky, most get it wrong: 2/7
  //  2. Water boils 100°C (TF)        — easy: 6/7
  //  3. Bats are blind (TF)           — medium: 4/7
  //  4. Pacific > landmass (TF)       — medium: 5/7
  //  5. Capital of Australia (MC)     — many pick Sydney: 3/7
  //  6. Bones in body (MC)            — hard: 2/7
  //  7. Gold symbol Au (MC)           — easy: 6/7
  //  8. Most moons Saturn (MC)        — medium: 4/7
  //  9. WWII end year 1945 (MC)       — easy: 5/7
  // 10. Powerhouse of cell (FR)       — easy: 6/7
  // 11. Largest planet Jupiter (FR)   — easy: 5/7
  // 12. 15% of 200 (FR)               — medium: 3/7
  const correctCounts = [2, 6, 4, 5, 3, 2, 6, 4, 5, 6, 5, 3]

  const wrongFreeResponses = [
    'I have no idea',
    'not sure',
    'idk',
    'maybe the nucleus?',
    'the brain',
  ]

  type AnswerInput = {
    questionId: number
    selectedOptionId?: number
    textResponse?: string
    booleanResponse?: boolean
    isCorrect: boolean
  }
  const answers: AnswerInput[] = []

  questions.forEach((q, index) => {
    const nCorrect = correctCounts[index] ?? 3
    const nWrong = 7 - nCorrect

    if (q.type === 'true_false') {
      const correct = q.correctAnswer === 'true'
      for (let i = 0; i < nCorrect; i++) {
        answers.push({ questionId: q.id, booleanResponse: correct, isCorrect: true })
      }
      for (let i = 0; i < nWrong; i++) {
        answers.push({ questionId: q.id, booleanResponse: !correct, isCorrect: false })
      }
    } else if (q.type === 'multiple_choice') {
      const correctOpt = q.options.find((o) => o.isCorrect)!
      const wrongOpts = q.options.filter((o) => !o.isCorrect)
      for (let i = 0; i < nCorrect; i++) {
        answers.push({ questionId: q.id, selectedOptionId: correctOpt.id, isCorrect: true })
      }
      // Spread wrong answers across the available wrong options
      for (let i = 0; i < nWrong; i++) {
        const wrongOpt = wrongOpts[i % wrongOpts.length]
        answers.push({ questionId: q.id, selectedOptionId: wrongOpt.id, isCorrect: false })
      }
    } else if (q.type === 'free_response') {
      for (let i = 0; i < nCorrect; i++) {
        answers.push({ questionId: q.id, textResponse: q.correctAnswer, isCorrect: true })
      }
      for (let i = 0; i < nWrong; i++) {
        answers.push({
          questionId: q.id,
          textResponse: wrongFreeResponses[i % wrongFreeResponses.length],
          isCorrect: false,
        })
      }
    }
  })

  await prisma.answer.createMany({ data: answers })

  return Response.json({ message: `Demo data loaded: ${answers.length} answers inserted.` })
}
