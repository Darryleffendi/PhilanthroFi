
import { useAuth } from "@lib/hooks/useAuth";
import { ADMIN, AuthState } from "@lib/types/user-types";
import { ReactNode, Suspense, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";

interface AdminRouteProps{
    children: ReactNode
}
export default function AdminRoute({children}:AdminRouteProps) {

    const {authState,isLoading,user} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if(!isLoading ){
			if(authState!==AuthState.Authenticated || !user){
				if(authState == AuthState.Nope) navigate('/auth')
				else if(authState == AuthState.NotRegistered) navigate('/auth')
			}
            else{
                if(user.role!==ADMIN)navigate('/')
            }
		}

    
	}, [authState, isLoading])
	


	
    if (isLoading) {
		return (
			<div className="w-[100vw] h-[100vh] flex justify-center items-center">
				{/* <div className="font-bold text-5xl">Loading</div> */}
			</div>
		);
	}

    return (
        <Suspense fallback={<>Loading</>}>
            {children}
        </Suspense>
    )
}
