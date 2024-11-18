
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const DefaultButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#fff',
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    textTransform: 'none',
    minHeight: '50px',
    padding: '0 20px',
    '&:hover': {
        backgroundColor: '#f0f0f0',
        borderColor: theme.palette.primary.main,
    },
}));

export default DefaultButton;