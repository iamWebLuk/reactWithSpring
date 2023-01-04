import React, {ReactNode, SetStateAction, useEffect, useState} from 'react';
import axios from "axios";
import {Alert, Button, TextField} from "@mui/material";
import { useSessionStorage } from "usehooks-ts";
import {Link, Navigate} from "react-router-dom";

const Login = () => {

const [data, setData] = useState<null | any>([]);
const [header, setHeader] = useState([]);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('')
const [areCredentialsWrong, setAreCredentialsWrong] = useState(false);
const [session, setSession] = useSessionStorage('session', {});
const [jwt, setJwt] = useSessionStorage('jwt', '')


    const handleLogin = () => {
        axios.post("api/auth/login/", {
            username:username,
            password: password
        })
            .then(res => {
                setJwt(res.headers.authorization)
                setSession(res.data)
                console.log(res)
                window.location.href = '/'
              // return  <Navigate to='/' replace />
            })
            .catch(err => {
                console.log(err)
                setAreCredentialsWrong(true)
            })
    }

    useEffect(() => {
            console.log(header)
            setHeader(data[0]);
    },[data,setData]);

    const getHeader = () => {
        console.log(header)
    }

    return(
        <div style={{textAlign:'center'}}>
            <h1>Employee List</h1>
            This is the User!
            Login
            <div style={{display: 'flex', flexDirection: 'column', width: '500px'}}>
                <TextField placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                <TextField placeholder='Password' onChange={(e) => setPassword(e.target.value)} type='password'/>
            </div>
            <Button onClick={handleLogin} variant='outlined'>Login</Button>
            or
            <Link to={'/register'}>Register</Link>
            {areCredentialsWrong &&
                <Alert severity='error'>Wrong username or password</Alert>
            }

        </div>
    )
}

export default Login;