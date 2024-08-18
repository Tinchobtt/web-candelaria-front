import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    let user = 'notAdmin' //Peticion
    return(
        <>
        {
            user === 'admin' ? <Outlet /> : <Navigate to={'/'} />
        }
        </>
    )
}

export default ProtectedRoutes;