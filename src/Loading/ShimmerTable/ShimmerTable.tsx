// components/ShimmerStudentTable.tsx
import React from 'react';
import ShimmerCell from '../../ResuableComponents/ShimmerCell/ShimmerCell';
import style from '../../components/SingleStudent/SingleStudent.module.css'


type ShimmerTableProp = {
    rowCount:number;
    columnCount:number;
}

const ShimmerTable:React.FC<ShimmerTableProp> = ({rowCount = 10, columnCount = 32}) => {

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className={`${style.tbody_row}`}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <td
              key={colIndex}
              className={`${style.tbody_cell}`}
            >
              <ShimmerCell height={24} width="90%" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default ShimmerTable;
