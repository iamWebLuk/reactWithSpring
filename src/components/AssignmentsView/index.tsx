import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useFetch, useLocalStorage } from 'usehooks-ts';
import { useGetFetchHook } from '../../Services/useFetchHook';
import { ThemeContext } from '../../App';
import { themes, ThemeContexts } from '../ThemeContext';

type Assignment = {
  id: number;
  status: string;
  githubUrl: string;
  branch: string;
  codeReviewVideoUrl: string;
};

const AssignmentsView = () => {
  const [assignment, setAssignment] = useState<Assignment[] | undefined>();
  const routerId = useParams();
  const [jwtToken] = useLocalStorage('jwt', '');
  const navigate = useNavigate();
  const { isDark, setDark } = useContext(ThemeContext);
  const themes = useContext(ThemeContexts);

  console.log(isDark + ' theme');

  axios.defaults.headers.common['authorization'] = 'Bearer ' + jwtToken;

  useEffect(() => {
    axios
      .get(`/api/assignments/${routerId.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  function updateAssignment(assignmentTask: string, value: string) {
    if (assignment === null || assignment === undefined) {
      return;
    }
    assignment[assignmentTask] = value;
    console.log(assignment);
  }

  function printAssignment() {
    console.log(assignment);
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
    axios
      .put(`/api/assignments/${routerId.id}`, {
        githubUrl: assignment['githubUrl'],
        branch: assignment['branch'],
        status: 'okayyay'
      })
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => console.log(err));
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

  const logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
    console.log(localStorage.getItem('jwt'));
    // axios
    //   .post('/logout')
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  const changeTheme = () => {
    if (localStorage.getItem('darkMode')) {
      localStorage.setItem('darkMode', false);
    } else {
      localStorage.setItem('darkMode', true);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>AssinmentID: {routerId.id}</h1>
      {assignment ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '50px'
          }}
        >
          <div>Status: {assignment['status']}</div>
          <div>Github Url: {assignment['githubUrl']}</div>
          <div>Branch: {assignment['branch']}</div>
        </div>
      ) : (
        <></>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // width: '500px',
          margin: '0 300px',
          textAlign: 'center'
        }}
      >
        GitHub URL:{' '}
        <TextField
          onChange={(e) => updateAssignment('githubUrl', e.target.value)}
        />
        Branch:{' '}
        <TextField
          onChange={(e) => updateAssignment('branch', e.target.value)}
        />
        <Button onClick={handleClick}>Submit</Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Task
        </Button>
        <Button onClick={printAssignment} style={themes}>
          Print Assignmnet
        </Button>
        <Button onClick={logout}>Logout</Button>
        <Button
          onClick={changeTheme}
          style={{ backgroundColor: isDark ? '#ffffff' : '#000000' }}
        >
          Change Theme
        </Button>
        <Button onClick={() => navigate('/dashboard')}>Go Back</Button>
        <div>{JSON.stringify(themes)}</div>
      </div>
    </div>
  );
};

export default AssignmentsView;
