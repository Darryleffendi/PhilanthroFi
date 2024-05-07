import { Button } from "@components/ui/button";
import icpLogo from "@assets/logo/icp.png";

export default function LoginSubpage({login} : props) {

    return (
        <>
        <div>
            <p className="font-[500] text-2xl">Welcome Back</p>
            <p className="">Login to PhilanthroFi</p>
        </div>

        

        <div className="flex flex-col gap-5">
            <Button 
                className="font-[500] bg-transparent gap-4 text-black border-black h-12 hover:bg-slate-300 border hover:border-slate-300"
                onClick={() => login()}
            >
                <img src={icpLogo} className="h-[90%]"/>
                <div className="">Login with Internet Identity</div>
            </Button>
        </div>
        </>
    )
}

type props = {
    login : () => Promise<void>
}