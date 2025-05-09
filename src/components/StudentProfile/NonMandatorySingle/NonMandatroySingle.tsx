// NonMandatorySingle.tsx
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import style from '../SingleStudentProfile.module.css';
import { createdResponse, CustomAxiosRequestConfig, NonMandatoryDetails, StudentDetailnew } from '../../../Types/types';
import {  ProfileNonMandatory } from '../../../Constants/constants';
import EditIcon from '@mui/icons-material/Edit';
import axiosInstance from '../../../Api/apiClient';
import { SchoolContext } from '../../../Context/SchoolContextProvider';
import MainLoading from '../../MainLoading/MainLoading';
import axios from 'axios';

type NonMandatorySingleProp = {
  item: ProfileNonMandatory; // key must be keyof NonMandatoryDetails
  student: StudentDetailnew;
};

const NonMandatorySingle: React.FC<NonMandatorySingleProp> = ({ item, student }) => {
  const context = useContext(SchoolContext);
  if (!context) return <MainLoading />;
  const { adminPage, setStudentList } = context;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [isNonMandatoryLoading, setIsNonMandatoryLoading] = useState<boolean>(false);
  const [inputFieldType, setInputFieldInputType] = useState<string>("text");

  const sectionRef = useRef<HTMLDivElement>(null);

  // Set the input field type based on the key 
  useEffect(() => {
    setInputFieldInputType(() => {
      if (item.key === "admissionDate") {
        return "date";
      }
      // For numeric fields (e.g. rollNumber, marksObtainedPercentage, daysAttendedLastYear, etc.)
      if (
        item.key.toLowerCase().includes("number") ||
        item.key.toLowerCase().includes("marks") ||
        item.key.toLowerCase().includes("roll") ||
        item.key.toLowerCase().includes("height") ||
        item.key.toLowerCase().includes("weight") ||
        item.key.toLowerCase().includes("distance")
      ) {
        return "number";
      }
      return "text";
    });
  }, [item.key]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUpdate = async () => {
    setIsNonMandatoryLoading(true);
    try {
      const abortController = new AbortController();
      const { signal } = abortController;

      // Assume that non-mandatory details are stored in student.nonMandatory (adjust if stored differently)
      const updatePayload = {
        nonMandatory: {
          [item.key]: inputValue,
        },
      };

      // console.log("data need to be updated", updatePayload)

      let { data } = await axiosInstance.patch<createdResponse>(
        `/api/${adminPage ? "admin" : "accountant"}/updateStudentProfileNonMandatory/${student._id}`,
        updatePayload,
        {
          signal,
          userType: adminPage ? "admin" : "accountant",
        } as CustomAxiosRequestConfig<StudentDetailnew>
      );

      if (data.ok) {
        // Update local context with the updated student data
        setStudentList((prev: StudentDetailnew[]) =>
          prev.map(s => s._id === student._id ? data.data : s)
        );
        setInputValue(null);
        setIsEditing(false);
      }
      // console.log(data.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        // Handle axios-specific errors if needed
      }
    } finally {
      setIsNonMandatoryLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        handleCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className={style.details_Row}>
        <p className={style.label}>{item.label}</p>
        <div className={style.value}>
          <span>
            {student.nonMandatory?.[item.key as keyof NonMandatoryDetails] ?? "NA"}
          </span>
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        </div>
      </div>

      {isEditing && (
        <div className={style.modalBackdrop}>
          <div ref={sectionRef} className={style.modalContent}>
            <h3 className='!mb-2'>Edit {item.label}</h3>
            <TextField
              value={inputValue ?? ""}
              onChange={handleInputChange}
              fullWidth
              type={inputFieldType}
            //   placeholder={`Enter ${item.label}`}
              placeholder={`Enter here`}
              className={style.mandatoryinputfield}
            />
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Button variant="contained" onClick={handleUpdate} className={style.submitButton}>
                {isNonMandatoryLoading ? <CircularProgress size={20} thickness={4} sx={{ color: "#fafafa" }} /> : "Submit"}
              </Button>
              <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NonMandatorySingle;
