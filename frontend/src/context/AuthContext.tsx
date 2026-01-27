import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { authClient } from '../lib/auth-client';

type User = typeof authClient.$Infer.Session.user;
type Session = typeof authClient.$Infer.Session.session;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<{ user: User | null; session: Session | null }>({ user: null, session: null });
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    try {
      const result = await authClient.getSession();
      if (result.data) {
        setData(result.data);
      } else {
        setData({ user: null, session: null });
      }
    } catch (error) {
      console.error("Failed to fetch session", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const login = async (email: string) => {
    console.log("Login triggered for", email);
  };

  const logout = async () => {
    await authClient.signOut();
    setData({ user: null, session: null });
  };

  const value = {
    user: data.user,
    session: data.session,
    isLoading,
    login,
    logout,
    refreshSession,
    isAuthenticated: !!data.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
