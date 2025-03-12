import React, { useContext, useEffect } from 'react'
import style from './DateViewPopup.module.css'
import { SchoolContext } from '../../Context/SchoolContextProvider';
import { DateDataType } from '../../Pages/Admin/Reports/Calender/Calender';

interface DateViewPopupProp {
    dayObj: { day: number, isCurrentMonth: boolean }
    selectedMonth: number;
    selectedYear: number;
    isShowingPopup: boolean;
    setShowingPopup: React.Dispatch<React.SetStateAction<boolean>>
    setDateData: React.Dispatch<React.SetStateAction<DateDataType[]>>;
    selectedDateActive: string | null;
    setSelectedDateActive: React.Dispatch<React.SetStateAction<string | null>>

}

const DateViewPopup: React.FC<DateViewPopupProp> = ({ dayObj, selectedMonth, selectedYear, setShowingPopup, setDateData , selectedDateActive, setSelectedDateActive}) => {

    let context = useContext(SchoolContext)

    if (!context) return;

    let { studentList } = context;    

    const handlePopUp = async (dayObj: { day: number, isCurrentMonth: boolean }) => {
        try{
        let selectedDate = `${dayObj.day.toString().padStart(2, '0')}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedYear}`;
        setSelectedDateActive(selectedDate); 
        setShowingPopup(true);

        const [day, month, year] = selectedDate.split('-');
        const formattedDate = `${year}-${month}-${day}`;

        const date = new Date(formattedDate);
        date.setUTCHours(0, 0, 0, 0); 

        selectedDate = date.toISOString().split('T')[0]; 

        let dateDataArray: DateDataType[] = []


        studentList.forEach(student => {
            let newEntry: DateDataType | null = null; 

            if (student.admissionDate) {
                const [day, month, year] = student.admissionDate.split('-');
                const formattedDate = `${year}-${month}-${day}`;
                const studentAdmissionDate = new Date(formattedDate);
                studentAdmissionDate.setUTCHours(0, 0, 0, 0);
                const normalizedStudentDate = studentAdmissionDate.toISOString().split('T')[0];

                if (normalizedStudentDate === selectedDate) {
                    newEntry = newEntry || { studentName: student.studentName, adminssionPaidAmt: null, firstTermPaidAmt: null, secondTermPaidAmt: null };
                    newEntry.adminssionPaidAmt = student.adminssionPaidAmt;
                }
            }

            if (student.firstTermDate) {
                const [day, month, year] = student.firstTermDate.split('-');
                const formattedDate = `${year}-${month}-${day}`;
                const studentFirstTermDate = new Date(formattedDate);
                studentFirstTermDate.setUTCHours(0, 0, 0, 0);
                const normalizedFirstTermDate = studentFirstTermDate.toISOString().split('T')[0];

                if (normalizedFirstTermDate === selectedDate) {
                    newEntry = newEntry || { studentName: student.studentName, adminssionPaidAmt: null, firstTermPaidAmt: null, secondTermPaidAmt: null };
                    newEntry.firstTermPaidAmt = student.firstTermPaidAmt;
                }
            }

            if (student.secondTermDate) {
                const [day, month, year] = student.secondTermDate.split('-');
                const formattedDate = `${year}-${month}-${day}`;
                const studentSecondTermDate = new Date(formattedDate);
                studentSecondTermDate.setUTCHours(0, 0, 0, 0);
                const normalizedSecondTermDate = studentSecondTermDate.toISOString().split('T')[0];

                if (normalizedSecondTermDate === selectedDate) {
                    newEntry = newEntry || { studentName: student.studentName, adminssionPaidAmt: null, firstTermPaidAmt: null, secondTermPaidAmt: null };
                    newEntry.secondTermPaidAmt = student.secondTermPaidAmt;
                }
            }

            if (newEntry) {
                dateDataArray.push(newEntry);
            }
        });

        setDateData(dateDataArray); 

    }
    catch(error){
        if(error instanceof Error){
            console.log(error)
        }
    }
    }

    useEffect(() => {
        const today = new Date();
        const formattedToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;

        let selectedDate = `${dayObj.day.toString().padStart(2, '0')}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedYear}`;

        if (formattedToday === selectedDate) {
             handlePopUp(dayObj);
        }
    }, []);

  


    return (
        <div
            // className={`${style.day} ${!dayObj.isCurrentMonth ? style.dimmed : ""}`}
            className={`${style.day} ${!dayObj.isCurrentMonth ? style.dimmed : ""} ${selectedDateActive === `${dayObj.day.toString().padStart(2, '0')}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedYear}` ? style.selectedDate : ''}`}
            onClick={() => handlePopUp(dayObj)}
        >
            {dayObj.day}
        </div>
    )
}

export default DateViewPopup