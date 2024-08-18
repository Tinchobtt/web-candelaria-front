import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    let user = 'admin' //Peticion
    return(
        <>
        {
            user === 'admin' ? <Outlet /> : <Navigate to={'/'} />
        }
        </>
    )
}

export default ProtectedRoutes;