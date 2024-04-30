import { useAuth } from "@ic-reactor/react";
import { AuthState } from "@lib/types/user-types";
import { ReactNode, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/auth-context";

interface ProtectedRouteProps{
    children: ReactNode
}
export default function ProtectedRoute({children}:ProtectedRouteProps) {

    const {authState, user} = useContext(AuthContext)
	const navigate = useNavigate();
    console.log(authState)

    useEffect(() => {
		if (authState == AuthState.Loading) {
			return
		}
        else if (authState == AuthState.Nope) {
			navigate('/login');
		}
        else if (authState == AuthState.NotRegistered) {
			navigate('/register')
		}
        
	}, [user, authState]);
    
    if (authState == AuthState.Loading) {
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
