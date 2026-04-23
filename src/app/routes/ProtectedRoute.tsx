import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/features/auth/auth-context';

export function ProtectedRoute() {
  const { isAuthenticated, authReason } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          reason: authReason ?? 'auth-required',
        }}
      />
    );
  }

  return <Outlet />;
}