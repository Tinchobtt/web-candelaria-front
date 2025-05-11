import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const RedirectButton = ({link, variant, children}) => {
    const getStyles = () => {
        if (variant === 'contained') {
            return {
                textTransform: 'none',
                color: '#000',
                backgroundColor: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
                '&:hover': {
                    backgroundColor: '#000',
                    color: '#fff',
                },
            };
        } else if (variant === 'outlined') {
            return {
                color: '#fff',
                backgroundColor: 'transparent',
                border: '1px solid #fff',
                fontSize: '16px',
                fontWeight: 400,
                boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
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
        <Link to={link} target={link.startsWith('https://') ? '_blank' : '_self'}>
            <Button sx={getStyles}>
               {children}
            </Button>
        </Link>
    )
}

export default RedirectButton;