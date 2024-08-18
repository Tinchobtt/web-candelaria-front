import Header from "./header/Header.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div id='start'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;

