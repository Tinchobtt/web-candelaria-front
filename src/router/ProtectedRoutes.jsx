import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "../services/authServide"; 

const ProtectedRoutes = () => {
    const [isTokenValid, setIsTokenValid] = useState(null); 

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await validateToken(token);
                if (response.data.isValid) {
                    setIsTokenValid(true); 
                } else {
                    setIsTokenValid(false); 
                }
            } else {
                setIsTokenValid(false); 
            }
        };

        checkToken();
    }, []);

    if (isTokenValid === null) {
        return null; 
    }

    return isTokenValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
