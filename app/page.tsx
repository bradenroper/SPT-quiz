import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CodeIcon from '@mui/icons-material/Code'
import BarChartIcon from '@mui/icons-material/BarChart'
import Link from 'next/link'

const task1Files = [
  'app/components/questions/MultipleChoiceQuestion.tsx',
  'app/components/questions/FreeResponseQuestion.tsx',
  'app/components/questions/TrueFalseQuestion.tsx',
]

const task2Files = ['app/analytics/page.tsx']

const setupSteps = [
  'npm install',
  'npm run db:generate',
  'npm run db:migrate',
  'npm run db:seed',
  'npm run dev',
]

export default function HomePage() {
  return (
    <Container maxWidth="md" className="py-10">
      <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
        Trivia App
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" className="mb-8">
        K20 Student Programmer Performance Task
      </Typography>

      {/* Overview */}
      <Typography variant="body1" className="mb-6">
        Welcome! This project is a fully functional trivia quiz app. A SQLite database is
        already seeded with 12 questions, and all the API endpoints, routing, and state
        management are pre-built. Your job is to complete two tasks described below.
      </Typography>

      <div className="flex flex-col gap-6">
        {/* Task 1 */}
        <Card variant="outlined">
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <CodeIcon color="primary" />
              <Typography variant="h5" fontWeight={600}>
                Task 1 — Question Components
              </Typography>
              <Chip label="3 files" size="small" color="primary" variant="outlined" />
            </div>
            <Typography variant="body1" className="mb-3">
              Implement the three React components that render each question type. Each
              component receives a typed <code>question</code> prop and an{' '}
              <code>onAnswer</code> callback. Read the JSDoc comment at the top of each
              file for full requirements.
            </Typography>
            <List dense disablePadding>
              {task1Files.map((f) => (
                <ListItem key={f} disableGutters>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleOutlineIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<code style={{ fontSize: '0.85rem' }}>{f}</code>}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              component={Link}
              href="/quiz"
              className="mt-4"
              sx={{ mt: 2 }}
            >
              Open Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Task 2 */}
        <Card variant="outlined">
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <BarChartIcon color="secondary" />
              <Typography variant="h5" fontWeight={600}>
                Task 2 — Analytics Dashboard
              </Typography>
              <Chip label="1 file" size="small" color="secondary" variant="outlined" />
            </div>
            <Typography variant="body1" className="mb-3">
              Build a statistics dashboard on the analytics page. Use the pre-built{' '}
              <code>useAnalytics()</code> hook to fetch data and display overall accuracy,
              per-type breakdowns, and a per-question table. Read the comment at the top
              of the file for details.
            </Typography>
            <List dense disablePadding>
              {task2Files.map((f) => (
                <ListItem key={f} disableGutters>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleOutlineIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<code style={{ fontSize: '0.85rem' }}>{f}</code>}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              href="/analytics"
              sx={{ mt: 2 }}
            >
              Open Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Setup */}
        <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} className="mb-2">
              Getting Started
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-2">
              Run these commands in order in your terminal:
            </Typography>
            <List dense disablePadding>
              {setupSteps.map((step) => (
                <ListItem key={step} disableGutters>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleOutlineIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <code style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                        {step}
                      </code>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
