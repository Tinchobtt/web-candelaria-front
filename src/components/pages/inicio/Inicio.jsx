import Hero from "../../common/hero/Hero.jsx";
import CardInfo from "../../common/cardInfo/CardInfo.jsx";
import fireImg from '../../../assets/imgs/fire.png'
import Especialidades from "../../common/especialidades/Especialidades.jsx";
import EspecialidadCard from "../../common/especialidadCard/EspecialidadCard.jsx";
import EventosSection from "../../common/eventosSection/EventosSection.jsx";
import Contacto from "../../common/contacto/Contacto.jsx";

const Inicio = () => {
    return (
        <main>
            <Hero />
            <CardInfo
                left={true}
                content={{
                    title: 'Fuego y sabor',
                    text: `Tu destino gourmet en San Isidro, zona norte.<br/>
                           Somos apasionados de la buena carne, expertos en la elaboración de carnes a las leñas y a las brasa.<br/>
                           Nuestra misión es ofrecer una experiencia culinaria unica que resalte los sabores autenticos y tradicionales de la parrilla Argentina.<br/><br/>
                           Te invitamos a disfrutar de un ambiente calido e ideal para compartir momentos en familia y con amigos.`,
                    img: fireImg
                }}
            />
            <Especialidades title={'Descubrí Nuestras Especialidades'}>
                <EspecialidadCard />
                <EspecialidadCard left={true}/>
                <EspecialidadCard />
            </Especialidades>
            <EventosSection />
            <Contacto />
        </main>
    )
}
export default Inicio