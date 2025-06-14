'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

const ClientThemeProvider: React.FC<ClientThemeProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ClientThemeProvider; 