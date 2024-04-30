import { Button } from "@components/ui/button";
import icpLogo from "@assets/icp.png";
import { Input } from "@components/ui/input";
import { Dispatch, SetStateAction } from "react";

export default function LoginSubpage({changeAuthType} : props) {
    return (
        <>
        <div>
            <p className="font-bold text-2xl">Welcome Back</p>
            <p className="">Login to PhilanthroFi</p>
        </div>

        <div className="flex flex-col gap-5">
            
            
        </div>

        <div className="flex flex-col gap-5 mb-10">
            <Button className="font-bold bg-transparent text-black border-black h-12 hover:bg-slate-300 hover:border-slate-300">
                <img src={icpLogo} className="h-[90%] mr-4"/>
                Login with Internet Identity
            </Button>
            <div 
                className="text-sm flex cursor-pointer opacity-55 hover:opacity-100 transition"
                onClick={() => changeAuthType()}
            >
                <p>No account?&nbsp;</p>
                <p className="text-sky-500 font-bold">Register</p>
            </div>
        </div>
        </>
    )
}

type props = {
    changeAuthType : () => Promise<void>
}