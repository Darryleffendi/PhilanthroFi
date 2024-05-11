import Chip from "@components/chip"
import { CharityEvent } from "@lib/types/charity-types"
import MainLayout from "@pages/layout/main-layout"
import { useParams } from "react-router-dom"
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"

const CharityDetail = () => {

    // id charity nanti diambil dari url
    const {id} = useParams<{id: string}>()

    // Ini dummy data, nanti fetch dari backend
    const charity : CharityEvent = {
        id: "1",
        title: "Help a down syndrome child pay for his medical bills",
        target_donation: 1000,
        current_donation: 500,
        image_urls: ["https://images.unsplash.com/photo-1645364093800-d0796f7e9776?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        description: "A down syndrome child needs help to pay for his medical bills. He is currently in the hospital and needs to pay for his medical bills. Please help him.",
        end_date: new Date("2022-12-31"),
        charity_owner_id: "1",
        start_date: new Date("2022-12-31"),
        tags: ["medical"],
        location: "Jakarta, Indonesia",
        target_currency: "ICP"
    }

    return (
        <MainLayout className="p-6 bg-slate-100">
            <div className="min-h-screen w-full flex justify-between items-center px-6 gap-4">

                <div className="flex flex-col gap-5 w-[50%]">
                    
                    <div className="w-full h-screen">
                        <div className="w-full h-[50vh] flex flex-col justify-between">

                            <div className="flex flex-col gap-5">
                                <h1 className="text-4xl font-nbinter">{charity.title}</h1>
                                <div className="flex w-full">
                                {
                                    charity.tags.map((tag, idx) => (
                                        <Chip key={idx} text={tag}/>
                                    ))
                                }
                                </div>
                            </div>

                            <div className="flex flex-col w-full">
                                
                                <div className="flex items-center gap-3">
                                    <img
                                        className="w-14" 
                                        src={charity.target_currency === "ICP" ? icpIcon : charity.target_currency === "ckBTC" ? btcIcon : ethIcon}
                                    />
                                    <p className="text-3xl font-nunito font-black text-slate-700 ">{charity.current_donation} {charity.target_currency}</p>
                                </div>
                                <p className="mb-4 -mt-1 font-nbinter text-slate-500">
                                    out of {charity.target_donation} {charity.target_currency} target funds
                                </p>
                                <div className="w-full h-2 rounded bg-slate-500 bg-opacity-20 shadow-md">
                                    <div className="h-full rounded bg-primary" style={{width: charity.current_donation / charity.target_donation * 100 + "%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[40vw]">
                    <div className="w-full h-screen flex items-center">
                        <img src={charity.image_urls[0]} className="w-full object-cover h-[50vh] rounded-xl shadow-lg"/>
                    </div>

                    <div className="w-full h-[50vh] bg-white rounded-xl shadow-lg">
                        
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default CharityDetail