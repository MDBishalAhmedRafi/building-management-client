import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Main_Layout_Pages/Loading/Loading';

const PrivateRoute = ({children}) => {
                const {user, loading} = use(AuthContext)
                const location = useLocation();
                // console.log(location)
                if(loading) { 
                                return <Loading></Loading>;
                }
                if(user) { 
                                
                                return children;
                }
                return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;