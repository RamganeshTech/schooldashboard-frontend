import { Button, CircularProgress, IconButton, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import style from '../SingleStudentProfile.module.css'
import { createdResponse, CustomAxiosRequestConfig, MandatoryDetails, StudentDetailnew } from '../../../Types/types'
import { ProfileItem } from '../../../Constants/constants'
import EditIcon from '@mui/icons-material/Edit';
import axiosInstance from '../../../Api/apiClient'
import { SchoolContext } from '../../../Context/SchoolContextProvider'
import MainLoading from '../../MainLoading/MainLoading'
import axios from 'axios'


type MandatorySingleProp = {
    item: ProfileItem,
    student: StudentDetailnew,
}

function isValidDateString(dateString: string):  string {
    // const date = new Date(dateString);
        // let convertedDate = date.getDate().toString().padStart(2, "0")
        // let convertedMonth= (date.getMonth()+1).toString().padStart(2, "0")
        // let convertedYear = date.getFullYear()
        // return `${convertedDate}-${convertedMonth}-${convertedYear}`
        let dateArr = dateString.split('-')
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
        
  }

const MandatorySingle: React.FC<MandatorySingleProp> = ({ item, student }) => {
    let context = useContext(SchoolContext)

    if (!context) return <MainLoading />

    let { adminPage, setStudentList } = context

    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string | null>(null)

    const [isMandatoryLoading, setIsMandatoryLoading] = useState<boolean>(false)
    const [inputFieldType, setInputFieldInputType] = useState<string>("text")

    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setInputFieldInputType(() => {
            if (item.key === "dob") {
                return "date"
            }
            // console.log("item.key",item.key )
            if (item.key.toLowerCase().includes("number")) {
                return "number";
            }

            return "text"
        })
    }, [item.key])

    const handleMandatoryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // console.log(adminPage ? "admin" :"acccountant")
    const handleUpdate = async () => {
        setIsMandatoryLoading(true)
        try {
            const abortController = new AbortController();
            const { signal } = abortController;

            let valueToSend = inputValue;

            if(item.key==="dob"){
                valueToSend = isValidDateString(valueToSend as string)
            }

            const updatePayload = {
                    profileData: {
                        [item.key]: valueToSend
                    }
            };

            let { data } = await axiosInstance.patch<createdResponse>(`/api/${adminPage ? "admin" : "accountant"}/updateStudentProfile/${student._id}`, updatePayload, {
                signal,
                userType: `${adminPage ? "admin" : "accountant"}`
            } as CustomAxiosRequestConfig<StudentDetailnew>
            )

            if (data.ok) {
                setStudentList((p: StudentDetailnew[]) => p.map(item => item._id === student._id ? data.data : item))
                setInputValue(null)
                setIsEditing(false)

            }
            console.log(data.data)
        }
        catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                // setisErrorDisplying(true)
                // setFormError(error.response?.data?.message || "Something went wrong!");
            } else if ((error as Error).name === 'AbortError') {
                console.log(error)
            } else if (error instanceof Error) {

                console.log(error)
            } else {
                console.log(error)
            }
        }
        finally {
            setIsMandatoryLoading(false)
        }
    }

    const handleCancelUpdateProfile = () => {
        setIsEditing(false)
    }

    useEffect(() => {

        const handleCancel = (e: MouseEvent) => {
            if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
                handleCancelUpdateProfile();
            }
        }

        document.addEventListener('mousedown', handleCancel)

        return () => document.removeEventListener('mousedown', handleCancel)
    }, [handleCancelUpdateProfile])

    // console.log(inputFieldType)

    return (

        <>
            <div className={style.details_Row}>
                <p className={style.label}>{item.label}</p>
                <div className={style.value}>
                    <span>  {item.key === "studentName"
                        ? student?.studentName || "NA"
                        : student?.mandatory?.[item.key as keyof MandatoryDetails] ?? "NA"}</span>
                    {item.key !== "studentName" && <IconButton onClick={() => {
                        // console.log("item.key",item.key, inputFieldType )
                        setIsEditing(true)
                    }}
                    >
                        <EditIcon />
                    </IconButton>}
                </div>
            </div>

            {isEditing && (
                <div className={style.modalBackdrop}>
                    <div ref={sectionRef} className={style.modalContent}>
                        <h3 className='!mb-2'>Edit {item.label}</h3>
                        <TextField
                            value={inputValue ?? ""}
                            onChange={handleMandatoryInputChange}
                            fullWidth
                            type={inputFieldType}
                            placeholder={`Enter ${item.label}`}
                            className={style.mandatoryinputfield}
                        />
                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <Button variant="contained" onClick={handleUpdate} className='!w-[20%]'>
                                {isMandatoryLoading ? <CircularProgress size={20} thickness={4} sx={{ color: "#fafafa" }} /> : "Submit"}
                            </Button>
                            <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default MandatorySingle