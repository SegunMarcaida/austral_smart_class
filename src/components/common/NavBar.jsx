import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {makeStyles} from '@mui/styles';
import australLogo from '../../assets/austral_logo.png';

const useStyles = makeStyles(() => ({
    appBar: {
        background: `white !important`,
        // backgroundSize: '400% 400%',
        // animation: `$gradientAnimation 10s ease infinite`,
    },
    logo: {
        height: 100,
        marginRight: 10,
    },
    "@keyframes gradientAnimation": {
        "0%": {backgroundPosition: "0% 50%"},
        "50%": {backgroundPosition: "100% 50%"},
        "100%": {backgroundPosition: "0% 50%"}
    }
}));

const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar} >
            <Toolbar sx={{alignItems: 'flex-end'}}>
                <img src={australLogo} alt="Austral Logo" className={classes.logo}
                     onClick={() => window.location.href = '/'}
                     style={{cursor: 'pointer', width: '400px', height: 'auto'}}/>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;