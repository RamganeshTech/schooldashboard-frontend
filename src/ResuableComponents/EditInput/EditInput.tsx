import { TextField } from '@mui/material';
import React, { useContext } from 'react'
import { SchoolContext } from '../../Context/SchoolContextProvider';

interface InputProps<T,> {
  updateKey: keyof T;
  state: T[keyof T] | null;
  setState: React.Dispatch<React.SetStateAction<T>>;
  limitAmount?: number;
  placeholder: string;
  type: string;
  index?:number;
  required:string;
  updating:boolean;
}



const EditInput = ({ state, setState, required, updateKey, type, placeholder, updating }: InputProps<any>) => {
    const context = useContext(SchoolContext);
      if (!context) {
        throw new Error("Input must be used within a SchoolContextProvider");
      }
    
      const { handleInputChange } = context;
    
      const handleValue = (state:string | boolean | null | number | Date)=>{
        if(state === "null") return ""
    
        if(typeof state === "string" && state.includes("-")){
          let [date, month, year] = state.split("-")
          return `${year}-${month}-${date}`
        }
        else{
          return state ?? "";
        }
      }

      
    
      return (
        <div className={`h-[40px]`}>
          <TextField
          
            type={type}
            
            required={required==="yes"}
            variant='outlined'
            placeholder={placeholder}
            value={handleValue(state)}
            onChange={(e) => handleInputChange(updateKey, e.target.value, setState, updating)}
            
            
            className='shadow-sm'
            sx={{
              width: "100%",
              marginBottom: "16px",
              "& .MuiOutlinedInput-root fieldset": {
                borderWidth: "1px", 
                borderStyle: "solid", 
                borderColor: "#E2E8F0",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "#E2E8F0 !important", 
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderWidth: "1px", 
                borderStyle: "solid",
                borderColor: "#E2E8F0 !important", 
              },
              "& .MuiInputBase-input": {
                height: "10px",
                fontSize: "18px",
                color: "gray",
                padding: "15px 5px"
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#94A3B8", 
                opacity: 1,   
                fontSize: "16px" 
              }
            }}
          />
        </div>
      )
}

export default EditInput