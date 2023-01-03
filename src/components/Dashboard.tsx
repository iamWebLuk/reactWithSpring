import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {useSessionStorage} from "usehooks-ts";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [jwtToken] = useSessionStorage('jwt', '')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cohortStartDate, setCohortStartDate] = useState('');
    const [assignment, setAssignment] = useState([]);

    axios.defaults.headers.common['authorization'] = "Bearer " + jwtToken;

    useEffect(() => {
        axios.get('/api/assignments')
            .then((res) => {
                if (res.status === 200) {
                    // console.log(res);
                    setAssignment(res.data)
                    console.log(assignment)
                }
            })
            // .then((assignments) => {
            //     // @ts-ignore
            //     if (assignments) {
            //         setAssignment(assignments)
            //     }
            // })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = () => {
        console.log(jwtToken)
        axios.post('/api/assignments', {
            'contentType': 'application/json',
        })
            .then(res => {
                console.log(res)
                window.location.href = `AssignmentsView/${res.data.id}`
            })
            .catch(err => {
                console.log(err.response.status)
                if (err.response.status === 401) {
                    console.log("unauthorisiert")
                }
            })
    }

    const handleRegister = () => {
        console.log(`${username} = username, ${password} = password, ${cohortStartDate} = cohortStartDate`)
        axios.post('/api/register', {
            username, password, cohortStartDate
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }

    return (
        <div>
            Dashboard
            <Button variant="contained" onClick={handleSubmit}>Submit new Assignment</Button>

            <TextField placeholder='username' onChange={e => setUsername(e.target.value)}/>
            <TextField placeholder='password' onChange={e => setPassword(e.target.value)}/>
            <TextField placeholder='password' onChange={e => setCohortStartDate(e.target.value)}/>
            <Button onClick={handleRegister}>Register</Button>
            <div>
                {assignment ? assignment.map((task: any) => <li><Link to={`/assignments/${task.id}`}>Assignment ID: {task.id}</Link></li>) : <>haii</>}
            </div>
            <Button onClick={() => console.log(assignment)}>click me</Button>
        </div>
    )
};

export default Dashboard;