import { Button } from "@components/ui/button";
import { useAuth } from "@lib/hooks/useAuth";
import { useEffect, useState } from "react";
import Wallet2 from "@components/wallet2";
import ReactTypingEffect from 'react-typing-effect';
import LandingNavbar from "@components/landing-navbar";
import logoWhite from "@assets/logo/logo-pure-white.png"
import Numbers from "@components/ui/numbers";

import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@lib/settings/query-settings";


export default function LandingPage() {

    const {logout, user} = useAuth()
    const [navMode, setNavMode] = useState<'top' | 'default'>("top")
    
    const [circleRadius, setCircleRadius] = useState(15)
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -2000]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const navigate = useNavigate();
    

    let scrollTop = 0;

    const handleScroll = async () => {
        scrollTop = window.pageYOffset;

        if(scrollTop > 0) {
            setNavMode("default")
        }
        else {
            setNavMode("top")
        }
        
        if(scrollTop > 50) {
            let calc = Math.pow((1000/(scrollTop - 5)),1)
            setCircleRadius(calc < 15 ? calc : 15)
        }
    }

    useEffect(() => {
        
            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
                document.body.style.cursor = '';
            }
        }, [])
        

    return (
        <div className="bg-slate-100 ">
            <LandingNavbar navMode={navMode}/>

            <motion.div 
            className="w-full p-6 h-[85vh] -z-20 flex justify-center items-center flex-col gap-16 bg-slate-100 "
            style={{ scale }}
            >
            <img src={logoWhite} className="left-[-20vw] mt-[75vh] h-[140vh] absolute opacity-[25%] object-cover "/>

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
                <div className="flex items-center gap-4 z-10">
                    <Button onClick={() => navigate('home')} className="text-lg px-8 py-6 rounded-xl bg-transparent border border-slate-500">Start Donating</Button>
                    <Button onClick={() => navigate('fundraise')} className="text-lg px-8 py-6 rounded-xl bg-transparent border border-slate-500">Become a Fund Raiser</Button>
                </div>
            </motion.div>
            
            <motion.div
                className="w-full h-[100vw] z-0"
                style={{ y }}
            >
                <div className={`w-full h-[100vw] z-0}`}>
                    <div className="w-full h-full overflow-hidden relative">
                        <div className="absolute w-screen h-[100vw] bg-primary z-40 p-24 pt-64 flex flex-col gap-48" style={{"borderRadius" : circleRadius + "vw"}}>
                                <div className="flex flex-col gap-8">
                                    <div className="text-xl bg-yellow-100 w-fit font-medium">
                                        Our commitment
                                    </div>
                                    <div className="text-transparent text-6xl w-[75%] bg-black bg-clip-text">
                                        At PhilantroFi, we commit to transparency and trust. Our blockchain platform ensures every donation is traceable and secure, from start to impact. 
                                    </div> 
                                </div>

                                <div className="flex justify-center">
                                    <div className="flex justify-center items-center gap-40">
                                        <Numbers title="Opportunies Created" number={421} numberStyle="text-8xl font-medium " titleStyle="text-3xl   font-medium"/>
                                        <Numbers title="Funds Raised" number={23312231} numberStyle="text-8xl font-medium " titleStyle="text-3xl  font-medium" prefix="$"/>
                                        <Numbers title="Contributors" number={13201} numberStyle="text-8xl font-medium" titleStyle="text-3xl font-medium"/>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className=' w-full h-screen flex flex-col gap-10'>
                <div>
                    User Data:
                    <br/>
                    {user?.email}
                    <br/>

                    <>{user?.timestamp}</>
                    <>{user?.birth_date}</>
                </div>
            ;
                <Button onClick={()=>{logout(); queryClient.invalidateQueries(['userData'])}} className="text-8xl">LOGOUT PANTEK</Button>
            
            </div>

        </div>
        
    );
    }
