import './pedidosYa.scss'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pedidosYA from '../../../assets/imgs/pedidosYa.png'

const PedidosYa = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 3000);  // 1 segundo de animación + 2 segundos quieto = 3000ms

    }, 25000); // Intervalo de 5 segundos
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="slidingComponent"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 1 }}
          style={{ position: 'fixed', left: 0, top: '50%', backgroundColor: '#666', borderRadius: '0 10px 10px 0', boxShadow: '0 4px 5px #000' }}
        >
          <div className='py-container'>
            <a href="https://www.pedidosya.com.ar/restaurantes/san-isidro/la-candelaria-iii-express-1dbb0aa8-b0f5-4790-b163-67e3d0064370-menu?search=La%20candelaria%20" target="_blank">
                <img src={pedidosYA} alt="Pedidos Ya" />
                <span>También en Pedidos Ya</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PedidosYa;
