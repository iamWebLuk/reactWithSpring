import React, {
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { Alert, Button, TextField } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { Simulate } from 'react-dom/test-utils';
import keyPress = Simulate.keyPress;
import { StyledTextField } from '../AssignmentsView/style';

const Login = () => {
  const [data, setData] = useState<null | any>([]);
  const [header, setHeader] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode] = useLocalStorage('theme', '');
  const [areCredentialsWrong, setAreCredentialsWrong] = useState(false);
  const [storage, setStorage] = useLocalStorage('session', {});
  const [jwt, setJwt] = useLocalStorage('jwt', '');
  const { user, setUser } = useContext(UserContext);

  const handleLogin = () => {
    axios
      .post('api/auth/login/', {
        username: username,
        password: password,
      })
      .then((res) => {
        if ((res.data = null)) return;
        console.log(res);
        setJwt(res.headers.authorization);
        setStorage(JSON.stringify(res.data));
        if (setUser) {
          setUser(res.data);
        }
        console.log(res);
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        setAreCredentialsWrong(true);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    console.log(event.key);
    if (event.key == 'Enter') {
      console.log('test');
      event.preventDefault();
      handleLogin();
    } else {
      console.log('hallo');
    }
  };

  useEffect(() => {
    console.log(header);
    setHeader(data[0]);
  }, [data, setData]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Login into your account</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
        <StyledTextField
          mood={darkMode}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <StyledTextField
          mood={darkMode}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <br />
        <Button
          onClick={handleLogin}
          variant="outlined"
          type="submit"
          onKeyDown={handleKeyPress}
        >
          Login
        </Button>
        or
        <Link
          to={'/register'}
          style={{ color: darkMode === 'dark' ? '#61dafb' : '#001e3c' }}
        >
          Register
        </Link>
        {areCredentialsWrong && (
          <Alert severity="error">Wrong username or password</Alert>
        )}
      </div>
    </div>
  );
};
export default Login;
