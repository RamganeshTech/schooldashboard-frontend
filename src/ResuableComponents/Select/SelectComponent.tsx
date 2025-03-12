import { MenuItem, Select } from '@mui/material'
import React, { useContext } from 'react'
import { SchoolContext } from '../../Context/SchoolContextProvider'

interface SelectProps <T,>{
    updateKey: keyof T;
    setState: React.Dispatch<React.SetStateAction<T>>;
    state: boolean | null;
    required:string;
}


const SelectComponent = <T,>({required,state,updateKey,setState}: SelectProps<T>) => {

    const context = useContext(SchoolContext)

    if(!context) return <>Loading...</>;

    const {handleInputChange} = context

  return (
    <div>
         <Select
         required={required === "yes"}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={state ? "New" : "Old"}
   
    sx={{
        width: "100%",
        marginBottom: "16px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
          borderStyle: "solid",
            borderColor: "#E2E8F0 !important",
          },
          "& .MuiInputBase-input": {
            height: "10px",
            fontSize: "14px",
            padding: "10px 5px",
          },
        "& .MuiInputBase-input::placeholder": {
          color: "#94A3B8",
          opacity: 1,  
          fontSize: "16px"
        }
      }}
    onChange={(e)=>{
        let booleanValue = e.target.value === "New" ? true : false;
     handleInputChange(updateKey, booleanValue as boolean,setState )}
    }
  >
    <MenuItem value={"Old"}>Old</MenuItem>
    <MenuItem value={"New"}>New</MenuItem>
  </Select>
    </div>
  )
}

export default SelectComponent