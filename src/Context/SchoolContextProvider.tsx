import React, { createContext, useState } from 'react'
import { createdResponse, CustomAxiosRequestConfig, DeltedLogins, ErrorStudent, LoginCredentials, NotificationDetail, SchoolContextType, StudentDetailnew } from "../Types/types";
import { dateConvertor } from '../Utils/dateConverter';
import { calculateBusFirstTermDues, calculateBusSecondTermDues, calculateDues, generateAdmissionBillNumber, generateFirstTermBillNumber, generateSecondTermBillNumber } from '../Utils/studentUtils';
import axios from 'axios';
import axiosInstance from '../Api/apiClient';

export const SchoolContext = createContext<SchoolContextType | null>(null)

const SchoolContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const apiUrl = import.meta.env.VITE_APP_BASE_API;

  const [student, setStudent] = useState<StudentDetailnew>({
    newOld: null,
    studentClass:null,
    section: null,
    studentName: null,
    adminssionAmt: null,
    adminssionPaidAmt: null,
    admissionBillNo: null,
    admissionDate: null,

    firstTermAmt: null,
    firstTermPaidAmt: null,
    firstTermBillNo: null,
    firstTermDate: null,

    secondTermAmt: null,
    secondTermPaidAmt: null,
    secondTermBillNo: null,
    secondTermDate: null,

    annualFee: null,
    annualPaidAmt: null,
    dues: null,

    concession: null,
    remarks: null,

    busFirstTermAmt: null,
    busFirstTermPaidAmt: null,
    busfirstTermDues: null,

    busSecondTermAmt: null,
    busSecondTermPaidAmt: null,
    busSecondTermDues: null,

    busPoint: null,
    whatsappNumber: null,
  })

  const [editStudent, setEditStudent] = useState<StudentDetailnew>({
    newOld: null,
    studentClass:null,
    studentName: null,
    section: null,
    adminssionAmt: null,
    adminssionPaidAmt: null,
    admissionBillNo: null,
    admissionDate: null,

    firstTermAmt: null,
    firstTermPaidAmt: null,
    firstTermBillNo: null,
    firstTermDate: null,

    secondTermAmt: null,
    secondTermPaidAmt: null,
    secondTermBillNo: null,
    secondTermDate: null,

    annualFee: null,
    annualPaidAmt: null,
    dues: null,

    concession: null,
    remarks: null,

    busFirstTermAmt: null,
    busFirstTermPaidAmt: null,
    busfirstTermDues: null,

    busSecondTermAmt: null,
    busSecondTermPaidAmt: null,
    busSecondTermDues: null,

    busPoint: null,
    whatsappNumber: null,
  })

  const [adminPage, setAdminPage] = useState<boolean>(false)
  const [isNotificationpage, setIsNotificationPage] = useState<boolean>(false)
  const [isAccountantLoginCreationPage, setIsAccountantLoginCreationPage] = useState<boolean>(false)

  const [studentList, setStudentList] = useState<StudentDetailnew[]>([])
  const [isStudentListUpdated, setIsStudentListUpdated] = useState<boolean>(false);

  const [notificationList, setNotificationList] = useState<NotificationDetail[]>([])

  const [formError, setFormError] = useState<string>("")
  const [isErrorDisplaying, setisErrorDisplying] = useState<boolean>(false)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentEditingId, setCurrentEditingId] = useState<number | null | undefined | string>(null)

  const [deletedLoginList, setDeletedLoginList] = useState<DeltedLogins[]>([])
  const [deletedLoginsLoading, setDeletedLoginLoading] = useState<boolean>(false)
  const [deletedLoginError, setDeletedLoginError] = useState<string>("")

  const [accountantLoading, setAccountantLoading] = useState<boolean>(false)

  const getDeletedLoginList = async () => {
    setDeletedLoginError("")
    setDeletedLoginLoading(true)
    try {
      const { data } = await axiosInstance.get<createdResponse>('/api/admin/getDeletedAccountantCredentials', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        userType: "admin" // Custom property in the request config
      } as CustomAxiosRequestConfig<LoginCredentials>);

      if (data.ok) {
        setDeletedLoginList(data.data)
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        setDeletedLoginError(error.response?.data?.message || "Something went wrong!");
      } else if (error instanceof Error) {
        setDeletedLoginError(error.message);
      } else {
        setDeletedLoginError("An unexpected error occurred.");
      }
    }
    finally {
      setDeletedLoginLoading(false)
    }
  }

  const handleInputChange = <T,>(
    key: keyof T,
    value: string | boolean,
    setState: React.Dispatch<React.SetStateAction<T>>,
  ) => {
    try {
      if (typeof value === "string" && value.includes("-") && !isNaN(new Date(value).getTime()) && key!=="studentClass") {
        console.log(key, value)
        if (new Date(value) > new Date()) { //checking is selected date is in future or not
          setState((prev) => {
            return { ...prev, [key]: "" }
          })
          throw new Error("Date cannot be in the future.");
        }
        value = dateConvertor(value);
      }

      setState(prev => ({
        ...prev,
        [key]: typeof prev[key] === "number" ? Number(value) : value
      }))

    }
    catch (err) {
      if (err instanceof Error) {
        console.log(err?.message)
      }
    }
  }

  let handleError = (student: StudentDetailnew) => {

    let error: ErrorStudent = {}

    const studentNameRegex = /^[A-Za-z .]+$/;
    const oldNewRegex = /^(old|new)$/i
    const sectionRegex = /^[A-Za-z0-9]+$/
    const classRegex = /^[A-Za-z0-9|\.]+$/;

    const whatsappRegex = /^\d{10}$/; 


    if (!student.newOld) {
      error.newOld = "Select student is new or old";
    }
    else if (!oldNewRegex.test(student.newOld)) {
      error.newOld = "NEW/OLD column should contain either New or Old";
    }

    if (!student.studentClass) {
      error.studentClass = "Enter the class";
    }
    else if (!classRegex.test(student.studentClass)) {
      error.studentClass = "Class should not contain any special characters except '|' and '.' ";
    }
    // Check if the class consists of only '0's
    else if (/^0+$/.test(student.studentClass)) {
      error.studentClass = "Class should not be only zero";
    }
    

    if (!student.section) {
      error.section = "Enter the section"
    }
    else if (!sectionRegex.test(student.section)) {
      error.section = "Section should contain only alphabets and numbers"
    }

    if (!student.studentName) {
      error.studentName = "Student Name cannot be empty";
    }
    else if (!studentNameRegex.test(student.studentName)) {
      error.studentName = "Student name can only contain alphabets spaces and periods (.)";
    }


    if (student.whatsappNumber && !whatsappRegex.test(student.whatsappNumber)) {
      error.whatsappNumber = "WhatsApp number must contain only numbers";
    }

    if (student.whatsappNumber) {
      if (!whatsappRegex.test(student.whatsappNumber)) {
          error.whatsappNumber = "WhatsApp number must be exactly 10 digits";
      }
  }

    return error;
  }

  let handleAccountantSubmit = async <T extends any[], S extends StudentDetailnew>(e: React.FormEvent,
    setStateList: React.Dispatch<React.SetStateAction<T>>,
    setStateObject: React.Dispatch<React.SetStateAction<S>>,
  ) => {
    setFormError("")
    setAccountantLoading(true)
    try {
      e.preventDefault()

      const trimmedStudent = Object.keys(student).reduce((acc, key) => {
        const value = student[key as keyof StudentDetailnew];
        (acc as any)[key] = typeof value === "string" ? value.trim() : value;
        return acc;
      }, {} as StudentDetailnew);

      let errors = handleError(trimmedStudent)
      let isErrorExists: string | Array<any> = Object.values(errors)

      if (isErrorExists.length > 0) {
        isErrorExists = isErrorExists.join(",")
        throw new Error(`${isErrorExists}`)
      }

      const updatedDues = calculateDues(trimmedStudent);
      const busFirstTermDues = calculateBusFirstTermDues(trimmedStudent);
      const busSecondTermDues = calculateBusSecondTermDues(trimmedStudent);

      const admissionBillNo = generateAdmissionBillNumber(trimmedStudent);
      const firstTermBillNo = generateFirstTermBillNumber(trimmedStudent);
      const secondTermBillNo = generateSecondTermBillNumber(trimmedStudent);

      // 🔹 Generate bill numbers **only if the paid amount is provided**
      const newStudentData = {
        ...trimmedStudent,
        // ...student,
        ...updatedDues, // Contains dues, busFirstTermDues, and busSecondTermDues
        ...busFirstTermDues, // Contains only bus first term dues
        ...busSecondTermDues,
        admissionBillNo,
        firstTermBillNo,
        secondTermBillNo
      };

      const abortController = new AbortController();
      const { signal } = abortController;

      let { data } = await axiosInstance.post<createdResponse, createdResponse, StudentDetailnew>(`/api/accountant/addStudent`, newStudentData, {
        signal,
        userType: "accountant"
      } as CustomAxiosRequestConfig<StudentDetailnew>
      )

      setStateList((prev) => {
        return [...prev.map(student => ({ ...student })), data.data as S] as T;
      });

      setIsStudentListUpdated(true)

      setStateObject((prev) => {
        const resetStudent: S = Object.keys(prev).reduce((acc, key) => {
          return { ...acc, [key]: null };
        }, {} as S);

        return resetStudent;
      })
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        setisErrorDisplying(true)
        setFormError(error.response?.data?.message || "Something went wrong!");
      } else if ((error as Error).name === 'AbortError') {
      } else if (error instanceof Error) {
        setisErrorDisplying(true)
        setFormError(error.message);
      } else {
        setisErrorDisplying(true)
        setFormError("An unexpected error occurred.");
      }
    }
    finally {
      setAccountantLoading(false)
    }

  }

  let value: SchoolContextType = {
    apiUrl,
    handleError,
    handleAccountantSubmit,
    handleInputChange,
    studentList, setStudentList,
    isStudentListUpdated, setIsStudentListUpdated,
    student, setStudent,
    editStudent, setEditStudent,
    adminPage, setAdminPage,
    isNotificationpage, setIsNotificationPage,
    isAccountantLoginCreationPage, setIsAccountantLoginCreationPage,
    notificationList, setNotificationList,
    formError, setFormError,
    isErrorDisplaying, setisErrorDisplying,
    isEditing, setIsEditing,
    currentEditingId, setCurrentEditingId,
    deletedLoginList, setDeletedLoginList,
    getDeletedLoginList,setDeletedLoginLoading,
    deletedLoginError, deletedLoginsLoading,
    setDeletedLoginError,
    accountantLoading
  }

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  )
}

export default SchoolContextProvider