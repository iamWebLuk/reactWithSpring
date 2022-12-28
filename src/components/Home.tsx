import React from 'react';
import {useSessionStorage} from "usehooks-ts";
import {Button} from "@mui/material";

const Home = () => {
    const [session] = useSessionStorage('jwt', '')
    const changeWindow = (url: string) => {
        window.location.href = url;
    }
    return(
        <div>
            Home
            Your token is {session}
            <Button variant='outlined' onClick={() => changeWindow('dashboard')}>Dashboard</Button>
            <Button variant='outlined' onClick={() => changeWindow('login')}>Login</Button>
        </div>
     )
};

export default Home;