import './eventosSection.scss'
import ModalButton from "../modalButton/ModalButton.jsx";

const EventosSection = () => {
    return (
        <section id="eventosSection">
            <div className="blackout">
                <h4>La Candelaria III Express</h4>
                <h2>RESERVÁ TU EVENTO</h2>
                <ModalButton name={'modalReservaEvento'}>¡Reservá ahora!</ModalButton>
            </div>
        </section>
    )
}

export default EventosSection;