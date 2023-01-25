import React, {useEffect} from 'react';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import {Plugins} from "@capacitor/core";

export const useSelector = useReduxSelector

const PrivateRoute = ({ component: Component, ...rest }) => {
    //Redux Store
    const authState = useSelector((state:any) => state.auth)

    const AuthCheck = (props:any) => {

        let auth, auth_token

        if (authState.user) {
            auth = authState
            auth_token = authState.auth_token
        } else {
            // Local Storage
            const storage = JSON.parse(localStorage.getItem('persist:storage') as any)
            if (storage) {
                auth = JSON.parse(storage.auth)
                auth_token = auth.auth_token
            }
        }

        if (auth_token && auth && auth.user) {
            return <Component {...props} />
        } else
            return <Redirect to='/auth/login' />
    }

    return (
        <Route
            {...rest}
            render={props => AuthCheck(props)}
        />
    );
};

export default PrivateRoute;
