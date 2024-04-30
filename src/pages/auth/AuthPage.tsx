import { useContext, useState } from "react";
import logoWhite from "@assets/logo/logo-white.png"
import LoginSubpage from "./LoginSubpage";
import RegisterSubpage from "./RegisterSubpage";
import { useEffect } from "react";

import { AuthState } from "@lib/types/user-types";
import { useAuth } from "@lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@components/ui/background-beams";

export default function AuthPage() {

    const {login, authState, register} = useAuth();

    const navigate = useNavigate();

    const renderSubPage = () =>{
        if (authState === AuthState.Nope) return <LoginSubpage login={login} />
        else if (authState === AuthState.NotRegistered) return <RegisterSubpage register={register} />
        else if (authState === AuthState.Authenticated) navigate("/home")
    }


    return (
            <div className="w-screen h-screen bg-primary bg-opacity-50 overflow-hidden flex flex-col lg:flex-row p-6 gap-6 md:px-12 lg:px-24">
                {/* Decorations */}
                
                <img src={logoWhite} className="left-[-20vw] bottom-[-50vh] h-[140vh] fixed opacity-10 object-cover"/>

                {/* Auth Form */}
                <div className="w-full lg:w-[50%] h-1/4 lg:h-full flex items-end lg:items-start lg:relative lg:mt-[15vh] ">
                    <div className="flex  flex-col font-nbinter font-light  gap-2 text-3xl md:text-5xl  xl:text-5xl">
                        <p className="">Dive into Web3 Charity with our</p>
                        <div className="flex flex-wrap gap-2">
                            <p className="bg-yellow-100  ">Transparent</p>
                            <p>&nbsp;and&nbsp;</p>
                            <p className="bg-fuchsia-100 ">Trusted</p>
                        </div>
                        <p className="">Decentralized App</p>
                    </div>
                </div>
                <div className="w-full h-1/2 lg:h-full lg:w-[50%]  flex justify-center items-center">
                    <div 
                        className={`h-[70%] lg:h-[50%] bg-background z-20 shadow-xl text-black p-8 rounded-lg transition-all duration-500 w-full  `}
                    >
                        <div className={`flex flex-col justify-between h-full transition-all duration-500 ${authState === AuthState.Loading ? 'opacity-0' : 'opacity-100'}`}>
                            {renderSubPage()}
                        </div>
                    </div>

                </div>
                <BackgroundBeams className="z-0"/>
            </div>
    );
}
