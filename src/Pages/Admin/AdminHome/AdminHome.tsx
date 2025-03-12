import React, { useContext, useEffect } from 'react'
import { SchoolContext } from '../../../Context/SchoolContextProvider'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
import FormError from '../../../components/FormError/FormError'
import MainLoading from '../../../components/MainLoading/MainLoading'
const AdminHome:React.FC = () => {

   const context = useContext(SchoolContext)

   if(!context) return <MainLoading />;

   const { isErrorDisplaying, setAdminPage, setIsNotificationPage, setIsAccountantLoginCreationPage } = context;
   const location = useLocation();
 
   useEffect(() => {
     if (location.pathname.includes("accountant")) {
       setAdminPage(false);
     } else if (location.pathname.includes("admin")) {
       setAdminPage(true);
     }
   }, [location.pathname]);
 
   useEffect(() => {
     if (location.pathname.includes("notification")) {
       setIsNotificationPage(true);
     } else {
       setIsNotificationPage(false);
     }
 
     if (location.pathname.includes("Accountantlogincredentials")) {
        setIsAccountantLoginCreationPage(true);
     } else {
       setIsAccountantLoginCreationPage(false);
     }
   }, [location.pathname]);
   
   return (
        <>    
       <Navbar />

       {isErrorDisplaying && <FormError />}
        <Outlet />
        </>
    )
}

export default AdminHome;