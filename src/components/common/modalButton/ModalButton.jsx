import Button from '@mui/material/Button';
import { useState } from 'react';
import GenericModal from '../genericModal/GenericModal';

const ModalButton = ({ ModalComponent, children }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
        <Button 
            onClick={handleOpenModal}
            variant="contained" 
            sx={{
                textTransform: 'none', 
                color:'#000', 
                backgroundColor: '#fff', 
                fontSize: '16px', 
                fontWeight: 600,
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                    color: '#333'
                }
            }}>
            {children}
        </Button>
        <GenericModal show={showModal} onClose={handleCloseModal}>
            <ModalComponent />
        </GenericModal>
        </>
      )
};

export default ModalButton