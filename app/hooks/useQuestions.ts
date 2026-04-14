'use client'

import { useState, useEffect } from 'react'
import type { Question } from '@/app/lib/types'

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch questions (${res.status})`)
        return res.json()
      })
      .then((data: Question[]) => {
        setQuestions(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { questions, loading, error }
}
