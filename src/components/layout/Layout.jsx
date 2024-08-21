import Header from "./header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer.jsx";

const Layout = () => {
    return (
        <div id='start'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;

