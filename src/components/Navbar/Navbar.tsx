import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { createdResponse, CustomAxiosRequestConfig, StudentDetailnew } from '../../Types/types';

import companyLogo from '../../assets/logo/School Module_ Jai Hind Public School.png'
import SearchInput from '../../ResuableComponents/SearchInput/SearchInput';

const Navbar: React.FC = () => {

  const context = useContext(SchoolContext);

  if (!context) return;


  const { adminPage, setAdminPage, isNotificationpage, setIsNotificationPage,
    isAccountantLoginCreationPage, setStudentList, studentList, setSearchLoading } = context

  const [isReportPage, setIsReportPage] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const [hasReportAccess, setHasReportAccess] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);



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
    const pathArray = location.pathname.split('/')
    if (pathArray[pathArray.length - 1] === "admin" || pathArray[pathArray.length - 1] === "accountant") {
      // console.log(pathArray)
      setShowSearchBar(true)
    }
    else{
      setShowSearchBar(false)
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


  const getStudentList = async () => {
    let abortController = new AbortController()
    let { signal } = abortController
    try {
      let { data } = await axiosInstance.get<createdResponse>(`/api/${adminPage ? "admin" : "accountant"}/getStudentList`, {
        signal,
        userType: `${adminPage ? "admin" : "accountant"}`
      } as CustomAxiosRequestConfig<StudentDetailnew>
      )

      if (data.ok) {
        setStudentList(data.data)
      }

    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log(error.response)
        console.log(error)
      } else if ((error as Error).name === 'AbortError') {
        console.log(error)
      } else if (error instanceof Error) {
        console.log(error)
      } else {
        console.log(error)
      }
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

  useEffect(() => {
    const delay = setTimeout(() => {
      const handleSearch = async () => {
        setSearchLoading(true)

        // for manual delay wrte code with promise and setTimout , this code is going to call teh bakcend api for the searchable data
        if (!searchTerm) {
          await getStudentList();
          setSearchLoading(false)
          return;
        }

        const isNumeric = /^[0-9]+$/.test(searchTerm);
        const searchResults = studentList.filter(item => {
          if (isNumeric) {
            return item.srId?.slice(2) === searchTerm;
          } else {
            return item.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
          }
        });


        if (searchResults.length > 0) {
          setStudentList(searchResults);
          setSearchLoading(false)
          return;
        }

        try {
          const { data } = await axiosInstance.get(
            `/api/${adminPage ? "admin" : "accountant"}/searchstudent?query=${searchTerm}`,
            {
              userType: `${adminPage ? "admin" : "accountant"}`
            } as CustomAxiosRequestConfig<StudentDetailnew>
          );
          setStudentList(data.data);
        } catch (err) {
          console.error("Search API failed", err);
        }
        finally {
          setSearchLoading(false)
        }
      };

      handleSearch();
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <nav className={`${style.navbarDiv} shadow-md relative z-1`}>
      <div className={`${style.innerDiv}`}>

        <h1 className={`${style.navbarheading} text-4xl font-medium`}>{adminPage ? "Admin panel" : "Accountant Panel"}</h1>

        <section className='w-[7%] h-[100%]'>
          <Link to={adminPage ? '/admin' : "/accountant"} className='outline-none'>
            <img src={companyLogo} alt="brand logo" className='h-[100%] w-[100%]' />
          </Link>
        </section>

      {showSearchBar && <div className='!w-[250px] absolute right-[350px]'>
          <SearchInput state={searchTerm} setState={setSearchTerm} width="100%"
            height="10px" fontSize="18px" borderRadius="5px" padding="15px 5px" color="grey"
            placeholder='Search by SR no or by Name'
          />
        </div>}

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