import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        axios.post('api/auth/register', {
            username: username,
            password: password
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <TextField placeholder='username' onChange={e => setUsername(e.target.value)}/>
            <TextField placeholder='password' onChange={e => setPassword(e.target.value)}/>
            <Button onClick={handleRegister}>Register</Button>
        </div>
    );
};

export default Register;