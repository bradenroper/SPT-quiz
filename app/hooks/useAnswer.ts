'use client'

import { useState } from 'react'
import type { AnswerSubmission, AnswerResult } from '@/app/lib/types'

export function useAnswer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submitAnswer(
    submission: AnswerSubmission
  ): Promise<AnswerResult | null> {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/questions/${submission.questionId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? `Request failed (${res.status})`)
      }
      return (await res.json()) as AnswerResult
    } catch (err) {
      setError((err as Error).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { submitAnswer, loading, error }
}
