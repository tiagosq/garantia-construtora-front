import { useContext, useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { AppContext } from './context/AppContext';

function App() {
  const { isDark } = useContext(AppContext);

  useEffect(() => {
    const swalStyle = document.querySelector('#swal-theme');
    if (isDark) {
      swalStyle?.setAttribute('href', 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark/dark.css');
    } else {
      swalStyle?.setAttribute('href', 'https://cdn.jsdelivr.net/npm/@sweetalert2/theme-default/default.css');
    }
  }, [isDark]);
  
  return (
    <div className={isDark ? 'dark' : 'light'}>
      <AppRouter />
    </div>
  )
}

export default App;
