import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data (idempotent — safe to re-run)
  await prisma.answer.deleteMany()
  await prisma.option.deleteMany()
  await prisma.question.deleteMany()

  // ── True / False questions ──────────────────────────────────────────────────

  await prisma.question.create({
    data: {
      text: 'The Great Wall of China is visible from space with the naked eye.',
      type: 'true_false',
      category: 'History',
      difficulty: 'easy',
      correctAnswer: 'false',
      explanation:
        'The Great Wall is only about 15–30 feet wide — far too narrow to be seen from space with the naked eye.',
    },
  })

  await prisma.question.create({
    data: {
      text: 'Water boils at 100°C at sea level.',
      type: 'true_false',
      category: 'Science',
      difficulty: 'easy',
      correctAnswer: 'true',
      explanation:
        'At standard atmospheric pressure (1 atm / 101.325 kPa), water boils at exactly 100°C (212°F).',
    },
  })

  await prisma.question.create({
    data: {
      text: 'Bats are completely blind.',
      type: 'true_false',
      category: 'Science',
      difficulty: 'easy',
      correctAnswer: 'false',
      explanation:
        'Bats have functional eyes and can see. They also use echolocation to navigate in the dark, but blindness is a myth.',
    },
  })

  await prisma.question.create({
    data: {
      text: 'The Pacific Ocean covers more area than all of Earth\'s landmass combined.',
      type: 'true_false',
      category: 'Geography',
      difficulty: 'medium',
      correctAnswer: 'true',
      explanation:
        'The Pacific Ocean spans roughly 165 million km², which exceeds the total land area of all continents (~149 million km²).',
    },
  })

  // ── Multiple Choice questions ───────────────────────────────────────────────

  await prisma.question.create({
    data: {
      text: 'What is the capital of Australia?',
      type: 'multiple_choice',
      category: 'Geography',
      difficulty: 'easy',
      correctAnswer: 'Canberra',
      explanation:
        'Canberra became the capital of Australia in 1913, chosen as a compromise between rivals Sydney and Melbourne.',
      options: {
        create: [
          { text: 'Sydney',    isCorrect: false },
          { text: 'Melbourne', isCorrect: false },
          { text: 'Canberra',  isCorrect: true  },
          { text: 'Brisbane',  isCorrect: false },
        ],
      },
    },
  })

  await prisma.question.create({
    data: {
      text: 'How many bones are in the adult human body?',
      type: 'multiple_choice',
      category: 'Science',
      difficulty: 'medium',
      correctAnswer: '206',
      explanation:
        'Adults have 206 bones. Babies are born with around 270–300 bones, but many fuse together as they grow.',
      options: {
        create: [
          { text: '186', isCorrect: false },
          { text: '206', isCorrect: true  },
          { text: '226', isCorrect: false },
          { text: '246', isCorrect: false },
        ],
      },
    },
  })

  await prisma.question.create({
    data: {
      text: 'What is the chemical symbol for gold?',
      type: 'multiple_choice',
      category: 'Science',
      difficulty: 'easy',
      correctAnswer: 'Au',
      explanation:
        'Au comes from the Latin word "aurum," meaning gold. It has been used as currency and jewelry for thousands of years.',
      options: {
        create: [
          { text: 'Go', isCorrect: false },
          { text: 'Gd', isCorrect: false },
          { text: 'Au', isCorrect: true  },
          { text: 'Ag', isCorrect: false },
        ],
      },
    },
  })

  await prisma.question.create({
    data: {
      text: 'Which planet in our solar system has the most moons?',
      type: 'multiple_choice',
      category: 'Science',
      difficulty: 'medium',
      correctAnswer: 'Saturn',
      explanation:
        'Saturn currently holds the record with over 140 confirmed moons, surpassing Jupiter which has around 95.',
      options: {
        create: [
          { text: 'Jupiter', isCorrect: false },
          { text: 'Uranus',  isCorrect: false },
          { text: 'Neptune', isCorrect: false },
          { text: 'Saturn',  isCorrect: true  },
        ],
      },
    },
  })

  await prisma.question.create({
    data: {
      text: 'In what year did World War II end?',
      type: 'multiple_choice',
      category: 'History',
      difficulty: 'easy',
      correctAnswer: '1945',
      explanation:
        'World War II ended in 1945 — Germany surrendered in May (V-E Day) and Japan surrendered in September (V-J Day) following the atomic bombings.',
      options: {
        create: [
          { text: '1943', isCorrect: false },
          { text: '1944', isCorrect: false },
          { text: '1945', isCorrect: true  },
          { text: '1946', isCorrect: false },
        ],
      },
    },
  })

  // ── Free Response questions ─────────────────────────────────────────────────

  await prisma.question.create({
    data: {
      text: 'What is the powerhouse of the cell?',
      type: 'free_response',
      category: 'Science',
      difficulty: 'easy',
      correctAnswer: 'mitochondria',
      explanation:
        'The mitochondria generates most of the cell\'s supply of ATP (adenosine triphosphate), used as a source of chemical energy.',
    },
  })

  await prisma.question.create({
    data: {
      text: 'What is the largest planet in our solar system?',
      type: 'free_response',
      category: 'Science',
      difficulty: 'easy',
      correctAnswer: 'jupiter',
      explanation:
        'Jupiter is the largest planet in our solar system — its mass is greater than the combined mass of all other planets.',
    },
  })

  await prisma.question.create({
    data: {
      text: 'What is 15% of 200?',
      type: 'free_response',
      category: 'Math',
      difficulty: 'easy',
      correctAnswer: '30',
      explanation: '15% of 200 = 0.15 × 200 = 30.',
    },
  })

  console.log('✅ Database seeded with 12 trivia questions.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
