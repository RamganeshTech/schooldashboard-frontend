import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import accountant from "../../assets/accountant_login.jpg"
// import admin from "../../assets/admin_login.jpg"
import style from './LoginSelection.module.css'
import companyLogo from '../../assets/logo/School Module_ Jai Hind Public School.png'

const LoginSelection: React.FC = () => {
    const loginOptions = [
        { role: "Accountant Login", image: companyLogo, path: "/accountantlogin" },
        { role: "Admin Login", image: companyLogo, path: "/adminlogin" },
    ];

    return (
        <div className="py-5 px-5 h-[100vh] w-[100vw] flex justify-between items-center">
            <div className="h-[100%] rounded-lg w-[100%]  bg-gray-100 flex flex-col items-center py-10">
                <Typography variant="h3" className={`text-[var(--heading-color)] font-bold ${style.heading}`}>
                    Login Pages
                </Typography>

                <div className=" flex justify-around items-center w-[90%] h-[90%]">
                    {loginOptions.length > 0 && loginOptions.map((option, index) => (
                        <Card key={index}
                            // sx={{backgroundImage: `url(${option.role.includes("Accountant")  ? accountant : admin})`,
                            sx={{
                                backgroundImage: `url(${companyLogo})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                position: "relative",
                                backgroundRepeat: "no-repeat",
                                borderRadius: "5px"
                            }}
                            className={`${option.role.includes("Accountant") ? style.accountant_card : style.admin_card} 
                         flex flex-col justify-between shadow-lg rounded-xl w-[40%] h-[90%] 
                         `}>
                            <Typography variant="h5" className="font-bold  !py-2 text-[var(--heading-color)] text-center flex items-center flex-col gap-[3px]">
                                {option.role}
                            <div className="!bg-[var(--heading-color)] !h-[1px] !w-[90%] " ></div>
                            </Typography>
                            <CardContent className="text-center" style={{
                                position: "absolute",
                                bottom: 10,

                                width: "100%",
                                padding: 0
                            }}>


                                <Link to={option.path}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: "2px", width: "90%", background: "var(--heading-color)" }}

                                    >
                                        LOGIN

                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoginSelection;
