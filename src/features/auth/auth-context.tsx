import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from './api';
import { apiClient } from '@/lib/api-client';
import type { User } from './types';

interface AuthContextValue {
  isAuthInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  authReason: 'auth-required' | 'session-expired' | null;
  setAuthUser: (user: User | null) => void;
  clearAuth: (reason?: 'auth-required' | 'session-expired' | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReason, setAuthReason] = useState<'auth-required' | 'session-expired' | null>(null);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      try {
        const data = await authApi.refresh();

        apiClient.setAccessToken(data.accessToken);
        queryClient.setQueryData(['auth-user'], data.user);

        if (isMounted) {
          setUser(data.user);
        }
      } catch {
        apiClient.setAccessToken(null);
        queryClient.removeQueries({ queryKey: ['auth-user'] });

        if (isMounted) {
          setUser(null);
          setAuthReason(null);
        }
      } finally {
        if (isMounted) {
          setIsAuthInitialized(true);
        }
      }
    };

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, [queryClient]);

  useEffect(() => {
    apiClient.setUnauthorizedHandler(() => {
      apiClient.setAccessToken(null);
      queryClient.removeQueries({ queryKey: ['auth-user'] });
      setUser(null);
      setAuthReason('session-expired');
    });

    return () => {
      apiClient.setUnauthorizedHandler(null);
    };
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
  () => ({
    isAuthInitialized,
    isAuthenticated: Boolean(user),
    user,
    authReason,
    setAuthUser: (nextUser) => {
      setUser(nextUser);
      setAuthReason(null);

      if (nextUser) {
        queryClient.setQueryData(['auth-user'], nextUser);
      } else {
        queryClient.removeQueries({ queryKey: ['auth-user'] });
      }
    },
    clearAuth: (reason = null) => {
      apiClient.setAccessToken(null);
      setUser(null);
      setAuthReason(reason);
      queryClient.clear();
    },
  }), 
  [authReason, isAuthInitialized, queryClient, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}