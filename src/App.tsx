import './App.css';
import AppRouter from './AppRouter';
import { useLocalStorage } from '@uidotdev/usehooks';

function App() {
  const [theme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');
  
  return (
    <div className={theme}>
      <AppRouter />
    </div>
  )
}

export default App
