import {Box, CircularProgress, Typography} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import DefaultButton from "./common/Button.jsx";

const SummaryTab = ({summary, error, loading}) => {
    const theme = useTheme();
    const [showMore, setShowMore] = useState(false);
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress /></Box>;
        if (error) return <div>{error}</div>;

    const handleViewMore = () => {
        setShowMore(!showMore);
    };

    return (
        <Box sx={{ height: '90%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Typography variant={'h2'} sx={{ color: 'text.primary', textAlign: 'left', mt: 2, ml: 2 }}>Resumen</Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, height: '50%', margin: 5 }}>
                <Typography
                    sx={{
                        color: 'text.primary',
                        textAlign: 'justify',
                        fontSize: '1.2em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: showMore ? 'none' : 22,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {summary }
                </Typography>
            </Box>
            <DefaultButton
                onClick={handleViewMore}
                sx={{ color: theme.palette.primary.main, alignSelf: 'center', margin: 2 }}
            >
                {showMore ? 'Ver menos' : 'Ver más'}
            </DefaultButton>
        </Box>
    );
};

export default SummaryTab;