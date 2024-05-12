import logoWhite from "@assets/logo/logo-white.png"
import logoDark from '@assets/logo/logo-dark.png';
import { useAuth } from "@lib/hooks/useAuth";
import { AuthState } from "@lib/types/user-types";

export default function AdminAuth() {

    const {login, authState, register, isLoading} = useAuth();


    return (
        <div className="w-screen h-screen bg-primary bg-opacity-50 overflow-hidden flex flex-col lg:flex-row p-6 gap-6 md:px-12 lg:px-24 justify-center items-center">
            {/* Decorations */}
            
            <img src={logoWhite} className="left-[-20vw] bottom-[-50vh] h-[140vh] fixed opacity-[13%] object-cover"/>

            {/* Auth Form */}
            <div className="bg-white w-[40%] h-[40%] p-8 ">
                <div className="flex items-center gap-2 ">
                    <img src={logoDark} className="object-cover h-10" alt="" />
                    <div className={`text-3xl font-[500] overflow-hidden duration-500 `}>
                        PhilanthroFi
                    </div>
                </div> 


            </div>
            
            
            {/* <BackgroundBeams className="z-0"/> */}
        </div>
    )
}

