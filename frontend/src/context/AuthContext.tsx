import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { User, authClient } from '../lib/auth-client'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(authClient.getToken())
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = async () => {
    try {
      const storedToken = authClient.getToken()
      if (!storedToken) {
        setUser(null)
        setToken(null)
        return
      }
      setToken(storedToken)
      const me = await authClient.getMe()
      setUser(me)
    } catch (error) {
      console.error('Failed to fetch session', error)
      authClient.clearToken()
      setUser(null)
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshSession()
  }, [])

  const login = async (email: string, password: string) => {
    await authClient.login(email, password)
    await refreshSession()
  }

  const logout = async () => {
    await authClient.logout()
    setUser(null)
    setToken(null)
  }

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    refreshSession,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
