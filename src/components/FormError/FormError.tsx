import React, { Fragment, useContext, useEffect } from 'react'
import { SchoolContext } from '../../Context/SchoolContextProvider'
import style from './FormError.module.css'
import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const FormError:React.FC = () => {

    const context = useContext(SchoolContext)

    if (!context) return;

    const { formError, setisErrorDisplying } = context

    const handleCloseButton = () => {
        setisErrorDisplying(false)
        document.body.style.overflow = "auto"; // Enable scrolling again
    };

    useEffect(() => {
        document.body.style.overflow = "hidden"; // Disable scrolling when the error appears

        return () => {
            document.body.style.overflow = "auto"; // Restore scrolling when unmounting
        };
    }, []);

    return (
        <main className={`${style.errorContainer}`}>
            <section className={`${style.errorMsgSection} shadow-md`}>

                <div className={`${style.closeButton}`}>
                    <IconButton onClick={handleCloseButton}
                        sx={{
                            color: "#222",
                        }}
                    >
                        <Close />
                    </IconButton>
                </div>

                <div className={style.errorMsgDiv}>
                    <h2 className={`${style.errorHeading}`}>Oops Error occured!!!</h2>
                    <br />
                    {formError.split(',').map((ele, index) => {
                        return (
                            <Fragment key={index}>
                                <div key={index} className='flex items-start justify-center'>
                                    <h4 className={`${style.errorMsgs}`}>{ele}</h4>
                                </div>
                            </Fragment>

                        )
                    })}
                </div>

            </section>
        </main>
    )
}

export default FormError