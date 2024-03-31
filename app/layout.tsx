import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SearchPage } from "../../../app/(dashboard)/(routes)/search/page"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: 'Milkyway Rides',
  description: 'Think Beyond The Limits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          <SearchPage />
          {children}
        </body>
      </html>
      <SpeedInsights/>
      <Analytics/>
    </ClerkProvider>
  )
}
