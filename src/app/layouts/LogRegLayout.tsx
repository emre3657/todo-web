import { Outlet } from 'react-router';
import { LogRegHeader } from '@/components/layout/LogRegHeader';

export function LogRegLayout() {
  return (
    <>
      <LogRegHeader />
      <main className="pt-20 w-full h-full absolute top-1/2 left-1/2 -translate-1/2">
        <Outlet />
      </main>
    </>
  );
}