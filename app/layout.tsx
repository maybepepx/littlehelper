import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import '../src/app/globals.css'

export const metadata: Metadata = {
  title: 'Automated User Research Dashboard',
  description: 'AI-powered user research platform for generating personas and conducting interviews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        "text-foreground"
      )}>
        {children}
      </body>
    </html>
  )
}
