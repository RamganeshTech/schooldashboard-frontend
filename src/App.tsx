import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginSelection from './Pages/LoginGroup/LoginSelection'
import React, { Component, Suspense } from 'react';

import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin';
import MainLoading from './components/MainLoading/MainLoading';

const AccountantPermission = React.lazy(() => import('./Pages/Admin/Reports/AccountantPermission/AccountantPermission'));
const Accountant = React.lazy(() => import('./Pages/Accountant/Accountant'));
const NotFound = React.lazy(() => import('./Pages/Not Found/NotFound'));
const AddDetail = React.lazy(() => import('./Pages/Accountant/AddDetails/AddDetail'));
const AdminHome = React.lazy(() => import('./Pages/Admin/AdminHome/AdminHome'));
const AdminStudent = React.lazy(() => import('./Pages/Admin/AdminStudent/AdminStudent'));
const AccountantLoginCreation = React.lazy(() => import('./Pages/Admin/AccountantLoginCreation/AccountantLoginCreation'));
const DeletedCredential = React.lazy(() => import('./Pages/Admin/DeletedLoginCredentials/DeletedCredential'));

const AdminNotification = React.lazy(() => import('./Pages/Admin/AdminNotification/AdminNotification'));

const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute/ProtectedRoute'));

const Reports = React.lazy(()=> import('./Pages/Admin/Reports/Reports') )




interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error boundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong from error boudary.</h1>;
    }
    return this.props.children;
  }
}

function App() {

  return (
    <>
      <Suspense fallback={<MainLoading />}>
        <ErrorBoundary>
          <Router>
            <Routes >
              <Route index element={<LoginSelection />} />

              <Route path='/accountantlogin' element={<AdminLogin />} />
              <Route path='/adminlogin' element={<AdminLogin />} />


              <Route path='/accountant' element={<ProtectedRoute userType="accountant" element={<Accountant />} />}>
                <Route index element={<ProtectedRoute userType="accountant" element={<AddDetail />} />} />
                <Route path="reports" element={<ProtectedRoute userType="accountant" element={<Reports />} />} />
              </Route>


              <Route path='/admin' element={<ProtectedRoute userType="admin" element={<AdminHome />} />} >
                <Route index element={<ProtectedRoute userType="admin" element={<AdminStudent />} />} />
                <Route path="notification" element={<ProtectedRoute userType="admin" element={<AdminNotification />} />} />
                <Route path="Accountantlogincredentials" element={<ProtectedRoute userType="admin" element={<AccountantLoginCreation />} />} />
                <Route path="deletedcredentials" element={<ProtectedRoute userType="admin" element={<DeletedCredential />} />} />
                <Route path="reports" element={<ProtectedRoute userType="admin" element={<Reports />} />} />
                <Route path="viewpermissionlist" element={<ProtectedRoute userType="admin" element={<AccountantPermission />} />} />
              </Route>

              <Route path='*' element={<NotFound />} />

            </Routes>
          </Router>
        </ErrorBoundary>
      </Suspense >
    </>
  )
}

export default App
