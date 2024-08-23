import ModalReserva from "../modalReserva/ModalReserva.jsx";
import {useModal} from "../../../context/ModalContext.jsx";
import {useEffect, useRef} from "react";

const ModalContent = {
    reservaMesa: <ModalReserva name={'Mesa'} />,
    reservaEvento: <ModalReserva name={'Evento'} />,
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
        <div style={styles.overlay}>
            <div ref={modalRef} style={styles.modal}>
                <button onClick={closeModal} style={styles.closeButton}>X</button>
                { ModalContent[modalType] }
            </div>
        </div>
    );
};
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '100000'
    },
    modal: {
        padding: '20px',
        borderRadius: '5px',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '20px',
    },
};
export default GenericModal;