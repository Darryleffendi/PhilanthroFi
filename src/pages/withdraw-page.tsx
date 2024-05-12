import { useParams } from "react-router-dom";
import logoWhite from "@assets/logo/logo-white.png"
import { FaArrowLeft } from "react-icons/fa";
import { CharityEvent } from "@lib/types/charity-types";
import { useEffect, useState } from "react";
import { useService } from "@lib/hooks/useService";
import { useMutation } from "react-query";
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"
import { Progress } from "@components/ui/progress";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";

const WithdrawPage = () => {   

    // id charity nanti diambil dari url
    const {id} = useParams<{id: string}>()

    // Ini dummy data, nanti fetch dari backend
    const dummyCharity : CharityEvent = {
        id: "1",
        title: "Help a down syndrome child pay for his medical bills",
        target_donation: 1000,
        current_donation: 500,
        image_urls: ["https://images.unsplash.com/photo-1645364093800-d0796f7e9776?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        description: "A down syndrome child needs help to pay for his medical bills. He is currently in the hospital and needs to pay for his medical bills. Please help him.",
        end_date: new Date("2024-12-31"),
        charity_owner_id: "1",
        start_date: new Date("2022-12-31"),
        tags: ["medical"],
        location: "Jakarta, Indonesia",
        target_currency: "ICP"
    }

    const data : 

    const [charity, setCharity] = useState<CharityEvent | null>(null);
    const {getCharityService} = useService()
    const [progress, setProgress] = useState(15) // progress bar animation 

    const { mutate: fetchCharity, isLoading: createCharityLoading, error: createCharityError, isSuccess } = useMutation(
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
        onSuccess: (data) => {
            console.log('Fetched charity successfully:', data);
            
            // Nanti di uncomment pas udh bener
            // setCharity(data)

            // Nanti dicheck juga owner dari charity ini sama kek principle ato ga
        }
    });

    useEffect(() => {
        setCharity(dummyCharity)
        fetchCharity()
    }, [])

    useEffect(() => {
        if(charity == null) return;
        
        const timer = setTimeout(() => setProgress(charity.current_donation/charity.target_donation*100), 500)
        return () => clearTimeout(timer)
    }, [charity])

    return (
        <div className="bg-primary w-screen h-screen bg-opacity-50 flex justify-between">
            <div className="p-20 flex font-nunito w-[50vw]">
                <FaArrowLeft className="mt-1 mr-4 text-slate-800"/>
                <div className="flex flex-col z-10 w-full">
                    <p className="text text-slate-800">Charity {charity?.id}</p>
                    <p className="text-sm text-slate-500">{charity?.title}</p>

                    <p className="mt-20 text-slate-500">Available Funds</p>
                    <div className="flex gap-4 items-center">
                        <img
                            className="h-12" 
                            src={charity?.target_currency === "ICP" ? icpIcon : charity?.target_currency === "ckBTC" ? btcIcon : ethIcon}
                        />
                        <p className="text-4xl font-bold text-slate-700">{charity?.current_donation} {charity?.target_currency}</p>
                    </div>
                    <div className="w-full h-1 rounded bg-slate-500 bg-opacity-20 shadow-md mt-2">
                        <Progress value={progress} className="h-1" />
                        {/* <div className="h-full rounded bg-primary" style={{width: charity.current_donation / charity.target_donation * 100 + "%"}}></div> */}
                    </div>
                </div>

                <img src={logoWhite} className="left-[-20vw] bottom-[-50vh] h-[140vh] fixed opacity-[13%] object-cover"/>
            </div>
            <div className="w-[45vw] h-screen bg-slate-100 shadow-lg p-20 flex flex-col font-nunito gap-6">
                <p className="text-lg font-bold text-slate-600">Withdraw</p>
                
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-600">Amount</p>
                    <div className="w-full flex justify-end items-center">
                        <Input className="border-slate-300 border rounded-lg" placeholder="0"/>
                        <p className="absolute font-bold text-slate-400 mr-4">{charity?.target_currency}</p>
                    </div>
                    <div>
                        <p className="text-sm mb-1 text-slate-600 font-light">Description</p>
                        <Textarea 
                            placeholder="Describe your project" className="max-h-32" 
                            value={data.project_description} onChange={(e) => changeData("project_description", e.target.value)}
                        />
                </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawPage;