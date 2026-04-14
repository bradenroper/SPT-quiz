'use client'

import { useState, useEffect } from 'react'
import type { AnalyticsData } from '@/app/lib/types'

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch('/api/analytics')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch analytics (${res.status})`)
        return res.json()
      })
      .then((d: AnalyticsData) => {
        setData(d)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [tick])

  function refetch() {
    setTick((t) => t + 1)
  }

  return { data, loading, error, refetch }
}
