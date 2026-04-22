import { RouterProvider } from 'react-router';
import { router } from '@/app/router';
import { useAuth } from '@/features/auth/auth-context';

export function AppShell() {
  const { isAuthInitialized } = useAuth();

   if (!isAuthInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}