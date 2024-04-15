import { useState, useEffect } from 'react';
import { apiClient } from '../utils/axios';

const useAxios = (options: {
    url: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    body?: any;
}) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const { url, method, body = null } = options;
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await apiClient({
                    url: url,
                    method: method,
                    data: body,
                    withCredentials: true
                });
                setData(response.data);
                setError(null);
            } catch (error) {
                setError(error as Error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { data, loading, error };
};

export default useAxios;
