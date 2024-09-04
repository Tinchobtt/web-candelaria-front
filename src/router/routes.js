import Inicio from '../components/pages/inicio/Inicio.jsx'
import Menu from '../components/pages/menu/Menu.jsx'
import Eventos from "../components/pages/eventos/Eventos.jsx";
import Ecommerce from "../components/pages/ecommerce/Ecommerce.jsx";
import Carrito from "../components/pages/carrito/Carrito.jsx";
import Login from "../components/pages/login/Login.jsx";

export const routes = [
    {
        id: 'inicio',
        path: '/',
        Element: Inicio,
    },
    {
        id: 'menu',
        path: '/menu',
        Element: Menu,
    },
    {
        id: 'eventos',
        path: '/eventos',
        Element: Eventos,
    },
    {
        id: 'ecommerce',
        path: '/ecommerce',
        Element: Ecommerce,
    },
    {
        id: 'carrito',
        path: '/carrito',
        Element: Carrito,
    }
]