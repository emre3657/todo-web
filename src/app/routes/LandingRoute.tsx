import { Navigate } from 'react-router';
import { useAuth } from '@/features/auth/auth-context';
import { LandingPage } from '@/pages/LandingPage';

export function LandingRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  return <LandingPage />;
}