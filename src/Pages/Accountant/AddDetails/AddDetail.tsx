import React, { useContext, useEffect, useState } from 'react'
import { SchoolContext } from '../../../Context/SchoolContextProvider';
import { createdResponse, CustomAxiosRequestConfig, StudentDetailnew } from '../../../Types/types';
import { useLocation } from 'react-router-dom';

import style from './AddDetail.module.css';
import SingleStudent from '../../../components/SingleStudent/SingleStudent';
import AccountantInputGroup from '../../../components/AccInputGroup/AccountantInputGroup';
import TableHeadingGrp from '../../../components/TableHeadingGroup/TableHeadingGrp';
import axiosInstance from '../../../Api/apiClient';
import axios from 'axios';
import MainLoading from '../../../components/MainLoading/MainLoading';
import ErrorContainer from '../../../components/ErrorContainer/ErrorContainer';
import { Button, CircularProgress } from '@mui/material';
import { downloadFileFromBlob } from '../../../Utils/downloadFileFromBlob';
import ShimmerTable from '../../../Loading/ShimmerTable/ShimmerTable';

const AddDetail: React.FC = () => {

  const context = useContext(SchoolContext);

  if (!context) return <MainLoading />;

  const { studentList, setStudentList, student, setStudent, setAdminPage, adminPage, searchLoading } = context

  let location = useLocation()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [fileDownloadLoading, setFileDownloadloading] = useState<boolean>(false)

  const getStudentList = async () => {
    let abortController = new AbortController()
    let { signal } = abortController
    setLoading(true)
    try {
      let { data } = await axiosInstance.get<createdResponse>('/api/accountant/getStudentList', {
        signal,
        userType: "accountant"
      } as CustomAxiosRequestConfig<StudentDetailnew>
      )

      if (data.ok) {
        setStudentList(data.data)
      }

    }
    catch (error) {
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
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location.pathname.includes("accountant")) {
      setAdminPage(false)
    }
  }, [])

  useEffect(() => {
    getStudentList()
  }, [])

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
    return <MainLoading />
  }

  return (
    <div className={`${style.mainDiv}`}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        <h1 className={`text-4xl  ${style.heading}`}>Manage Detail</h1>
        <Button
          variant='contained'
          onClick={() => {
            if (!fileDownloadLoading) {
              handleExportExcel()
            }
          }}
          sx={{
            height: "40px",
            width: "170px !important"
          }}
        >
          {fileDownloadLoading ? <CircularProgress thickness={5} size={25} sx={{ color: "#fafafa" }} /> : "Export To Excel"}
        </Button>
      </div>

      <form action="" autoComplete='on' >
        <section className={`${style.tableContainer}`}>
          <table align='center' className={`table-fixed w-full border-collapse ${style.table_container}`}>
            <thead>
              <TableHeadingGrp />
            </thead>
             {loading || searchLoading &&
            <tbody>
              <ShimmerTable rowCount={10} columnCount={29} />
            </tbody>
          }
            {!loading && !searchLoading && <tbody className=''>
              {studentList && studentList.length > 0 ? studentList.map((student: StudentDetailnew) => {

                return (
                  <SingleStudent key={student._id} student={student} />
                )
              })
            : (
                <tr>
                  <td colSpan={29} className={`${style.tbody_cell_no_students}`}>
                    No Students Available...
                  </td>
                </tr>
            )
            }


              <AccountantInputGroup student={student} setStudent={setStudent} />

            </tbody>}
          </table>

        </section>

      </form>


      {!loading && error && <ErrorContainer error={error} onClose={() => setError("")} />}
    </div>
  )
}

export default AddDetail