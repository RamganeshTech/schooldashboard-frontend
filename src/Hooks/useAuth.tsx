import { useEffect, useState } from 'react';
import axios from 'axios';


import useRefreshToken from './useRefreshToken';



const useAuth = (userType: 'admin' | 'accountant') => {
    const { refreshAccessToken, loading: refreshLoading, error: refreshError } = useRefreshToken();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                let { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_API}/api/${userType}/isAuthUser`, {
                    withCredentials: true
                })

                setIsAuthenticated(data.authenticated)
            }
            catch (error) {

                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        try {
                            const newAccessToken = await refreshAccessToken({ userType });

                            if (newAccessToken) {
                                setIsAuthenticated(true);
                            } else {
                                setIsAuthenticated(false);
                            }
                        } catch (refreshError) {
                            setIsAuthenticated(false);

                        }
                    } else {
                        setIsAuthenticated(false);
                    }
                } else {
                    setIsAuthenticated(false);
                }
            }
        }


        checkAuth()
    }, [])
    return { isAuthenticated, refreshLoading, refreshError };
};

export default useAuth;
