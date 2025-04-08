import { MandatoryDetails, StudentDetailnew } from "../Types/types";



export type ProfileItem = {
  label: string;
  key: keyof MandatoryDetails | "studentName";
};

export const mandatoryDetails:ProfileItem[] = [
    { label: "Student's Name (as per School Record)", key: "studentName", },
    { label: "Gender", key: "gender" },
    { label: "Date of Birth (DD/MM/YYYY)", key: "dob" },
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
  

  
