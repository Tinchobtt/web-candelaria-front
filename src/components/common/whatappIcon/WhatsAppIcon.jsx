import './whatsapp.scss'
import wpp from '../../../assets/imgs/whatsapp.png'

const WhatsAppIcon = () => {
 
  return (
    <div className="whatsapp-icon">
      <a href="https://wa.me/541125372314" target="_blank">
          <img src={wpp} alt="whatsapp" title='WhatsApp'/>
      </a>
    </div>
  );
};

export default WhatsAppIcon;
