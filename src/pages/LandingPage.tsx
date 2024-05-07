import { Button } from "@components/ui/button";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "@lib/hooks/useAuth";
import { useEffect, useState } from "react";
import Wallet2 from "@components/wallet2";
import ReactTypingEffect from 'react-typing-effect';
import LandingNavbar from "@components/LandingNavbar";
import logoWhite from "@assets/logo/logo-white.png"

export default function LandingPage() {

  const {logout, user} = useAuth()
  const [navMode, setNavMode] = useState<'top' | 'default'>("top")
  const [circleScale, setCircleScale] = useState(0)

  let scrollTop = 0;
    
  const handleScroll = async () => {
    scrollTop = window.pageYOffset;

    if(scrollTop > 0) {
        setNavMode("default")
    }
    else {
        setNavMode("top")
    }
    setCircleScale(scrollTop/50)
    console.log(scrollTop)
  }

  useEffect(() => {
    
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.cursor = '';
        }
    }, [])

  return (
    <div>
        <LandingNavbar navMode={navMode}/>
        <img src={logoWhite} className="absolute brightness-200 w-[80vw] top-[5vw] right-[50vw] opacity-30"/>

        <div className="bg-slate-100 w-full p-6 h-screen -z-20 flex justify-center items-center flex-col gap-10">
            <div className="flex flex-col items-center gap-5 z-10">
                <div className="flex font-nbinter font-black text-7xl">
                    <h1>Transforming&nbsp;</h1>
                    <h1 className="bg-yellow-100">Charity</h1>
                </div>
                <div className="flex font-nbinter font-black text-8xl">
                    <h1 className="">With&nbsp;</h1>
                    <ReactTypingEffect
                        text={["Technology", "Transparency", "Blockchain", "Trust"]}
                        displayTextRenderer={(text : string, i : number) => {
                        let color = i % 2 == 0 ? "bg-primary" : "bg-purple-200";
                        return (
                            <h1>
                            {text.split('').map((char : string, i : number) => {
                                const key = `${i}`;
                                return (
                                <span
                                    className={`${i >= 0 ? color : ""}`}
                                    key={key}
                                >{char}</span>
                                );
                            })}
                            </h1>
                        );
                        }}        
                    />
                </div>
            </div>
            <div className="text-center font-nbinter text-lg z-10">
                <p>Leverage the ICP blockchain for traceable donations.</p>
                <p>Every dollar is visible, every gift counts.</p>
            </div>
            <div className="flex items-center gap-3 font-nbinter z-10">
                <Button className="text-lg px-8 py-6 rounded-xl bg-transparent border border-slate-500">Start Donating</Button>
                <Button className="text-lg px-8 py-6 rounded-xl bg-transparent border border-slate-500">Become a Fund Raiser</Button>
            </div>
        </div>

        <div className=' w-full h-screen flex flex-col gap-10'>
          Ini landing page, boleh siapa aja masuk, tapi home udah kena cockblock sama auth
          <div>
            User Data:
            <br/>
            {user?.email}
            <br/>
            {user?.first_name}
          </div>
          <Button onClick={()=>{logout()}} className="text-8xl">LOGOUT PANTEK</Button>
          
          <div>
            <Wallet2></Wallet2>
          </div>
        </div>

        {/* <div className="fixed h-screen w-full flex justify-center top-[100vh]">
            <div className="bg-primary w-48 h-48 rounded-full" style={{transform: `scale(${circleScale})`}}></div>

        </div> */}
        <div className="z-20">
            test
        </div>
    </div>
      
  );
}
