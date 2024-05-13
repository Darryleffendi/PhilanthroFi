import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { queryClient } from "@lib/settings/query-settings";
import { UserBase } from "@lib/types/user-types";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
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


    const { mutate: regisAccount, isLoading: regisAccountLoading, error: regisAccountError, isSuccess } = useMutation(
        async () =>{
            if(regisData.first_name === "" || regisData.last_name === "" || regisData.birth_date === "" || regisData.email === ""){
                setErrorMsg("Please fill all fields")
                throw new Error("Please fill all fields")
            }
            if(!regisData.email.includes("@")){
                setErrorMsg("Invalid email")
                throw new Error("Invalid email")
            }
    
            const res =  await register(regisData)
            if(res.err) throw new Error(res.err)
            return res.ok
        },
        {
        onError: (error: Error) => {
            setErrorMsg("Registration Invalid")
            console.error('Error during creating account:', error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['userData']);
            console.log('Created account successfully:', data);
            navigate('/home')
        }
    });

    return (
        <>
        <div>
            <p className="font-bold text-2xl">Welcome</p>
            <p className="">Register to PhilanthroFi</p>
        </div>

        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <div className=" flex flex-col gap-1 w-full">
                    <p className="text-sm">First Name</p>
                    <Input 
                        className="bg-transparent" placeholder="John"
                        onChange={(e) => changeData("first_name", e.target.value)} value={regisData.first_name}
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm">Last Name</p>
                    <Input 
                        className="bg-transparent" placeholder="Doe"
                        onChange={(e) => changeData("last_name", e.target.value)} value={regisData.last_name}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <p className="text-sm">Date of Birth</p>
                <Input 
                    type={"date"} className="bg-transparent"
                    onChange={(e) => changeData("birth_date", e.target.value)} value={regisData.birth_date}
                />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <p className="text-sm">Email</p>
                <Input 
                    className="bg-transparent" placeholder="youremail@mail.com"
                    onChange={(e) => changeData("email", e.target.value)} value={regisData.email}
                />
            </div>
            <Button 
                disabled={regisAccountLoading}
                className="text-white bg-blue-300 font-bold"
                onClick={() => regisAccount()}
            >
                {regisAccountLoading ? "Loading" : "Register"}
            </Button>

            <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
        <div></div>
        </>
    )
}

type props = {
    register : (userRegisData: UserBase) => Promise<any>
}