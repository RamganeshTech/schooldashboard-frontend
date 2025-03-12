import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import accountant from "../../assets/accountant_login.jpg"
import admin from "../../assets/admin_login.jpg"
import style from './LoginSelection.module.css'

const LoginSelection: React.FC = () => {
    const loginOptions = [
        { role: "Accountant Login", image: accountant, path: "/accountantlogin" },
        { role: "Admin Login", image: admin, path: "/adminlogin" },
    ];

    return (
        <div className="py-5 px-5 h-[100vh] w-[100vw] flex justify-between items-center">
                <div className="h-[100%] rounded-lg w-[100%]  bg-gray-100 flex flex-col items-center py-10">
                <Typography variant="h3" className={`text-[var(--heading-color)] font-bold ${style.heading}`}>
                    Login Pages
                </Typography>

                <div className=" flex justify-around items-center w-[90%] h-[90%]">
                    {loginOptions.length>0 && loginOptions.map((option, index) => (
                        <Card key={index}
                        sx={{backgroundImage: `url(${option.role.includes("Accountant")  ? accountant : admin})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative"
                    }}
                         className={`${option.role.includes("Accountant") ? style.accountant_card : style.admin_card} 
                         flex flex-col justify-between shadow-lg rounded-xl w-[40%] h-[90%] 
                         `}>
                            <CardContent className="text-center" style={{
                                position:"absolute",
                                bottom:10,
                               
                                width: "100%",
                                padding: 0
                            }}>
                                <Typography variant="h4" className="font-bold text-white">
                                    {option.role}
                                </Typography>
                                
                                <Link to={option.path}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: "2px", width:"90%", background: "var(--heading-color)" }}
                               
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
