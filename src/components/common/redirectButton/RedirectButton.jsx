import Button from "@mui/material/Button";
import {HashLink} from "react-router-hash-link";

const RedirectButton = ({link, variant, children}) => {
    const getStyles = () => {
        if (variant === 'contained') {
            return {
                textTransform: 'none',
                color: '#000',
                backgroundColor: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                },
            };
        } else if (variant === 'outlined') {
            return {
                color: '#fff',
                backgroundColor: 'transparent',
                border: '1px solid #fff',
                fontSize: '16px',
                fontWeight: 400,
                width: '180px',
                '&:hover': {
                    backgroundColor: '#000',
                    borderColor: '#000',
                    fontWeight: 500,
                },
                '&:active':{
                    borderColor: 'var(--background)',
                }
            };
        }
    };


    return(
        <HashLink to={link} target={link.startsWith('https://') ? '_blank' : '_self'}>
            <Button sx={getStyles}>
               {children}
            </Button>
        </HashLink>
    )
}

export default RedirectButton;