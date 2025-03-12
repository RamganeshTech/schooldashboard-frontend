import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, TextField } from '@mui/material';
import { createdResponse, CustomAxiosRequestConfig, LoginCredentials } from '../../../Types/types';

import style from './AccountantLoginCreation.module.css'

import ListAltIcon from '@mui/icons-material/ListAlt';
import { SchoolContext } from '../../../Context/SchoolContextProvider';
import axios from 'axios';
import axiosInstance from '../../../Api/apiClient';
import MainLoading from '../../../components/MainLoading/MainLoading';

const AccountantLoginCreation = () => {

    const context = useContext(SchoolContext);

    if (!context) return <MainLoading />;

    

    const [successmsg, setsuccessmsg] = useState("")
    let navigate = useNavigate()

    const [mainLoginError, setMainLoginError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    const [accountantNewLogin, setAccountantNewLogin] = useState<LoginCredentials>({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()

            setLoading(true)
            setsuccessmsg("")
            setMainLoginError("")

                const { data } = await axiosInstance.post<createdResponse, createdResponse, LoginCredentials>('/api/admin/createCredentials', accountantNewLogin, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    userType: "admin" 
                } as CustomAxiosRequestConfig<LoginCredentials>
                );

                
                if (data?.ok) {
                    setsuccessmsg("created successfully")

                    setAccountantNewLogin({
                        email:"",
                        password:""
                    })

                    setTimeout(() => {
                        setsuccessmsg("")
                    }, 2000)
                }

            }
            catch (error) {
                if (axios.isAxiosError(error)) {
                    setMainLoginError(error.response?.data?.message || "Something went wrong!");
                } else if (error instanceof Error) {
                    
                    setMainLoginError(error.message);
                } else {
                    
                    setMainLoginError("An unexpected error occurred.");
                }
            }
            finally {
                setLoading(false);
            }
    }

    const handleCreatedLogins = () => {
        navigate("../deletedcredentials")
    }

    return (
        <div>
            <div className={`${style.mainDiv} relative flex flex-col items-center justify-center`}>
                <div className={`${style.backBtn}`}>
                    <Button
                        onClick={handleCreatedLogins}
                        sx={{
                            position: 'absolute',
                            top: '20px',
                            right: '40px',
                            background: "#F6F5FA",
                            height: "50px",
                            padding: "5px 10px",
                            cursor: "pointer",
                            color: "var(--subheading-color)",
                            border: "none",
                            
                            fontSize: "20px",
                            fontWeight: "500",
                            
                            bgcolor: "#ffffff",
                            borderRadius: "10%",
                        }}>
                        Credentials
                        <ListAltIcon
                            sx={{
                                width: "40px",
                                height: "40px",
                                ml: "10px",
                            }}
                        />
                    </Button>
                </div>

                <div className={`${style.leftDiv} w-full rounded-lg lg:w-[30%] flex flex-col justify-start items-center`}>
                    <div className="w-[90%] max-w-md flex flex-col gap-8 ">
                        <div className={`${style.titleDiv}`}>
                            <h2 className="text-3xl font-semibold ">
                                Credential for Accountant
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Welcome back admin...
                            </p>
                        </div>
                        {mainLoginError && <div className={`${style.loginErrorMainDiv}`}>
                            <p>{mainLoginError}</p>
                        </div>}
                        {!mainLoginError && successmsg && <div className={`${style.loginErrorMainDiv}`}>
                            <p>{successmsg}</p>
                        </div>}
                        <form onSubmit={handleSubmit}>
                            <div className={`${style.emailDiv}`}>
                                <label className="block text-xl text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative">
                                    <TextField
                                        type='email'
                                        value={accountantNewLogin.email}
                                        onChange={(e) => setAccountantNewLogin((prev: LoginCredentials) => ({ ...prev, email: e.target.value }))}
                                        placeholder='Email'
                                        required
                                        sx={{
                                            padding: "0px 0",
                                            width: "100%",
                                            "& .MuiOutlinedInput-root fieldset": {
                                                borderWidth: "1px", 
                                                borderStyle: "solid", 
                                                borderColor: "#E2E8F0 !important" 
                                            },
                                            "& .MuiOutlinedInput-root:hover fieldset": {
                                                borderColor: "#E2E8F0 !important", 
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                                borderWidth: "1px", 
                                                borderStyle: "solid",
                                                borderColor: "#E2E8F0 !important", 
                                            },
                                            "& .MuiInputBase-input": {
                                                height: "20px",
                                                fontSize: "18px",
                                                color: "gray",
                                                padding: "15px 5px"
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#94A3B8", 
                                                opacity: 1,   
                                                fontSize: "16px" 
                                            }
                                        }}
                                    />
                                    <i className="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
                                </div>
                            </div>
                            <div className={`${style.passDiv}`}>
                                <label className="block text-xl text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <TextField
                                        type='password'
                                        value={accountantNewLogin.password}
                                        onChange={(e) => setAccountantNewLogin((prev: LoginCredentials) => ({ ...prev, password: e.target.value }))}
                                        placeholder='Password'
                                        required
                                        sx={{
                                            padding: "0px 0",
                                            width: "100%",
                                            "& .MuiOutlinedInput-root fieldset": {
                                                borderWidth: "1px", 
                                                borderStyle: "solid", 
                                                borderColor: "#E2E8F0 !important" 
                                            },
                                            "& .MuiOutlinedInput-root:hover fieldset": {
                                                borderColor: "#E2E8F0 !important", 
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                                                borderWidth: "1px", 
                                                borderStyle: "solid",
                                                borderColor: "#E2E8F0 !important", 
                                            },
                                            "& .MuiInputBase-input": {
                                                height: "20px",
                                                fontSize: "18px",
                                                color: "gray",
                                                padding: "15px 5px"
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#94A3B8", 
                                                opacity: 1,   
                                                fontSize: "16px" 
                                            }
                                        }}
                                    />
                                    <i className="fas fa-eye absolute right-3 top-3 text-gray-400">
                                    </i>
                                </div>
                            </div>
                            
                            <Button type='submit' variant='contained'
                                sx={{
                                    backgroundColor: "#0ebf36",
                                    color: "white",
                                    margin: "20px auto",
                                    width: "50%",
                                    height: "40px",
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "&:disabled": { backgroundColor: "#0ebf36", color: "white" },
                                }}
                                disabled={loading}
                                > {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : " Create Credential"}
                                </Button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AccountantLoginCreation