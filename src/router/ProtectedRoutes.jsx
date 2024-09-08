import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    let user = 'admin' 
    return(
        <>
        { user === 'admin' ? <Outlet /> : <Navigate to={'/login'} /> }
        </>
    )
}

export default ProtectedRoutes;