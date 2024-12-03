import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Container, CssBaseline } from '@mui/material'

import './globals.css'
import Header from '@/components/header'
import Providers from '@/providers/app-providers'
import { authenticated } from '@/actions/get-current-user'

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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Header />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  )
}
