import React, { useContext, useEffect, useState } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import axiosInstance from '../../Api/apiClient';
import { SchoolContext } from '../../Context/SchoolContextProvider';
import { CustomAxiosRequestConfig, StudentDetailnew } from '../../Types/types';
import { placeholderMap } from '../../Constants/constants';

const START = 101;
const WINDOW = 15;


type SelectSeriolNoProp = {
  studentList: StudentDetailnew[]
}

const SelectSeriolNo: React.FC<SelectSeriolNoProp> = ({ studentList }) => {

  let context = useContext(SchoolContext)

  if (!context) return;

  let { student, setStudent } = context

  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTakenIds = async () => {
      try {
        const { data } = await axiosInstance.get('/api/accountant/students/taken-sr-ids', {
          userType: "accountant"
        } as CustomAxiosRequestConfig<void>);

        console.log("data", data)
        if (data.ok) {
          const taken = data.taken;


          const tail = START + WINDOW - 1 + taken.length;
          const fullRange = Array.from({ length: tail - START + 1 }, (_, i) => START + i);
          const available = fullRange.filter(n => !taken.includes(n));
          const options = available.slice(0, WINDOW).map(n => `SR-${n}`);

          setDropdownOptions(options);
        }
      } catch (err) {
        console.error('Failed to load SR IDs', err);
        setDropdownOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTakenIds();
  }, [studentList]);


  return (
    <FormControl fullWidth
      className='shadow-sm'

      sx={{
        height: "40px",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontSize: "18px",
          padding: "0 5px",
          color: "#94A3B8",
          textAlign: "left",
          "& fieldset": {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#E2E8F0",
          },
          "&:hover fieldset": {
            borderColor: "#E2E8F0 !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#E2E8F0 !important",
          },
        },
      }}
    >

      {/* {!loading && <CircularProgress size={24} thickness={5} />} */}
      {!loading && <Select
        labelId="sr-id-label"
        // label={placeholderMap["srId"]}
        value={student.srId ? student.srId : ""}
        onChange={(e) => setStudent((p) => ({ ...p, srId: e.target.value }))}
        renderValue={(selected) =>
          selected ? selected : placeholderMap["srId"]
        }
        displayEmpty
      >
        {dropdownOptions.map((id) => (
          <MenuItem key={id} value={id}>{id}</MenuItem>
        ))}
      </Select>}
    </FormControl>
  );
};

export default SelectSeriolNo;
