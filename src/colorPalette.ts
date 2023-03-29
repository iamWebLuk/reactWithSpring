import { PaletteMode } from '@mui/material';
import {
  amber,
  blue,
  deepOrange,
  grey,
  purple,
  yellow,
} from '@mui/material/colors';

export const getDesignerTokens = (mood: string) => ({
  palette: {
    mood,
    ...(mood === 'light'
      ? {
          primary: blue,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: {
            main: '#61dafb',
          },
          divider: '#61dafb',
          background: {
            default: '#001e3c',
            paper: '#001e3c',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});
