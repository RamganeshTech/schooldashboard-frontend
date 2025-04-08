import { ChangeEvent, useContext, useMemo, useState } from 'react'
import style from './SingleStudentProfile.module.css'
import { Link, useParams } from 'react-router-dom';
import { List, Divider, ListItemButton, ListItemText, Button, IconButton } from '@mui/material';
import { SchoolContext } from '../../Context/SchoolContextProvider';
import MainLoading from '../MainLoading/MainLoading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { mandatoryDetails } from '../../Constants/constants';
import { MandatoryDetails } from '../../Types/types';
import MandatorySingle from './MandatorySingle/MandatorySingle';

const SingleStudentProfile = () => {

  let { id } = useParams()

  let context = useContext(SchoolContext)

  if (!context) {
    return <MainLoading />
  }

  let { studentList, adminPage, student } = context;

  console.log(studentList)

  let SingleStudent = useMemo(() => {
    console.log(studentList)
    return studentList.find(student => {
      console.log("use memo", id, student._id)
        
        return student._id === id
    
  })
  
  }, [student, studentList, id])

  const [showExtraInfo, setShowExtraInfo] = useState<"mandatory" | "nonmandatory" | null>(null)


//   console.log(SingleStudent)
//   console.log("Type of SingleStudent:", typeof SingleStudent);
// console.log("Is Array?", Array.isArray(SingleStudent));
// console.log("Actual value:", SingleStudent);


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

              <div className={style.subSection}>
                <h2 className={style.subHeading}>Address</h2>
                <p className={style.value}>#123, 2nd Cross, Bangalore</p>
              </div>

              <List className={style.infoList}>
                <ListItemButton>
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
                    onClick={() => setShowExtraInfo("mandatory")}
                  />
                </ListItemButton>
                <Divider />

                <ListItemButton>
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
                    onClick={() => setShowExtraInfo("nonmandatory")}

                  />
                </ListItemButton>
              </List>
            </section>
          </div>
        </section>
        : showExtraInfo === "mandatory" ? (
          <div className={style.card}>
            <h2 className={style.heading}>Mandatory Details</h2>

            {/* <section className={style.profileSection}>
      <div className={style.details_Row}>
        <p className={style.label}>Student's Name (as per School Record)</p>
        <div>
        <span className={style.value}>A LAKSHAN</span>
        <IconButton>
          <EditIcon />
        </IconButton>
        </div>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Gender</p>
        <span className={style.value}>Male</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Date of Birth (DD/MM/YYYY)</p>
        <span className={style.value}>02/02/2020</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Permanent Education Number</p>
        <span className={style.value}>22998876875</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Mother's Name</p>
        <span className={style.value}>A YAMAAA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Father's Name</p>
        <span className={style.value}>S ARAVIND</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Guardian's Name</p>
        <span className={style.value}>NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>AADHAAR Number of Student</p>
        <span className={style.value}>******** 0504</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Name of Student as per/in AADHAAR Card</p>
        <span className={style.value}>A LAKSHAN</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Address</p>
        <span className={style.value}>No 202, vetriudayar Kovil street, vellavedu</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Pincode</p>
        <span className={style.value}>624124</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Mobile Number (of Student/ Parent/ Guardian)</p>
        <span className={style.value}>9998535712</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Alternate Mobile Number (of Student/ Parent/ Guardian)</p>
        <span className={style.value}>9214396010</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Contact email-id (of Student/Parent/Guardian)</p>
        <span className={style.value}>NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Mother Tongue of the Student</p>
        <span className={style.value}>137 - TAMIL - Tamil</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Social Category</p>
        <span className={style.value}>2 - SC</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Minority Group</p>
        <span className={style.value}>7 - NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Whether BPL beneficiary</p>
        <span className={style.value}>No</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Whether Antyodaya Anna Yojana (AAY) beneficiary</p>
        <span className={style.value}>NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Whether belongs to EWS / Disadvantaged Group</p>
        <span className={style.value}>No</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Whether CWSN</p>
        <span className={style.value}>No</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Type of Impairments</p>
        <span className={style.value}>NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Indian Nationality</p>
        <span className={style.value}>Yes</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Is Child Identified as Out of School-Child</p>
        <span className={style.value}>No</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>When the Child is mainstreamed</p>
        <span className={style.value}>NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Whether having Disability Certificate</p>
        <span className={style.value}>NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Disability Percentage (in %)</p>
        <span className={style.value}>NA</span>
      </div>
      <div className={style.details_Row}>
        <p className={style.label}>Blood Group</p>
        <span className={style.value}>Under Investigation - Result will be updated soon</span>
      </div>
    </section> */}

            <section className={style.profileSection}>


              {/* {mandatoryDetails.map((item, index) => (
    {SingleStudent && (
      <MandatorySingle
        key={SingleStudent._id}
        item={item}
        student={SingleStudent}
     
      />
    )}
    // <MandatorySingle key={student?._id} item={item} student={SingleStudent} />
  ))} */}

              {SingleStudent && mandatoryDetails.map((item) => (
                <MandatorySingle
                  key={item.key}
                  item={item}
                  student={SingleStudent}
                />
              ))}

            </section>

            <button onClick={() => setShowExtraInfo(null)} className={style.backButton}>
              ← Back to Profile
            </button>
          </div>
        ) : (
          <div className={style.card}>
            <h2 className={style.heading}>Non-Mandatory Details</h2>
            {/* You can add non-mandatory content here */}
            <button onClick={() => setShowExtraInfo(null)} className={style.backButton}>
              ← Back to Profile
            </button>
          </div>
        )

      }
    </main>
  )
}

export default SingleStudentProfile