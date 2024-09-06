import { useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { useLocalStorage } from '@uidotdev/usehooks';

function App() {
  const [theme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');

  useEffect(() => {
    const swalStyle = document.querySelector('#swal-theme');
    if (theme === 'dark') {
      swalStyle?.setAttribute('href', 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark/dark.css');
    } else {
      swalStyle?.setAttribute('href', 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-default/default.css');
    }
  }, [theme]);
  
  return (
    <div className={theme}>
      <AppRouter />
    </div>
  )
}

export default App;
