import './header.scss'
import logo from '../../../assets/logo/logo.png'
import { useEffect, useRef, useState } from 'react';
import {useLocation} from "react-router-dom";
import { VscGear } from "react-icons/vsc";
import { logout, updatePassword } from '../../../services/authServide.js';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminHeader = () => {
    const [menuWidgetOpen, setMenuWidgetOpen] = useState(false);//Estado de cambio del icono del Nav
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const loc = useLocation().pathname //path de la page actual

    const handleWidget = () =>{ //Cambio de aspecto del icono del Nav
        setMenuWidgetOpen(!menuWidgetOpen);
    }
    const closeMenu = () => {
        setMenuWidgetOpen(false);
    };

    const handleUpdatePassword = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Actualizar Contraseña',
            html: `
                <input id="username" class="swal2-input" placeholder="Usuario">
                <input type="password" id="oldPassword" class="swal2-input" placeholder="Contraseña Vieja">
                <input type="password" id="newPassword" class="swal2-input" placeholder="Contraseña Nueva">
            `,
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            confirmButtonText: "Actualizar",
            confirmButtonColor: '#1975d1',
            preConfirm: () => {
                const username = document.getElementById('username').value;
                const oldPassword = document.getElementById('oldPassword').value;
                const newPassword = document.getElementById('newPassword').value;
    
                if (!username || !oldPassword || !newPassword) {
                    Swal.showValidationMessage('Por favor, completa todos los campos');
                    return false;
                }
                return { username, oldPassword, newPassword };
            },
        });
    
        if (formValues) {
            try {
                const response = await updatePassword(formValues);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Contraseña actualizada correctamente',
                        icon: 'success',
                        confirmButtonText: "Cerrar", 
                        confirmButtonColor: '#1975d1', 
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al actualizar la contraseña',
                        icon: 'error',
                        confirmButtonText: "Cerrar", 
                        confirmButtonColor: '#1975d1', 
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if(loc === '/login'){
        return (
            <div className='header-container'>
                <header>
                    <div className="logo-container">
                        <Link to={'/'} onClick={closeMenu}>
                            <img src={logo} alt="logo" className='logo-img'/>
                        </Link>
                    </div>
                    <span style={{fontSize: 'clamp(10px, 4vw, 18px)'}}>ADMINISTRADOR</span>
                </header>
            </div>
        )
    }else if(loc === '/admin' || loc === '/admin/categories'){
        return (
            <div className='header-container'>
                <header className='header-admin'>
                    <div className="logo-container">
                        <a href={'/'} onClick={closeMenu}>
                            <img src={logo} alt="logo" className='logo-img'/>
                        </a>
                    </div>
                    <nav ref={menuRef} className={menuWidgetOpen ? "nav-open navbar-admin": "navbar-admin"}>
                        <ul className="nabvar-list">
                            <li className="nav-item">
                                <Link to={'/admin'} className={loc.endsWith('/admin') ? 'nav-link active': 'nav-link'} onClick={handleWidget}>Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/admin/categories'} className={loc.endsWith('/categories') ? 'nav-link active': 'nav-link'} onClick={handleWidget}>Categorias</Link>
                            </li>
                            <span className='space'></span>
                            <li className="nav-item">
                                <a href={'/'} className={loc === '/' ? 'nav-link active': 'nav-link'} onClick={handleWidget}>Ver sitio Web</a>
                            </li>
                            <li className="nav-item">
                                <button className='nav-link' onClick={handleUpdatePassword}>Actualizar contraseña</button>
                            </li>
                            <li className="nav-item">
                                <button className={'nav-link'} onClick={logout}>Cerrar sesión</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="menu-icon-admin">
                        <span style={{fontSize: 'clamp(10px, 4vw, 18px)'}}>ADMIN</span>
                        <div className="gear" ref={buttonRef}>
                            <VscGear onClick={handleWidget} />
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default AdminHeader