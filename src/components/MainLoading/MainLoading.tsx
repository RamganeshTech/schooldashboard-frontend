import { CircularProgress } from '@mui/material'
import React from 'react'

const MainLoading:React.FC = () => {
  return (
     <div className="flex justify-center items-center h-screen bg-gray-100">
                      <CircularProgress size={70} thickness={4} sx={{ color: "var(--icons-outline-color)",  }} />
                  </div>
  )
}

export default MainLoading