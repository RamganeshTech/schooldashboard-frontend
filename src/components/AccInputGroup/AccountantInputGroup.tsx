import React, { useContext } from 'react'
import { StudentDetailnew } from '../../Types/types'
import style from './AccountantInputGroup.module.css'
import Input from '../../ResuableComponents/Input/Input';
import { Button, CircularProgress } from '@mui/material';
import { SchoolContext } from '../../Context/SchoolContextProvider';

interface AccountantInputGroupProps {
    student: StudentDetailnew;
    setStudent: React.Dispatch<React.SetStateAction<StudentDetailnew>>;
}

const AccountantInputGroup: React.FC<AccountantInputGroupProps> = ({ student, setStudent }) => {

    const context = useContext(SchoolContext);

    if (!context) return;

    const { setStudentList, handleAccountantSubmit, accountantLoading } = context


    let hiddenStudentDetails = [
        "admissionBillNo",
        "firstTermBillNo",
        "secondTermBillNo",
        "dues",
        "busfirstTermDues",
        "busSecondTermDues"
    ]

    const NumberTypeList = [
        "adminssionAmt",
        "adminssionPaidAmt",
        "firstTermAmt",
        "firstTermPaidAmt",
        "secondTermAmt",
        "secondTermPaidAmt",
        "annualPaidAmt",
        "busFirstTermAmt",
        "busFirstTermPaidAmt",
        "busSecondTermAmt",
        "busSecondTermPaidAmt",
        "annualFee",
        "concession",
    ]

    let dateList = [
        "admissionDate",
        "firstTermDate",
        "secondTermDate"
    ]


    return (
        
            <tr className={`${style.tbody_row} `}>
                <td className={`${style.tbody_cell} `}>

                </td>

                {(Object.keys(student) as Array<keyof StudentDetailnew>).map((ele, index) => {

                    if (!hiddenStudentDetails.includes(ele as string)) {

                        const inputType = (ele: string) => {
                            if (dateList.includes(ele)) {
                                return "date"
                            }
                            else if (NumberTypeList.includes(ele)) {
                                return "number"
                            }
                            else {
                                return "text"
                            }
                        }

                        if(ele === "studentName"){
                            console.log("from AccountantInputGroup component value of studentName", ele, student[ele])
                        }

                        if(ele === "section"){

                            console.log("from AccountantInputGroup component value of section", ele, student[ele])
                        }
                        return (
                            <td key={ele} className={`${style.tbody_cell}`}>
                                <Input
                                    name={ele}
                                    index={index}
                                    required="no"
                                    state={student[ele]}
                                    placeholder=''
                                    setState={setStudent}
                                    updateKey={ele}
                                    type={inputType(ele)}
                                />
                            </td>)
                    }
                }
                )
                }

                <td className={`${style.tbody_cell}`}>
                    <Button
                        disabled
                        sx={{
                            background: "#f2b84d",
                            color: "white",
                            width: "150px",
                            fontWeight: 500,
                            fontSize: "18px",
                            padding: "0px 10px",
                            transition: 'background 0.3s ease', // Smooth transition
                            '&:hover': {
                                background: '#178f17',
                            },
                        }}
                    >
                        {/* <IconButton>
                            <EditIcon />
                        </IconButton> */}
                        Update
                    </Button>
                </td>
                <td className={`${style.tbody_cell}`}>
                    <Button
                        // type='submit'
                            disabled={accountantLoading}
                        onClick={(e) => { handleAccountantSubmit(e, setStudentList, setStudent) }}
                        sx={{
                            // background: "green",
                            // color: "var(--normal-text-color)",
                            width: "150px",
                            fontWeight: 500,
                            fontSize: "18px",
                            background: "#26bc26",
                            color: "white",
                            padding: "0px 10px",
                            transition: 'background 0.3s ease', // Smooth transition
                            '&:hover': {
                                background: '#178f17',
                            },
                            "&:disabled": {
                                marginRight: "10px",
                                backgroundColor: "#26bc26",
                                color: "white",
                                //  height:"35px",
                                fontSize: "18px",
                                height: "31px",
                                padding: "0px 10px",
                            },
                        }}
                    >
                        {/* <IconButton>
                            <SaveIcon />
                        </IconButton> */}
                        {accountantLoading ? <CircularProgress size={24} thickness={5} sx={{ color: "white" }} /> : "Save"}
                    </Button>
                </td>

            </tr>
        
    )
}

export default AccountantInputGroup