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

const AddDetail:React.FC = () => {

  const context = useContext(SchoolContext);

  if (!context) return <MainLoading />;

  const { studentList, setStudentList, student, setStudent, setAdminPage } = context

  let location = useLocation()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

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
    finally{
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


//   useEffect(()=>{
//     console.log(student)
// }, [student])

  if(loading){
    return <MainLoading />
  }

  return (
    <div className={`${style.mainDiv}`}>

      <h1 className={`text-4xl  ${style.heading}`}>Manage Detail</h1>

      <form action="" autoComplete='on' >
        <section className={`${style.tableContainer}`}>
          <table align='center' className={`table-fixed w-full border-collapse ${style.table_container}`}>
            <thead>
              <TableHeadingGrp />
            </thead>
            <tbody className=''>
              {studentList && studentList.length > 0 && studentList.map((student: StudentDetailnew, index) => {
                
                return (
                  <SingleStudent key={student._id} student={student} singleStudentIndex={index} />
                )
              })}


              <AccountantInputGroup student={student} setStudent={setStudent} />

            </tbody>
          </table>

        </section>

      </form>


{!loading && error && <ErrorContainer error={error} onClose={()=> setError("")} />}
    </div>
  )
}

export default AddDetail