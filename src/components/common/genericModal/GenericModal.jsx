import ModalReserva from "../modales/ModalReserva.jsx";
import {useModal} from "../../../context/ModalContext.jsx";
import {useEffect, useRef} from "react";
import './genericModal.scss'
import ModalPedido from "../modales/ModalPedido.jsx";

const ModalContent = {
    modalReservaMesa: <ModalReserva name={'Mesa'} />,
    modalReservaEvento: <ModalReserva name={'Evento'} />,
    modalPedido: <ModalPedido />
};

const GenericModal = () => {
    const {modalType, closeModal} = useModal()
    const modalRef = useRef(null);

    useEffect(() => {
        //Verifica clicks fuera del modal para cerrarlo
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeModal]);

    if(!modalType) return null

    return (
        <div className="overlay">
            <div ref={modalRef} className="modal">
                <button onClick={closeModal} className="closeButton">X</button>
                { ModalContent[modalType] }
            </div>
        </div>
    );
};

export default GenericModal;