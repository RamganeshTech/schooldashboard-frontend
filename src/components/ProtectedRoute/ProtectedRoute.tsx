import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MainLoading from '../MainLoading/MainLoading';
import useRefreshToken from '../../Hooks/useRefreshToken';
import axios from 'axios';
import axiosInstance from '../../Api/apiClient';
import { CustomAxiosRequestConfig } from '../../Types/types';

interface ProtectedRouteProps {
  element: React.ReactNode;
  userType: 'admin' | 'accountant'; 
}



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, userType }) => {

  const { refreshAccessToken} = useRefreshToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const checkAuth = async () => {
        try {
           let {data} =  await axiosInstance.get(`/api/${userType}/isAuthUser`, {
            withCredentials: true,
            userType
           } as CustomAxiosRequestConfig<void>)
            setIsAuthenticated(data.authenticated);
        }  catch (error) {
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
        } finally {
            setLoading(false);
        }
    };

    checkAuth();
}, [userType, location.pathname]);

if (loading || isAuthenticated === null) {
  return <MainLoading />; 
}

  if(isAuthenticated){    
   return <>{element}</>
  }
  else{
    if(userType==="admin"){
      return <Navigate to="/adminlogin" />
    }
    else{
      return <Navigate to="/accountantlogin" />

    }
  }
};


export default ProtectedRoute;