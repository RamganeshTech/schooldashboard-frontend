import { createContext, useState, useContext, ReactNode } from 'react';


interface AuthContextType {
   
    viewAccountantPermission: boolean;
    setViewAccountantPermission:React.Dispatch<React.SetStateAction<boolean>>;
   }


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [viewAccountantPermission, setViewAccountantPermission] = useState<boolean>(false);

    let value = { 
        viewAccountantPermission, setViewAccountantPermission,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}



