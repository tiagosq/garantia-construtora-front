import React, { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { getAuthData } from '../services/authServices';
import cookie from 'react-cookies';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUserData } from '../types/types';
import Swal from 'sweetalert2';

type AppContextType = {
  toggleTheme: () => void;
  toggleMenu: () => void;
  loadUserData: () => void;
  isDark: boolean;
  isOpen: boolean;
  userData: IUserData;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage('isDark', false);
  const [isOpen, setIsOpen] = useLocalStorage('isMenuOpen', false);
  const [userData, setUserData] = useState<IUserData>({} as IUserData);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const publicRoutes = [
      '/',
      '/login',
      '/forgot-password',
      '/reset-password',
      '/reset-password/:hash',
      '/logout'
    ];

    const isPublicRoute = publicRoutes.some(route => {
      const regex = new RegExp(`^${route.replace(':hash', '[^/]+')}$`);
      return regex.test(location.pathname);
    });

    if (!cookie.load('GC_JWT_AUTH') && !isPublicRoute) {
      Swal.fire({
        title: 'Sessão expirada',
        text: 'Sua sessão expirou, por favor faça login novamente.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then(() => {
        navigate('/login');
      });
    }
  });

  const loadUserData = () => {
    getAuthData(cookie.load('GC_JWT_AUTH'))
      .then((res) => {
        setUserData(res);
      })
      .catch(() => {
        navigate('/login');
      });
  };

  return (
    <AppContext.Provider value={{ toggleTheme, isDark, toggleMenu, isOpen, loadUserData, userData }}>
      {children}
    </AppContext.Provider>
  );
};
