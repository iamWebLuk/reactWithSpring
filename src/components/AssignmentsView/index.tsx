import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, useTheme } from '@mui/material';
import axios from 'axios';
import { useLocalStorage } from 'usehooks-ts';
// import { ThemeContext } from '../../App';
// import { themes } from '../ThemeContext';
import { UserContext } from '../../App';
import { useColorMode } from '../ThemeContext/ColorContext';
import { StyledTextField } from './style';
import { Assignment } from '../../globalTypes/globalTypes';

// type Assignment = {
//   [key: string]: number | string;
//   id: number;
//   status: string;
//   githubUrl: string;
//   branch: string;
//   codeReviewVideoUrl: string;
// };

const AssignmentsView = () => {
  const [assignment, setAssignment] = useState<Assignment>();
  const routerId = useParams();
  const [jwtToken] = useLocalStorage('jwt', '');
  const navigate = useNavigate();
  const [darkMode] = useLocalStorage('theme', '');
  const { user } = useContext(UserContext);
  const { mood } = useColorMode();
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  axios.defaults.headers.common['authorization'] = 'Bearer ' + jwtToken;

  useEffect(() => {
    axios
      .get(`/api/assignments/${routerId.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  function updateAssignment(assignmentTask: string, value: string | number) {
    if (assignment === null || assignment === undefined) {
      return;
    }
    assignment[assignmentTask] = value;
  }

  useEffect(() => {
    axios
      .get(`/api/assignments/${routerId.id}`)
      .then((res) => {
        if (res.status === 200) {
          setAssignment(res.data);
          console.log(assignment);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    if (assignment) {
      axios
        .put(`/api/assignments/${routerId.id}`, {
          githubUrl: assignment['githubUrl'],
          branch: assignment['branch'],
          status: 'okayyay',
        })
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = () => {
    axios
      .delete(`/api/assignments/${routerId.id}`)
      .then((res) => {
        console.log(res);
        window.location.href = '/dashboard';
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>AssinmentID: {routerId.id}</h1>
      {assignment && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '50px',
          }}
        >
          <div>Status: {assignment['status']}</div>
          <div>Github Url: {assignment['githubUrl']}</div>
          <div>Branch: {assignment['branch']}</div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 300px',
          textAlign: 'center',
        }}
      >
        <StyledTextField mood={darkMode} />
        <TextField sx={{ borderColor: theme.palette.primary.main }} />
        GitHub URL:{' '}
        <TextField
          onChange={(e) => updateAssignment('githubUrl', e.target.value)}
          color="error"
          ref={inputRef}
          variant="outlined"
          style={{ borderColor: 'red' }}
          fullWidth
        />
        <StyledTextField mood={darkMode} />
        Branch:{' '}
        <TextField
          sx={{
            fieldset: { borderColor: darkMode == 'dark' && 'white' },
          }}
          onChange={(e) => updateAssignment('branch', e.target.value)}
        />
        <Button onClick={handleClick}>Submit</Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Task
        </Button>
        <Button style={{ backgroundColor: darkMode ? '#ffffff' : '#000000' }}>
          Change Theme
        </Button>
        <Button onClick={() => navigate('/dashboard')}>Go Back</Button>
      </div>
    </div>
  );
};

export default AssignmentsView;
