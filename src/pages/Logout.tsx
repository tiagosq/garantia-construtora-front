import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remover o cookie authToken
    cookie.remove('GC_JWT_AUTH', { path: '/' });

    // Redirecionar para a tela de login
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
