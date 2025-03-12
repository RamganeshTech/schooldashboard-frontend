import React, { Fragment, useContext, useEffect } from 'react'
import style from './DeletedCredential.module.css'
import { SchoolContext } from '../../../Context/SchoolContextProvider';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeletedSingleLogin from '../../../components/DeletedSingleLogin/DeletedSingleLogin';
import MainLoading from '../../../components/MainLoading/MainLoading';

const DeletedCredential:React.FC = () => {

  const context = useContext(SchoolContext);

  if (!context) return;

  const { deletedLoginList,  deletedLoginsLoading,getDeletedLoginList } = context

  let navigate = useNavigate()

  const handleAccountantCreationButton = () => {
    navigate("../Accountantlogincredentials")
  }
  
  useEffect(() => {
    getDeletedLoginList()
  }, [])
  
  if(deletedLoginsLoading){
    return  <MainLoading />
  }

  return (
    <main className={`${style.notiContainer}`}>
      <div className={`${style.backBtn}`}>
        
        <Button

          onClick={handleAccountantCreationButton}
          sx={{
            marginBottom: '20px',
            position: 'absolute',  
            top: '100px',           
            right: '40px',
            background: "#F6F5FA",
            height: "40px",
            padding: "5px 10px",
            color: "var(--subheading-color)",
            border: "none",
            width: "100px",
            fontSize: "20px",
            fontWeight: "500",

          }}>
          Back
        </Button>
      </div>

      {deletedLoginList.length > 0 && <h1 className={`${style.notiHeading}`}>Created Credentials</h1>}

      

      {deletedLoginList.length > 0 ? deletedLoginList.map((ele, index) => {
       return (
          <Fragment key={ele._id}>
            <DeletedSingleLogin ele={ele} index={index} />
          </Fragment>
        )
      }) :
        <>
          <h1 className={`${style.noNotificationHeading}`}>No Credentials Created so far...</h1>
        </>
      }
    </main>      
  )
}

export default DeletedCredential