import React, { createContext, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { getAuthData } from '../services/authServices';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import { IUserData } from '../types/types';

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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
