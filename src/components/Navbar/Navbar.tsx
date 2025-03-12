import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { SchoolContext } from '../../Context/SchoolContextProvider';
import { useContext, useEffect, useState } from 'react';

import style from './navbar.module.css'

import { Button, IconButton } from '@mui/material';
import axios from 'axios';

import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';

import EventIcon from '@mui/icons-material/Event';

import axiosInstance from '../../Api/apiClient';
import { CustomAxiosRequestConfig } from '../../Types/types';

const Navbar:React.FC = () => {

  const context = useContext(SchoolContext);

  if (!context) return;


  const { adminPage, setAdminPage, isNotificationpage, setIsNotificationPage, isAccountantLoginCreationPage } = context

  const [isReportPage, setIsReportPage] = useState<boolean>(false)

  const [hasReportAccess, setHasReportAccess] = useState<boolean>(false);


  let location = useLocation()

  let navigate = useNavigate()

  useEffect(() => {
    if (location.pathname.includes("notification")) {
      setIsNotificationPage(true)
    } else if (location.pathname.includes("Accountantlogincredentials")) {
      setIsNotificationPage(false)
    }
    else {
      setIsNotificationPage(false)
    }

    if (!location.pathname.includes("reports")) {
      setIsReportPage(true)
    }
    else {
      setIsReportPage(false)
    }


    if (location.pathname.includes("admin")) {
      setAdminPage(true)
    }
    
  }, [location.pathname])


  const handleNotificationButton = () => {
    if (!isNotificationpage) {
      navigate('notification')
    }
    else {
      navigate('')
    }
  }

  const handleAccountantCreationButton = () => {
    if (!isAccountantLoginCreationPage) {
      navigate('Accountantlogincredentials')
    }
    else {
      navigate('')
    }
  }

  const handleReports = () => {
    if (!isReportPage) {
      navigate("../admin")
    }
    else {
      navigate('/admin/reports')

    }
  }

  const handleAccountantReportsView = () => {
    if (!isReportPage) {
      navigate("../accountant")
    }
    else {
      navigate('/accountant/reports')

    }
  }


  const handleAdminLogout = async () => {
    try {

      const { data } = await axiosInstance.post<{ message: string; ok: boolean }>(`/api/admin/adminlogout`, {}, {
        userType: "admin"
      } as CustomAxiosRequestConfig<void>
      );

      if (data.ok) {
        navigate('/');
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message)
      }
      else if (err instanceof Error) {
        console.log("Logout failed:", err.message);
      }
      else {
        console.log("something went wrong")
      }
    }
  };


  const handleAccountantLogout = async () => {
    try {
      const { data } = await axiosInstance.post<{ message: string; ok: boolean }>(`/api/accountant/accountantlogout`, {}, {
        userType: "accountant"
      } as CustomAxiosRequestConfig<void>
      );


      if (data.ok) {
        navigate('/');
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message)
      }
      else if (err instanceof Error) {
        console.log("Logout failed:", err.message);
      }
      else {
        console.log("something went wrong")
      }
    }
  }

  useEffect(() => {
    const fetchAccountantPermission = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/accountant/getPermissionStatus`, {
          userType: "accountant"
        } as CustomAxiosRequestConfig<void>);

       setHasReportAccess(data.permissionStatus);
      } catch (error) {
        console.log("Failed to fetch permission status", error);
      }
    };

    if (location.pathname.includes("accountant")) {
      fetchAccountantPermission();
    }
  }, []);

  return (
    <nav className={`${style.navbarDiv} shadow-md relative z-1`}>
      <div className={`${style.innerDiv}`}>

        <h1 className={`${style.navbarheading} text-4xl font-medium`}>{adminPage ? "Admin panel" : "Accountant Panel"}</h1>

        {adminPage ? (
          <div className={`${style.btnContainer}`}>

            <IconButton
              onClick={handleReports}
              sx={{
                backgroundColor: "var(--icons-outline-color)",
                color: "white",
                "&:hover": {
                  background: "#9fa3cb"
                }
              }}>
              {isReportPage ? <EventIcon /> : <HomeIcon />}
            </IconButton>

            <IconButton
              onClick={handleAccountantCreationButton}
              sx={{
                backgroundColor: "var(--icons-outline-color)",
                color: "white",
                "&:hover": {
                  background: "#9fa3cb"
                }
              }}>
              {isAccountantLoginCreationPage ? <HomeIcon /> : <AddCardIcon />}
            </IconButton>

            <IconButton
              onClick={handleNotificationButton}
              sx={{
                backgroundColor: "var(--icons-outline-color)",
                color: "white",
                "&:hover": {
                  background: "#9fa3cb"
                }
              }}>
              {isNotificationpage ? <HomeIcon /> : <NotificationsIcon />}
            </IconButton>


            <Button variant='contained'
              onClick={handleAdminLogout}
              sx={{
                backgroundColor: "#ee1919",
                color: "white",
                height: "70%",
                width: "10% ",
                fontWeight: 600,
                fontSize: "16px",
                padding: "10px 65px !important"

              }}>Logout</Button>
          </div>
        ) :

          <div className={`${style.accountant_btn_container}`}>
            {hasReportAccess && (
              <IconButton
                onClick={handleAccountantReportsView}
                sx={{
                  backgroundColor: "var(--icons-outline-color)",
                  color: "white",
                  "&:hover": {
                    background: "#9fa3cb"
                  }
                }}>
                {isReportPage ? <EventIcon /> : <HomeIcon />}
              </IconButton>
            )}

            <Button variant='contained'
              onClick={handleAccountantLogout}
              sx={{
                backgroundColor: "#ee1919",
                color: "white",
                height: "70%",
                width: "10% ",
                fontWeight: 600,
                fontSize: "16px",
                padding: "10px 65px !important"

              }}>Logout</Button>
          </div>

        }


      </div>
    </nav>
  )
}

export default Navbar