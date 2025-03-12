import { useState } from "react";
import axios from "axios";

interface RefreshTokenParams {
  userType: "admin" | "accountant" | null;
}

const useRefreshToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const refreshAccessToken = async ({ userType }: RefreshTokenParams): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_API}/api/${userType}/refresh`, 
        {}, 
        { withCredentials: true }
      );

      return data.ok; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error);
        setError(error);
      } else if (error instanceof Error) {
        console.log("Error:", error.message);
        setError(error);
      } else {
        console.log("Unknown error:", error);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { refreshAccessToken, loading, error };
};


export default useRefreshToken;
