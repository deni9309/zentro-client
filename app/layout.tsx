import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { CssBaseline } from '@mui/material'

import './globals.css'
import Header from '@/components/header'
import Providers from '@/providers/app-providers'
import { authenticated, getCurrentUser } from '@/actions/auth/get-current-user'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Zentro | Shopping made easy',
  description: 'Online Shopping Platform',
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      sizes: '32x32',
      url: '/favicon.ico',
    },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticated = await authenticated()
  const response = await getCurrentUser()
  const currentUser = 'error' in response ? null : response

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Providers isAuthenticated={isAuthenticated} currentUser={currentUser}>
          <CssBaseline />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
