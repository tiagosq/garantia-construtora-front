import { useSelector } from 'react-redux';
import './App.css';
import AppRouter from './AppRouter';

function App() {
  const { theme } = useSelector((state) => state.profile);
  
  return (
    <div className={theme}>
      <AppRouter />
    </div>
  )
}

export default App
