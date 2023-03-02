import React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [session] = useLocalStorage('jwt', '');
  console.log('session: ' + session);
  const navigate = useNavigate();
  return (
    <div>
      Home Your token is {session}
      <Button variant="outlined" onClick={() => navigate('dashboard')}>
        Dashboard
      </Button>
      <Button variant="outlined" onClick={() => navigate('login')}>
        Login
      </Button>
    </div>
  );
};

export default Home;
