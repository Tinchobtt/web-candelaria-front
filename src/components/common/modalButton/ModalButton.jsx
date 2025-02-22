import Button from '@mui/material/Button';
import {useModal} from "../../../context/ModalContext.jsx";

const ModalButton = ({ name, children, data = null }) => { 
    const { openModal } = useModal()
    
    return (
        <Button
            onClick={() => openModal(name, data)}
            variant="contained" 
            sx={{
                textTransform: 'none', 
                color:'#000', 
                backgroundColor: '#fff', 
                fontSize: '16px', 
                fontWeight: 600,
                '&:hover': {
                    backgroundColor: "#000",
                    color: 'var(--white)'
                }
            }}>
            {children}
        </Button>
    )
};


export default ModalButton