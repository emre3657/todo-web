import { Outlet } from 'react-router';
import { AppHeader } from '@/components/layout/AppHeader';

export function AppLayout() {
  return (
    <>
      <AppHeader />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}