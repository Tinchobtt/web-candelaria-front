import './header.css'
import logo from '../../../assets/logo/logo.png'
import { useState } from 'react';
import { useEffect } from 'react';
import Redes from "../../common/redes/Redes.jsx";
import ModalButton from "../../common/modalButton/ModalButton.jsx";
import {useLocation} from "react-router-dom";

const Header = () => {
    const [menuWidgetOpen, setMenuWidgetOpen] = useState(false);//Estado de cambio del icono del Nav
    //const loc = useLocation().pathname
    const handleWidget = ()=>{ //Cambio de aspecto del icono del Nav
        setMenuWidgetOpen(!menuWidgetOpen);
    }
    const closeMenu = () => {
        setMenuWidgetOpen(false);
    };

    const [resolution, setResolution] = useState(window.innerWidth);// Estado de resolucion
    useEffect(() => {
        const handleResize = () => {
            setResolution(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    return (
        <header>
            <div className="logo-container">
                <a href=''>
                    <img src={logo} alt="logo" className='logo-img'/>
                </a>
            </div>
            {resolution < 768 &&
                <div className="menu-icon" onClick={handleWidget}>
                    <span className={menuWidgetOpen ? "line line1 activeLine1" : "line line1"}></span>
                    {/*<span className={menuWidgetOpen ? "line line2 activeLine2" : "line line2"}></span>*/}
                    <span className={menuWidgetOpen ? "line line3 activeLine3" : "line line3"}></span>
                </div>
            }
            <nav className={menuWidgetOpen ? "nav-open navbar": "navbar"}>
                <ul className="nabvar-list">
                    <li className="nav-item"><a href="" className="nav-link">Inicio</a></li>
                    <li className="nav-item"><a href="" className="nav-link">Menú</a></li>
                    <li className="nav-item"><a href="" className="nav-link">Pedí Ahora</a></li>
                    <li className="nav-item"><a href="" className="nav-link">Eventos</a></li>
                    <li className="nav-item"><a href="" className="nav-link">Contacto</a></li>
                </ul>
                <div className="nav-contact">
                    <ModalButton>Reservá</ModalButton>
                    {resolution < 768 && <Redes />}
                </div>
            </nav>
        </header>
    )
}

export default Header