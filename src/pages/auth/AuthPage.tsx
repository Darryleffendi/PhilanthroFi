import { useState } from "react";
import logoWhite from "@assets/logo-white.png"
import LoginSubpage from "./LoginSubpage";
import RegisterSubpage from "./RegisterSubpage";

export default function AuthPage({authType = "login"} : params) {

    const [authTypeState, setAuthTypeState] = useState(authType);

    return (
        <div className="w-screen h-screen bg-primary overflow-hidden flex p-6">
            {/* Decorations */}
            {/* <Blob color="#b9d6ff" className="fixed left-[-10vw] bottom-0 w-8/12 opacity-20"/> */}
            <img src={logoWhite} className="right-[-20vw] top-0 h-[140vh] fixed opacity-5 brightness-200"/>

            {/* Auth Form */}
            <div className="w-[36rem] h-full bg-background z-20 shadow-xl flex flex-col text-black p-8 justify-between rounded-lg font-nunito">
                {
                    authTypeState === "login" ? (
                        <LoginSubpage />
                    ) : (
                        <RegisterSubpage />
                    )
                }
            </div>
        </div>
    );
}

type params = {
    authType : "login" | "register"
}