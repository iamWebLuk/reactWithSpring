import React, { useContext, useEffect, useMemo } from 'react';
import {
  AppBar,
  Box,
  Button,
  FormGroup,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';

// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MenuItem from '@mui/icons-material/MenuItem';
import { useLocalStorage } from 'usehooks-ts';
import { AccountCircle, MenuBook } from '@mui/icons-material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ColorContext, {
  ColorModeContext,
  useColorMode,
} from '../ThemeContext/ColorContext';
const Navbar = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const abc = useColorMode();
  const { mood, toggleColorMode } = useContext(ColorModeContext);
  const theme = localStorage.getItem('theme');
  useEffect(() => {
    if (theme) theme.replace(/[^"]+/g, '');
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const CurrentThemeIcon = () => {
    return theme === '"dark"' ? (
      <DarkModeOutlinedIcon />
    ) : (
      <LightModeOutlinedIcon />
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: theme === '"dark"' ? '#071b2f' : 'white' }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: theme === '"dark"' ? '#61dafb' : '#071b2f' }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/dashboard" underline="none" sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: theme === '"dark"' ? '#61dafb' : '#001e3c',
              }}
            >
              Back to Dashboard
            </Typography>
          </Link>
          <IconButton
            onClick={toggleColorMode}
            sx={{
              border: `1px solid ${theme === '"dark"' ? '#61dafb' : '#001e3c'}`,
              borderRadius: '5px',
              padding: '5px',
              color: theme === '"dark"' ? '#61dafb' : '#001e3c',
            }}
          >
            <CurrentThemeIcon />
          </IconButton>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: theme === '"dark"' ? '#61dafb' : '#001e3c' }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link href="/profile" underline="none">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
