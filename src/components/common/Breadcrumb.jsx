// Breadcrumb.jsx
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Breadcrumb = ({ className }) => {
    const location = useLocation();

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            separator=">"
            sx={{ mb: 5, fontSize: '1.2rem' }}
        >
            <Link color="inherit" href="/" sx={{ fontSize: '1.2rem' }}>
                Home
            </Link>
            {className && (
                <Typography  sx={{ fontSize: '1.2rem' }}>
                    {className.replace('.mp3', '')}
                </Typography>
            )}
        </Breadcrumbs>
    );
};

export default Breadcrumb;