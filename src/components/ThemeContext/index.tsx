import React, { createContext } from 'react';

export const themes = {
  light: {
    backgroundColor: 'white',
    color: 'black'
  },
  dark: {
    backgroundColor: 'black',
    color: 'white'
  }
};

export const ThemeContexts = createContext(themes.light);
const ThemeContext = (children: React.ReactNode) => {
  return <div>{children}</div>;
};

export default ThemeContext;
