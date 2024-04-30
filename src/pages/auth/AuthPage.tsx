import { useContext, useState } from "react";
import logoWhite from "@assets/logo-white.png"
import LoginSubpage from "./LoginSubpage";
import RegisterSubpage from "./RegisterSubpage";
import { useEffect } from "react";

import ProtectedRoute from "src/middleware/protected-route";
import { AuthContext } from "src/context/auth-context";
import { AuthState } from "@lib/types/user-types";
import { useAuth } from "@lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {

    const {user,login, authState, register, logout} = useAuth();
    const [opacity, setOpacity] = useState(0);

    const navigate = useNavigate();

    const renderSubPage = () =>{
        if (authState === AuthState.Nope) return <LoginSubpage login={login} />
        else if (authState === AuthState.NotRegistered) return <RegisterSubpage register={register} />
        else navigate("/home")
    }
   
    const changeAuthType = async () => {
        // setOpacity(0);
        await new Promise(resolve => setTimeout(resolve, 500));

        setOpacity(100);
    }

    useEffect(() => {
        console.log(authState)
    }, [authState, user])

    useEffect(() => {
        setOpacity(100);
    }, [])


    return (
        // <ProtectedRoute>
            <div className="w-screen h-screen bg-primary overflow-hidden flex p-6">
                {/* Decorations */}
                <img src={logoWhite} className="right-[-20vw] top-0 h-[140vh] fixed opacity-5 brightness-200"/>

                {/* Auth Form */}
                <div 
                    className={`h-full bg-background z-20 shadow-xl text-black p-8 rounded-lg transition-all duration-500 ${authState === AuthState.Nope ? "w-[28rem]" : "w-[36rem]"} font-nunito`}
                >
                    <div className={`flex flex-col justify-between h-full transition-all duration-500 ${authState === AuthState.Loading ? 'opacity-0' : 'opacity-100'}`}>
                    {renderSubPage()}
                    </div>
                </div>
            </div>
        // </ProtectedRoute>
    );
}
