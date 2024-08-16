import Button from '@mui/material/Button';

const PrimaryButton = ({text, link}) => {
  return (
    <Button 
        variant="contained" 
        href={link}
        target="_blank"
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
        {text}
    </Button>
  )
}

export default PrimaryButton