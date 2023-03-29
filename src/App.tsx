import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import './App.css';
import Login from './components/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home';
import { useLocalStorage } from 'usehooks-ts';
import PrivateRoute from './PrivateRoute/route';
import AssignmentsView from './components/AssignmentsView';
import Register from './components/Register';
import ErrorView from './ErrorView';
import ColorContext from './components/ThemeContext/ColorContext';
import { CssBaseline } from '@mui/material';
import Profile from './components/Profile';
import { User } from './globalTypes/globalTypes';
// export const ThemeContext = React.createContext({});

// interface User {
//   id: number;
//   cohortStartDate: string;
//   username: string;
//
//   authorities: [];
//   enabled: boolean;
//   credentialsNonExpired: boolean;
//   accountNonExpired: boolean;
//   accountNonLocked: boolean;
// }
export const UserContext = createContext<{
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined;
}>({ user: undefined, setUser: undefined });

function App() {
  const [jwtToken] = useLocalStorage('jwt', '');
  const [user, setUser] = useState<User>();
  const isLoggedIn = jwtToken;

  // @ts-ignore
  return (
    <ColorContext>
      <CssBaseline />
      <UserContext.Provider value={{ user, setUser }}>
        {/*<div style={{ backgroundColor: darkMode ? '#35363a' : '#ffa500' }}>*/}
        <div>
          <Routes>
            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route path="register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/assignments/:id"
              element={
                <PrivateRoute>
                  <AssignmentsView />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </div>
        {/*</ThemeContexts.Provider>*/}
      </UserContext.Provider>
      {/*</ThemeProvider>*/}
    </ColorContext>
  );
}

export default App;
