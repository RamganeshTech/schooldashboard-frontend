import React, { useContext, useEffect, useState } from 'react';
import style from './logincomponet.module.css'
import { Box, Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { LoginCredentials } from '../../../Types/types';
// import accountant from "../../../assets/accountant_login.jpg"
// import admin from "../../../assets/admin_login.jpg"
import { Link, useLocation, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SchoolContext } from '../../../Context/SchoolContextProvider';

import axios from 'axios'
import MainLoading from '../../../components/MainLoading/MainLoading';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import companyLogo from '../../../assets/logo/School Module_ Jai Hind Public School.png'

const AdminLogin = () => {

    interface LoginResponse {
        accessToken: string;
        message: string;
        ok: boolean;
        viewPermission?: boolean;
    }

    const context = useContext(SchoolContext);

    if (!context) return <MainLoading />;

    const { apiUrl } = context


    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const location = useLocation()
    let navigate = useNavigate()

    const [mainLoginError, setMainLoginError] = useState<string>("")

    const [adminLoginData, setAdminLoginData] = useState<LoginCredentials>({
        email: "",
        password: "",
    });

    const [accountantLoginData, setAccountantLoginData] = useState<LoginCredentials>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [controller, setController] = useState<AbortController | null>(null);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (location.pathname === "/adminlogin") {
            setIsAdmin(true)
        }
        else if (location.pathname === "/accountantlogin") {

            setIsAdmin(false)
        }
    }, [location.pathname])

    const handleAdminSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMainLoginError("")


        controller?.abort();

        const newController = new AbortController();
        setController(newController);


        try {
            const { data } = await axios.post<LoginResponse>(
                `${apiUrl}/api/admin/adminLogin`,
                adminLoginData,
                {
                    withCredentials: true,
                    headers: {

                        "Content-Type": "application/json",
                    },
                    signal: newController.signal,
                }
            );



            if (data.ok) {
                navigate("../admin")
            } else {
                throw new Error(data.message || "Login failed");
            }

            setAdminLoginData({
                email: "",
                password: "",
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {

                setMainLoginError(error.response?.data?.message || "Something went wrong!");
            } else if (error instanceof Error) {

                setMainLoginError(error.message);
            } else {

                setMainLoginError("An unexpected error occurred.");
            }

            const timeout = setTimeout(() => setMainLoginError(""), 2500);
            return () => clearTimeout(timeout);
        } finally {
            setLoading(false);
        }
    };

    const handleAccountantSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMainLoginError("")


        controller?.abort(); //calcelling previos pending request

        const newController = new AbortController();
        setController(newController);

        try {
            const { data } = await axios.post<LoginResponse>(
                `${apiUrl}/api/accountant/accountantlogin`,
                accountantLoginData,
                {
                    withCredentials: true,
                    headers: {

                        "Content-Type": "application/json",
                    },
                    signal: newController.signal,
                }
            );

            if (data.ok) {
                navigate('../accountant')

            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {

                setMainLoginError(error.response?.data?.message || "Something went wrong!");
            } else if (error instanceof Error) {

                setMainLoginError(error.message);
            } else {

                setMainLoginError("An unexpected error occurred.");
            }

            const timeout = setTimeout(() => setMainLoginError(""), 2000);
            return () => clearTimeout(timeout);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        return () => {
            controller?.abort();
        };
    }, [controller]);

    return (
        <div className={`${style.mainDiv} relative h-screen flex flex-col items-center justify-center`}>
            <div className={`${style.backBtn}`}>
                <Link to={'/'}>
                    <Button sx={{
                        marginBottom: '20px',
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: "#F6F5FA",
                        height: "40px",
                        padding: "5px 10px",
                        color: "var(--subheading-color)", border: "none"
                    }}>
                        {/* <IconButton> */}
                        <ArrowBackIcon />  {/* Display the back arrow icon */}
                        {/* </IconButton> */}
                        Back
                    </Button>
                </Link>
            </div>
            <div className="w-3/5 h-4/5 flex shadow-lg rounded-lg  overflow-hidden">
                {/* Left Section */}
                <div className={`${style.leftDiv} w-full lg:w-1/2 flex flex-col justify-start items-center`}>
                    <div className="w-[90%] max-w-md flex flex-col gap-14 ">
                        <div className={`${style.titleDiv}`}>
                            <h2 className="text-4xl font-semibold ">
                                Sign In as {isAdmin ? "Admin" : "Accountant"}
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Welcome back! Please enter your details.
                            </p>
                        </div>
                        {mainLoginError && <div className={`${style.loginErrorMainDiv}`}>
                            <p>{mainLoginError}</p>
                        </div>}
                        <form onSubmit={isAdmin ? handleAdminSubmit : handleAccountantSubmit}>
                            <div className={`${style.emailDiv}`}>
                                <label className="block text-xl text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                {/* <span className='text-red-500'>*</span> */}
                                <div className="relative">
                                    <TextField
                                        type='email'
                                        value={isAdmin ? adminLoginData.email : accountantLoginData.email}
                                        onChange={(e) => isAdmin ? setAdminLoginData((prev: LoginCredentials) => ({ ...prev, email: e.target.value })) : setAccountantLoginData((prev: LoginCredentials) => ({ ...prev, email: e.target.value }))}
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
                                    {/* {mainLoginError && <p className={`${style.errorMessage}`}><span>*</span>{mainLoginError}</p>} */}
                                </div>
                            </div>
                            <div className={`${style.passDiv}`}>
                                <label className="block text-xl text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                {/* <span className='text-red-500'>*</span> */}
                                <div className="relative">
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={isAdmin ? adminLoginData.password : accountantLoginData.password}
                                        onChange={(e) => isAdmin ? setAdminLoginData((prev: LoginCredentials) => ({ ...prev, password: e.target.value })) : setAccountantLoginData((prev: LoginCredentials) => ({ ...prev, password: e.target.value }))}
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
                                    {/* <i className="fas fa-eye absolute right-3 top-3 text-xl cursor-pointer" 
                                    onClick={() => setShowPassword(!showPassword)}></i> Step 2: Add an icon to toggle visibility */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            zIndex: 1,
                                        }}
                                    >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </Box>
                                    {/* {mainLoginError && <p className={`${style.errorMessage}`}><span>*</span>Enter password</p>} */}
                                </div>
                            </div>
                            {/* <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center">
                                    <input className="form-checkbox text-green-500" type="checkbox" />
                                    <span className="ml-2 text-gray-700">
                                        Remember me
                                    </span>
                                </label>
                                <a className="text-green-500" href="#">
                                    Forgot Password?
                                </a>
                            </div> */}
                            <Button type='submit' variant='contained'
                                sx={{
                                    backgroundColor: "#0ebf36",
                                    color: "white",
                                    margin: "20px auto",
                                    width: "80%",
                                    height: "40px",
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "&:disabled": { backgroundColor: "#0ebf36", color: "white" },
                                }}
                                disabled={loading}
                            > {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign in"}
                            </Button>
                        </form>
                    </div>
                </div>

                <div className='w-[1px] bg-[#00000018] '></div>
                {/* Right Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#F6F5FA] items-center justify-center relative">
                    {/* <img alt="Admin image" className="w-full" height="400" src={isAdmin ? admin : accountant} width="300" /> */}
                    <img alt="Admin image" className="w-full" height="400" src={companyLogo} width="300" />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;