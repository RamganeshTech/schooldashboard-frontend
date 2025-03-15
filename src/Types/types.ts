import { AxiosRequestConfig } from "axios";

export interface StudentDetailnew {
  _id?: string | number | null

  newOld: (string | null);
  studentClass:(string | null)
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

}

export interface ErrorStudent {

  _id?: string | number | null

  newOld?: string;
  studentClass?:string;
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

  handleError: (student: StudentDetailnew) => ErrorStudent;

  handleInputChange: <T>(
    key: keyof T,
    value: string | boolean,
    setState: React.Dispatch<React.SetStateAction<T>>,
    index?: number,
    
  ) => void;

  apiUrl: string;

  student: StudentDetailnew;
  setStudent: React.Dispatch<React.SetStateAction<StudentDetailnew>>;

  isStudentListUpdated: boolean;
  setIsStudentListUpdated: React.Dispatch<React.SetStateAction<boolean>>;

  editStudent: StudentDetailnew;
  setEditStudent: React.Dispatch<React.SetStateAction<StudentDetailnew>>;

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
  setDeletedLoginLoading:React.Dispatch<React.SetStateAction<boolean>>;
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
  setCurrentEditingId: React.Dispatch<React.SetStateAction<number | null |string| undefined>>;


  accountantLoading:boolean;

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