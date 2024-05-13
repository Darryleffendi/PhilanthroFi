import { Button } from "@components/ui/button";
import { useAuth } from "@lib/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import Wallet2 from "@components/wallet2";
import ReactTypingEffect from 'react-typing-effect';
import LandingNavbar from "@components/landing-navbar";
import logoWhite from "@assets/logo/logo-pure-white.png"
import Numbers from "@components/ui/numbers";
import gnb from "@"

import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@lib/settings/query-settings";
import TwitterCard from "@components/twitter-card";


export default function LandingPage() {

    const {logout, user} = useAuth()
    const [navMode, setNavMode] = useState<'top' | 'default'>("top")
    
    const [circleRadius, setCircleRadius] = useState(25)
    const [scrollIndex, setScrollIndex] = useState(0);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const yInv = useTransform(scrollYProgress, [0, 1], [0, 1200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-600, 100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [200, 100]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const [isBottom, setIsBottom] = useState(false);

    const observerTargetRef = useRef(null);
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
            setCircleRadius(calc < 25 ? calc : 25)
            setScrollIndex(10 + scrollTop / 7)
        }
    }

    useEffect(() => {
        
            window.addEventListener("scroll", handleScroll);

            const observer = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    setIsBottom(entry.isIntersecting);
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

            <motion.div 
            className="w-full p-6 h-[85vh] -z-20 flex justify-center items-center flex-col gap-16 bg-slate-100 "
            style={{ scale, y: yInv }}
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
                    <Button onClick={() => navigate('/create/fundraise')} className="text-lg px-8 py-6 rounded-xl bg-transparent border border-slate-500">Become a Fund Raiser</Button>
                </div>
            </motion.div>
            
            <motion.div
                className="w-full z-10 relative"
                style={{ y }}
            >
                <div className={`w-full`}>
                    <div className={`w-full h-full  relative transition-all duration-300 ${isBottom ? "px-8" : ""}`}>
                        <div className="w-full bg-primary z-40 px-24 pt-64 flex flex-col" style={{"borderRadius" : circleRadius + "vw"}}>
                            <div className="flex flex-col gap-8  font-nbinter">
                                <div className={`text-xl w-fit font-medium overflow-hidden relative z-10`}>
                                    <div className={`bg-yellow-100 absolute h-full transition-all -z-10 duration-300 ${scrollIndex > 90 ? "w-full" : "w-0"}`}></div>
                                    Our commitment
                                </div>
                                <div className="text-transparent text-6xl w-[75%] bg-black bg-clip-text mb-64">
                                    {
                                        ("At PhilantroFi, we commit to transparency and trust. Our blockchain platform ensures every donation is traceable and secure, from start to impact.").split("").map((word, i) => {
                                            return (
                                                <span key={i} className={`${i > scrollIndex ? "text-black opacity-10" : "text-black"}`}>{word}</span>
                                            )
                                        })
                                    }
                                        
                                </div> 
                            </div>

                            <div className="flex justify-between items-center mb-36 w-full ">
                                <Numbers title="Opportunies Created" number={421} numberStyle="text-8xl font-medium " titleStyle="text-3xl   font-medium"/>
                                <Numbers title="Funds Raised" number={23312231} numberStyle="text-8xl font-medium " titleStyle="text-3xl  font-medium" prefix="$"/>
                                <Numbers title="Contributors" number={13201} numberStyle="text-8xl font-medium" titleStyle="text-3xl font-medium"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-8 absolute mt-40" ref={observerTargetRef}></div>
                </div>
            </motion.div>

            <div className="flex w-full justify-between p-24 -z-10">
                <motion.div className="w-full h-screen flex-col " style={{y: y2, filter: `blur(${scrollIndex > 225 ? "2px" : "0px"})`}}>
                    <div className="w-full flex mt-10">

                    </div>
                    
                    {/* Design code rada jelek, sorry. Kalo dirapiin nanti spasi ilang */}
                    <p className="font-nbinter text-7xl mt-20  leading-[1.15]">
                        We <span className={`w-fit relative`}>
                            Focus
                            <div className={`transition-all duration-300 bg-yellow-100 h-full absolute top-0 left-0 -z-10 ${scrollIndex > 210 ? "w-full" : "w-0"}`}></div>
                        </span> on
                    </p>
                    <p className="font-nbinter text-7xl  leading-[1.15] ">
                        <span className={`w-fit relative`}>
                            transparent
                            <div className={`transition-all duration-300 bg-purple-200 h-full absolute top-0 left-0 -z-10 ${scrollIndex > 235 ? "w-full" : "w-0"}`}></div>
                        </span> charitable giving that genuinely makes a <span className={`w-fit relative`}>
                            difference
                            <div className={`transition-all duration-300 bg-blue-200 h-full absolute top-0 left-0 -z-10 ${scrollIndex > 260 ? "w-full" : "w-0"}`}></div>
                        </span>.
                    </p>
                </motion.div>
                
                <motion.div className="flex flex-col gap-4 w-96 relative items-end" style={{y: y3}}>
                    <div className="absolute w-[28rem] flex flex-col gap-3 transition-all duration-300" style={{filter: `blur(${scrollIndex < 225 ? "4px" : "0px"})`}}>
                        <TwitterCard image={<></>} username={"John Silitonga"} tweet="Lorem ipsum dolor sit amet consectetur, officia natus harum molestiae quidem ab libero est ipsa. Magnam illo corrupti, consectetur quasi ipsum modi."/>
                        <TwitterCard image={<></>} username={"Victor Hafidz"} tweet="Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur dolor sit amet consectetur dolor sit amet consectetur officia natus harum molestiae quidem ab libero est ipsa. Magnam illo corrupti, consectetur quasi ipsum modi."/>
                    </div>
                </motion.div>
            </div>

            <div className=' w-full h-screen flex flex-col gap-10'>
                <div>
                    User Data:
                    <br/>
                    {user?.email}
                    <br/>

                    <>{user?.timestamp}</>
                    <>{user?.birth_date}</>
                </div>
                <Button onClick={()=>{logout(); queryClient.invalidateQueries(['userData'])}} className="text-8xl">LOGOUT PANTEK</Button>
            
            </div>

        </div>
        
    );
    }
