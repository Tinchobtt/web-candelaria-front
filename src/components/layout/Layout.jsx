import Header from "./header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer.jsx";
import GenericModal from "../common/genericModal/GenericModal.jsx";

const Layout = () => {
    return (
        <div id='start'>
            <Header />
            <Outlet />
            <Footer />
            <GenericModal />
        </div>
    )
}

export default Layout;

