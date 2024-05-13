import logoWhite from "@assets/logo/logo-white.png"
import logoDark from '@assets/logo/logo-dark.png';
import { useAuth } from "@lib/hooks/useAuth";
import { AuthState } from "@lib/types/user-types";
import { useEffect, useState } from "react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isValidAdmin } from "src/middleware/admin-protected-route";

export default function AdminAuth() {

    const {adminLogin} = useAuth();
    const navigate = useNavigate();

    const [cookies] = useCookies(['ph1l4ntr0F1']); 
    const[regisData, setRegisData] = useState({
        email:"",
        password:""
    })

    const changeData = (key: string, value: string) => {
        setRegisData({
            ...regisData,
            [key]: value
        })
    }

    const { mutate: handleAdminLogin, isLoading: adminIsLoading, error: adminError, isSuccess: adminIsSuccess } = useMutation(
        async () => {
            return await adminLogin(regisData.email, regisData.password);
        }, 
        {

        onError: (error: Error) => {
            console.error('Error during admin login', error.message);
        },
        onSuccess: (data) => {
            if(data)navigate('/ph1l4ntr0F1/admin/manage')
        }
    });


    useEffect(() => {
        if(isValidAdmin(cookies.ph1l4ntr0F1)) navigate('/ph1l4ntr0F1/admin/manage')
    }, [])
    

    return (
        <div className="w-screen h-screen bg-primary bg-opacity-50 overflow-hidden flex flex-col lg:flex-row p-6 gap-6 md:px-12 lg:px-24 justify-center items-center">
            {/* Decorations */}
            
            <img src={logoWhite} className="left-[-20vw] z-0 bottom-[-50vh] h-[140vh] fixed opacity-[13%] object-cover"/>

            {/* Auth Form */}
            <div className="bg-white w-[40%] h-[45%] p-8 z-10 flex flex-col">
                <div className="flex items-center gap-2 h-fit">
                    <img src={logoDark} className="object-cover h-10" alt="" />
                    <div className={`text-3xl font-[500] overflow-hidden duration-500 `}>
                        PhilanthroFi
                    </div>
                </div> 
                <div className="w-full flex justify-center items-center flex-col h-full gap-4 p-4">
                    <div className="w-full h-[60%] flex flex-col gap-4">
                        <div className="w-full gap-1 flex flex-col">
                            <p className="font-medium">Email</p>
                            <Input 
                                type={"email"} className="bg-transparent"
                                onChange={(e) => changeData("email", e.target.value)} value={regisData.email}
                            />
                        </div>
                        <div className="w-full gap-1 flex flex-col">
                            <p className="font-medium">Password</p>
                            <Input 
                                type={"password"} className="bg-transparent"
                                onChange={(e) => changeData("password", e.target.value)} value={regisData.password}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <Button disabled={adminIsLoading} onClick={()=>{handleAdminLogin()}} className="text-white w-full bg-blue-300 font-bold">
                                {adminIsLoading ? "Loading" : "Login"}
                        </Button>
                    </div>
                    <div className="w-full">
                        <p className="text-red-300 text-sm text-start">{adminError?.message}</p>
                    </div>
                </div>

            </div>
            
            
            {/* <BackgroundBeams className="z-0"/> */}
        </div>
    )
}

