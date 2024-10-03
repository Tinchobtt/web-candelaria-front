import './pedidosYa.scss'
import { useState, useEffect } from 'react';

const PedidosYa = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(true);
  
      setTimeout(() => {
        setIsVisible(false);
      }, 3000)
  
    }, 23000) 
  
    return () => clearInterval(interval);
  }, []);

  return (
      <div className='py-container'>
        <a href="https://www.pedidosya.com.ar/restaurantes/san-isidro/la-candelaria-iii-express-1dbb0aa8-b0f5-4790-b163-67e3d0064370-menu?search=La%20candelaria%20" target="_blank">
            <img src='/images/pedidosYa.png' alt="Pedidos Ya" />
            <div className={isVisible ? 'label-text visible' : 'label-text'}>
              <span>También en Pedidos Ya</span>
            </div>
        </a>
      </div>
  )

}

export default PedidosYa;
