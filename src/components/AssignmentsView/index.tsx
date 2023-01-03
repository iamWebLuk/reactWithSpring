import React, {useEffect, useState} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import axios from "axios";
import {useSessionStorage} from "usehooks-ts";


interface Assignment {
    id: number,
    status: string,
    githubUrl?: string,
    branch?: string,
    codeReviewVideoUrl?: string,
    user?: []
}

const AssignmentsView = () => {


    const [assignment, setAssignment] = useState<Assignment[]>([]);
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
                    console.log('12')
                }
            })
            .catch(err => console.log(err))
    }, [])


    // console.log("###")
    // console.log(assignment.id)
    // console.log("###")

    const abc = () => {
        console.log(assignment)
    }
    return (
        <>
            {/*<h1>AssinmentID: {routerId.id}</h1>*/}
            Hello world hi
            {assignment ? <div>{assignment.status}</div>
                 : <></>}
            <Button onClick={abc}>SSSSA</Button>
        </>
    );
};

export default AssignmentsView;