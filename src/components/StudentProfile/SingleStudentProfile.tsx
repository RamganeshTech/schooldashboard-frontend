import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from 'react'
import style from './singleStudentNew.module.css'
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { SchoolContext } from '../../Context/SchoolContextProvider';
import MainLoading from '../MainLoading/MainLoading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { mandatoryDetails, nonMandatoryDetails } from '../../Constants/constants';
import { createdResponse, CustomAxiosRequestConfig, StudentDetailnew } from '../../Types/types';
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

  const [_imgLoading, setImgLoading] = useState<boolean>(false)
  const [_imgUploadError, setImgUploadError] = useState<string>("")


  // console.log(studentList)

  let SingleStudent = useMemo(() => {
    return studentList.find(student => {
      return student._id === id
    })
  }, [student, studentList, id])

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(SingleStudent ? SingleStudent?.studentImage : "");

  const handleImageClick = () => {
    if (uploadedImage) {
      setPreviewImage(uploadedImage);
    }
  };


  const getStudentList = async () => {
    // setGetStudentLoading(true)
    // setGetStudentError("")
    let abortController = new AbortController()
    let { signal } = abortController

    try {
      let { data } = await axiosInstance.get<createdResponse>(`/api/${adminPage ? "admin" : "accountant"}/getStudentList`, {
        signal,
        userType: `${adminPage ? "admin" : "accountant"}`
      } as CustomAxiosRequestConfig<StudentDetailnew>
      )

      // console.log(data)

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
        // console.error("Request was aborted:", (error as Error).message);
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

  const uploadStudentImage = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("getting called")
    let abortController = new AbortController()
    let { signal } = abortController

    const file = e.target.files?.[0];
    if (!file) {
      throw new Error("please select the image first")
    }
    let formData = new FormData()
    formData.append("file", file)

    try {
      setImgLoading(true)
      let { data } = await axiosInstance.post(`/api/${adminPage ? "admin" : "accountant"}/student/uploadimage/${id}`, formData, {
        signal,
        userType: `${adminPage ? "admin" : "accountant"}`,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      } as any)

      console.log(data)

      if (data.ok) {
        setStudentList((prev: StudentDetailnew[]) => {
          return prev.map(student => {
            if (student._id === id) {
              return { ...student, studentImage: data.image };
            }
            return student;
          });
        })
      }

    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        setImgUploadError(error.response?.data.error.message)
      } else if ((error as Error).name === 'AbortError') {
        console.log(error)
        setImgUploadError((error as Error).message)

      } else if (error instanceof Error) {
        console.log(error.message)
        setImgUploadError(error.message)
      } else {
        console.log(error)
        setImgUploadError((error as any).response.data.error.message)
      }
    }
    finally {
      formData.set("file", "")
      setImgLoading(false)
    }
  }


  useEffect(() => {
    getStudentList()
  }, [])

  useEffect(() => {
    if (SingleStudent?.studentImage) {
      setUploadedImage(SingleStudent.studentImage);
    }
  }, [SingleStudent]);

  const [showExtraInfo, setShowExtraInfo] = useState<"mandatory" | "nonmandatory" | null>(null)

  if (!SingleStudent) return <MainLoading />;

  // HERE STATS THE STORUY
  const getInitials = (name: string) => {
    const words = name.split(' ');
    return words.length === 1
      ? words[0][0]
      : words[0][0] + words[1][0];
  };

  return (
    // <main className={style.mainContainer}>

    //   {!showExtraInfo ?
    //     <section className='w-[100%] h-[100%] flex justify-center items-center flex-col relative'>

    //       <div className={`${style.backBtn}`}>
    //         <Link to={`/${adminPage ? "admin" : "accountant"}`}>
    //           <Button sx={{
    //             marginBottom: '20px',
    //             position: 'absolute',
    //             top: '10px',
    //             right: '20px',
    //             background: "#Ffffff !important",
    //             height: "40px",

    //             padding: "5px 10px",
    //             color: "var(--subheading-color)", border: "1px solid var(--subheading-color)"
    //           }}>
    //             <ArrowBackIcon />
    //             Back
    //           </Button>
    //         </Link>
    //       </div>

    //       <div className={style.card}>
    //         <h1 className={style.heading}>Student Profile</h1>

    //         <div>
    //           <input
    //             type="file"
    //             accept="image/*"
    //             onChange={uploadStudentImage}
    //             multiple={false} // <== prevents multiple file selection
    //           />

    //           {imgLoading && <p>Uploading...</p>}

    //           {SingleStudent?.studentImage && (
    //             <img
    //               src={SingleStudent.studentImage}
    //               alt="Student"
    //               className="w-32 h-32 object-cover rounded-full mt-2"
    //             />
    //           )}

    //         </div>

    //         <section className={style.profileSection}>
    //           <div className={style.studentNameRow}>
    //             <label className={style.studentName}>Student Name:</label>
    //             <p className={style.value}>{SingleStudent?.studentName}</p>
    //           </div>

    //           <div className={style.subSection}>
    //             <h2 className={style.subHeading}>Academic Details</h2>
    //             {/* <div className={style.infoGrid}> */}
    //             <div className={style.infoRow}>
    //               <p className={style.label}>Class</p>
    //               <span className={style.value}>{SingleStudent?.studentClass}</span>
    //             </div>
    //             <div className={style.infoRow}>
    //               <p className={style.label}>Section</p>
    //               <span className={style.value}>{SingleStudent?.section}</span>
    //             </div>
    //             {/* </div> */}
    //           </div>

    //           <div className={style.subSection}>
    //             <h2 className={style.subHeading}>Fee Details</h2>
    //             <div className={style.infoRow}>
    //               <p className={style.label}>Fee Paid:</p>
    //               <span className={style.value}>{SingleStudent?.annualFee}</span>
    //             </div>
    //             <div className={style.infoRow}>
    //               <p className={style.label}>Fee to Pay:</p>
    //               <span className={style.value}>{SingleStudent?.dues}</span>
    //             </div>
    //           </div>

    //           {/* <div className={style.subSection}>
    //             <h2 className={style.subHeading}>Address</h2>
    //             <p className={style.value}>#123, 2nd Cross, Bangalore</p>
    //           </div> */}

    //           <List className={style.infoList}>
    //             <ListItemButton
    //               onClick={() => setShowExtraInfo("mandatory")}
    //             >
    //               <ListItemText
    //                 primary="Mandatory Info"
    //                 sx={{
    //                   '& .MuiTypography-root': {
    //                     fontSize: {
    //                       xs: "18px",
    //                       sm: "22px",
    //                       md: "22px",
    //                       lg: "24px",
    //                       xl: "26px",
    //                     },
    //                     textAlign: 'center',
    //                   },
    //                 }}
    //               />
    //             </ListItemButton>
    //             <Divider />

    //             <ListItemButton
    //               onClick={() => setShowExtraInfo("nonmandatory")}
    //             >
    //               <ListItemText
    //                 primary="Non-Mandatory Info"
    //                 sx={{
    //                   '& .MuiTypography-root': {
    //                     fontSize: {
    //                       xs: "18px",
    //                       sm: "22px",
    //                       md: "22px",
    //                       lg: "24px",
    //                       xl: "26px",
    //                     },
    //                     textAlign: 'center',
    //                   },
    //                 }}

    //               />
    //             </ListItemButton>
    //           </List>
    //         </section>
    //       </div>
    //     </section>
    //     : showExtraInfo === "mandatory" ? (
    //       <div className={style.detailcard}>
    //         <h2 className={style.heading}>Mandatory Details</h2>

    //         <section className={`${style.profileSection} ${style.details}`}>

    //           {SingleStudent && mandatoryDetails.map((item) => (
    //             <MandatorySingle
    //               key={item.key}
    //               item={item}
    //               student={SingleStudent}
    //             />
    //           ))}

    //         </section>

    //         <Button variant='contained'
    //           sx={{
    //             display: "block",
    //             margin: "20px auto"
    //           }}
    //           onClick={() => setShowExtraInfo(null)} className={style.backButton}>
    //           ← Back to Profile
    //         </Button>
    //       </div>
    //     ) : (
    //       <div className={style.detailcard}>
    //         <h2 className={style.heading}>Non-Mandatory Details</h2>

    //         <section className={`${style.profileSection} ${style.details}`}>
    //           {SingleStudent && nonMandatoryDetails.map(item =>
    //             <NonMandatorySingle key={item.key} item={item} student={SingleStudent} />
    //           )}
    //         </section>

    //         <Button variant='contained'
    //           sx={{
    //             display: "block",
    //             margin: "20px auto"
    //           }}
    //           onClick={() => setShowExtraInfo(null)} className={style.backButton}>
    //           ← Back to Profile
    //         </Button>
    //       </div>
    //     )

    //   }
    // </main>
    <main className={`${style.mainContainer}`}>
     {!showExtraInfo ? <> <div className={`${style.backBtn}`}>
        <Link to={`/${adminPage ? "admin" : "accountant"}`}>
          <Button sx={{
            marginBottom: '20px',
            position: 'absolute',
            top: '20%',
            right: '5%',
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
      <div className={`${style.profileWrapper} !mt-[70px] `}>
        <div className={style.avatarContainer}>
          <div className={style.avatar} onClick={handleImageClick}>
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Student"
                className={style.avatarImage}
              />
            ) : (
              <span>
                {SingleStudent.studentName &&
                  getInitials(SingleStudent.studentName)}
              </span>
            )}
            <div
              className={style.pencilIcon}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              ✏️
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={uploadStudentImage}
            className={style.hiddenInput}
          />
        </div>

        {previewImage && (
          <div className={style.previewOverlay} onClick={() => setPreviewImage("")}>
            <div className={style.previewContainer}>
              <button className={style.closeButton} onClick={() => setPreviewImage("")}>✖</button>
              <img src={uploadedImage!} alt="Full Preview" className={style.fullImage} />
            </div>
          </div>
        )}

        <h2 className={style.name}>{SingleStudent.studentName}</h2>

        <div className={style.card}>
          <h3 className={style.sectionTitle}>Student Details</h3>
          <div className={style.row}>
            <span className={style.label}>Class</span>
            <span className={style.value}>{SingleStudent.studentClass}</span>
          </div>
          <div className={style.row}>
            <span className={style.label}>Section</span>
            <span className={style.value}>{SingleStudent.section}</span>
          </div>
          <div className={style.row}>
            <span className={style.label}>Address</span>
            <span className={`${style.value} ${style.sidelayout}`}>{SingleStudent.mandatory.address ? SingleStudent.mandatory.address : "N/A"}</span>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.row}>
            <span className={style.label}>Fee Paid</span>
            <span className={style.value}>₹{SingleStudent.annualFee}</span>
          </div>
          <div className={style.row}>
            <span className={style.label}>Fee To Pay</span>
            <span className={style.value}>₹{SingleStudent.dues}</span>
          </div>
        </div>

        <div className={style.buttonContainer}>
          <button className={style.actionButton} onClick={()=> setShowExtraInfo("mandatory")}>Mandatory Info</button>
          <button className={style.actionButton} onClick={()=> setShowExtraInfo("nonmandatory")}>UDISE Info</button>
        </div>
      </div>
      </>
       : showExtraInfo === "mandatory" ? (
          <div className={style.detailcard}>
            <h2 className={style.heading}>Mandatory Details</h2>

            <section className={`${style.profileSection} ${style.details}`}>

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
                display: "block",
                margin: "20px auto"
              }}
              onClick={() => setShowExtraInfo(null)} className={style.backButton}>
              ← Back to Profile
            </Button>
          </div>
        ) : (
          <div className={style.detailcard}>
            <h2 className={style.heading}>Non-Mandatory Details</h2>

            <section className={`${style.profileSection} ${style.details}`}>
              {SingleStudent && nonMandatoryDetails.map(item =>
                <NonMandatorySingle key={item.key} item={item} student={SingleStudent} />
              )}
            </section>

            <Button variant='contained'
              sx={{
                display: "block",
                margin: "20px auto"
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