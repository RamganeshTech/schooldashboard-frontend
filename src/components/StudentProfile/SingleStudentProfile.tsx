import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import style from './SingleStudentProfile.module.css'
import { Link, useParams } from 'react-router-dom';
import { List, Divider, ListItemButton, ListItemText, Button, IconButton } from '@mui/material';
import { SchoolContext } from '../../Context/SchoolContextProvider';
import MainLoading from '../MainLoading/MainLoading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { mandatoryDetails, nonMandatoryDetails } from '../../Constants/constants';
import { createdResponse, CustomAxiosRequestConfig, MandatoryDetails, StudentDetailnew } from '../../Types/types';
import MandatorySingle from './MandatorySingle/MandatorySingle';
import axiosInstance from '../../Api/apiClient';
import axios from 'axios';
import NonMandatorySingle from './NonMandatorySingle/NonMandatroySingle';

const SingleStudentProfile = () => {

  let { id } = useParams()

  let context = useContext(SchoolContext)

  if (!context) {
    return <MainLoading />
  }

  let { studentList, adminPage, student, setStudentList } = context;

  // console.log(studentList)

  let SingleStudent = useMemo(() => {
    console.log(studentList)
    return studentList.find(student => {
      console.log("use memo", id, student._id)
        return student._id === id
  })
  }, [student, studentList, id])



   const getStudentList = async () => {
    // setGetStudentLoading(true)
    // setGetStudentError("")
    let abortController = new AbortController()
    let { signal } = abortController

    try {
      let { data } = await axiosInstance.get<createdResponse>(`/api/${adminPage? "admin" : "accountant"}/getStudentList`, {
        signal,
        userType: `${adminPage? "admin" : "accountant"}`
      } as CustomAxiosRequestConfig<StudentDetailnew>
      )

      console.log(data)

      if (data.ok) {
        setStudentList(data.data)
      }

    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        // setGetStudentError(error.response?.data?.message || "Something went wrong!");
      } else if ((error as Error).name === 'AbortError') {
        // Handle the request being aborted
        console.error("Request was aborted:", (error as Error).message);
      } else if (error instanceof Error) {
        // Handle other errors
        console.log(error.message)
        // setGetStudentError(error.message);
      } else {
        // Handle unexpected error
        // setGetStudentError("An unexpected error occurred.");
      }
    }
    finally {
      // setGetStudentLoading(false)
    }
  }

  useEffect(() => {
    getStudentList()
  }, [])

  const [showExtraInfo, setShowExtraInfo] = useState<"mandatory" | "nonmandatory" | null>(null)

  return (
    <main className={style.mainContainer}>

      {!showExtraInfo ?
        <section className='w-[100%] h-[100%] flex justify-center items-center flex-col relative'>

          <div className={`${style.backBtn}`}>
            <Link to={`/${adminPage ? "admin" : "accountant"}`}>
              <Button sx={{
                marginBottom: '20px',
                position: 'absolute',
                top: '10px',
                right: '20px',
                background: "#Ffffff !important",
                height: "40px",

                padding: "5px 10px",
                color: "var(--subheading-color)", border: "1px solid var(--subheading-color)"
              }}>
                <ArrowBackIcon />
                Back
              </Button>
            </Link>
          </div>

          <div className={style.card}>
            <h1 className={style.heading}>Student Profile</h1>

            <section className={style.profileSection}>
              <div className={style.studentNameRow}>
                <label className={style.studentName}>Student Name:</label>
                <p className={style.value}>{SingleStudent?.studentName}</p>
              </div>

              <div className={style.subSection}>
                <h2 className={style.subHeading}>Academic Details</h2>
                {/* <div className={style.infoGrid}> */}
                <div className={style.infoRow}>
                  <p className={style.label}>Class</p>
                  <span className={style.value}>{SingleStudent?.studentClass}</span>
                </div>
                <div className={style.infoRow}>
                  <p className={style.label}>Section</p>
                  <span className={style.value}>{SingleStudent?.section}</span>
                </div>
                {/* </div> */}
              </div>

              <div className={style.subSection}>
                <h2 className={style.subHeading}>Fee Details</h2>
                <div className={style.infoRow}>
                  <p className={style.label}>Fee Paid:</p>
                  <span className={style.value}>{SingleStudent?.annualFee}</span>
                </div>
                <div className={style.infoRow}>
                  <p className={style.label}>Fee to Pay:</p>
                  <span className={style.value}>{SingleStudent?.dues}</span>
                </div>
              </div>

              {/* <div className={style.subSection}>
                <h2 className={style.subHeading}>Address</h2>
                <p className={style.value}>#123, 2nd Cross, Bangalore</p>
              </div> */}

              <List className={style.infoList}>
                <ListItemButton
                    onClick={() => setShowExtraInfo("mandatory")}
                >
                  <ListItemText
                    primary="Mandatory Info"
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: {
                          xs: "18px",
                          sm: "22px",
                          md: "22px",
                          lg: "24px",
                          xl: "26px",
                        },
                        textAlign: 'center',
                      },
                    }}
                  />
                </ListItemButton>
                <Divider />

                <ListItemButton
                    onClick={() => setShowExtraInfo("nonmandatory")}
                >
                  <ListItemText
                    primary="Non-Mandatory Info"
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: {
                          xs: "18px",
                          sm: "22px",
                          md: "22px",
                          lg: "24px",
                          xl: "26px",
                        },
                        textAlign: 'center',
                      },
                    }}

                  />
                </ListItemButton>
              </List>
            </section>
          </div>
        </section>
        : showExtraInfo === "mandatory" ? (
          <div className={style.card}>
            <h2 className={style.heading}>Mandatory Details</h2>

            <section className={style.profileSection}>

              {SingleStudent && mandatoryDetails.map((item) => (
                <MandatorySingle
                  key={item.key}
                  item={item}
                  student={SingleStudent}
                />
              ))}

            </section>

            <Button variant='contained'
            sx={{
              display:"block",
              margin:"20px auto"
            }}
            onClick={() => setShowExtraInfo(null)} className={style.backButton}>
              ← Back to Profile
            </Button>
          </div>
        ) : (
          <div className={style.card}>
            <h2 className={style.heading}>Non-Mandatory Details</h2>
           
            {SingleStudent && nonMandatoryDetails.map(item=>
              <NonMandatorySingle key={item.key} item={item} student={SingleStudent} />
            )}
            <Button variant='contained'
              sx={{
                display:"block",
                margin:"20px auto"
              }}
            onClick={() => setShowExtraInfo(null)} className={style.backButton}>
              ← Back to Profile
            </Button>
          </div>
        )

      }
    </main>
  )
}

export default SingleStudentProfile