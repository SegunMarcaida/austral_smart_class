import { useState, useEffect } from 'react';
import axios from 'axios';

const useTranscript = () => {
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            axios
                .get('/mock/transcript')
                .then((response) => {
                    setTranscript(response.data.transcription);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Error al cargar la transcripción.');
                    setLoading(false);
                });
        }, 2000); // Simulating a 2-second delay
    }, []);

    return { transcript, error, loading };
};

export default useTranscript;