import React, { useState, useEffect, useContext } from "react";
import style from "./Calender.module.css";
import DateViewPopup from "../../../../components/DateViewPopup/DateViewPopup";
import PopUpDate from "../../../../components/DateViewPopup/PopUpDate";
import { SchoolContext } from "../../../../Context/SchoolContextProvider";
import MainLoading from "../../../../components/MainLoading/MainLoading";
import axiosInstance from "../../../../Api/apiClient";
import { CustomAxiosRequestConfig } from "../../../../Types/types";
import axios from "axios";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


export interface DateDataType {
    studentName: string | null,
    adminssionPaidAmt: number | null,
    firstTermPaidAmt: number | null;
    secondTermPaidAmt: number | null;
}

export interface ChangesMadeApiResponse {
    _id: String;
    modifiedDate: string;
    fieldsModified: [];
    relationId: string;
}

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 25 + i); // Last 25 years + next 25

const Calendar: React.FC = () => {

    const context = useContext(SchoolContext)

    if (!context) return <MainLoading />;

    const { adminPage } = context

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [calendarDays, setCalendarDays] = useState<{ day: number, isCurrentMonth: boolean }[]>([]);

    const [selectedDateActive, setSelectedDateActive] = useState<string | null>(null)
    const [isShowingPopup, setShowingPopup] = useState<boolean>(false)

    const [dateData, setDateData] = useState<DateDataType[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const [isDataSet, setIsDataSet] =  useState<boolean>(false)


    const [changesMade, setChangesMade] = useState<ChangesMadeApiResponse[]>([])
    const [changesMadeStudentId, setChangesMadeStudentId] = useState<string | null>(null)


    // Calculate the days grid for the selected month/year, including previous and next month days
    useEffect(() => {
        const daysGrid = generateCalendarGrid(selectedYear, selectedMonth);
        setCalendarDays(daysGrid);
    }, [selectedMonth, selectedYear]);

    // Get the number of days in a month and the starting day of the month
    const generateCalendarGrid = (year: number, month: number) => {
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); // Get total days in the month

        const days: { day: number, isCurrentMonth: boolean }[] = [];

        for (let i = 1; i <= lastDayOfMonth; i++) {
            days.push({ day: i, isCurrentMonth: true });
        }

        return days;
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const prevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear((prev) => prev - 1);
        } else {
            setSelectedMonth((prev) => prev - 1);
        }
    };

    const nextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear((prev) => prev + 1);
        } else {
            setSelectedMonth((prev) => prev + 1);
        }
    };



    useEffect(() => {
        const getChagnesMade = async () => {
            setLoading(true)
            setIsDataSet(false)
            try {
                let { data } = await axiosInstance.get(`/api/${adminPage ? "admin" : "accountant"}/changesRetrived/${selectedDateActive}`, {
                    userType: adminPage ? "admin" : "accountant"
                } as CustomAxiosRequestConfig<void>)

                if (data.ok) {
                    setChangesMade(data.data)
                    setIsDataSet(true)
                    setChangesMadeStudentId(data.data.relationId)
                }
            }
            catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response)
                } else if ((error as Error).name === 'AbortError') {
                    console.error("Request was aborted:", (error as Error).message);
                } else if (error instanceof Error) {
                    console.log(error.message)
                } else {
                    console.log("unexpected error occured")
                }
                setIsDataSet(false)
            }
            finally {
                setLoading(false)
            }
        }

        getChagnesMade()
    }, [selectedDateActive])


    return (
        <div className={`${style.calendarContainer}`}>
            {/* Header with Arrows & Dropdowns */}
            <div className={`${style.header}`}>
                <button className={`${style.arrow}`} onClick={prevMonth}>{"<"}</button>

                <select className={`${style.dropdown}`} value={selectedMonth} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                    ))}
                </select>

                <select
                    className={`${style.dropdown}`}
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <button className={`${style.arrow}`} onClick={nextMonth}>{">"}</button>
            </div>

            <main className={`${style.mainContainer}`}>
                <section className={`${style.daysContainer}`}>
                    <h1 className="">Days</h1>
                    <div className={`${style.actualDaysContainer}`}>
                        {calendarDays.map((dayObj, index) => (
                            <DateViewPopup key={index} dayObj={dayObj} selectedMonth={selectedMonth} selectedYear={selectedYear}
                                isShowingPopup={isShowingPopup} setShowingPopup={setShowingPopup} setDateData={setDateData}
                                selectedDateActive={selectedDateActive} setSelectedDateActive={setSelectedDateActive}

                            />
                        ))}
                    </div>
                </section>
                <section className={`${style.transactionListContainer}`}>
                    {isShowingPopup && <PopUpDate isDataSet={isDataSet} loading={loading} changesMadeStudentId={changesMadeStudentId} changesMade={changesMade} selectedDateActive={selectedDateActive} dateData={dateData} setShowingPopup={setShowingPopup} setDateData={setDateData} isShowingPopup={isShowingPopup} />}
                </section>
            </main>



        </div>


    );
};

export default Calendar;