import type { Metadata } from 'next'
import ThemeRegistry from '@/app/components/layout/ThemeRegistry'
import Navbar from '@/app/components/layout/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trivia App',
  description: 'K20 Student Programmer Performance Task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  )
}
