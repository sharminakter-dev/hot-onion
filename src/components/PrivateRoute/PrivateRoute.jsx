import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const isSignedIn = useSelector(state=>state.auth.isSignedIn);
    const location = useLocation()
    return (
        <div>
            {isSignedIn?(
                children
            ):(
                <Navigate to="/auth" state={{from:location}} />
            )  }
        </div>
    );
};

export default PrivateRoute;