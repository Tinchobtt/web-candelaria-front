import './whatsapp.scss'
import wpp from '../../../assets/imgs/whatsapp.png'

const WhatsAppIcon = () => {
 
  return (
    <a href="https://wa.me/541125372314" className='whatsapp-icon' target="_blank">
        <img src={wpp} alt="whatsapp" title='WhatsApp'/>
    </a>
  );
};

export default WhatsAppIcon;
