import './inicio.scss';
import Hero from "../../common/hero/Hero.jsx";
import CardInfo from "../../common/cardInfo/CardInfo.jsx";
import EspecialidadCard from "../../common/especialidadCard/EspecialidadCard.jsx";
import EventosSection from "../../common/eventosSection/EventosSection.jsx";
import Contacto from "../../common/contacto/Contacto.jsx";
import PedidosYa from "../../common/pedidosYa/PedidosYa.jsx";
import Carta from "../../common/carta/Carta.jsx";
import { especialidades } from '../../../information/especialidades.js';

const Inicio = () => {
    return (
        <main id="main-inicio">
            <Hero />
            <section id={"nosotros"} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CardInfo
                    left={true}
                    content={{
                        title: 'Fuego y sabor',
                        text: `Tu destino gourmet en San Isidro, zona norte.<br/>
                               Somos apasionados de la buena carne, expertos en la elaboración de carnes a las leñas y a las brasa.<br/>
                               Nuestra misión es ofrecer una experiencia culinaria unica que resalte los sabores autenticos y tradicionales de la parrilla Argentina.<br/><br/>
                               Te invitamos a disfrutar de un ambiente calido e ideal para compartir momentos en familia y con amigos.`,
                        img: '/images/fire.png'
                    }}
                />
            </section>
            <Carta title={'Descubrí Nuestras Especialidades'}>
                <div id='especialidades' className="especialidades-content">
                    {especialidades.map( (esp, i) => {
                        if(i%2 === 0) return <EspecialidadCard key={esp.id} especialidad={esp} />
                        else return <EspecialidadCard key={esp.id} especialidad={esp} left={true}/>
                    })}
                </div>
            </Carta>
            <EventosSection />
            <Contacto />
            <PedidosYa />
        </main>
    )
}
export default Inicio