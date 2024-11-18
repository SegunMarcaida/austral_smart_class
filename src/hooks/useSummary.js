import { useState, useEffect } from 'react';
import axios from 'axios';

const useSummary = () => {
    const [summary, setSummary] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            axios
                .get('/mock/summary')
                .then((response) => {
                    setSummary(response.data.summary);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Error al cargar el resumen.');
                    setLoading(false);
                });
        }, 2000); // Simulating a 2-second delay
    }, []);

    return { summary, error, loading };
};

export default useSummary;