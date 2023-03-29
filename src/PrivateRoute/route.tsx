import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { jsx } from '@emotion/react';
import axios from 'axios';

interface PrivateRouteProps {
  children: React.PropsWithChildren;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [jwtToken] = useLocalStorage('jwt', '');
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(null);
  const headers = { Authorization: `Bearer ${jwtToken}` };

  if (jwtToken.length != 0) {
    console.log('in here');
    axios
      .get(`/api/auth/validate?token=${jwtToken}`, { headers })
      .then((isValid) => {
        setIsTokenValid(isValid.data);
        setIsLoading(false);
        console.log(isValid);
        return isValid.data === true ? children : <Navigate to="/login" />;
      })
      .catch((data) => {
        console.log('shit its not');
        console.log(data);
      });
  } else {
    return <Navigate to="/login" />;
  }
  return isLoading ? (
    <div>Loading...</div>
  ) : isTokenValid === true ? (
    children
  ) : (
    <Navigate to="login" />
  );
  // return jwtToken ? <> {children} </> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
