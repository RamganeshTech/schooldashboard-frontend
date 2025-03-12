import React, { useState } from 'react'
import style from './AccountantPermsisonSingle.module.css'
import { Checkbox} from '@mui/material'
import { createdResponse, CustomAxiosRequestConfig } from '../../Types/types'
import { AccountantListType } from '../../Pages/Admin/Reports/AccountantPermission/AccountantPermission'
import axiosInstance from '../../Api/apiClient'
import axios from 'axios'



interface AccountantPermissionSingle {
    ele: AccountantListType
    index: number
}

const AccountantPermissionSingle: React.FC<AccountantPermissionSingle> = ({ ele, index }) => {

    const [permissionStatus, setPermissionStatus] = useState<boolean>(ele.permissionStatus)


    const handlePermissionStatus = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const newStatus = event.target.checked;
        setPermissionStatus(newStatus);

        let abortController = new AbortController()
        let { signal } = abortController

        try {
             await axiosInstance.patch<createdResponse>(`/api/admin/updatePermission/${ele._id}`,
                { permissionStatus: newStatus },
                {
                    signal,
                    userType: "admin"
                } as CustomAxiosRequestConfig<{}>
            )

            
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data?.message || "Something went wrong!")
            }
            else if ((error as Error).name === 'AbortError') {
                console.log((error as Error).message)
            }
            else if (error instanceof Error) {
                console.log(error.message)
            }
            else {
                console.log("An unexpected error occurred.")
            }
        }
    }


    return (
        <div key={index} className={`${style.accountantDiv} shadow-md`}>
            <p>Email:<span>{ele.email}</span></p>
            <div className='flex gap-3 justify-center items-center'>
            <div className={`${style.statusDiv}`}>
                <p>Allow Permission to Access View </p>
            </div>

            <div className={`${style.accessBtnGrp}`}>
                <Checkbox checked={permissionStatus} onChange={handlePermissionStatus} />
            </div>
            </div>
          

        </div>
    )
}

export default AccountantPermissionSingle