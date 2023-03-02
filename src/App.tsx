import React, { createContext, useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { useLocalStorage } from 'usehooks-ts';
import PrivateRoute from './PrivateRoute/route';
import AssignmentsView from './components/AssignmentsView';
import Register from './components/Register';
import ErrorView from './ErrorView';
export const ThemeContext = React.createContext({});
function App() {
  const [jwtToken] = useLocalStorage('jwt', '');
  const isLoggedIn = jwtToken;
  const [isDark, setDark] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDark, setDark }}>
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
        <Route path="*" element={<ErrorView />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
