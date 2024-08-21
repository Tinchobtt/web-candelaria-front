import './redes.scss'
import { FaPhoneAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Redes = ({style}) => {
  return (
    <div className='redes' style={style}>
      <a href="tel:+5447428161" target='_blank'><FaPhoneAlt size={'2rem'} color='#fff' /></a>
      <a href="https://www.instagram.com/lacandelaria3express?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank'><FaInstagram size={'2rem'} color='#fff' /></a>
      <a href="https://x.com/LaCandeExpress3" target='_blank'><FaXTwitter size={'2rem'} color='#fff' /></a> 
      <a href="https://www.facebook.com/profile.php?id=100063572230853" target='_blank'><FaFacebook size={'2rem'} color='#fff' /></a>
    </div>
  )
}

export default Redes