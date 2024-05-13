import Chip from "@components/chip"
import { CharityEvent } from "@lib/types/charity-types"
import MainLayout from "@pages/layout/main-layout"
import { useParams } from "react-router-dom"
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"
import { useEffect, useRef, useState } from "react"
import { FaUser } from "react-icons/fa"
import { Button } from "@components/ui/button"
import { LuCalendarRange } from "react-icons/lu";
import { IoEarthOutline } from "react-icons/io5";
import DetailPageTransaction from "./detail-page-transaction"
import DetailPageInformation from "./detail-page-information"
import { Progress } from "@components/ui/progress"
import { formatDate, timeLeftUntil } from "@lib/utils/date-utils"
import { useMutation } from "react-query"
import { useService } from "@lib/hooks/useService"
import { convertToDate } from "@lib/service/date-service"
import { cleanseCharity } from "@lib/utils/charity-utils"
import VhPuck from "@components/vh-puck"

const CharityDetail = () => {

    const [rightTranslate, setRightTranslate] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const observerTargetRef = useRef(null);
    const observerTargetRefBottom = useRef(null);
    const [progress, setProgress] = useState(15) // progress bar animation 
    const {getCharityService} = useService()

    // id charity nanti diambil dari url
    const {id} = useParams<{id: string}>()

    const [charity, setCharity] = useState<CharityEvent | null>(null);

    useEffect(() => {
        fetchCharity()
    }, [])

    const { mutate: fetchCharity, isLoading: fetchCharityLoading, error: createCharityError, isSuccess } = useMutation(
        async () => {
            const charityService = await getCharityService();
            const response = await charityService.getCharity(id ? id : "")

            return response
        }, {
        onSettled:()=>{
            console.log("fetch charity settled")
        },
        onError: (error: Error) => {
            console.error('Error during fetching charity:', error.message);
        },
        onSuccess: (data : any) => {
            data.ok = cleanseCharity(data.ok)

            setCharity(data.ok)
        }
    });

    let scrollTop = 0;

    const handleScroll = async () => {
        scrollTop = window.pageYOffset;
        
        if(!isSticky) setRightTranslate(scrollTop * 1.1);
    }

    useEffect(() => {
        if(charity == null) return;
        
        const timer = setTimeout(() => setProgress(charity.current_donation/charity.target_donation*100), 500)
        return () => clearTimeout(timer)
    }, [charity])
    

    useEffect(() => {
    
        window.addEventListener("scroll", handleScroll);

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsSticky(!entry.isIntersecting);
            }
        );

        const observer2 = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsBottom(entry.isIntersecting);
            }
        );

        if (observerTargetRef.current) {
            observer.observe(observerTargetRef.current);
        }
        if (observerTargetRefBottom.current) {
            observer2.observe(observerTargetRefBottom.current);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.cursor = '';
            
            if (observerTargetRef.current) {
                observer.unobserve(observerTargetRef.current);
            }
            if (observerTargetRefBottom.current) {
                observer2.unobserve(observerTargetRefBottom.current);
            }
        }
    }, [])

    return (
        <MainLayout className="px-24 bg-slate-100 min-h-screen w-full flex justify-between items-start gap-4">

            <div className="w-[45%] mt-8">
                
                <div className="w-full h-screen flex items-center">
                    <div className="w-full h-[55vh] flex flex-col justify-between">

                        <div className="flex flex-col gap-5 ">
                            <h1 className="text-4xl font-nbinter">{charity?.title}</h1>
                            <div className="flex w-full gap-2">
                            {
                                charity?.tags.map((tag, idx) => (
                                    // <Chip key={idx} text={tag}/>
                                    <VhPuck key={idx} tag={tag}/>
                                ))
                            }
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    className="h-12" 
                                    src={charity?.target_currency === "ICP" ? icpIcon : charity?.target_currency === "ckBTC" ? btcIcon : ethIcon}
                                />
                                <p className="text-3xl  font-black text-slate-700 ">{charity?.current_donation} {charity?.target_currency}</p>
                            </div>
                            <p className="mb-4 -mt-1 font-nbinter text-slate-500">
                                out of {charity?.target_donation} {charity?.target_currency} target funds
                            </p>
                            <div className="w-full h-2 rounded bg-slate-500 bg-opacity-20 shadow-md">
                                <Progress value={progress} className="h-2" />
                                {/* <div className="h-full rounded bg-primary" style={{width: charity.current_donation / charity.target_donation * 100 + "%"}}></div> */}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full border-slate-300 border-t py-12 flex flex-col gap-4">
                    
                    <div className="flex w-full gap-4  text-lg items-center">
                        <div className="w-14 h-14 bg-slate-200 rounded-full text-white text-3xl flex items-center justify-center">
                            <FaUser />
                        </div>
                        <div>
                            <p>Victor Halim</p>
                            <p className="text-sm text-slate-400">Charity Event Organizer</p>
                        </div>
                    </div>

                    <p className="text-lg  text-slate-500">{charity?.description}</p>

                    <div className="flex w-full gap-4 ">
                        <Button className="rounded-lg bg-slate-300 text-slate-600 px-10">Contact</Button>
                        <Button className="rounded-lg bg-slate-300 text-slate-600 px-10">More about fundraiser</Button>
                    </div>
                </div>

                
                <div className="w-full border-slate-300 border-t py-12 flex gap-4 flex-col">
                    <div className="flex items-center gap-6">
                        <IoEarthOutline className="w-16 h-16 text-primary opacity-80"/>
                        <div className="">
                            <p className="text-sm  text-slate-400">Location</p>
                            <p className="text-lg  text-slate-700">{charity?.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 justify-end">
                        <div className="text-right">
                            <p className="text-lg  text-slate-700">{charity?.end_date.toDateString()}</p>
                            <p className="text-sm  text-slate-400">{charity ? timeLeftUntil(charity?.end_date) : ""}</p>
                        </div>
                        <LuCalendarRange className="w-16 h-16 text-purple-200"/>
                    </div>
                </div>

                <div className="w-full   border-slate-300 border-t py-12 flex flex-col">
                    <DetailPageTransaction charity={charity}/>
                </div>

                <div className="w-full h-1" ref={observerTargetRefBottom}></div>
            </div>

            <div className="w-[40vw] h-[200vh] mt-8">
                            
                <div className="w-full h-screen flex items-center" style={{transform: `translateY(${-rightTranslate}px)`}}>
                    <img src={charity?.image_urls} className="w-full object-cover h-[55vh] rounded-xl shadow-lg" ref={observerTargetRef}/>
                </div>
                
                <div 
                    className={`${isSticky ? "flex fixed right-24 top-[calc(25vh-2rem)]" : "flex"} `} 
                    style={!isSticky ? {transform: `translateY(${-rightTranslate}px)`} : {}} 
                >
                    <DetailPageInformation 
                        charity={charity} 
                        className={`flex transition-all duration-300 ${isBottom ? "opacity-0 pointer-events-none" : "opacity-100"} `} 
                        style={{transform: isBottom ? `translateY(${-150}px)` : ""}}
                    />
                </div>
            </div>
            
        </MainLayout>
    )
}

export default CharityDetail