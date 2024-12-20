import './header.scss'
import logo from '../../../assets/logo/logo.png'
import { useState } from 'react';
import Redes from "../../common/redes/Redes.jsx";
import ModalButton from "../../common/modalButton/ModalButton.jsx";
import {useLocation} from "react-router-dom";
import UseWindowResolution from "../../../hooks/UseWindowResolution.jsx";
import { Link } from 'react-router-dom';

const Header = () => {
    const [menuWidgetOpen, setMenuWidgetOpen] = useState(false);//Estado de cambio del icono del Nav
    const resolution = UseWindowResolution()

    const loc = useLocation().pathname //path de la page actual

    const handleWidget = ()=>{ //Cambio de aspecto del icono del Nav
        setMenuWidgetOpen(!menuWidgetOpen);
    }
    const closeMenu = () => {
        setMenuWidgetOpen(false);
    };
    
    return (
        <div className='header-container'>
            <header>
                <div className="logo-container">
                    <Link to={'/'} onClick={closeMenu}>
                        <img src={logo} alt="logo" className='logo-img'/>
                    </Link>
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
                        <li className="nav-item"><Link to={'/'}
                                                            className={loc === '/' ? 'nav-link active': 'nav-link'}
                                                            onClick={handleWidget}>Inicio</Link></li>

                        <li className="nav-item"><Link to={'/menu'}
                                                            className={loc.startsWith('/menu') ? 'nav-link active': 'nav-link'}
                                                            onClick={handleWidget}>Menú</Link></li>

                        <li className="nav-item"><Link to={'/ecommerce'}
                                                            className={loc.startsWith('/ecommerce') ? 'nav-link active': 'nav-link'}
                                                            onClick={handleWidget}>Pedí Ahora</Link></li>

                        <li className="nav-item"><Link to={'/eventos'}
                                                            className={loc.startsWith('/eventos') ? 'nav-link active': 'nav-link'}
                                                            onClick={handleWidget}>Eventos</Link></li>

                        <li className="nav-item"><Link to={'/#contacto'}
                                                            className='nav-link'
                                                            onClick={handleWidget}>Contacto</Link></li>
                    </ul>
                    <div className="nav-contact">
                        <ModalButton name={'modalReservaMesa'}>Reservá</ModalButton>
                        {resolution < 768 && <Redes />}
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header