import {Route, Routes} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import { routes } from "./routes.js";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Admin from "../components/pages/admin/Admin.jsx";
import Login from "../components/pages/login/Login.jsx";
import AdminProducts from "../components/pages/admin/AdminProducts.jsx";
import AdminCategories from "../components/pages/admin/AdminCategories.jsx";
import Inicio from "../components/pages/inicio/Inicio.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={ <Layout /> }>
                {
                    routes.map( ({id, path, Element}) => <Route key={id} path={path} element={ <Element />} />)
                }
                <Route path={"*"} element={<Inicio />}/>
            </Route>
            <Route>
                <Route path="/login" element={<Login />}/>
            </Route>
            <Route element={ <ProtectedRoutes /> }>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<AdminProducts />} />
                    <Route path="categories" element={<AdminCategories />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter