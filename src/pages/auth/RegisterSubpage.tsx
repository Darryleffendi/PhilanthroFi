import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Dispatch, SetStateAction } from "react";

export default function RegisterSubpage({changeAuthType} : props) {
    return (
        <>
        <div>
            <p className="font-bold text-2xl">Welcome</p>
            <p className="">Register to PhilanthroFi</p>
        </div>

        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <div className="w-full">
                    <p className="text-sm">First Name</p>
                    <Input className="bg-transparent" placeholder="John"/>
                </div>
                <div className="w-full">
                    <p className="text-sm">Last Name</p>
                    <Input className="bg-transparent" placeholder="Silitonga"/>
                </div>
            </div>
            <div>
                <p className="text-sm">Date of Birth</p>
                <Input type={"date"} className="bg-transparent"/>
            </div>
            <div>
                <p className="text-sm">Email</p>
                <Input className="bg-transparent" placeholder="youremail@mail.com"/>
            </div>
            <Button className="text-white font-bold">Login</Button>
            
            <div 
                className="mt-5 text-sm flex cursor-pointer opacity-55 hover:opacity-100 transition"
                onClick={() => changeAuthType()}
            >
                <p>Already have account?&nbsp;</p>
                <p className="text-sky-500 font-bold">Login</p>
            </div>
        </div>
        <div></div>
        </>
    )
}

type props = {
    changeAuthType : () => Promise<void>
}