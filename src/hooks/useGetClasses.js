import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance.js";

const useGetClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosInstance.get('/all');
                setClasses(response.data.body);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    return { classes, loading, error };
};

export default useGetClasses;