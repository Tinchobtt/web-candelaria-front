import './footer.scss'
import logo from '../../../assets/logo/logo.png'
import {HashLink} from "react-router-hash-link";
import Redes from "../../common/redes/Redes.jsx";

const Footer = () => {
    return (
        <div className='footer-container'>
            <footer>
                <nav className="navbar-footer">
                    <ul className="navbar-footer-list">
                        <div className="footer-item-container">
                            <li className="nav-footer-item nav-footer-item-title"><HashLink to={'/'} className="nav-footer-link">Inicio</HashLink></li>
                            <li className="nav-footer-item"><HashLink to={'/#nosotros'} className="nav-footer-link">Sobre Nosotros</HashLink></li>
                            <li className="nav-footer-item"><HashLink to={'/#especialidades'} className="nav-footer-link">Especialidades</HashLink></li>
                            <li className="nav-footer-item"><HashLink to={'/#contacto'} className="nav-footer-link">Contacto</HashLink></li>
                        </div>
                        <div className="footer-item-container">
                            <li className="nav-footer-item nav-footer-item-title"><HashLink to={'/'} className="nav-footer-link">Menú</HashLink></li>
                            <li className="nav-footer-item"><HashLink to={'/menu'} className="nav-footer-link">Carta digital</HashLink></li>
                            <li className="nav-footer-item"><HashLink to={'/ecommerce'} className="nav-footer-link">Armar pedido</HashLink></li>
                        </div>
                        <div className="footer-item-container">
                            <li className="nav-footer-item nav-footer-item-title"><HashLink to={'/'} className="nav-footer-link">Eventos</HashLink></li>
                            <li className="nav-footer-item"><HashLink to={'/eventos#start'} className="nav-footer-link">Información de eventos</HashLink></li>
                        </div>
                    </ul>
                </nav>
                <div className="footer-contact">
                    <div className="logo-container">
                        <img src={logo} alt="logo" className='logo-img'/>
                    </div>
                    <Redes style={{width: '100%', marginBottom: '4rem'}}/>
                </div>
                <span>© 2024 La Candelaria III Express. Todos los derechos reservados.</span>
            </footer>
        </div>
    )
}

export default Footer