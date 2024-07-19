import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import { logoutRequest } from '../services/authServices';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logoutRequest(cookie.load('GC_JWT_AUTH')).then(() => {
      // Remover o cookie authToken
      cookie.remove('GC_JWT_AUTH', { path: '/' });

      // Redirecionar para a tela de login
      navigate('/login');
    });
  }, [navigate]);

  return null;
};

export default Logout;
