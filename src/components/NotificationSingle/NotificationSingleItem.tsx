import React, { Fragment, useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import style from './NotificationSingleItem.module.css'
import { CustomAxiosRequestConfig, NotificationDetail } from '../../Types/types';
import { SchoolContext } from '../../Context/SchoolContextProvider';
import axiosInstance from '../../Api/apiClient';
import axios from 'axios';

interface NotificationSingleItemProps {
    ele: NotificationDetail 
    setError: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationSingleItem: React.FC<NotificationSingleItemProps> = ({ ele , setError, setLoading }) => {

    const context = useContext(SchoolContext);

    if (!context) return;

    const { setNotificationList } = context
    const handleAllow = async (idx: string) => {
        setLoading(true)
        
        setError("")
        
        try{
        let abortController = new AbortController()
        let { signal } = abortController

        let { data } = await axiosInstance.patch(`api/admin/acceptNotification/${idx}`, {}, {
            signal,
            userType: "admin"
        } as CustomAxiosRequestConfig<{}>
        )

        // console.log(data.data)

        if (data.ok) {

            setNotificationList((prev) => {
                const copyArr = [...prev]
                return copyArr.filter((ele) => ele._id  !== idx)
            })



            const today = new Date();
            const modifiedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`; // Get today's date in DD-MM-YYYY format
            const fieldsModified = Object.keys(data.data.fields); // Pass the modified fields as an array of strings
            const relationId = data.data.studentId

          
            await axiosInstance.post('/api/admin/changesmodified', {
                modifiedDate,
                fieldsModified,
                relationId
            }, 
            {
                userType:"admin"
            } as CustomAxiosRequestConfig<{}>);
        }

    }
    catch(error){
        if (axios.isAxiosError(error)) {
            console.log(error.response)
            setError(error.response?.data?.message || "Something went wrong!");
          } else if ((error as Error).name === 'AbortError') {
          } else if (error instanceof Error) {
            setError(error.message);
          } else {
          }
    }
    finally{
        setLoading(false)
    }

    }

    const handleDeny = async(idx: string) => {
        setLoading(true)
        setError("")
        try{
        let abortController = new AbortController()
        let { signal } = abortController

        let { data } = await axiosInstance.patch(`api/admin/rejectNotification/${idx}`, {}, {
            signal,
            userType: "admin"
        } as CustomAxiosRequestConfig<{}>
        )

        // console.log(data.data)

        if (data.ok) {

            setNotificationList((prev) => {
                const copyArr = [...prev]
                return copyArr.filter((ele) => ele._id !== idx)
            })
        }

    }
    catch(error){
        if (axios.isAxiosError(error)) {
            console.log(error.response)
            setError(error.response?.data?.message || "Something went wrong!");
          } else if ((error as Error).name === 'AbortError') {
            console.error("Request was aborted:", (error as Error).message);
          } else if (error instanceof Error) {
            console.log(error.message)
            setError(error.message);
          } else {
            setError("An unexpected error occurred.");
          }
    }
    finally{
        setLoading(false)
    }

    }

    return (
        <div>
            <div key={ele._id} className={`${style.notiDiv} shadow-md`}>
                <p>{ele.email}</p>
                <p>Student Name: <span>{ele.studentName} </span></p>


                <div className={`${style.fieldGrp}`}>
                    {Object.entries(ele?.fields)?.map(([k, v]) => {
                        return (
                            <Fragment key={k}>
                                <p ><span>{k}: </span>{v as string}</p>
                            </Fragment>
                        )
                    })}
                </div>

                <div className={`${style.accessBtnGrp}`}>
                    <IconButton
                        onClick={() => handleAllow(ele._id)}
                        sx={{
                           
                            height: "50px",
                            padding: "5px 10px",
                            borderRadius: "10px",
                            background: "#26bc26",
                            color: "white",
                            transition: 'background 0.3s ease', 
                            '&:hover': {
                                background: '#178f17',
                            },

                        }}>
                        <CheckIcon /> Allow
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeny(ele._id)}
                        sx={{
                            padding: "5px 10px",
                            height: "50px",
                            borderRadius: "10px",
                            background: "#f12a2a",
                            color: "white",
                            transition: 'background 0.3s ease', 
                            '&:hover': {
                                background: '#c51111',
                            },
                        }}>
                        <CloseIcon /> Deny
                    </IconButton>
                </div>

            </div>
        </div>
    )
}

export default NotificationSingleItem