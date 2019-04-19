import React from 'react';
import { LOGIN_COOKIE } from '../actions';

import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [cookies, _] = useCookies([LOGIN_COOKIE]);

    return (<Route {...rest} render={props =>
        cookies.reactDemoLogin
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />);
};

export default PrivateRoute;