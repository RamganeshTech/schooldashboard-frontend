import { MandatoryDetails, NonMandatoryDetails, StudentDetailnew } from "../Types/types";



export type ProfileItem = {
  label: string;
  key: keyof MandatoryDetails | "studentName";
};

export type ProfileNonMandatory = {
  label: string;
  key: keyof NonMandatoryDetails;
}

export const mandatoryDetails:ProfileItem[] = [
    { label: "Student's Name (as per School Record)", key: "studentName", },
    { label: "Gender", key: "gender" },
    { label: "Date of Birth (MM/DD/YYYY)", key: "dob" },
    { label: "Permanent Education Number", key: "educationNumber" },
    { label: "Mother's Name", key: "motherName" },
    { label: "Father's Name", key: "fatherName" },
    { label: "Guardian's Name", key: "guardianName" },
    { label: "AADHAAR Number of Student", key: "aadhaarNumber" },
    { label: "Name of Student as per/in AADHAAR Card", key: "aadhaarName" },
    { label: "Address", key: "address" },
    { label: "Pincode", key: "pincode" },
    { label: "Mobile Number (of Student/ Parent/ Guardian)", key: "mobileNumber" },
    { label: "Alternate Mobile Number (of Student/ Parent/ Guardian)", key: "alternateMobile" },
    { label: "Contact email-id (of Student/Parent/Guardian)", key: "email" },
    { label: "Mother Tongue of the Student", key: "motherTongue" },
    { label: "Social Category", key: "socialCategory" },
    { label: "Minority Group", key: "minorityGroup" },
    { label: "Whether BPL beneficiary", key: "bpl" },
    { label: "Whether Antyodaya Anna Yojana (AAY) beneficiary", key: "aay" },
    { label: "Whether belongs to EWS / Disadvantaged Group", key: "ews" },
    { label: "Whether CWSN", key: "cwsn" },
    { label: "Type of Impairments", key: "impairments" },
    { label: "Indian Nationality", key: "indian" },
    { label: "Is Child Identified as Out of School-Child", key: "outOfSchool" },
    { label: "When the Child is mainstreamed", key: "mainstreamedDate" },
    { label: "Whether having Disability Certificate", key: "disabilityCert" },
    { label: "Disability Percentage (in %)", key: "disabilityPercent" },
    { label: "Blood Group", key: "bloodGroup" },
  ];
  

  export const nonMandatoryDetails: ProfileNonMandatory[] = [
    { label: "Whether Facilities provided to the Student (for the year of filling data)", key: "facilitiesProvided" },
    { label: "Facilities provided to Student in case of CWSN (for the year of filling data)", key: "facilitiesForCWSN" },
    { label: "Whether Student has been screened for Specific Learning Disability (SLD)", key: "screenedForSLD" },
    { label: "SLD Type", key: "sldType" },
    { label: "Whether Student has been screened for Autism Spectrum Disorder (ASD)?", key: "screenedForASD" },
    { label: "Whether Student has been screened for Attention Deficit Hyperactive Disorder (ADHD)?", key: "screenedForADHD" },
    { label: "Has the Student been identified as a Gifted / Talented", key: "isGiftedOrTalented" },
    { label: "Does the student appeared in any State Level Competitions/ National level Competitions/ Olympiads?", key: "participatedInCompetitions" },
    { label: "Does the Student participate in NCC/ NSS/ Scouts and Guides?", key: "participatedInActivities" },
    { label: "Whether student is capable of handling digital devices including the internet?", key: "canHandleDigitalDevices" },
    { label: "Student's Height (in CMs)", key: "heightInCm" },
    { label: "Student's Weight (in KGs)", key: "weightInKg" },
    { label: "Approximate Distance of student's residence to school", key: "distanceToSchool" },
    { label: "Completed Highest Education Level of Mother/Father/Legal Guardian", key: "parentEducationLevel" },
  
    // Enrollment Details
    { label: "Admission Number in Present School", key: "admissionNumber" },
    { label: "Admission Date (DD/MM/YYYY) in Present School", key: "admissionDate" },
    { label: "Class/Section Roll No", key: "rollNumber" },
    { label: "Medium of Instruction", key: "mediumOfInstruction" },
    { label: "Languages Group Studied by the Student", key: "languagesStudied" },
    { label: "Academic Stream opted by student", key: "academicStream" },
    { label: "Subjects Group Studied by the Student", key: "subjectsStudied" },
    { label: "Status of Student in Previous Academic Year Schooling (2023-24)", key: "statusInPreviousYear" },
    { label: "Grade/Class Studied in the Previous/Last Academic year (2023-24)", key: "gradeStudiedLastYear" },
    { label: "Admitted / Enrolled Under (Only for Pvt. Unaided)", key: "enrolledUnder" },
    { label: "In the previous class Studied - result of the examinations", key: "previousResult" },
    { label: "Marks Obtained (in Percentage)", key: "marksObtainedPercentage" },
    { label: "No. of days child attended school (in the previous academic year)", key: "daysAttendedLastYear" },
  ];
  
  export const studentFieldOrder: Array<keyof StudentDetailnew> = [
  "srId",
  "newOld",
  "studentClass",
  "section",
  "studentName",
  "adminssionAmt",
  "adminssionPaidAmt",
  "admissionBillNo",
  "admissionDate",
  "firstTermAmt",
  "firstTermPaidAmt",
  "firstTermBillNo",
  "firstTermDate",
  "secondTermAmt",
  "secondTermPaidAmt",
  "secondTermBillNo",
  "secondTermDate",
  "annualFee",
  "annualPaidAmt",
  "dues",
  "concession",
  "remarks",
  "busFirstTermAmt",
  "busFirstTermPaidAmt",
  "busfirstTermDues",
  "busSecondTermAmt",
  "busSecondTermPaidAmt",
  "busSecondTermDues",
  "busPoint",
  "whatsappNumber"
];



 export const feeStructure:any = {
  "new": {
    "PREKG": { adminssionAmt: 29000, firstTermAmt: 7500, secondTermAmt: 7500, annualFee: 44000 },
    "LKG": { adminssionAmt: 29000, firstTermAmt: 7500, secondTermAmt: 7500, annualFee: 44000 },
    "UKG": { adminssionAmt: 31000, firstTermAmt: 8500, secondTermAmt: 8500, annualFee: 48000 },
    "1": { adminssionAmt: 32000, firstTermAmt: 9500, secondTermAmt: 9500, annualFee: 52000 },
    "2": { adminssionAmt: 33000, firstTermAmt: 10000, secondTermAmt: 10000, annualFee: 54000 },
    "3": { adminssionAmt: 34000, firstTermAmt: 10500, secondTermAmt: 10500, annualFee: 56000 },
    "4": { adminssionAmt: 35000, firstTermAmt: 11000, secondTermAmt: 11000, annualFee: 58000 },
    "5": { adminssionAmt: 36000, firstTermAmt: 11500, secondTermAmt: 11500, annualFee: 60000 },
    "6": { adminssionAmt: 37000, firstTermAmt: 12000, secondTermAmt: 12000, annualFee: 62000 },
    "7": { adminssionAmt: 38000, firstTermAmt: 12500, secondTermAmt: 12500, annualFee: 64000 },
    "8": { adminssionAmt: 39000, firstTermAmt: 13000, secondTermAmt: 13000, annualFee: 66000 },
    "9": { adminssionAmt: 40000, firstTermAmt: 13500, secondTermAmt: 13500, annualFee: 68000 },
    "10": { adminssionAmt: 44000, firstTermAmt: 14000, secondTermAmt: 14000, annualFee: 71000 }
  },
  "old": {
    "LKG": { adminssionAmt: 22000, firstTermAmt: 7500, secondTermAmt: 7500, annualFee: 37000 },
    "UKG": { adminssionAmt: 24000, firstTermAmt: 8000, secondTermAmt: 8000, annualFee: 39000 },
    "1": { adminssionAmt: 25000, firstTermAmt: 8500, secondTermAmt: 8500, annualFee: 41000 },
    "2": { adminssionAmt: 26000, firstTermAmt: 9000, secondTermAmt: 9000, annualFee: 42000 },
    "3": { adminssionAmt: 27000, firstTermAmt: 9500, secondTermAmt: 9500, annualFee: 45000 },
    "4": { adminssionAmt: 28000, firstTermAmt: 10000, secondTermAmt: 10000, annualFee: 47000 },
    "5": { adminssionAmt: 29000, firstTermAmt: 10500, secondTermAmt: 10500, annualFee: 49000 },
    "6": { adminssionAmt: 30000, firstTermAmt: 11000, secondTermAmt: 11000, annualFee: 51000 },
    "7": { adminssionAmt: 31000, firstTermAmt: 11500, secondTermAmt: 11500, annualFee: 53000 },
    "8": { adminssionAmt: 32000, firstTermAmt: 12000, secondTermAmt: 12000, annualFee: 55000 },
    "9": { adminssionAmt: 33000, firstTermAmt: 12500, secondTermAmt: 12500, annualFee: 57000 },
    "10": { adminssionAmt: 35000, firstTermAmt: 13000, secondTermAmt: 13000, annualFee: 59000 }
  }
};


export const allowedStudentClasses:String[] =["LKG", "UKG", "1",
"2","3","4",
"5","6","7",
"8","9","10"]



export const placeholderMap: Record<string, string> = {
  srId: "SR ID",
  newOld: "New/Old Student",
  studentClass: "Class",
  section: "Section",
  studentName: "Student Name",
  adminssionAmt: "Admission Amount",
  adminssionPaidAmt: "Admission Paid Amount",
  admissionBillNo: "Admission Bill Number",
  admissionDate: "Admission Date",
  firstTermAmt: "I Term Amount",
  firstTermPaidAmt: "I Term Paid Amount",
  firstTermBillNo: "I Term Bill Number",
  firstTermDate: "I Term Date",
  secondTermAmt: "II Term Amount",
  secondTermPaidAmt: "II Term Paid Amount",
  secondTermBillNo: "II Term Bill Number",
  secondTermDate: "II Term Date",
  annualFee: "Annual Fee",
  annualPaidAmt: "Annual Paid Amount",
  dues: "Dues",
  concession: "Concession",
  remarks: "Remarks",
  busFirstTermAmt: "Bus I Term Amount",
  busFirstTermPaidAmt: "Bus I Term Paid Amount",
  busfirstTermDues: "Bus I Term Dues",
  busSecondTermAmt: "Bus II Term Amount",
  busSecondTermPaidAmt: "Bus II Term Paid Amount",
  busSecondTermDues: "Bus II Term Dues",
  busPoint: "Bus Point",
  whatsappNumber: "WhatsApp Number"
};