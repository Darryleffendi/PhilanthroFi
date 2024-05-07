import { Button } from "@components/ui/button";
import MainLayout from "./layout/main-layout";
import { useAuth } from "@lib/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import Wallet2 from "@components/wallet2";
import ReactTypingEffect from 'react-typing-effect';
import LandingNavbar from "@components/landing-navbar";
import logoWhite from "@assets/logo/logo-pure-white.png"


export default function LandingPage() {

  const {logout, user} = useAuth()
  const [navMode, setNavMode] = useState<'top' | 'default'>("top")
  const [circleScale, setCircleScale] = useState(9999999)
  
  const [isSticky, setIsSticky] = useState(false);
  const observerTargetRef = useRef(null);

  let scrollTop = 0;
    
  const handleScroll = async () => {
    scrollTop = window.pageYOffset;

    if(scrollTop > 0) {
        setNavMode("default")
    }
    else {
        setNavMode("top")
    }
    
    if(scrollTop > 100) {
        setCircleScale(Math.pow((10000/(scrollTop - 100)), 1))
    }
  }

  useEffect(() => {
    
        window.addEventListener("scroll", handleScroll);

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                console.log("pntk")
                setIsSticky(!entry.isIntersecting);
            }
        );

        if (observerTargetRef.current) {
            observer.observe(observerTargetRef.current);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.cursor = '';
            
            if (observerTargetRef.current) {
                observer.unobserve(observerTargetRef.current);
            }
        }
    }, [])

  return (
    <div className="bg-slate-100 ">
        <LandingNavbar navMode={navMode}/>
        <img src={logoWhite} className="left-[-20vw] bottom-[-50vh] h-[140vh] absolute opacity-[25%] object-cover"/>

        <div className="w-full p-6 h-screen -z-20 flex justify-center items-center flex-col gap-10 bg-slate-100 ">
            <div className="flex flex-col items-center gap-5 z-10">
                <div className="flex font-nbinter font-black text-7xl">
                    <h1>Transforming&nbsp;</h1>
                    <h1 className="bg-yellow-100">Charity</h1>
                </div>
                <div className="flex font-nbinter font-black text-8xl z-10">
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

        <div className="w-screen absolute h-14 -mt-14" ref={observerTargetRef}></div>
        
        <div className={`w-full h-screen z-0 ${isSticky ? "fixed top-0" : "absolute"}`}>
            <div className="w-full h-screen overflow-hidden rounded-3xl relative">
                <div className="absolute w-screen h-[100vw] bg-primary z-40" style={{"borderRadius" : circleScale + "vw"}}>

                </div>
            </div>
        </div>

        <div className="w-screen h-[300vh]">

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
