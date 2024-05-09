import MainLayout from "@pages/layout/main-layout";
import { useEffect, useRef, useState } from "react";
import logoWhite from "@assets/logo/logo-white.png"
import FundraiseDetailSubpage from "./fundraise-detail-subpage";
import FundraisePersonalSubpage from "./fundraise-personal-subpage";
import { useAuth } from "@lib/hooks/useAuth";
import { FundraiseType } from "@lib/types/fundraise-subpage-types";
import { steps } from "framer-motion";
import FundraiseTargetSubpage from "./fundraise-target-subpage";


const FundraisePage = () => {

    const {logout, user} = useAuth()

    const [currStep, setCurrStep] = useState(0);
    const [subpageOpacity, setSubpageOpacity] = useState(0);

    const [title, setTitle] = useState(<></>);
    const [subtitle, setSubtitle] = useState("");
    const [titleOpacity, setTitleOpacity] = useState(0);
    const [subtitleOpacity, setSubtitleOpacity] = useState(0);

    const [data, setData] = useState<FundraiseType>({
        project_name: "",
        project_description: "",
        project_location: "",
        first_name: user ? (user.first_name) : "",
        last_name: user ? (user.last_name) : "",
        phone_number: "",
        address: "",
        zip_code: "",
        target_amount: 0,
        target_currency: "ICP",
    })

    const changeData = (key : string, value : string) => {
        setData({
            ...data,
            [key]: value
        })
    }

    const changeTitle = async (title : JSX.Element, subtitle : string) => {
        if(titleOpacity > 0) {
            setTitleOpacity(0);
            await new Promise(r => setTimeout(r, 200));
            setSubtitleOpacity(0);
            await new Promise(r => setTimeout(r, 500));
        }
        await new Promise(r => setTimeout(r, 25));
        setTitle(title);
        setSubtitle(subtitle);
        setTitleOpacity(100);
        await new Promise(r => setTimeout(r, 200));
        setSubtitleOpacity(100);
    }

    const changeStep = async (index : number) => {
        setSubpageOpacity(0);
        await new Promise(r => setTimeout(r, 500));
        setCurrStep(index);
        setSubpageOpacity(100);
    }

    const pages = [
        <FundraiseDetailSubpage changeTitle={changeTitle} changeData={changeData} data={data} changeStep={changeStep}/>,
        <FundraisePersonalSubpage changeTitle={changeTitle} changeData={changeData} data={data} changeStep={changeStep}/>,
        <FundraiseTargetSubpage changeTitle={changeTitle} changeData={changeData} data={data} changeStep={changeStep}/>,
    ]

    useEffect(() => {
        changeStep(0);
    }, [])

    return (
        <MainLayout className="">
            <div className="bg-primary bg-opacity-50 w-full h-screen flex items-center justify-between px-24 pt-20">

                <div className="w-[40%] h-[70vh] flex flex-col justify-between z-10">

                    <div>
                        <p className="font-nunito text-sm mb-2 font-light text-late-800">Step {currStep+1} / {pages.length}</p>
                        <div className="flex gap-1">
                        {
                            Array.from(Array(pages.length)).map((i : number, idx : number) => {
                                return (
                                    <div 
                                        className={`w-3 h-1 cursor-pointer bg-opacity-60 hover:bg-opacity-100 transition-all duration-100
                                            ${idx <= currStep ? "bg-blue-400" : "bg-slate-300"} `}
                                        onClick={() => changeStep(idx)}
                                    >
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>

                    <div className="w-full h-[75%] flex flex-col gap-10">
                        <div 
                            style={{opacity : titleOpacity, transform: `translateY(${titleOpacity > 0 ? 0 : 28}px)`}}
                            className="font-nbinter text-3xl md:text-5xl xl:text-5xl flex flex-wrap gap-y-2 transition-all duration-500"
                        >
                            {title}
                        </div>
                        <p 
                            style={{opacity : subtitleOpacity, transform: `translateY(${subtitleOpacity > 0 ? 0 : 28}px)`}}
                            className="font-nunito font-light transition-all duration-500"
                        >
                            {subtitle}
                        </p>
                    </div>

                </div>
                <div className="bg-background w-[50%] h-[65vh] rounded-xl shadow-lg p-10">
                    <div
                        className="w-full h-full transition-all duration-500 flex flex-col font-nunito justify-between" 
                        style={{opacity: subpageOpacity}}
                    >
                    {
                        pages[currStep]
                    }
                    </div>
                </div>
                <img src={logoWhite} className="left-[-20vw] bottom-[-50vh] h-[140vh] absolute opacity-[13%] object-cover"/>

            </div>
        </MainLayout>
    )
}

export default FundraisePage;