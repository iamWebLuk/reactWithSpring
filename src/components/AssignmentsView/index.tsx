import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useSessionStorage } from 'usehooks-ts';

interface Assignment {
  id: number;
  status: string;
  githubUrl: string;
  branch: string;
  codeReviewVideoUrl: string;
}

const AssignmentsView = () => {
  const [assignment, setAssignment] = useState({} as Assignment);

  const routerId = useParams();
  const [jwtToken] = useSessionStorage('jwt', '');

  console.log(routerId.id);

  axios.defaults.headers.common['authorization'] = 'Bearer ' + jwtToken;

  function updateAssignment(assignmentTask: string[], value: string) {
    if (assignment === null) {
      return;
    }
    assignment[assignmentTask] = value;
    console.log(assignment);
  }

  function printAssignment() {
    console.log(assignment);
    console.log(assignment['githubUrl']);
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
  console.log(assignment);

  return (
    <>
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
      <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
        GitHub URL:{' '}
        <TextField
          onChange={(e) => updateAssignment(['githubUrl'], e.target.value)}
        />
        Branch:{' '}
        <TextField
          onChange={(e) => updateAssignment(['branch'], e.target.value)}
        />
        <Button onClick={handleClick}>Submit</Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Task
        </Button>
        <Button onClick={printAssignment}>Print Assignmnet</Button>
      </div>
    </>
  );
};

export default AssignmentsView;
