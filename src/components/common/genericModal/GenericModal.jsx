import ModalReserva from "../modales/ModalReserva.jsx";
import {useModal} from "../../../context/ModalContext.jsx";
import {useEffect, useRef} from "react";
import './genericModal.scss'
import ModalPedido from "../modales/ModalPedido.jsx";
import ModalProduct from "../modales/ModalProduct.jsx";

const ModalContent = {
    modalReservaMesa: <ModalReserva name={'Mesa'} />,
    modalReservaEvento: <ModalReserva name={'Evento'} />,
    modalPedido: <ModalPedido />,
    modalProducto: (data) => <ModalProduct data={data} />,
};

const GenericModal = () => {
    const { modalType, modalData, closeModal } = useModal()
    const modalRef = useRef(null);
    
    useEffect(() => {
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

    if (!modalType) return null;

    const ModalComponent = ModalContent[modalType];

    return (
        <div className="overlay">
            <div ref={modalRef} className="modal">
                <button onClick={closeModal} className="closeButton">X</button>
                {typeof ModalComponent === 'function' 
                    ? ModalComponent(modalData) 
                    : ModalComponent}
            </div>
        </div>
    );
};

export default GenericModal;
