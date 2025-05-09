import { MandatoryDetails, NonMandatoryDetails } from "../Types/types";



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
  
  