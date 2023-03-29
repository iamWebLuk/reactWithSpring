import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useLocalStorage } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import { StyledTextField, StyledButton, ComponentDiv } from './styles';
import { UserContext } from '../../App';
import { useColorMode } from '../ThemeContext/ColorContext';
import { Assignment } from '../../globalTypes/globalTypes';

const Dashboard = () => {
  const [jwtToken] = useLocalStorage('jwt', '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cohortStartDate, setCohortStartDate] = useState('');
  const [assignment, setAssignment] = useState([]);
  const [darkMode] = useLocalStorage('darkMode', '');
  const { user } = useContext(UserContext);
  // const { isDark } = useContext(ThemeContext);
  const abc = useColorMode();
  const { mood } = useColorMode();
  const theme = useTheme();

  axios.defaults.headers.common['authorization'] = 'Bearer ' + jwtToken;

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/assignments')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setAssignment(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    console.log(jwtToken);
    axios
      .post('/api/assignments', {
        contentType: 'application/json',
      })
      .then((res) => {
        console.log(res);
        window.location.href = `assignments/${res.data.id}`;
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          console.log('unauthorisiert');
        }
      });
  };

  const handleRegister = () => {
    console.log(
      `${username} = username, ${password} = password, ${cohortStartDate} = cohortStartDate`,
    );
    axios
      .post('/api/auth/logout', {
        username,
        password,
        cohortStartDate,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  console.log(user);
  return (
    <ComponentDiv>
      Dashboard
      <StyledButton>hallo</StyledButton>
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ backgroundColor: mood === 'dark' ? 'blue' : 'green' }}
      >
        Submit new Assignment
      </Button>
      <TextField
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledTextField
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        placeholder="password"
        onChange={(e) => setCohortStartDate(e.target.value)}
        // style={themes}
      />
      <Button onClick={handleRegister}>Register</Button>
      <Box>
        <Grid container spacing={2} style={{ justifyContent: 'center' }}>
          {assignment ? (
            assignment.map((task: Assignment) => (
              <Grid item xs={8} sm={5} md={3}>
                <Paper>
                  <Card
                    style={{
                      backgroundColor: 'white',
                      height: '200px',
                      marginRight: '20px',
                    }}
                  >
                    <CardContent key={task.id}>
                      <Typography>Assigment ID: {task.id}</Typography>
                      <Link to={`/assignments/${task.id}`}>
                        Assignment ID: {task.id}
                      </Link>
                      <div
                        style={{
                          color: 'black',
                        }}
                      >
                        test Branch: {task.branch}
                        <br />
                        Github: {task.githubUrl}
                        <br />
                        Status: {task.status}
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => {
                          window.location.href = `/assignments/${task.id}`;
                        }}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            ))
          ) : (
            <>haii</>
          )}
        </Grid>
      </Box>
    </ComponentDiv>
  );
};

export default Dashboard;
