import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Logout(){
    const dispatch=useDispatch()
    const user=useSelector(selectLoggedInUser)
    useEffect(()=>{
        dispatch(signOutAsync())
    },[dispatch])
    return (
        <>
        {!user && <Navigate to="/login" replace={true}></Navigate>}
        </>
    )
}
