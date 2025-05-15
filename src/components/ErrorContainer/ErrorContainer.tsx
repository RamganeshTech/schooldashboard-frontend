import React from 'react'

import style from './ErrorContainer.module.css'
import { IconButton } from '@mui/material';
import  CloseIcon  from '@mui/icons-material/Close';


interface ErrorModalProps {
    error: string;
    onClose: () => void; 
  }

const ErrorContainer:React.FC<ErrorModalProps> = ({error, onClose}) => {
  return (
    <div className={style.overlay} onClick={onClose}>
                <div className={style.errorContainer}>
                    <h2 className={style.errorHeading}>Error Occurred</h2>
                    <p className={style.errorMessage}>{error}</p>
                    <IconButton 
                        className={style.errorCloseButton} 
                        onClick={onClose} 
                    >
                        <CloseIcon sx={{ fontSize: 30, color: ' var(--icons-outline-color)',
                         }} /> 
                    </IconButton>
                </div>
            </div>
  )
}

export default ErrorContainer