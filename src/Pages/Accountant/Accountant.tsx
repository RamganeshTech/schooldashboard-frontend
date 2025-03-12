import { useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import style from './accountant.module.css'
import { SchoolContext } from '../../Context/SchoolContextProvider';
import FormError from '../../components/FormError/FormError';
import MainLoading from '../../components/MainLoading/MainLoading';
import { Outlet } from 'react-router-dom';
const Accountant = () => {

    const context = useContext(SchoolContext);
  
    if (!context) return <MainLoading />;
  
    const { isErrorDisplaying} = context
  

  return (
    <div className={`${style.mainDiv} `}>
      <Navbar />

      {isErrorDisplaying && <FormError />}
      <Outlet />
    </div>
  )
}

export default Accountant




