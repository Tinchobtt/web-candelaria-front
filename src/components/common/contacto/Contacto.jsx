import './contacto.scss'
import {FaPhoneAlt} from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import RedirectButton from "../redirectButton/RedirectButton.jsx";

const Contacto = () => {
    return (
        <section id="contacto">
            <div className="contacto-container">
                <div className="contacto-info">
                    <h2>Contactanos</h2>
                    <a href="tel:+5447428161" target='_blank'>
                        <FaPhoneAlt size={'1.7rem'} color='#fff'/>
                        <span>+54 47428161</span>
                    </a>
                    <a href="https://maps.app.goo.gl/mMncURr1F6k9VVm86" target='_blank'>
                        <FaMapMarkerAlt size={'2rem'} color='#fff'/>
                        <span>Av. Centenario 502, San Isidro</span>
                    </a>
                    <div className="contacto-horarios">
                        <div className='contacto-horarios-title'><IoTimeOutline size={'2rem'} color='#fff'/><span>Horarios:</span></div>
                        <div className="schedule">
                            <div className="day">
                                <span>Domingo</span>
                                <span className="time">10:00 - 23:00 hs</span>
                            </div>
                            <div className="day">
                                <span>Lunes</span>
                                <span className="time">10:00 - 23:00 hs</span>
                            </div>
                            <div className="day">
                                <span>Martes</span>
                                <span className="time">10:00 - 23:00 hs</span>
                            </div>
                            <div className="day">
                                <span>Miércoles</span>
                                <span className="time">10:00 - 23:00 hs</span>
                            </div>
                            <div className="day">
                                <span>Jueves</span>
                                <span className="time">10:00 - 23:00 hs</span>
                            </div>
                            <div className="day">
                                <span>Viernes</span>
                                <span className="time">10:00 - 23:30 hs</span>
                            </div>
                            <div className="day">
                                <span>Sábado</span>
                                <span className="time">10:00 - 23:30 hs</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contacto-mapa">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7822.779901137797!2d-58.51568502964293!3d-34.475652343135735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb1d235263295%3A0x3763f9224d0446e0!2sParrilla%20la%20Candelaria%20III!5e0!3m2!1ses-419!2sar!4v1724014141640!5m2!1ses-419!2sar"
                        allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            <RedirectButton link={'https://wa.me/541125372314'} variant={'contained'}>¡Envianos un mensaje!</RedirectButton>
        </section>
    )
}

export default Contacto;