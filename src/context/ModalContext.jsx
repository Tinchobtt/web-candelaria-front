import {createContext, useContext, useState} from "react";

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [modalType, setModalType] = useState(null)
    const [modalData, setModalData] = useState(null)

    const openModal = (type, data = null) => {        
        setModalType(type)
        setModalData(data)
    }
    
    const closeModal = () => {
        setModalType(null)
        setModalData(null)
    }

    return (
        <ModalContext.Provider value={{ modalType, modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)
