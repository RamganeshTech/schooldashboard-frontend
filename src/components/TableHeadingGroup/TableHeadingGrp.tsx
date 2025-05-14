import React, { useContext } from 'react'
import style from './TableHeadingGrp.module.css'
import { SchoolContext } from '../../Context/SchoolContextProvider';

const TableHeadingGrp:React.FC = () => {

    const context = useContext(SchoolContext);

    if (!context) return;
  
    const { adminPage } = context
  
  return ( 
         <tr className={`${style.thead_row}`}>
                <th className={`${style.thead_cell}  `}>S.NO</th>
                <th className={`${style.thead_cell}  `}>NEW/OLD</th>
                <th className={`${style.thead_cell}  `}>CLASS</th>
                <th className={`${style.thead_cell}  `}>SECTION</th>
                <th className={`${style.thead_cell}  `}>STUDENT NAME</th>

                <th className={`${style.thead_cell}`}>ADMISSION FEES</th>
                <th className={`${style.thead_cell}`}>PAID AMOUNT</th>
               <th className={`${style.thead_cell}`}>BILL NO</th>
                <th className={`${style.thead_cell}`}>FEE DATE</th>

                <th className={`${style.thead_cell}`}>I TERM SEPTEMBER</th>
                <th className={`${style.thead_cell}`}>I TERM PAID AMOUNT</th>
                <th className={`${style.thead_cell}`}>BILL NO</th>
                <th className={`${style.thead_cell}`}>FEE DATE</th>

                <th className={`${style.thead_cell}`}>II TERM DECEMBER</th>
                <th className={`${style.thead_cell}`}>II TERM PAID AMOUNT</th>
                 <th className={`${style.thead_cell}`}>BILL NO</th>
                <th className={`${style.thead_cell}`}>FEE DATE</th>

                <th className={`${style.thead_cell}`}>ANNUAL FEES</th>
                <th className={`${style.thead_cell}`}>PAID AMOUNT</th>
                {adminPage &&  <th className={`${style.thead_cell}`}>DUES</th>}

                <th className={`${style.thead_cell}`}>CONCESSION 5%</th>
                <th className={`${style.thead_cell}`}>REMARKS</th>


                <th className={`${style.thead_cell}`}>BUS I TERM (JUN)</th>
                <th className={`${style.thead_cell}`}>AMOUNT PAID</th>
                {adminPage &&  <th className={`${style.thead_cell}`}>DUES</th>}

                <th className={`${style.thead_cell}`}>BUS II TERM (NOV)</th>
                <th className={`${style.thead_cell}`}>AMOUNT PAID</th>
                {adminPage &&  <th className={`${style.thead_cell}`}>DUES</th>}

                <th className={`${style.thead_cell}`}>BUS POINT</th>
                <th className={`${style.thead_cell}`}>WHATSAPP</th>
                <th className={`${style.thead_cell}`}>UPDATE</th>
                <th className={`${style.thead_cell}`}>SAVE</th>
                {adminPage && <th className={`${style.thead_cell}`}>GENERATE  TC</th>}
              </tr>
  )
}

export default TableHeadingGrp