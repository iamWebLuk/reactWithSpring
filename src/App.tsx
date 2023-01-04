import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { useSessionStorage } from "usehooks-ts";
import PrivateRoute from "./PrivateRoute/route";
import AssignmentsView from "./components/AssignmentsView";
import Register from "./components/Register";



function App() {

    const [jwtToken] = useSessionStorage('jwt', '');
    const isLoggedIn = jwtToken;
  return (
      <Routes>
          <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to='/dashboard' />} />
          <Route path='register' element={<Register />} />
          <Route path='/' element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
          }
          />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/assignments/:id' element={
              <PrivateRoute>
                  <AssignmentsView />
              </PrivateRoute>
          }/>
      </Routes>
  );
}

export default App;
