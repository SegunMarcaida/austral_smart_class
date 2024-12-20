import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const useProcessedClass = (classId) => {
    const [classData, setProcessedClass] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            axiosInstance.get('/', { params: { class_id: classId } })
                .then((response) => {
                    setProcessedClass(response.data.body);
                    setLoading(false);
                })
                .catch((e) => {
                    console.log(e)
                    setError('Error loading processed class.');
                    setLoading(false);
                });
        }, 2000); // Simulating a 2-second delay
    }, [classId]);

    return { classData: classData?.class, processedClass: classData?.processed_class, error, loading };
};

export default useProcessedClass;