import React, { createContext } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

type AppContextType = {
  toggleTheme: () => void;
  toggleMenu: () => void;
  isDark: boolean;
  isOpen: boolean;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage('isDark', false);
  const [isOpen, setIsOpen] = useLocalStorage('isMenuOpen', false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppContext.Provider value={{ toggleTheme, isDark, toggleMenu, isOpen }}>
      {children}
    </AppContext.Provider>
  );
};
