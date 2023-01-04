import React, {useEffect, useState} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useSessionStorage} from "usehooks-ts";


const AssignmentsView = () => {


    const [assignment, setAssignment] = useState(null);
    const [gitHubURL, setGitHubURL] = useState('')
    const [branch, setBranch] = useState('')

    const routerId = useParams();
    const [jwtToken] = useSessionStorage('jwt', '')

    console.log(routerId.id)


    axios.defaults.headers.common['authorization'] = "Bearer " + jwtToken;

    useEffect(() => {
        axios.get(`/api/assignments/${routerId.id}`)
            .then((res) => {
                if (res.status === 200) {
                    // console.log(res);
                    setAssignment(res.data)
                    console.log(assignment)
                }
            })
            .catch(err => console.log(err))
    }, [])


    const handleClick = () => {
        axios.put(`/api/assignments/${routerId.id}`, {
            githubUrl: gitHubURL,
            branch: branch,
            status: "okay"
        })
            .then(res => {
                console.log(res)
                location.reload();
            })
            .catch(err => console.log(err))
    }

    const handleDelete = () => {
        axios.delete(`/api/assignments/${routerId.id}`)
            .then(res => {
                console.log(res)
                window.location.href='/dashboard'
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>AssinmentID: {routerId.id}</h1>
            Hello world hi
            {assignment ?
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                    {assignment["status"]}
                    </div>
                    <div>
                        {assignment["githubUrl"]}
                    </div>
                    <div>
                        {assignment["branch"]}
                    </div>
                </div>
                 : <></>}
            <div style={{display: 'flex', flexDirection: 'column', width: '500px'}}>
            GitHub URL:  <TextField onChange={e => setGitHubURL(e.target.value)} />
            Branch: <TextField onChange={e => setBranch(e.target.value)}/>
            <Button onClick={handleClick}>Submit</Button>
                <Button variant='outlined' color='error' onClick={handleDelete}>Delete Task</Button>
            </div>
        </>
    );
};

export default AssignmentsView;