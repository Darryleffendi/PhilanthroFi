import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { UserBase } from "@lib/types/user-types";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterSubpage({register} : props) {
    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState<string>("")

    const [regisData, setRegisData] = useState({
        first_name: "",
        last_name: "",
        birth_date: "",
        email: ""
    })

    const changeData = (key: string, value: string) => {
        setRegisData({
            ...regisData,
            [key]: value
        })
    }

    const regisAccount = async () =>{

        if(regisData.first_name === "" || regisData.last_name === "" || regisData.birth_date === "" || regisData.email === ""){
            setErrorMsg("Please fill all fields")
            return;
        }
        if(!regisData.email.includes("@")){
            setErrorMsg("Invalid email")
            return;
        }

        const res = await register(regisData)
        if(res.ok) navigate('/home')
        else if(res.err) setErrorMsg("Registration Invalid")
    }
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
                    <Input 
                        className="bg-transparent" placeholder="John"
                        onChange={(e) => changeData("first_name", e.target.value)} value={regisData.first_name}
                    />
                </div>
                <div className="w-full">
                    <p className="text-sm">Last Name</p>
                    <Input 
                        className="bg-transparent" placeholder="Doe"
                        onChange={(e) => changeData("last_name", e.target.value)} value={regisData.last_name}
                    />
                </div>
            </div>
            <div>
                <p className="text-sm">Date of Birth</p>
                <Input 
                    type={"date"} className="bg-transparent"
                    onChange={(e) => changeData("birth_date", e.target.value)} value={regisData.birth_date}
                />
            </div>
            <div>
                <p className="text-sm">Email</p>
                <Input 
                    className="bg-transparent" placeholder="youremail@mail.com"
                    onChange={(e) => changeData("email", e.target.value)} value={regisData.email}
                />
            </div>
            <Button 
                className="text-white font-bold"
                onClick={() => regisAccount()}
            >
                Register
            </Button>

            <p className="text-sm text-red-700">{errorMsg}</p>
            
            {/* <div 
                className="mt-5 text-sm flex cursor-pointer opacity-55 hover:opacity-100 transition"
                onClick={() => changeAuthType()}
            >
                <p>Already have account?&nbsp;</p>
                <p className="text-sky-500 font-bold">Login</p>
            </div> */}
        </div>
        <div></div>
        </>
    )
}

type props = {
    register : (userRegisData: UserBase) => Promise<any>
}