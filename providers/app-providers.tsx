'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material'

import darkTheme from '@/app/dark.theme'
import { AuthContext } from '@/context/auth-context'

export default function Providers({
  children,
  authenticated,
}: {
  children: React.ReactNode
  authenticated: boolean
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
