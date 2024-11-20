import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {AudioProvider} from './context/AudioContext.jsx';
//
// const mock = new MockAdapter(axios);
//
// mock.onGet('/mock/transcript').reply(200, {
//     transcription: transcript,
// });
//
// mock.onGet('/mock/summary').reply(200, {
//     summary: 'Este es el resumen de la clase.',
// });
//
// mock.onGet('/mock/all').reply(200, mockClasses);
//
// mock.onGet('/mock/processed_class').reply(200, {
//     id: '12345',
//     class_id: '67890',
//     audio_text: transcript,
//     summary_text: transcript,
//     embeddings: [0.1, 0.2, 0.3, 0.4, 0.5],
// });

const theme = createTheme({
    palette: {
        primary: {
            main: '#2C308D',
        },
        secondary: {
            main: '#6C7BFA',
        },
    },
    typography: {
        allVariants: {
            color: '#939393',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider theme={theme}>
        <AudioProvider>
            <App/>
        </AudioProvider>
    </ThemeProvider>
);