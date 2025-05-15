import { TextField } from '@mui/material';
import React, { useContext } from 'react'
import { SchoolContext } from '../../Context/SchoolContextProvider';


type SearchInputProp = {
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    width?: string | number;
    height?: string | number;
    fontSize?: string | number;
    borderRadius?: string | number;
    padding?: string | number;
    color?: string
}

const SearchInput: React.FC<SearchInputProp> = ({ state, setState, placeholder, width = "100%", height = "10px", fontSize = "18px", borderRadius = "5px", padding = "15px 5px", color = "grey" }) => {


    let context = useContext(SchoolContext)

    if (!context) return;




    return (
        <TextField
            className={`rounded-sm`}
            value={state ?? ""}
            sx={{
                "& .MuiInputBase-input": {
                    height,
                    fontSize,
                    color,
                    padding,
                    width,
                    borderRadius
                },
                "& .MuiInputBase-input::placeholder": {
                    color: "#94A3B8",
                    opacity: 1,
                    fontSize: "14px"
                }
            }}
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)}
        />
    )
}

export default SearchInput