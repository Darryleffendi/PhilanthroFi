import { useState } from "react";
import logoWhite from "@assets/logo-white.png"
import LoginSubpage from "./LoginSubpage";
import RegisterSubpage from "./RegisterSubpage";
import { useEffect } from "react";

export default function AuthPage({authType = "login"} : params) {

    const [authTypeState, setAuthTypeState] = useState(authType);
    const [opacity, setOpacity] = useState(0);
    const [width, setWidth] = useState(authType === "login" ? 28 : 36);

    const changeAuthType = async () => {
        setOpacity(0);
        await new Promise(resolve => setTimeout(resolve, 200));
        setWidth(authTypeState !== "login" ? 28 : 36)
        await new Promise(resolve => setTimeout(resolve, 300));
        if (authTypeState === "login") {
            setAuthTypeState("register");
        } else {
            setAuthTypeState("login");
        }
        setOpacity(100);
    }

    useEffect(() => {
        setOpacity(100);
    }, [])

    return (
        <div className="w-screen h-screen bg-primary overflow-hidden flex p-6">
            {/* Decorations */}
            {/* <Blob color="#b9d6ff" className="fixed left-[-10vw] bottom-0 w-8/12 opacity-20"/> */}
            <img src={logoWhite} className="right-[-20vw] top-0 h-[140vh] fixed opacity-5 brightness-200"/>

            {/* Auth Form */}
            <div 
                className={`h-full bg-background z-20 shadow-xl text-black p-8 rounded-lg font-nunito 
                    transition-all duration-500 w-[${width}rem] `}
            >
                <div className={`h-full flex flex-col justify-between transition-all duration-500 opacity-${opacity}`}> 
                {
                    authTypeState === "login" ? (
                        <LoginSubpage changeAuthType={changeAuthType} />
                    ) : (
                        <RegisterSubpage changeAuthType={changeAuthType}/>
                    )
                }
                </div>
            </div>
        </div>
    );
}

type params = {
    authType : "login" | "register"
}