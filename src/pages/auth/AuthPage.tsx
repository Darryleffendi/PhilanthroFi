import { useContext, useState } from "react";
import logoWhite from "@assets/logo-white.png"
import LoginSubpage from "./LoginSubpage";
import RegisterSubpage from "./RegisterSubpage";
import { useEffect } from "react";

import ProtectedRoute from "src/middleware/protected-route";
import { AuthContext } from "src/context/auth-context";
import { AuthState } from "@lib/types/user-types";

export default function AuthPage() {

    const {authState} = useContext(AuthContext)

    const [authTypeState, setAuthTypeState] = useState(authState);

    const [opacity, setOpacity] = useState(0);
    const [width, setWidth] = useState(authState === AuthState.Nope ? 28 : 36);

    const renderSubPage = () =>{
        if (authState === AuthState.Nope) return <LoginSubpage changeAuthType={changeAuthType} />
        else if (authState === AuthState.NotRegistered) return <RegisterSubpage changeAuthType={changeAuthType} />
    }

    const changeAuthType = async () => {
        setOpacity(0);
        await new Promise(resolve => setTimeout(resolve, 200));
        setWidth(authState !== AuthState.Nope ? 28 : 36)
        await new Promise(resolve => setTimeout(resolve, 300));
        // if (authTypeState === "login") {
        //     setAuthTypeState("register");
        // } else {
        //     setAuthTypeState("login");
        // }
        setOpacity(100);
    }

    useEffect(() => {
        setOpacity(100);
    }, [])

    return (
        <ProtectedRoute>
            <div className="w-screen h-screen bg-primary overflow-hidden flex p-6">
                {/* Decorations */}
                {/* <Blob color="#b9d6ff" className="fixed left-[-10vw] bottom-0 w-8/12 opacity-20"/> */}
                <img src={logoWhite} className="right-[-20vw] top-0 h-[140vh] fixed opacity-5 brightness-200"/>

            {/* Auth Form */}
            <div className="w-[36rem] h-full bg-background z-20 shadow-xl flex flex-col text-black p-8 justify-between rounded-lg font-nunito">
            {renderSubPage()}
            </div>
        </div>
        </ProtectedRoute>
    );
}
