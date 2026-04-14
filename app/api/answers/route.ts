import { prisma } from '@/app/lib/db'

export async function DELETE() {
  await prisma.answer.deleteMany()
  return Response.json({ message: 'All answers cleared.' })
}
