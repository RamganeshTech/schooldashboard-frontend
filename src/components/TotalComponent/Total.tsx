import React, { useContext, useEffect, useState } from 'react'
import style from './Total.module.css'
import { SchoolContext } from '../../Context/SchoolContextProvider'
import { TotalList } from '../../Types/types'
const Total: React.FC = () => {

    const context = useContext(SchoolContext)

    if (!context) return;

    const { adminPage,  studentList, isStudentListUpdated, setIsStudentListUpdated } = context

    const [totalValues, setTotalValues] = useState<TotalList>({
        totalStudents: null,
        adminssionAmt: null,
        adminssionPaidAmt: null,
        firstTermAmt: null,
        firstTermPaidAmt: null,
        secondTermAmt: null,
        secondTermPaidAmt: null,
        annualFee: null,
        annualPaidAmt: null,
        dues: null,
        concession: null,
        busFirstTermAmt: null,
        busFirstTermPaidAmt: null,
        busfirstTermDues: null,
        busSecondTermAmt: null,
        busSecondTermPaidAmt: null,
        busSecondTermDues: null,
    })

    const calculateTotals = () => {
        const newTotalValues: TotalList = {
            totalStudents: studentList.length,
            adminssionAmt: studentList.reduce((sum, student) => sum + (Number(student.adminssionAmt) || 0), 0),
            adminssionPaidAmt: studentList.reduce((sum, student) => sum + (Number(student.adminssionPaidAmt) || 0), 0),
            firstTermAmt: studentList.reduce((sum, student) => sum + (Number(student.firstTermAmt) || 0), 0),
            firstTermPaidAmt: studentList.reduce((sum, student) => sum + (Number(student.firstTermPaidAmt) || 0), 0),
            secondTermAmt: studentList.reduce((sum, student) => sum + (Number(student.secondTermAmt) || 0), 0),
            secondTermPaidAmt: studentList.reduce((sum, student) => sum + (Number(student.secondTermPaidAmt) || 0), 0),
            annualFee: studentList.reduce((sum, student) => sum + (Number(student.annualFee) || 0), 0),
            annualPaidAmt: studentList.reduce((sum, student) => sum + (Number(student.annualPaidAmt) || 0), 0),
            dues: studentList.reduce((sum, student) => sum + (Number(student.dues) || 0), 0),
            concession: studentList.reduce((sum, student) => sum + (Number(student.concession) || 0), 0),
            busFirstTermAmt: studentList.reduce((sum, student) => sum + (Number(student.busFirstTermAmt) || 0), 0),
            busFirstTermPaidAmt: studentList.reduce((sum, student) => sum + (Number(student.busFirstTermPaidAmt) || 0), 0),
            busfirstTermDues: studentList.reduce((sum, student) => sum + (Number(student.busfirstTermDues) || 0), 0),
            busSecondTermAmt: studentList.reduce((sum, student) => sum + (Number(student.busSecondTermAmt) || 0), 0),
            busSecondTermPaidAmt: studentList.reduce((sum, student) => sum + (Number(student.busSecondTermPaidAmt) || 0), 0),
            busSecondTermDues: studentList.reduce((sum, student) => sum + (Number(student.busSecondTermDues) || 0), 0),
        };
    
        setTotalValues(newTotalValues);
    };
    

    useEffect(()=>{
        setIsStudentListUpdated(false)
    },[totalValues])


    useEffect(() => {
        calculateTotals()
    }, [isStudentListUpdated])

    return (
        <>
            <tr>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}>TOTAL</th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}>ADMISSIONFEE</th>
                <th className={`${style.tfoot_head_cell}`}>AMOUNT PAID</th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}>I TERM SEPTEMBER</th>
                <th className={`${style.tfoot_head_cell}`}>AMOUNT PAID</th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}>II Term DECEMBER</th>
                <th className={`${style.tfoot_head_cell}`}>AMOUNT PAID</th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}></th>
                <th className={`${style.tfoot_head_cell}`}>ANNUAL FEES</th>
                <th className={`${style.tfoot_head_cell}`}>AMOUNT PAID</th>
                {adminPage && <th className={`${style.tfoot_head_cell}`}>DUES</th>}
                <th className={`${style.tfoot_head_cell}`}>CONCESSION 5%</th>
                <th className={`${style.tfoot_head_cell}`}>REMARKS</th>
                <th className={`${style.tfoot_head_cell}`}>BUS I TERM (JUN)</th>
                <th className={`${style.tfoot_head_cell}`}>AMOUNT PAID</th>
                {adminPage && <th className={`${style.tfoot_head_cell}`}>DUES</th>}
                <th className={`${style.tfoot_head_cell}`}>BUS II TERM (NOV)</th>
                <th className={`${style.tfoot_head_cell}`}>AMOUNT PAID</th>
                {adminPage && <th className={`${style.tfoot_head_cell}`}>DUES</th>}
                <th className={`${style.tfoot_head_cell}`}>BUS POINT</th>
                <th className={`${style.tfoot_head_cell}`}>WHATSAPP</th>
            </tr>
            <tr>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}>{totalValues.totalStudents} STUDENTS</th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}>{totalValues.adminssionAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}>{totalValues.adminssionPaidAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}>{totalValues.firstTermAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}>{totalValues.firstTermPaidAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}>{totalValues.secondTermAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}>{totalValues.secondTermPaidAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}>{totalValues.annualFee || "-"}</th>
                <th className={`${style.tbody_cell}`}>{totalValues.annualPaidAmt || "-"}</th>
                {adminPage && <th className={`${style.tbody_cell}`}>{totalValues.dues || "-"}</th>}
                <th className={`${style.tbody_cell}`}>{totalValues.concession || "-"}</th>
                <th className={`${style.tbody_cell}`}></th>
                <th className={`${style.tbody_cell}`}>{totalValues.busFirstTermAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}>{totalValues.busFirstTermPaidAmt || "-"}</th>
                {adminPage && <th className={`${style.tbody_cell}`}>{totalValues.busfirstTermDues || "-"}</th>}
                <th className={`${style.tbody_cell}`}>{totalValues.busSecondTermAmt || "-"}</th>
                <th className={`${style.tbody_cell}`}>{totalValues.busSecondTermPaidAmt || "-"}</th>
               {adminPage && <th className={`${style.tbody_cell}`}>{totalValues.busSecondTermDues || "-"}</th>}
            </tr>
            </>
    )
}

export default Total