import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import QuizIcon from '@mui/icons-material/Quiz'
import Link from 'next/link'

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <QuizIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Trivia App
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/quiz">
          Quiz
        </Button>
        <Button color="inherit" component={Link} href="/analytics">
          Analytics
        </Button>
      </Toolbar>
    </AppBar>
  )
}
