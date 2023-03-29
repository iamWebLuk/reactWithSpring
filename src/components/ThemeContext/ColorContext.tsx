import React, { createContext, useContext, useMemo } from 'react';
import { createTheme, CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignerTokens } from '../../colorPalette';
import { useLocalStorage } from 'usehooks-ts';

interface IColorModeContext {
  toggleColorMode: () => void;
  mood: string | null;
}
export const ColorModeContext = createContext<IColorModeContext>({
  toggleColorMode: () => {},
  mood:
    JSON.stringify(localStorage.getItem('theme'))[0] === undefined
      ? 'light'
      : 'dark',
});

interface ColorContextProps {
  children: React.ReactNode;
}
const ColorContext = ({ children }: ColorContextProps) => {
  const [themeStorage, setThemeStorage] = useLocalStorage('theme', '""');
  const mood = themeStorage;
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        // setMood((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        setThemeStorage((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
      mood,
    }),
    [themeStorage],
  );

  const theme = useMemo(() => {
    return createTheme(getDesignerTokens(themeStorage));
  }, [themeStorage]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      {/*<CssBaseline />*/}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);

export default ColorContext;
