import React, { useContext, useState } from 'react';
import { createdResponse, CustomAxiosRequestConfig, EditStudent, StudentDetailnew } from '../../Types/types'
import style from './SingleStudent.module.css'
import { SchoolContext } from '../../Context/SchoolContextProvider';
import { Button, CircularProgress } from '@mui/material';
import EditInput from '../../ResuableComponents/EditInput/EditInput';
import { calculateBusFirstTermDues, calculateBusSecondTermDues, calculateDues } from '../../Utils/studentUtils';
import axiosInstance from '../../Api/apiClient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { studentFieldOrder } from '../../Constants/constants';


const nonEditableFields = [
    "srId", "admissionBillNo",
    "firstTermBillNo",
    "secondTermBillNo",]
    
interface SingleStudentDetail {
    student: StudentDetailnew
}

const SingleStudent: React.FC<SingleStudentDetail> = ({ student }) => {

    const context = useContext(SchoolContext)

    if (!context) return;

    const { handleError, setIsStudentListUpdated, setStudentList,
        adminPage, setNotificationList, setIsEditing,
        setCurrentEditingId, currentEditingId,
        setEditStudent, editStudent,
        setFormError, setisErrorDisplying } = context

    const [rowUpdating, setRowUpdating] = useState<boolean>(false)
    const [allowNavigationStudentProfile, setAllowNavigationStudentProfile] = useState<boolean>(true)

    const [updateLoading, setUpdateLoading] = useState<boolean>(false);

    let navigate = useNavigate()

    const handleStudentProfileNavigate = () => {
        if (!rowUpdating && allowNavigationStudentProfile) {
            navigate(`/${adminPage ? `admin` : "accountant"}/singlestudentprofile/${student._id}`)
        }
    }

    let hiddenStudentDetails = [
        // "admissionBillNo",
        // "firstTermBillNo",
        // "secondTermBillNo",
        "dues",
        "busfirstTermDues",
        "busSecondTermDues",
        "_id",
        "createdAt",
        "updatedAt",
        "__v"
    ]

    const NumberTypeList = [
        "adminssionAmt",
        "adminssionPaidAmt",
        "firstTermAmt",
        "firstTermPaidAmt",
        "secondTermAmt",
        "secondTermPaidAmt",
        "annualPaidAmt",
        "busFirstTermAmt",
        "busFirstTermPaidAmt",
        "busSecondTermAmt",
        "busSecondTermPaidAmt",
        "annualFee",
        "concession",
    ]

    let dateList = [
        "admissionDate",
        "firstTermDate",
        "secondTermDate"
    ]

    const inputType = (ele: string) => {
        if (dateList.includes(ele)) {
            return "date"
        }
        else if (NumberTypeList.includes(ele)) {
            return "number"
        }
        else {
            return "text"
        }
    }

    const handleRequest = () => {
        if (currentEditingId && currentEditingId !== student._id) {
            alert("Please finish editing the other student before editing another.");
            return;
        }

        setAllowNavigationStudentProfile(false)
        setRowUpdating(true)
        setIsEditing(true)
        setCurrentEditingId(student._id)
        setEditStudent(() => {

            const updatedStudent = { ...student };

            return updatedStudent;
        });
    }

    const handleCancelEditing = () => {
        setRowUpdating(false);
        setIsEditing(false);
        setIsStudentListUpdated(true)
        setAllowNavigationStudentProfile(false)
        setCurrentEditingId(null)
    }

    const handleSave = async () => {
        setUpdateLoading(true)
        try {
            let errors = handleError(editStudent)
            let isErrorExists: string | Array<any> = Object.values(errors)

            if (isErrorExists.length > 0) {
                isErrorExists = isErrorExists.join(",")
                throw new Error(`Please fill the input with correct details,${isErrorExists}`)
            }

            const feeKeys = [
                "adminssionPaidAmt", "firstTermPaidAmt", "secondTermPaidAmt", "annualPaidAmt",
                "adminssionAmt", "firstTermAmt", "secondTermAmt", "annualFee"
            ];

            const busFirstTermKeys = ["busFirstTermPaidAmt", "busFirstTermAmt"];
            const busSecondTermKeys = ["busSecondTermPaidAmt", "busSecondTermAmt"];

            const fieldsRequiringApproval: Partial<Record<keyof StudentDetailnew, string | number | null>> = {};
            const updatedFields: Partial<Record<keyof StudentDetailnew, string | number | null>> = {};


            let recalculateDues = false;
            let recalculateBusFirstTermDues = false;
            let recalculateBusSecondTermDues = false;


            let checkRecalculateDues = 1;
            let checkRecalculateBusFirstTermDues = 1;
            let checkRecalculateBusSecondTermDues = 1;

            for (const key in editStudent) {
                if (editStudent[key as keyof EditStudent] !== student[key as keyof StudentDetailnew]) {

                    const currentValue = student[key as keyof StudentDetailnew];
                    if (currentValue !== null && currentValue !== "" && currentValue !== 0) {
                        let newValue = editStudent[key as keyof EditStudent];

                        if (typeof newValue === "string") {
                            newValue = newValue.trim();
                        }

                        if (
                            typeof newValue === "string" ||
                            typeof newValue === "number" ||
                            newValue === null
                        ) {
                            fieldsRequiringApproval[key as keyof StudentDetailnew] = newValue;
                        }

                        // fieldsRequiringApproval[key as keyof StudentDetailnew] = newValue; 

                        if (feeKeys.includes(key)) {
                            checkRecalculateDues = 0
                        }
                        if (busFirstTermKeys.includes(key)) {
                            checkRecalculateBusFirstTermDues = 0
                        }
                        if (busSecondTermKeys.includes(key)) {
                            checkRecalculateBusSecondTermDues = 0
                        }
                    } else {
                        let newValue = String(editStudent[key as keyof EditStudent]);

                        if (typeof newValue === "string") {
                            newValue = newValue.trim();
                        }

                        updatedFields[key as keyof StudentDetailnew] = newValue;

                    }
                    if (feeKeys.includes(key)) recalculateDues = true;
                    if (busFirstTermKeys.includes(key)) recalculateBusFirstTermDues = true;
                    if (busSecondTermKeys.includes(key)) recalculateBusSecondTermDues = true;
                }
            }

            // if (recalculateDues) {
            //     const calculatedDues = calculateDues(editStudent);
            //     Object.keys(calculatedDues).forEach((key) => {
            //         if (!checkRecalculateDues) {
            //             fieldsRequiringApproval[key as keyof StudentDetailnew] = calculatedDues[key as keyof StudentDetailnew];
            //         } else {
            //             updatedFields[key as keyof StudentDetailnew] = calculatedDues[key as keyof StudentDetailnew];
            //         }
            //     });
            // }

            if (recalculateDues) {
                const calculatedDues = calculateDues(editStudent);
                Object.keys(calculatedDues).forEach((key) => {
                    const value = calculatedDues[key as keyof StudentDetailnew];

                    // Skip if the key is "mandatory" or if the value is not a string or number (or null/undefined)
                    if (key === "mandatory" || (typeof value === "object" && value !== null)) {
                        return;
                    }

                    if (!checkRecalculateDues) {
                        fieldsRequiringApproval[key as keyof StudentDetailnew] = value;
                    } else {
                        updatedFields[key as keyof StudentDetailnew] = value;
                    }
                });
            }




            // if (recalculateBusFirstTermDues) {
            //     const calculatedBusFirstTermDues = calculateBusFirstTermDues(editStudent);
            //     Object.keys(calculatedBusFirstTermDues).forEach((key) => {
            //         if (!checkRecalculateBusFirstTermDues) {
            //             fieldsRequiringApproval[key as keyof StudentDetailnew] = calculatedBusFirstTermDues[key as keyof StudentDetailnew];
            //         } else {
            //             updatedFields[key as keyof StudentDetailnew] = calculatedBusFirstTermDues[key as keyof StudentDetailnew];
            //         }
            //     });
            // }

            if (recalculateBusFirstTermDues) {
                const calculatedBusFirstTermDues = calculateBusFirstTermDues(editStudent);

                Object.keys(calculatedBusFirstTermDues).forEach((key) => {
                    const value = calculatedBusFirstTermDues[key as keyof StudentDetailnew];

                    // Skip if the key is "mandatory" or if the value is an object (and not null)
                    if (key === "mandatory" || (typeof value === "object" && value !== null)) {
                        return;
                    }

                    if (!checkRecalculateBusFirstTermDues) {
                        fieldsRequiringApproval[key as keyof StudentDetailnew] = value;
                    } else {
                        updatedFields[key as keyof StudentDetailnew] = value;
                    }
                });
            }


            // if (recalculateBusSecondTermDues) {
            //     const calculatedBusSecondTermDues = calculateBusSecondTermDues(editStudent);
            //     Object.keys(calculatedBusSecondTermDues).forEach((key) => {
            //         if (!checkRecalculateBusSecondTermDues) {
            //             fieldsRequiringApproval[key as keyof StudentDetailnew] = calculatedBusSecondTermDues[key as keyof StudentDetailnew];
            //         } else {
            //             updatedFields[key as keyof StudentDetailnew] = calculatedBusSecondTermDues[key as keyof StudentDetailnew];
            //         }
            //     });
            // }

            if (recalculateBusSecondTermDues) {
                const calculatedBusSecondTermDues = calculateBusSecondTermDues(editStudent);

                Object.keys(calculatedBusSecondTermDues).forEach((key) => {
                    const value = calculatedBusSecondTermDues[key as keyof StudentDetailnew];

                    // Skip if the key is "mandatory" or if the value is an object (and not null)
                    if (key === "mandatory" || (typeof value === "object" && value !== null)) {
                        return;
                    }

                    if (!checkRecalculateBusSecondTermDues) {
                        fieldsRequiringApproval[key as keyof StudentDetailnew] = value;
                    } else {
                        updatedFields[key as keyof StudentDetailnew] = value;
                    }
                });
            }



            // API CALLING FOR ADMIN PERMISSION
            if (Object.keys(fieldsRequiringApproval).length > 0) {
                let abortController = new AbortController()
                let { signal } = abortController

                let { data } = await axiosInstance.put<createdResponse>(`/api/accountant/updateStudentwithPermession/${currentEditingId}`,
                    {
                        studentId: currentEditingId,
                        studentName: editStudent.studentName,
                        fieldsRequired: fieldsRequiringApproval
                    },
                    {
                        signal,
                        userType: "accountant"
                    } as CustomAxiosRequestConfig<Partial<StudentDetailnew>>
                )


                if (data.ok) {
                    setNotificationList((prev) => [
                        ...prev,
                        { email: "admin@example.com", requestTo: "update", studentName: editStudent.studentName, fields: fieldsRequiringApproval, _id: currentEditingId as string },
                    ]);
                }
            }

            //API CALLING FOR DIRECT UPDATION
            if (Object.keys(updatedFields).length > 0) {
                let abortController = new AbortController()
                let { signal } = abortController

                let { data } = await axiosInstance.put<createdResponse>(`/api/accountant/updateStudentDirectly/${currentEditingId}`, updatedFields, {
                    signal,
                    userType: "accountant"
                } as CustomAxiosRequestConfig<Partial<StudentDetailnew>>
                )

                if (data.ok) {
                    setStudentList((prev) => {
                        let newList = [...prev];

                        return newList.map(ele => {
                            if (ele._id == currentEditingId) {
                                return { ...ele, ...updatedFields } as StudentDetailnew
                            }
                            else {
                                return ele
                            }
                        })
                    });


                    const today = new Date();
                    const modifiedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;

                    const fieldsModified = Object.keys(updatedFields);
                    const relationId = editStudent?._id


                    await axiosInstance.post('/api/accountant/changesmodified', {
                        modifiedDate,
                        fieldsModified,

                        relationId
                    },
                        {
                            userType: "accountant"
                        } as CustomAxiosRequestConfig<{}>);
                }
            }

            setRowUpdating(false);
            setIsEditing(false);
            setIsStudentListUpdated(true)
            setAllowNavigationStudentProfile(true)
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setFormError(error.response?.data?.message || "Something went wrong!");
                setisErrorDisplying(true)
            } else if ((error as Error).name === 'AbortError') {
                setisErrorDisplying(true)
            } else if (error instanceof Error) {
                setFormError(error.message);
                setisErrorDisplying(true)
            } else {
                setFormError("An unexpected error occurred.");
                setisErrorDisplying(true)
            }
        }
        finally {
            setUpdateLoading(false)
        }
    };

    const handleAdminSave = async () => {
        setUpdateLoading(true)
        try {

            const feeKeys = [
                "adminssionPaidAmt", "firstTermPaidAmt", "secondTermPaidAmt", "annualPaidAmt",
                "adminssionAmt", "firstTermAmt", "secondTermAmt", "annualFee"
            ];

            const busFirstTermKeys = ["busFirstTermPaidAmt", "busFirstTermAmt"];
            const busSecondTermKeys = ["busSecondTermPaidAmt", "busSecondTermAmt"];



            let errors = handleError(editStudent)

            let isErrorExists: string | Array<any> = Object.values(errors)

            if (isErrorExists.length > 0) {
                isErrorExists = isErrorExists.join(",")
                throw new Error(`Please fill the input with correct details,${isErrorExists}`)
            }




            let updatedStudent = { ...editStudent };

            // ✅ Check if any **fee-related** field is present in editStudent, then calculate dues
            if (Object.keys(editStudent).some(key => feeKeys.includes(key))) {
                updatedStudent = { ...updatedStudent, ...calculateDues(updatedStudent) };
            }

            // ✅ Check if any **bus first-term-related** field is present, then calculate dues
            if (Object.keys(editStudent).some(key => busFirstTermKeys.includes(key))) {
                updatedStudent = { ...updatedStudent, ...calculateBusFirstTermDues(updatedStudent) };
            }

            // ✅ Check if any **bus second-term-related** field is present, then calculate dues
            if (Object.keys(editStudent).some(key => busSecondTermKeys.includes(key))) {
                updatedStudent = { ...updatedStudent, ...calculateBusSecondTermDues(updatedStudent) };
            }

            let abortController = new AbortController()
            let { signal } = abortController

            let { data } = await axiosInstance.patch<createdResponse>(`/api/admin/updateStudentAdmin/${currentEditingId}`,
                updatedStudent,
                {
                    signal,
                    userType: "admin"
                } as CustomAxiosRequestConfig<Partial<StudentDetailnew>>
            )

            if (data.ok) {
                setStudentList((prev) => {
                    let newList = [...prev];
                    return newList.map(ele => {
                        if (ele._id == currentEditingId) {
                            return { ...ele, ...updatedStudent } as StudentDetailnew
                        }
                        else {
                            return ele
                        }
                    })
                });


                let onlyModifiedKeys = {};
                // for (const key in updatedStudent) {
                //     if (updatedStudent[key as keyof StudentDetailnew] !== student[key as keyof StudentDetailnew]) {

                //         onlyModifiedKeys = {...onlyModifiedKeys, [key]:updatedStudent[key as keyof StudentDetailnew]}

                //     }
                // }

                for (const key in updatedStudent) {
                    const typedKey = key as keyof typeof editStudent;

                    if (updatedStudent[typedKey] !== student[typedKey]) {
                        onlyModifiedKeys = {
                            ...onlyModifiedKeys,
                            [typedKey]: updatedStudent[typedKey],
                        };
                    }
                }


                const today = new Date();
                const modifiedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
                const fieldsModified = Object.keys(onlyModifiedKeys);
                const relationId = updatedStudent?._id



                await axiosInstance.post('/api/admin/changesmodified', {
                    modifiedDate,
                    fieldsModified,
                    relationId
                }, {
                    userType: "admin"
                } as CustomAxiosRequestConfig<{}>);

            }


            setRowUpdating(false);
            setIsEditing(false);
            setIsStudentListUpdated(true)
            setAllowNavigationStudentProfile(true)
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setFormError(error.response?.data?.message || "Something went wrong!");
                setisErrorDisplying(true)
            } else if ((error as Error).name === 'AbortError') {
                setisErrorDisplying(true)
            } else if (error instanceof Error) {
                setFormError(error.message);
                setisErrorDisplying(true)
            } else {
                setFormError("An unexpected error occurred.");
                setisErrorDisplying(true)
            }
        }
        finally {
            setUpdateLoading(false)
        }
    }

    const handleGenerateTC = async (srId: string) => {
        try {
            const { data } = await axiosInstance.patch(`/api/admin/generatetc/${srId}`, {
                userType: "admin"
            } as CustomAxiosRequestConfig<void>)

            // console.log("data", data)
            if (data.ok) {
                return data.data
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data?.message || "Something went wrong!");
            } else if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unexpected error occurred.");
            }
        }
    }

    //  FOR COLOR ADMINSION AMOUT ALSO
    // let adminssionPaidAmount = ""
    let firstTermPaidAmount = "";
    let secondTermPaidAmount = ""
    let totalDueColor = "";
    let studentNameColor = ""

    let { firstTermPaidAmt, secondTermPaidAmt, firstTermAmt, secondTermAmt, concession, adminssionAmt, adminssionPaidAmt } = student

    let remainingFirstTermAmt: number | undefined;
    let remainingSecondTermAmt: number | undefined;
    let remainingConcession: number | undefined = (concession ?? 0)

    // REMOVE THIS IF CONDITION FOR MAKING THE COLOR INDICATION FOR ADMNSION AMOUNT TOO
    if (adminssionPaidAmt !== null && concession !== null) {
        let admissionlevelCalculation: number = adminssionAmt ? adminssionAmt - (adminssionPaidAmt ?? 0) : 0;
        let remainingAdmissionAmount: number = concession ? admissionlevelCalculation - concession : admissionlevelCalculation

        remainingAdmissionAmount = Math.max(0, remainingAdmissionAmount)

        if (remainingAdmissionAmount !== admissionlevelCalculation) {
            const difference = Math.max(admissionlevelCalculation, remainingAdmissionAmount) - Math.min(admissionlevelCalculation, remainingAdmissionAmount);

            remainingConcession = concession != null ? Math.max(0, concession - difference) : 0;

        }

        //  FOR COLOR ADMINSION AMOUT ALSO
        // if (adminssionPaidAmt === 0 || adminssionPaidAmt === null) {
        //     if (remainingConcession === 0 && remainingAdmissionAmount) {
        //         adminssionPaidAmount = `${style.danger}`; 
        //     }
        // }
        // else if (remainingAdmissionAmount === 0) {
        //     adminssionPaidAmount = ''; 
        // }
        // else {

        //     adminssionPaidAmount = `${style.warning}`; 
        // }

    }



    let firstlevelCalculation = (firstTermAmt ?? 0) - (firstTermPaidAmt ?? 0)


    remainingFirstTermAmt = remainingConcession ? firstlevelCalculation - remainingConcession : firstlevelCalculation;

    remainingFirstTermAmt = Math.max(0, remainingFirstTermAmt)


    if (remainingFirstTermAmt !== firstlevelCalculation) {


        const difference = Math.max(firstlevelCalculation, remainingFirstTermAmt) - Math.min(firstlevelCalculation, remainingFirstTermAmt);

        remainingConcession = remainingConcession != null ? Math.max(0, remainingConcession - difference) : 0;
    }

    if (firstTermPaidAmt === 0 || firstTermPaidAmt === null) {
        if (remainingConcession === 0 && remainingFirstTermAmt) {
            firstTermPaidAmount = `${style.danger}`;
        }
    }
    else if (remainingFirstTermAmt === 0) {
        firstTermPaidAmount = '';
    }
    else {

        firstTermPaidAmount = `${style.warning}`;
    }

    let secondLevelCalculation = (secondTermAmt ?? 0) - (secondTermPaidAmt ?? 0);

    remainingSecondTermAmt = remainingConcession ? secondLevelCalculation - remainingConcession : secondLevelCalculation;

    if (remainingSecondTermAmt !== secondLevelCalculation) {

        const difference = secondLevelCalculation - remainingSecondTermAmt;

        remainingConcession = remainingConcession != null ? Math.max(0, remainingConcession - difference) : 0;
    }

    if (secondTermPaidAmt === 0 || secondTermPaidAmt === null) {

        if (remainingConcession === 0 && remainingSecondTermAmt) {
            secondTermPaidAmount = `${style.danger}`;
        }
    }
    else if (remainingSecondTermAmt === 0) {
        secondTermPaidAmount = '';
    } else {
        secondTermPaidAmount = `${style.warning}`;
    }

    //  FOR COLOR ADMINSION AMOUT ALSO
    // if (firstTermPaidAmount === `${style.danger}` || secondTermPaidAmount === `${style.danger}` || adminssionPaidAmount === `${style.danger}`) {

    if (firstTermPaidAmount === `${style.danger}` || secondTermPaidAmount === `${style.danger}`) {
        totalDueColor = `${style.danger}`;
        studentNameColor = `${style.danger}`;
        //  FOR COLOR ADMINSION AMOUT ALSO
        // } else if (firstTermPaidAmount === `${style.warning}` || secondTermPaidAmount === `${style.warning}` || adminssionPaidAmount === `${style.warning}`) {
    } else if (firstTermPaidAmount === `${style.warning}` || secondTermPaidAmount === `${style.warning}`) {
        totalDueColor = `${style.warning}`;
        studentNameColor = `${style.warning}`;
    }
    return (
        <>
            {/* <Link to={`../singlestudentprofile/${student._id}`}> */}
            <tr className={`${style.tbody_row}`}>


                {/* <td className={`${style.tbody_cell}`} onClick={handleStudentProfileNavigate}>{student.SRId}</td> */}

                {/* {!adminPage ? (Object.keys(student) as Array<keyof StudentDetailnew>).map((ele, index) => { */}
                {!adminPage ? studentFieldOrder.map((ele, index) => {
                    // FOR ACCOUNTANT
                    if (!hiddenStudentDetails.includes(ele as string) && ele !== "mandatory" && ele !== "nonMandatory") {

                        let bgColor = "";
                        if (ele === "firstTermPaidAmt") bgColor = firstTermPaidAmount;
                        if (ele === "secondTermPaidAmt") bgColor = secondTermPaidAmount;
                        if (ele === "studentName") bgColor = studentNameColor;
                        if (ele === "dues") bgColor = totalDueColor;
                        // if(ele === "adminssionPaidAmt") bgColor = adminssionPaidAmount
                        return (
                            <td key={ele} className={`${style.tbody_cell} ${!rowUpdating ? bgColor : ""} ${allowNavigationStudentProfile ? 'cursor-pointer' : "none"}`} onClick={handleStudentProfileNavigate}>
                                {rowUpdating ? (nonEditableFields.includes(ele) ?
                                    (student[ele] ? student[ele] : "-")
                                    :
                                    <EditInput

                                        index={index}
                                        required="no"
                                        state={editStudent[ele]}
                                        placeholder=''
                                        setState={setEditStudent}
                                        updateKey={ele}
                                        type={inputType(ele)}
                                        updating={true}

                                    />
                                )
                                    :
                                    (student[ele] ? student[ele] : "-")
                                }
                            </td>
                        )
                    }
                }
                )
                    :
                    // FOR ADMIN 
                    // (Object.keys(student) as Array<keyof StudentDetailnew>).map((ele, index) => {
                    studentFieldOrder.map((ele, index) => {
                        if (ele === "_id" || ele === "createdAt" as string || ele === "updatedAt" as string || ele === "__v" as string || ele === "mandatory" || ele === "nonMandatory") {
                            return;
                        }

                        let bgColor = "";
                        if (ele === "firstTermPaidAmt") bgColor = firstTermPaidAmount;
                        if (ele === "secondTermPaidAmt") bgColor = secondTermPaidAmount;
                        if (ele === "studentName") bgColor = studentNameColor;
                        if (ele === "dues") bgColor = totalDueColor;
                        // if(ele === "adminssionPaidAmt") bgColor = adminssionPaidAmount



                        return (
                            <td key={ele} className={`${style.tbody_cell} ${!rowUpdating ? bgColor : ""} ${allowNavigationStudentProfile ? 'cursor-pointer' : "none"}`} onClick={handleStudentProfileNavigate}>
                                {rowUpdating ? (nonEditableFields.includes(ele) ?
                                    (student[ele] ? student[ele] : "-")
                                    :

                                    <EditInput

                                        index={index}
                                        required="no"
                                        state={editStudent[ele]}
                                        placeholder=''
                                        setState={setEditStudent}
                                        updateKey={ele}
                                        type={inputType(ele)}
                                        updating={true}

                                    />
                                )
                                    :
                                    (student[ele] ? student[ele] : "-")
                                }
                            </td>
                        )

                    }
                    )
                }
                <td className={`${style.tbody_cell}`}>
                    <Button
                        onClick={rowUpdating ? handleCancelEditing : handleRequest}
                        // disabled={rowUpdating}
                        sx={{
                            background: "#f2b84d",
                            color: "white",
                            width: "150px",
                            fontWeight: 500,
                            fontSize: "18px",
                            padding: "0px 10px",
                            transition: 'background 0.3s ease',
                            '&:hover': {
                                background: '#d3931e',
                            },
                        }}
                    >
                        {rowUpdating ? "Cancel" : "Update"}
                    </Button>
                </td>
                <td className={`${style.tbody_cell}`}>
                    <Button

                        disabled={!rowUpdating || updateLoading}
                        onClick={adminPage ? handleAdminSave : handleSave}
                        sx={{


                            width: "150px",
                            fontWeight: 500,
                            fontSize: "18px",
                            background: "#26bc26",
                            color: "white",
                            padding: "0px 10px",
                            transition: 'background 0.3s ease',
                            '&:hover': {
                                background: '#178f17',
                            },
                            "&:disabled": {
                                marginRight: "10px",
                                backgroundColor: "#26bc26",
                                color: "white",

                                fontSize: "18px",
                                height: "31px",
                                padding: "0px 10px",
                            },
                        }}
                    >
                        {updateLoading ? <CircularProgress size={24} thickness={5} sx={{ color: "white" }} /> : "Save"}

                    </Button>
                </td>
                <td className={`${style.tbody_cell}`}>
                    <Button
                        onClick={() => handleGenerateTC(student.srId!)}
                        disabled={rowUpdating || (student as any).isTcIssued}
                        sx={{
                            background: "#ee1919",
                            color: "white",
                            width: "150px",
                            fontWeight: 500,
                            fontSize: "18px",
                            padding: "0px 10px",
                            transition: 'background 0.3s ease',
                            '&:hover': {
                                background: '#ee0000',
                            },
                        }}
                    >
                        Generate
                    </Button>
                </td>
            </tr>
            {/* </Link> */}
        </>
    )
}

export default SingleStudent