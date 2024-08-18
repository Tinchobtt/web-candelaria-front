import {Route, Routes} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import { routes } from "./routes.js";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Admin from "../components/pages/admin/Admin.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={ <Layout /> }>
                {
                    routes.map( ({id, path, Element}) => <Route key={id} path={path} element={ <Element />} />)
                }
            </Route>
            <Route element={ <ProtectedRoutes /> }>
                <Route path={'/admin'} element={<Admin />} />
            </Route>
        </Routes>
    )
}

export default AppRouter