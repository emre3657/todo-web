import { Providers } from '@/app/providers';
import { AppShell } from './app/app-shell';
import './App.css';

function App() {
  return (
    <Providers>
      <AppShell />
    </Providers>
  );
}

export default App
