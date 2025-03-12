import React, { useContext, useEffect } from 'react'
import { refreshAccessToken } from '../Utils/RefreshToken/refreshAccessToken';
import { SchoolContext } from '../Context/SchoolContextProvider';
import { useAuthContext } from '../Context/AuthProvider';

const useAccessTokenRefresh = () => {

    let {getCurrentUserRole, userRole} = useAuthContext()

    useEffect(() => {
      let refreshInterval: ReturnType<typeof setInterval> | null = null;

      const fetchRole = async () => {
          if (!userRole) {
              console.log("⏹️ No userRole detected (logged out), clearing interval if exists");
              if (refreshInterval) {
                  clearInterval(refreshInterval);
                  refreshInterval = null; // Reset the interval variable
              }
              await getCurrentUserRole(); // Fetch the user role if it's null
              // return; // Exit the function
          }
  
          if (userRole) {
              console.log("2nd if condition of fetchRole after setting userRole");
              let userType: "admin" | "accountant" = userRole === "admin" ? "admin" : "accountant";
  
              // Clear any existing interval before setting a new one
              if (refreshInterval) {
                  clearInterval(refreshInterval);
              }
  
              refreshInterval = setInterval(async () => {
                  console.log("🔄 Attempting to refresh access token...");
                  const newAccessToken: string | null = await refreshAccessToken({ userType });
                  console.log("newAccessToken", newAccessToken);
                  if (!newAccessToken) {
                      console.warn("⚠️ Session expired. Please log in again.");
                  }
              }, 1 * 60 * 1000); // 1 minute
          }
      }
  
      fetchRole();
  
      // Cleanup function to clear the interval when component unmounts or userRole changes
      return () => {
          if (refreshInterval) {
              console.log("⏹️ Cleanup: Clearing interval due to dependency change/unmount");
              clearInterval(refreshInterval);
          }
      };
       
      }, [userRole]);
    
      return null;
}

export default useAccessTokenRefresh
