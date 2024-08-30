import Header from "./header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer.jsx";
import GenericModal from "../common/genericModal/GenericModal.jsx";
import { Toaster } from "sonner";

const Layout = () => {
    return (
        <div id='start'>
            <Header />
            <Outlet />
            <Footer />
            <GenericModal />
            <Toaster />
        </div>
    )
}

export default Layout;

