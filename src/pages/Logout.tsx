import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { logoutRequest } from '../services/authServices';

const Logout = () => {
  const navigate = useNavigate();

  logoutRequest(cookie.load('GC_JWT_AUTH')).then(() => {
    // Remover o cookie authToken
    cookie.remove('GC_JWT_AUTH', { path: '/' });

    // Redirecionar para a tela de login
    navigate('/login');
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-3xl text-blue-1 font-bold">Saindo...</h1>
    </div>
  )
};

export default Logout;
