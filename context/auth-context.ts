import { createContext } from 'react'

import { User } from '@/types'

interface AuthContextProps {
  isAuthenticated: boolean
  currentUser: User | null
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  currentUser: null,
})
