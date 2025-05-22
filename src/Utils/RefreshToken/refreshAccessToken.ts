import axios from "axios";

interface RefreshTokenParams {
    userType: ("admin"|"accountant")
}

export const AdminRefreshToken = async (): Promise<boolean | null> => {
    try {

        const {data} = await axios.post(`${import.meta.env.VITE_APP_BASE_API}/api/admin/refresh`, {}, {
            withCredentials:true
        }); 

        // console.log(data)
        return data.ok; 
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error)
        }
        else if(error instanceof Error){
            console.log(error.message)
        }
        else{
            console.log(error, "something went wrong")
        }
        return null; 
    }
};


export const refreshAccessToken = async ({userType}:RefreshTokenParams)=>{
    try {
        
        const {data} = await axios.post(`${import.meta.env.VITE_APP_BASE_API}/api/${userType}/refresh`, {}, {
            withCredentials:true
        }); 

        // console.log("from using refresh token to get the accessToken from normal fucntion: ",data)
        
        return data.accessToken; 
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error)
        }
        else if(error instanceof Error){
            console.log(error.message)
        }
        else{
            console.log(error, "something went wrong")
        }
        return null; 
    }
   
}
