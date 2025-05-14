import { AxiosRequestConfig } from "axios";

export interface MandatoryDetails {
  gender: (String | null);
  dob: (String | null);
  educationNumber: (String | null);
  motherName: (String | null);
  fatherName: (String | null);
  guardianName: (String | null);
  aadhaarNumber: (String | null);
  aadhaarName: (String | null);
  address: (String | null);
  pincode: (String | null);
  mobileNumber: (String | null);
  alternateMobile: (String | null);
  email: (String | null);
  motherTongue: (String | null);
  socialCategory: (String | null);
  minorityGroup: (String | null);
  bpl: (String | null);
  aay: (String | null);
  ews: (String | null);
  cwsn: (String | null);
  impairments: (String | null);
  indian: (String | null);
  outOfSchool: (String | null);
  mainstreamedDate: (String | null);
  disabilityCert: (String | null);
  disabilityPercent: (String | null);
  bloodGroup: (String | null);
}


export interface NonMandatoryDetails {
  facilitiesProvided: string | null;
  facilitiesForCWSN: string | null;
  screenedForSLD: string | null;
  sldType: string | null;
  screenedForASD: string | null;
  screenedForADHD: string | null;
  isGiftedOrTalented: string | null;
  participatedInCompetitions: string | null;
  participatedInActivities: string | null;
  canHandleDigitalDevices: string | null;
  heightInCm: string | null; // or number if preferred
  weightInKg: string | null; // or number
  distanceToSchool: string | null;
  parentEducationLevel: string | null;



  // ENTROLLMENT DETAILS 

  admissionNumber?: string | null;
  admissionDate?: string | null; // Format: DD/MM/YYYY
  rollNumber?: string | null;
  mediumOfInstruction?: string | null;
  languagesStudied?: string | null;
  academicStream?: string | null;
  subjectsStudied?: string | null;
  statusInPreviousYear?: string | null;
  gradeStudiedLastYear?: string | null;
  enrolledUnder?: string | null;
  previousResult?: string | null;
  marksObtainedPercentage?: string | null;
  daysAttendedLastYear?: string | null;
}

// export interface EnrollmentDetails {
//   admissionNumber?: string | null;
//   admissionDate?: string | null; // Format: DD/MM/YYYY
//   rollNumber?: string | null;
//   mediumOfInstruction?: string | null;
//   languagesStudied?: string | null;
//   academicStream?: string | null;
//   subjectsStudied?: string | null;
//   statusInPreviousYear?: string | null;
//   gradeStudiedLastYear?: string | null;
//   enrolledUnder?: string | null;
//   previousResult?: string | null;
//   marksObtainedPercentage?: string | null;
//   daysAttendedLastYear?: string | null;
// }



export interface StudentDetailnew {
  _id?: string | number | null

  srId:(string | null);
  newOld: (string | null);
  studentClass: (string | null)
  section: (string | null);
  studentName: (string | null);

  adminssionAmt: number | null;
  adminssionPaidAmt: number | null;
  admissionBillNo: number | null;
  admissionDate: string | null;

  firstTermAmt: number | null;
  firstTermPaidAmt: number | null;
  firstTermBillNo: number | null;
  firstTermDate: string | null;

  secondTermAmt: number | null;
  secondTermPaidAmt: number | null;
  secondTermBillNo: number | null;
  secondTermDate: string | null;

  annualFee: number | null;
  annualPaidAmt: number | null;
  dues: number | null;

  concession: number | null;
  remarks: string | null;

  busFirstTermAmt: number | null;
  busFirstTermPaidAmt: number | null;
  busfirstTermDues: number | null;

  busSecondTermAmt: number | null;
  busSecondTermPaidAmt: number | null;
  busSecondTermDues: number | null;

  busPoint: string | null;
  whatsappNumber: (string | null);

  // mandatroyDetails
  mandatory: MandatoryDetails
  nonMandatory: NonMandatoryDetails
}

export type EditStudent = Omit<StudentDetailnew, "mandatory" | "nonMandatory">;

export interface ErrorStudent {

  _id?: string | number | null
  srId?: string;
  newOld?: string;
  studentClass?: string;
  section?: string;
  studentName?: (string | null);

  adminssionAmt?: number | null;
  adminssionPaidAmt?: number | null;
  admissionDate?: string | null;

  firstTermAmt?: number | null;
  firstTermPaidAmt?: number | null;
  firstTermDate?: string | null;

  secondTermAmt?: number | null;
  secondTermPaidAmt?: number | null;
  secondTermDate?: string | null;

  annualFee?: number | null;
  annualPaidAmt?: number | null;

  concession?: number | null;
  remarks?: string | null;

  busFirstTermAmt?: number | null;
  busFirstTermPaidAmt?: number | null;

  busSecondTermAmt?: number | null;
  busSecondTermPaidAmt?: number | null;

  busPoint?: string | null;
  whatsappNumber?: string;

}

export interface TotalList {
  totalStudents: number | null;
  adminssionAmt: number | null;
  adminssionPaidAmt: number | null;
  firstTermAmt: number | null;
  firstTermPaidAmt: number | null;
  secondTermAmt: number | null;
  secondTermPaidAmt: number | null;
  annualFee: number | null;
  annualPaidAmt: number | null;
  dues: number | null;
  concession: number | null;
  busFirstTermAmt: number | null;
  busFirstTermPaidAmt: number | null;
  busfirstTermDues: number | null;
  busSecondTermAmt: number | null;
  busSecondTermPaidAmt: number | null;
  busSecondTermDues: number | null;
}

export interface DeltedLogins {
  email: string;
  password?: string;
  status?: boolean;
  _id: number
}

export interface SchoolContextType {
  studentList: StudentDetailnew[];
  setStudentList: React.Dispatch<React.SetStateAction<StudentDetailnew[]>>;

  handleError: (student:  Partial<StudentDetailnew>) => ErrorStudent;

  handleInputChange: <T>(
    key: keyof T,
    value: string | boolean,
    setState: React.Dispatch<React.SetStateAction<T>>,
    updating:boolean,
    index?: number,
  ) => void;

  apiUrl: string;

  student: StudentDetailnew;
  setStudent: React.Dispatch<React.SetStateAction<StudentDetailnew>>;

  isStudentListUpdated: boolean;
  setIsStudentListUpdated: React.Dispatch<React.SetStateAction<boolean>>;

  editStudent: EditStudent;
  setEditStudent: React.Dispatch<React.SetStateAction<EditStudent>>;

  adminPage: boolean;
  setAdminPage: React.Dispatch<React.SetStateAction<boolean>>;

  isNotificationpage: boolean;
  setIsNotificationPage: React.Dispatch<React.SetStateAction<boolean>>;

  isAccountantLoginCreationPage: boolean;
  setIsAccountantLoginCreationPage: React.Dispatch<React.SetStateAction<boolean>>;

  deletedLoginList: DeltedLogins[];
  setDeletedLoginList: React.Dispatch<React.SetStateAction<DeltedLogins[]>>;

  deletedLoginError: string,
  deletedLoginsLoading: boolean
  setDeletedLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedLoginError: React.Dispatch<React.SetStateAction<string>>;

  getDeletedLoginList: () => void,

  notificationList: NotificationDetail[];
  setNotificationList: React.Dispatch<React.SetStateAction<NotificationDetail[]>>;

  formError: string;
  setFormError: React.Dispatch<React.SetStateAction<string>>;

  isErrorDisplaying: boolean,
  setisErrorDisplying: React.Dispatch<React.SetStateAction<boolean>>;

  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

  currentEditingId: (number | string | null | undefined);
  setCurrentEditingId: React.Dispatch<React.SetStateAction<number | null | string | undefined>>;


  accountantLoading: boolean;

  handleAccountantSubmit: <T extends any[], S extends StudentDetailnew>(
    e: React.FormEvent,
    setStateList: React.Dispatch<React.SetStateAction<T>>,
    setStateObject: React.Dispatch<React.SetStateAction<S>>,
  ) => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface NotificationDetail {
  email: string;
  requestTo: string;
  studentName: string | null;
  fields: Partial<Record<keyof StudentDetailnew, string | number | null>>;
  _id: string;
}

export interface CustomAxiosRequestConfig<T> extends AxiosRequestConfig<T> {
  userType?: string;
}

export interface createdResponse {
  message: string;
  ok: boolean;
  data?: any
  error?: any
}