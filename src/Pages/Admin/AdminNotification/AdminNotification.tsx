import React, {  useContext, useEffect, useState } from 'react'
import style from './AdminNotification.module.css'
import { SchoolContext } from '../../../Context/SchoolContextProvider';
import axios from 'axios';
import axiosInstance from '../../../Api/apiClient';
import { createdResponse, CustomAxiosRequestConfig } from '../../../Types/types';
import NotificationSingleItem from '../../../components/NotificationSingle/NotificationSingleItem';

import MainLoading from '../../../components/MainLoading/MainLoading';
import ErrorContainer from '../../../components/ErrorContainer/ErrorContainer';


const AdminNotification: React.FC = () => {

const context = useContext(SchoolContext);

  if (!context) return <MainLoading />;

  const { notificationList, setNotificationList } = context

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

  const getNotifications = async ()=>{
    let abortController = new AbortController()
    let { signal } = abortController
    
    setError("")
    setLoading(true)
    try{
      let {data} = await axiosInstance.get<createdResponse>('api/admin/getNotifications', {
        signal,
        userType:"admin"
      } as CustomAxiosRequestConfig<{}>
      )


      if(data.ok){
        setNotificationList(data.data)
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong!");
      } 
      else if ((error as Error).name === 'AbortError') {
        setError((error as Error).message)
      } 
      else if (error instanceof Error) {
        setError(error.message);
      } 
      else {
        setError("An unexpected error occurred.");
      }
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getNotifications()
  }, [])

  if(loading){
    return (
      <MainLoading />
    )
  }

  return (
    <main className={`${style.notiContainer}`}>

    {notificationList.length>0  && <h1 className={`${style.notiHeading}`}>Notifications</h1>}
      {notificationList.length>0 ? notificationList.map((ele)=>{
        return(
        
        <NotificationSingleItem key={ele._id} ele={ele} setLoading={setLoading} setError={setError} />
        )
      }) : 
      <>  
        <h1 className={`${style.noNotificationHeading}`}>No Notifications so far...</h1>
      </>
      }

      {!loading && error && <ErrorContainer error={error} onClose={()=>setError("")} />}

    </main>
  )
}

export default AdminNotification