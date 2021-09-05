import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute ({component: Component, ...rest}){    
    return(
        <Route
            {...rest}
                render={(props)=>(
                    rest.user ?
                        <Component {...props} /> :
                        <Redirect to="/" />
            )}
        />
    );
}

export default ProtectedRoute;