import React, { useContext, useEffect, useRef, useState } from 'react'
import { SchoolContext } from '../../../Context/SchoolContextProvider';

import style from './AdminStudent.module.css';
import TableHeadingGrp from '../../../components/TableHeadingGroup/TableHeadingGrp';
import SingleStudent from '../../../components/SingleStudent/SingleStudent';
import { createdResponse, CustomAxiosRequestConfig, StudentDetailnew } from './../../../Types/types';
import Total from '../../../components/TotalComponent/Total';
import axiosInstance from '../../../Api/apiClient';
import axios from 'axios';
import ErrorContainer from '../../../components/ErrorContainer/ErrorContainer';
import MainLoading from '../../../components/MainLoading/MainLoading';
import { useLocation } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { downloadFileFromBlob } from '../../../Utils/downloadFileFromBlob';


const AdminStudent: React.FC = () => {

  const context = useContext(SchoolContext)

  if (!context) return <MainLoading />;

  const { studentList, setStudentList, adminPage, setAdminPage } = context

  let location = useLocation()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [fileDownloadLoading, setFileDownloadloading] = useState<boolean>(false)

  const getStudentList = async () => {
    let abortController = new AbortController()
    let { signal } = abortController
    setLoading(true)
    try {
      let { data } = await axiosInstance.get<createdResponse>('/api/admin/getStudentList', {
        signal,
        userType: "admin"
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


  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [initialDistance, setInitialDistance] = useState<number>(0);


  const tableRef = useRef<HTMLTableElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.03, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.03, 0.24));
  };

  const handleWheel = (event: React.WheelEvent<HTMLTableElement>) => {
    if (event.ctrlKey) {
      if (event.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      setInitialDistance(Math.sqrt(dx * dx + dy * dy));
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      if (initialDistance) {
        const zoomFactor = currentDistance / initialDistance;
        setZoomLevel(prev => Math.min(Math.max(prev * zoomFactor, 0.5), 2));
      }
    }
  };

  useEffect(() => {
    getStudentList()
  }, [])



  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setAdminPage(true)
    }
  }, [location.pathname])


  const handleExportExcel = async () => {
    let abortController = new AbortController()
    let { signal } = abortController
    setFileDownloadloading(true)
    try {
      const response: any = await axiosInstance.get(`/api/${adminPage ? "admin" : "accountant"}/excelfile`, {
        responseType: 'blob',
        signal,
        userType: `${adminPage ? "admin" : "accountant"}`
      } as CustomAxiosRequestConfig<void>
      )
      if (response.statusText !== "OK" && response.status !== 200) throw new Error('Failed to download file');

      await downloadFileFromBlob(response.data, 'StudentFees.xlsx'); // Your chosen filename here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        setError(error.response?.data?.message || "Something went wrong!");
      } else if ((error as Error).name === 'AbortError') {
        setError((error as Error).message)
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }

      console.log(error)
    }
    finally {
      setFileDownloadloading(false)
    }
  };


  if (loading) {
    return (
      <MainLoading />
    );
  }

  return (
    <div className={`${style.adminStudentTableContainer}h-screen `}>
      <div className={` ${style.innerDiv} `}
      >


        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <h1 className={`text-4xl ${style.adminHeading}`}>Student List</h1>
          <Button
            variant='contained'
            onClick={() => {
              if (!fileDownloadLoading) {
                handleExportExcel()
              }
            }}
            sx={{
              height: "40px",
              width: "155px !important"
            }}
          >
            {fileDownloadLoading ? <CircularProgress thickness={5} size={25} sx={{ color: "#fafafa" }} /> : "Export To Excel"}
          </Button>
        </div>


        <table align='center' className={` table-fixed w-full ${style.student_table}`}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          ref={tableRef}
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
        >
          <thead className=''>
            <TableHeadingGrp />
          </thead>
          <tbody className={`${style.tbody_group}`}>
            {studentList && studentList.length > 0 ? studentList.map((student: StudentDetailnew, index) => {
              return (
                <SingleStudent key={index} student={student} />
              )
            }
            ) : (
              adminPage ? (
                <tr>
                  <td colSpan={31} className={`${style.tbody_cell_no_students}`}>
                    No Students Available...
                  </td>
                </tr>
              ) : null
            )
            }
          </tbody>

          <tfoot className="totalContainer">
            <Total />
          </tfoot>
        </table>
      </div>

      {!loading && error && <ErrorContainer error={error} onClose={() => setError('')} />}
    </div>
  )
}

export default AdminStudent