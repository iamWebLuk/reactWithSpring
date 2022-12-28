import React from 'react';
import {Navigate} from "react-router-dom";
import {useSessionStorage} from "usehooks-ts";
import {jsx} from "@emotion/react";

interface PrivateRouteProps {
    children: React.PropsWithChildren
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {

    const [jwtToken] = useSessionStorage('jwt', '');

    return jwtToken ?
        <> { children } </>
        :
        <Navigate to='/login' replace />;
};

export default PrivateRoute;