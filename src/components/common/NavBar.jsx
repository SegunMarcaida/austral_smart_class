import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import australLogo from '../../assets/austral_logo.png';

const useStyles = makeStyles(()  => ({
    appBar: {
        backgroundColor: '#eeeeee !important', // Blue color
    },
    logo: {
        height: 100,
        marginRight: 10,
    },
}));

const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar sx={{alignItems:'flex-end'}}>
                <img src={australLogo} alt="Austral Logo" className={classes.logo}  onClick={() => window.location.href = '/'}/>
                <Typography variant={'h4'} sx={{ color: 'text.primary' }} mb={'20px'}>
                    Aula Smart
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;