import React, { useContext, useEffect, useState } from "react";
import Calendar from './Calender/Calender';
import style from "./Reports.module.css";
import axiosInstance from "../../../Api/apiClient";
import { createdResponse, CustomAxiosRequestConfig, StudentDetailnew } from "../../../Types/types";
import MainLoading from "../../../components/MainLoading/MainLoading";
import axios from "axios";
import ErrorContainer from "../../../components/ErrorContainer/ErrorContainer";
import { SchoolContext } from "../../../Context/SchoolContextProvider";
import { Button } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useLocation, useNavigate } from "react-router-dom";

const Reports: React.FC = () => {

  const context = useContext(SchoolContext)

  if (!context) return <MainLoading />;

  const { setStudentList, adminPage, setAdminPage } = context

  let navigate = useNavigate()
  let location = useLocation()


  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")


  const [isShowAccountantList, setIsShowAccountantList] = useState<boolean>(false)

  const getStudentList = async () => {
    let abortController = new AbortController()
    let { signal } = abortController
    setLoading(true)
    try {
      let { data } = await axiosInstance.get<createdResponse>(`/api/${adminPage ? "admin" : "accountant"}/getStudentList`, {
        signal,
        userType: adminPage ? "admin" : "accountant"
        ,
      } as CustomAxiosRequestConfig<StudentDetailnew>
      )

      if (data.ok) {
        setStudentList(data.data)
      }

    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong!");
      } else if ((error as Error).name === 'AbortError') {
        setError((error as Error).message)
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }

    }
    finally {
      setLoading(false)
    }
  }

  const handleAccounantList = () => {
    navigate('/admin/viewpermissionlist')
  }

  useEffect(()=>{
    if(location.pathname.includes("admin")){
      setAdminPage(true)
    }
  }, [location.pathname])


 useEffect(()=>{
  if(location.pathname.includes("accountant")){
    setIsShowAccountantList(false)
  }else{
    setIsShowAccountantList(true)
  }
 }, [location.pathname])


  useEffect(() => {
    getStudentList()
  }, [adminPage])

  if (loading) {
    return (
      <MainLoading />
    );
  }

  return (
    <div className={`${style.container}`}>

      <div className={`${style.wrapper}`}>
       {isShowAccountantList && <div className={`${style.backBtn}`}>
          <Button
            onClick={handleAccounantList}
            sx={{
              marginBottom: '20px',
              position: 'absolute',
              top: '100px',
              right: '40px',
              background: "#F6F5FA",
              height: "40px",
              padding: "5px 10px",
              color: "var(--subheading-color)",
              border: "0px solid red",
              width: "auto",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            Accountants List
            <ListAltIcon
              sx={{
                width: "40px",
                height: "40px",
                ml: "10px",
              }}
            />
          </Button>

        </div>}
        <h1 className={`${style.title}`}>Reports Calendar</h1>
        <Calendar />
      </div>

      {!loading && error && <ErrorContainer error={error} onClose={() => setError('')} />}

    </div>
  );
};

export default Reports;
