import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import style from './AccountantPermission.module.css'
import axiosInstance from '../../../../Api/apiClient'
import { createdResponse, CustomAxiosRequestConfig } from '../../../../Types/types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AccountantPermissionSingle from '../../../../components/AccountantPermissionSingle/AccountantPermissionSingle'
import MainLoading from '../../../../components/MainLoading/MainLoading'

export interface AccountantListType {
    _id:string;
    email:string;
    password:string;
    permissionStatus:boolean
}

const AccountantPermission:React.FC = () => {

    let navigate = useNavigate()

    const [accountantList, setaccountantList] = useState<AccountantListType[]>([])
  
    const [loading, setLoading] = useState<boolean>(false)

    const getActiveAccountant = async () => {
        let abortController = new AbortController()
        let { signal } = abortController

        setLoading(true)

        try {
            let { data } = await axiosInstance.get<createdResponse>('/api/admin/getAccountant', {
                signal,
                userType: "admin"
            } as CustomAxiosRequestConfig<{}>
            )

            if (data.ok) {
                setaccountantList(data.data)
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
            }
            else if ((error as Error).name === 'AbortError') {
                console.error("Request was aborted:", (error as Error).message);
            }
            else if (error instanceof Error) {
                console.log(error.message)
            }
            else {
                console.log("An unexpected error occurred.");
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleBackBtn = () => {
        navigate('/admin/reports')
    }

    useEffect(()=>{
        getActiveAccountant()
    }, [])

    if(loading){
        return  <MainLoading />
      }
    

    return (
        <div className={`${style.notiContainer}`}>
            <div className={`${style.backBtn}`}>
                <Button
                    onClick={handleBackBtn}
                    sx={{
                        marginBottom: '20px',
                        position: 'absolute',  
                        top: '100px',           
                        right: '40px',
                        background: "#F6F5FA",
                        height: "40px",
                        padding: "5px 10px",
                        color: "var(--subheading-color)",
                        border: "none",
                        width: "100px",
                        fontSize: "20px",
                        fontWeight: "500",
                    }}>
                    Back
                </Button>

            </div>
            {accountantList.length > 0 && <h1 className={`${style.notiHeading}`}>Accountant Lists</h1>}


            {accountantList.length > 0 ? accountantList.map((ele, index) => {
                return (
                    <Fragment key={ele._id}>
                        <AccountantPermissionSingle ele={ele} index={index} />
                    </Fragment>
                )
            }) :
                <>
                    <h1 className={`${style.noNotificationHeading}`}>No Accountants Created so far...</h1>
                </>
            }
        </div>
    )
}

export default AccountantPermission