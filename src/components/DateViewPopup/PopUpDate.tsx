import React, { Fragment, useContext, useEffect, useState } from 'react'
import { ChangesMadeApiResponse, DateDataType } from '../../Pages/Admin/Reports/Calender/Calender'
import style from './PopUpDate.module.css'
import MainLoading from '../MainLoading/MainLoading';
import { SchoolContext } from '../../Context/SchoolContextProvider';

interface PopUpDateProp {
    dateData: DateDataType[];
    setShowingPopup: React.Dispatch<React.SetStateAction<boolean>>
    setDateData: React.Dispatch<React.SetStateAction<DateDataType[]>>
    isShowingPopup: boolean;
    selectedDateActive: string | null;
    changesMadeStudentId: string | null;
    changesMade: ChangesMadeApiResponse[];
    loading: boolean;
    isDataSet:boolean;
}

const PopUpDate: React.FC<PopUpDateProp> = ({ dateData, isDataSet, loading, changesMade }) => {

    const context = useContext(SchoolContext)

    if (!context) return <MainLoading />;

    const { studentList } = context

    const [ChangedStudent, setChangedStudent] = useState<{
        studentName: string | null;
        fieldsModified: Record<string, any>;  
    }[]>([]);

    const [isChangesListAvailable, setIsChangesListAvailable] = useState<boolean>(false)

    const getTotalAdmissionFee = (): number => {
        return dateData.reduce((acc, curr) => acc + (curr.adminssionPaidAmt ?? 0), 0);
    };

    const getTotalFirstTermFee = (): number => {
        return dateData.reduce((acc, curr) => acc + (curr.firstTermPaidAmt ?? 0), 0);
    };

    const getTotalSecondTermFee = (): number => {
        return dateData.reduce((acc, curr) => acc + (curr.secondTermPaidAmt ?? 0), 0);
    };

    const getTotalAmount = (): number => {
        return getTotalAdmissionFee() + getTotalFirstTermFee() + getTotalSecondTermFee();
    };


    useEffect(() => {
        if (!loading && isDataSet && changesMade.length > 0 && studentList.length > 0) {
            setChangedStudent([])
            const updatedList = changesMade
                .map((change) => {
                    const student = studentList.find((s) => s._id === change.relationId);

                    if (!student) return null; 

                    // Convert fieldsModified array into an object with values from student
                    const modifiedFieldsObject = change.fieldsModified?.reduce((acc, field) => {
                        if (student[field] !== undefined) {
                            acc[field] = student[field]; 
                        }
                        return acc;
                    }, {} as Record<string, any>);

                    return {
                        studentName: student.studentName || null,
                        fieldsModified: modifiedFieldsObject || {}, // Ensure it's always an object
                    };
                })
                .filter((item): item is ({ studentName: string | null; fieldsModified: Record<string, any> }) => item !== null)

            setChangedStudent(updatedList);
        }
    }, [isDataSet]);


    useEffect(() => {
        // setIsChangesListAvailable(false)

        let isAvailable = ChangedStudent.some(item => Object.keys(item.fieldsModified).length)
        if (isAvailable) {
            setIsChangesListAvailable(true)
        }
    }, [ChangedStudent])

    return (
        <div className={`${style.popupOverlay}`} >
            <div className={`${style.popupContent}`}>
                <>

                    <div className={`${style.paymentcontainer}`}>
                        {dateData.length > 0 ? (
                            <>
                                <table className={`${style.popupTable}`}>
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Admission Fee</th>
                                            <th>I Term Fee</th>
                                            <th>II Term Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dateData.map((ele, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{ele.studentName || "-"}</td>
                                                    <td>{ele.adminssionPaidAmt || "-"}</td>
                                                    <td>{ele.firstTermPaidAmt || "-"}</td>
                                                    <td>{ele.secondTermPaidAmt || "-"}</td>
                                                </tr>
                                            )
                                        })}

                                        <tr>
                                            <td>Amount</td>
                                            <td>{getTotalAdmissionFee()}</td>
                                            <td>{getTotalFirstTermFee()}</td>
                                            <td>{getTotalSecondTermFee()}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={4}> Total Amount : {getTotalAmount()} for today</td>
                                        </tr>



                                    </tbody>
                                </table>
                            </>
                        )
                            :
                            <div className={`${style.emptyMessageContainer}`}>
                                <p className={`${style.emptyMessage}`}>No transactions are there for this date.</p>
                            </div>
                        }
                    </div>



                    <section className={`${style.changescontainer}`}>
                        {isChangesListAvailable && <h1>Changes Made Today</h1>}
                        {isChangesListAvailable ? <>

                            <div className={`${style.changesinnercontainer}`}>
                                {ChangedStudent.map((item, i) => {
                                    return (<Fragment key={i}>
                                        <div className={`${style.changeddatasingle}`}>
                                            <div className={`${style.changedStudentName}`}>
                                                <p>Student Name <span>{item.studentName}</span></p>
                                            </div>

                                            <div className={`${style.changedStudentFieldsContainer}`}>
                                                <h3>Fields Modified: </h3>
                                                {Object.entries(item.fieldsModified).map(([k, v], i) => (
                                                    <div key={i} className={`${style.changedStudentFields}`}>
                                                        <p>{k}: <span>{v}</span>,</p>
                                                    </div>
                                                ))}
                                            </div>
                                        <div className={`${style.divider}`}>
                                       
                                            </div>
                                        </div>

                                    </Fragment>)

                                })}
                            </div>

                        </>
                            :
                            <div className={`${style.emptyMessageChangeContainer}`}>
                                <p className={`${style.emptyMessage}`}>No changes are there for this date.</p>
                            </div>
                        }
                    </section>

                </>
            </div>
        </div>
    )
}

export default PopUpDate