import { censorAddress } from "@lib/utils/utils";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { LuPlug } from "react-icons/lu";
import { Button } from "./ui/button";

const WalletButton = () => {

    const [publicAdress, setPublicAdress] = useState<string>('');

    useEffect(() => {

        // @ts-ignore
        if(!window?.ic?.plug.agent) {
            setPublicAdress("")
        }
        else {
            (async () => {
                // @ts-ignore
                const address = await window?.ic?.plug.agent?.getPrincipal()
                setPublicAdress(address.toString())
            })()
        }

        //@ts-ignore
    }, [window?.ic?.plug.agent])

    return (
        <>
        {
            // @ts-ignore
            window?.ic?.plug.agent ? (
                <Button 
                    className='h-9 rounded-full bg-gray-50 pr-7 pl-5 hover:bg-slate-200 transition-all duration-500 flex gap-3 hover:gap-5 hover:pl-3 items-center'
                    // @ts-ignore
                    // onClick={() => window?.ic?.plug.requestDisconnect()}
                >
                    <LuPlug />
                    <p>{censorAddress(publicAdress)}</p>
                </Button>
            ) : (
                <Button 
                    className='h-9 rounded-full bg-gray-50 pl-7 pr-5 hover:bg-slate-200 transition-all duration-500 flex gap-3 hover:gap-5 hover:pr-3 items-center'
                    // @ts-ignore
                    onClick={() => window?.ic?.plug.requestConnect()}
                >
                    <p>Connect Wallet</p>
                    <IoArrowForward  className='transition-all duration-300 text-base'/>
                </Button>
            )
        }
        </>
    )
}

export default WalletButton;