import { Navigate, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const NonAuthorizedRedirection = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({ title: "Login Required",
            text: "You need to login to access this service.",
            icon: "warning", 
            toast: true, 
            timer: 3000, 
            position: 'top-right', 
            timerProgressBar: true, 
            showConfirmButton: false, })
        
        navigate("/login/")

    }, [navigate]);

}

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const response = await api.post("/authenticate/token/refresh/", {
                refresh: refreshToken,
            });
            if(response.status == 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }

        }
        catch(error){
            console.log(error)
            setIsAuthorized(false)

        }

    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000
    
        if(tokenExpiration < now){
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }

    }

    if(isAuthorized == null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <NonAuthorizedRedirection />
}

export default ProtectedRoute