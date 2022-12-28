import React from 'react';
import {Button} from "@mui/material";
import axios from "axios";
import {useSessionStorage} from "usehooks-ts";

const Dashboard = () => {
const [jwtToken] = useSessionStorage('jwt', '')

    axios.defaults.headers.common['authorization'] = "Bearer " + jwtToken;


const handleSubmit = () => {
    console.log(jwtToken)
axios.post('/api/assignments', {
        'contentType': 'application/json',
})
    .then(res => {

    })
    .catch(err => {
        console.log(err.response.status)
        if (err.response.status === 401) {
            console.log("unauthorisiert")
        }
    })
}

    return(
        <div>
            Dashboard
            <Button variant="contained" onClick={handleSubmit}>Submit new Assignment</Button>
        </div>
     )
};

export default Dashboard;