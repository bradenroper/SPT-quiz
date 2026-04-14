'use client'

/**
 * TASK 2: Analytics Dashboard Page
 *
 * Build a dashboard that displays trivia answer statistics.
 * The useAnalytics hook is already set up — just call it and display the data.
 *
 * AVAILABLE DATA (returned by useAnalytics):
 *
 *   loading   — boolean          true while the data is being fetched
 *   error     — string | null    set if the fetch fails
 *   data      — AnalyticsData | null
 *
 *   data.totalAnswers            number   total answers submitted across all questions
 *   data.correctAnswers          number   how many of those were correct
 *   data.accuracy                number   overall accuracy % (e.g. 72.5)
 *
 *   data.typeBreakdown           array    one entry per question type:
 *     [{ type, totalAnswers, correctAnswers, accuracy }]
 *     type values: 'multiple_choice' | 'free_response' | 'true_false'
 *
 *   data.questionBreakdown       array    one entry per question:
 *     [{ questionId, questionText, totalAnswers, correctAnswers, accuracy }]
 *
 * REQUIREMENTS:
 *   1. Show a loading indicator (e.g. CircularProgress) while data is loading.
 *   2. Show an error message if the fetch fails.
 *   3. Display the three overall stats: totalAnswers, correctAnswers, accuracy.
 *   4. Display per-type breakdown (multiple_choice, free_response, true_false).
 *   5. Display per-question breakdown as a list or table.
 *
 * SUGGESTED MUI COMPONENTS (import from '@mui/material'):
 *   Container, Typography, Card, CardContent   — layout and stat cards
 *   Table, TableHead, TableBody, TableRow, TableCell — question breakdown table
 *   CircularProgress, LinearProgress           — loading state / accuracy bars
 *   Chip                                       — question type labels
 *   Alert                                      — error state
 *
 * You may use MUI components, Tailwind utility classes, or both for styling.
 */

import { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAnalytics } from '@/app/hooks/useAnalytics'

export default function AnalyticsPage() {
  const { data, loading, error } = useAnalytics()
  const [clearing, setClearing] = useState(false)

  async function clearData() {
    if (!confirm('Clear all answer data? This cannot be undone.')) return
    setClearing(true)
    await fetch('/api/answers', { method: 'DELETE' })
    // Reload the page so the hook re-fetches fresh data
    window.location.reload()
  }

  // TODO: Handle the loading state (loading === true)
  // TODO: Handle the error state (error !== null)
  // TODO: Build the dashboard UI using the data object

  return (
    <div style={{ padding: '2rem' }}>
      {/* Clear data button — pre-built, no changes needed */}
      <Box className="flex justify-end mb-4">
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<DeleteOutlineIcon />}
          onClick={clearData}
          disabled={clearing}
        >
          Clear All Data
        </Button>
      </Box>

      {/* Replace everything below with your implementation */}
      <p style={{ color: '#999', fontStyle: 'italic' }}>
        Analytics Dashboard not yet implemented.
      </p>
      <pre style={{ fontSize: '0.75rem', background: '#f5f5f5', padding: '1rem' }}>
        {JSON.stringify({ loading, error, data }, null, 2)}
      </pre>
    </div>
  )
}
