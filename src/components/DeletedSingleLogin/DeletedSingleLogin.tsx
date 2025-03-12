import React, { useContext, useState } from 'react'
import style from '../../Pages/Admin/DeletedLoginCredentials/DeletedCredential.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, IconButton } from '@mui/material';
import { createdResponse, CustomAxiosRequestConfig, DeltedLogins, LoginCredentials } from '../../Types/types';
import { SchoolContext } from '../../Context/SchoolContextProvider';
import axios from 'axios';
import axiosInstance from '../../Api/apiClient';

interface DeletedSingleLoginAccData {
    ele: DeltedLogins,
    index: number
}

const DeletedSingleLogin:React.FC<DeletedSingleLoginAccData> = ({ ele, index }) => {

    const context = useContext(SchoolContext);

    if (!context) return;

    const { setDeletedLoginList } = context

    const [deletedLoading, setDeletedLoading] = useState<boolean>(false)
    const [deletedSuccessMessage, setDeletedSuccessMessage] = useState<string>("")

    const handleStatus = async (id: number) => {
      

        setDeletedLoading(true)
        try {

            const { data } = await axiosInstance.delete<createdResponse>(`/api/admin/deleteAccountantCredential/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                userType: "admin" 
            } as CustomAxiosRequestConfig<LoginCredentials>);
    
            if (data.ok) {
                setDeletedLoginList((prev) => {
                    return prev.map(item =>{
                        if(item._id === id){
                            return {...item, status: false}
                        }
                        return item
                    } )
                })

                setDeletedSuccessMessage("Credential Deleted Successfully")

                setTimeout(()=>{
                    setDeletedSuccessMessage("")
                }, 2000)
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data?.message || "Something went wrong!")
            } else if (error instanceof Error) {
                console.log(error.message)
            } else {
                // Handle unexpected error
                console.log("An unexpected error occurred.")
            }
        }
        finally {
            setDeletedLoading(false)
        }


    }

    return (
        <div key={index} className={`${style.notiDiv} shadow-md`}>
            <p>Email:<span>{ele.email}</span></p>
            <div className={`${style.statusDiv}`}>
                <p>Status: </p><span className={ele.status ? style.active_status : style.inactive_status}>{ele.status ? "Active" : "inActive"}</span>
            </div>

            <div className={`${style.accessBtnGrp}`}>

    {ele.status ?  <IconButton
                    onClick={() => handleStatus(ele._id)}
                    sx={{
                        // width: "50px",
                        padding: "5px 10px",
                        height: "50px",
                        borderRadius: "10px",
                        background: "#f12a2a",
                        color: "white",
                        transition: 'background 0.3s ease',
                        '&:hover': {
                            background: '#c51111',
                        },
                        minWidth:'60%',
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                        "&:disabled": { backgroundColor: "#f12a2a", color: "white" },
                    }}
                    disabled={deletedLoading}
                    > {deletedLoading ? <CircularProgress size={24} thickness={5} sx={{ color: "white" }} /> : (
                       <><CloseIcon /> Delete</> 
                    )
                }
                </IconButton> :
                
               <div className='text-green-500 font-medium text-lg'>
                {deletedSuccessMessage}
               </div>
                }
               


            </div>

        </div>
    )
}

export default DeletedSingleLogin