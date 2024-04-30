import { Button } from "@components/ui/button";
import icpLogo from "@assets/icp.png";
import { Input } from "@components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@lib/hooks/useAuth";

export default function LoginSubpage({login} : props) {

    return (
        <>
        <div>
            <p className="font-bold text-2xl">Welcome Back</p>
            <p className="">Login to PhilanthroFi</p>
        </div>

        <div className="flex flex-col font-gruppo text-2xl font-medium mb-20">
            <p className="">Dive into Web3 Charity with our</p>
            <div className="flex">
                <p className="bg-orange-200 rounded-lg px-2">Transparent</p>
                <p>&nbsp;and&nbsp;</p>
                <p className="bg-blue-200 rounded-lg px-2">Trusted</p>
            </div>
            <p className="">Decentralized App</p>
        </div>

        <div className="flex flex-col gap-5 mb-10">
            <Button 
                className="font-bold bg-transparent text-black border-black h-12 hover:bg-slate-300 border hover:border-slate-300"
                onClick={() => login()}
            >
                <img src={icpLogo} className="h-[90%] mr-4"/>
                Login with Internet Identity
            </Button>
        </div>
        </>
    )
}

type props = {
    login : () => Promise<void>
}