
import { useAuth } from "@lib/hooks/useAuth";
import { AuthState } from "@lib/types/user-types";
import { ReactNode, Suspense, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps{
    children: ReactNode
}
export default function ProtectedRoute({children}:ProtectedRouteProps) {

    const {authState,isLoading} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if(authState == AuthState.Nope) navigate('/auth')
		else if(authState == AuthState.NotRegistered) navigate('/auth')
    
	}, [authState, isLoading])
	


	
    if (isLoading) {
		return (
			<div className="w-[100vw] h-[100vh] flex justify-center items-center">
				<div className="font-bold text-5xl">Loading</div>
			</div>
		);
	}

    return (
        <>
            {children}
        </>
    )
}
