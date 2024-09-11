import './header.scss'
import logo from '../../../assets/logo/logo.png'
import { useState } from 'react';
import Redes from "../../common/redes/Redes.jsx";
import ModalButton from "../../common/modalButton/ModalButton.jsx";
import {useLocation} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import useWindowResolution from "../../../hooks/useWindowResolution.jsx";
import { VscGear } from "react-icons/vsc";

const Header = () => {
    const [menuWidgetOpen, setMenuWidgetOpen] = useState(false);//Estado de cambio del icono del Nav
    const resolution = useWindowResolution()

    const loc = useLocation().pathname //path de la page actual

    const handleWidget = ()=>{ //Cambio de aspecto del icono del Nav
        setMenuWidgetOpen(!menuWidgetOpen);
    }
    const closeMenu = () => {
        setMenuWidgetOpen(false);
    };
    
    if(loc === '/login'){
        return (
            <div className='header-container'>
                <header>
                    <div className="logo-container">
                        <HashLink to={'/#start'} onClick={closeMenu}>
                            <img src={logo} alt="logo" className='logo-img'/>
                        </HashLink>
                    </div>
                    <span style={{fontSize: 'clamp(10px, 4vw, 18px)'}}>ADMINISTRADOR</span>
                </header>
            </div>
        )
    }else if(loc === '/admin'){
        return (
            <div className='header-container'>
                <header className='header-admin'>
                    <div className="logo-container">
                        <a href={'/'} onClick={closeMenu}>
                            <img src={logo} alt="logo" className='logo-img'/>
                        </a>
                    </div>
                    <nav className={menuWidgetOpen ? "nav-open navbar-admin": "navbar-admin"}>
                        <ul className="nabvar-list">
                            <li className="nav-item"><HashLink to={'/#start'}
                                                            className={loc === '/' ? 'nav-link active': 'nav-link'}
                                                            onClick={handleWidget}>Ver sitio Web</HashLink></li>
    
                            <li className="nav-item"><HashLink to={'/menu#start'}
                                                            className={loc.startsWith('/menu') ? 'nav-link active': 'nav-link'}
                                                            onClick={handleWidget}>Actualizar contraseña</HashLink></li>
    
                            <li className="nav-item"><HashLink to={'/ecommerce#start'}
                                                            className={loc.startsWith('/ecommerce') ? 'nav-link active': 'nav-link'}
                                                            onClick={handleWidget}>Cerrar sesión</HashLink></li>
                        </ul>
                    </nav>
                    <div className="menu-icon-admin">
                        <span style={{fontSize: 'clamp(10px, 4vw, 18px)'}}>ADMIN</span>
                        <VscGear className='gear' onClick={handleWidget}/>
                    </div>
                </header>
            </div>
        )
    }else{
        return (
            <div className='header-container'>
                <header>
                    <div className="logo-container">
                        <HashLink to={'/#start'} onClick={closeMenu}>
                            <img src={logo} alt="logo" className='logo-img'/>
                        </HashLink>
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
                            <li className="nav-item"><HashLink to={'/#start'}
                                                               className={loc === '/' ? 'nav-link active': 'nav-link'}
                                                               onClick={handleWidget}>Inicio</HashLink></li>
    
                            <li className="nav-item"><HashLink to={'/menu#start'}
                                                               className={loc.startsWith('/menu') ? 'nav-link active': 'nav-link'}
                                                               onClick={handleWidget}>Menú</HashLink></li>
    
                            <li className="nav-item"><HashLink to={'/ecommerce#start'}
                                                               className={loc.startsWith('/ecommerce') ? 'nav-link active': 'nav-link'}
                                                               onClick={handleWidget}>Pedí Ahora</HashLink></li>
    
                            <li className="nav-item"><HashLink to={'/eventos#start'}
                                                               className={loc.startsWith('/eventos') ? 'nav-link active': 'nav-link'}
                                                               onClick={handleWidget}>Eventos</HashLink></li>
    
                            <li className="nav-item"><HashLink to={'/#contacto'}
                                                               className='nav-link'
                                                               onClick={handleWidget}>Contacto</HashLink></li>
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

}

export default Header