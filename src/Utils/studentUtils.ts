import { StudentDetailnew } from "../Types/types";

export const usedBillNumbers = new Set<number>();

export function generateUniqueBillNumber(): number {
    let billNo;
    do {
        billNo = Math.floor(10000 + Math.random() * 90000); 
    } while (usedBillNumbers.has(billNo)); 

    usedBillNumbers.add(billNo); 
    return billNo;
}

export function calculateDues(student: Partial<StudentDetailnew>): Partial<StudentDetailnew> {

    const admissionAmt = Number(student.adminssionAmt) || 0;
    const admissionPaidAmt = Number(student.adminssionPaidAmt) || 0;
    const firstTermAmt = Number(student.firstTermAmt) || 0;
    const firstTermPaidAmt = Number(student.firstTermPaidAmt) || 0;
    const secondTermAmt = Number(student.secondTermAmt) || 0;
    const secondTermPaidAmt = Number(student.secondTermPaidAmt) || 0;
    // const annualFee = Number(student.annualFee) || 0;
    // const annualPaidAmt = Number(student.annualPaidAmt) || 0;
    const concession = Number(student.concession) || 0;
    const totalDues =
        (admissionAmt - admissionPaidAmt +
        firstTermAmt - firstTermPaidAmt +
        secondTermAmt - secondTermPaidAmt) - concession;

    return {
        dues: Math.max(0, totalDues),
    };
}

export function calculateBusFirstTermDues(student: Partial<StudentDetailnew>): Partial<StudentDetailnew> {
    const busFirstTermAmt = Number(student.busFirstTermAmt) || 0;
    const busFirstTermPaidAmt = Number(student.busFirstTermPaidAmt) || 0;

    return {
        busfirstTermDues: Math.max(0, busFirstTermAmt - busFirstTermPaidAmt), // Prevent negative values
    };
}

export function calculateBusSecondTermDues(student: Partial<StudentDetailnew>): Partial<StudentDetailnew> {
    const busSecondTermAmt = Number(student.busSecondTermAmt) || 0;
    const busSecondTermPaidAmt = Number(student.busSecondTermPaidAmt) || 0;

    return {
        busSecondTermDues: Math.max(0, busSecondTermAmt - busSecondTermPaidAmt), // Prevent negative values
    };
}

         

export function generateAdmissionBillNumber(student: Partial<StudentDetailnew>): number | null {
    return student.adminssionPaidAmt != null && student.adminssionPaidAmt > 0 ? generateUniqueBillNumber() : null;
}

export function generateFirstTermBillNumber(student: Partial<StudentDetailnew>): number | null {
    return student.firstTermPaidAmt != null && student.firstTermPaidAmt > 0 ? generateUniqueBillNumber() : null;
}

export function generateSecondTermBillNumber(student: Partial<StudentDetailnew>): number | null {
    return student.secondTermPaidAmt != null && student.secondTermPaidAmt > 0 ? generateUniqueBillNumber() : null;
}
