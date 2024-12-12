'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material'

import darkTheme from '@/app/dark.theme'
import { AuthContext } from '@/context/auth-context'
import { User } from '@/types'

export default function Providers({
  children,
  isAuthenticated,
  currentUser,
}: {
  children: React.ReactNode
  isAuthenticated: boolean
  currentUser: User | null
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={{ isAuthenticated, currentUser }}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
