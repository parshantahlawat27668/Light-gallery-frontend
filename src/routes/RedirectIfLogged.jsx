import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const RedirectIfLogged = () => {
    const user = useSelector((store)=>store.user.activeUser);
    if(user){
        return <Navigate to="/shop"/>
    }
    return <Navigate to="/auth/login"/>
}

export default RedirectIfLogged
