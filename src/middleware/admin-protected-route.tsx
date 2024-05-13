
import { useAuth } from "@lib/hooks/useAuth";
import { ADMIN } from "@lib/types/user-types";
import { ReactNode, Suspense, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";

interface AdminProtectedRouteProps{
    children: ReactNode
}
export default function AdminProtectedRoute({children}:AdminProtectedRouteProps) {

    const {getAdmin} = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        const admin = getAdmin()
        if (!admin || !isValidAdmin(admin)) {
            navigate('/'); 
        }
    }, [getAdmin, navigate]);

    

    return (
        <Suspense fallback={<>Loading</>}>
            {children}
        </Suspense>
    )
}

export const isValidAdmin = (cookie:any) =>{
    return cookie && cookie.role == ADMIN;
}
