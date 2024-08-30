import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

const WhatsAppIcon = () => {
  const loc = useLocation().pathname;
  const colorIcon = loc === '/ecommerce' ? 'black' : loc === '/carrito' ? 'black' : 'white';
    
  return (
    <a href="https://wa.me/541125372314" target="_blank" style={{position: 'fixed', bottom: '2rem', right: '2rem'}}>
      <IoLogoWhatsapp size={'3rem'} color={colorIcon} />
    </a>
  );
};

export default WhatsAppIcon;
