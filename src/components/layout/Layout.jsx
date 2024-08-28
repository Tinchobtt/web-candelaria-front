import Header from "./header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer.jsx";
import GenericModal from "../common/genericModal/GenericModal.jsx";
import WhatsAppIcon from "../common/whatappIcon/WhatsAppIcon.jsx";


const Layout = () => {
    return (
        <div id='start'>
            <Header />
            <Outlet />
            <WhatsAppIcon />
            <Footer />
            <GenericModal />
        </div>
    )
}

export default Layout;

