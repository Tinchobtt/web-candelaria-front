import './footer.scss'
import logo from '../../../assets/logo/logo.png'
import Redes from "../../common/redes/Redes.jsx";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer-container'>
            <footer>
                <nav className="navbar-footer">
                    <ul className="navbar-footer-list">
                        <div className="footer-item-container">
                            <li className="nav-footer-item nav-footer-item-title"><Link to={'/'} className="nav-footer-link">Inicio</Link></li>
                            <li className="nav-footer-item"><Link to={'/#nosotros'} className="nav-footer-link">Sobre Nosotros</Link></li>
                            <li className="nav-footer-item"><Link to={'/#especialidades'} className="nav-footer-link">Especialidades</Link></li>
                            <li className="nav-footer-item"><Link to={'/#contacto'} className="nav-footer-link">Contacto</Link></li>
                        </div>
                        <div className="footer-item-container">
                            <li className="nav-footer-item nav-footer-item-title"><Link to={'/'} className="nav-footer-link">Menú</Link></li>
                            <li className="nav-footer-item"><Link to={'/menu'} className="nav-footer-link">Carta digital</Link></li>
                            <li className="nav-footer-item"><Link to={'/ecommerce'} className="nav-footer-link">Armar pedido</Link></li>
                        </div>
                        <div className="footer-item-container">
                            <li className="nav-footer-item nav-footer-item-title"><Link to={'/'} className="nav-footer-link">Eventos</Link></li>
                            <li className="nav-footer-item"><Link to={'/eventos'} className="nav-footer-link">Información de eventos</Link></li>
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