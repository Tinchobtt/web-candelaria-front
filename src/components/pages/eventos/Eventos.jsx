import ModalButton from "../../common/modalButton/ModalButton.jsx";
import './eventos.scss'
import CardInfo from "../../common/cardInfo/CardInfo.jsx";
import {eventos} from "../../../information/eventos.js";
const Eventos = () => {
    return (
        <main id="main-eventos">
            <section className="event-portada">
                <div className="blackout">
                    <h2>¡Haz de Tu Evento una Experiencia a las Brasas!</h2>
                    <ModalButton name={'modalReservaEvento'}>Reservá ahora!</ModalButton>
                </div>
            </section>
            <section className="events-container">
                {
                    eventos.map( evento => <CardInfo key={evento.id} left={evento.left} content={evento} />)
                }
            </section>
        </main>
    )
}
export default Eventos