import { CharityEvent } from "@lib/types/charity-types";
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"
import { useState } from "react";
import { Input } from "@components/ui/input";

type props = {
    charity : CharityEvent
    className : string
    style? : {}
}

const DetailPageInformation = ({charity, className, style = {}} : props) => {

    const tiers = [
        charity.target_currency === "ICP" ? 10 : charity.target_currency === "ckBTC" ? 0.002 : 0.05,
        charity.target_currency === "ICP" ? 20 : charity.target_currency === "ckBTC" ? 0.005 : 0.1,
        charity.target_currency === "ICP" ? 50 : charity.target_currency === "ckBTC" ? 0.01 : 0.25,
    ]

    const [amount, setAmount] = useState<any>(0);

    const [activeTier, setActiveTier] = useState(0);

    const donate = () => {
        let donateAmount = amount;
        if(activeTier < 3) donateAmount = tiers[activeTier];

        console.log(donateAmount);

        // Bikin transaction
    }

    return (
        <div className={`w-[40vw] h-[65vh] z-10 bg-white rounded-xl shadow-lg p-10 flex-col gap-4 ${className}`} style={style}>
                
                <div className="flex gap-2 font-nunito items-center font-black text-2xl text-slate-600 mb-2">
                    <img
                        className="h-6 object-cover mr-2" 
                        src={charity.target_currency === "ICP" ? icpIcon : charity.target_currency === "ckBTC" ? btcIcon : ethIcon}
                    />
                    <div className="flex items-end gap-2">
                        <p>{charity.current_donation}</p>
                        <p className="text-sm mb-[0.25rem] font-normal">{charity.target_currency} raised of {charity.target_donation} {charity.target_currency} goal</p>
                    </div>
                </div>

                <div className="w-full h-1 rounded bg-slate-500 bg-opacity-20 shadow-md">
                    <div className="h-full rounded bg-primary" style={{width: charity.current_donation / charity.target_donation * 100 + "%"}}></div>
                </div>
                <p className="text-sm text-slate-400">3.1k donations</p>
                
                <p className="text-sm text-slate-400 mt-4">Quick Donate</p>
                <div className="flex gap-2">
                    {
                        tiers.map((tier, index) => (
                        <div 
                            className={` bg-slate-200 rounded-xl border-2 opacity-70 bg-opacity-60 hover:opacity-100 cursor-pointer ${activeTier === index ? "border-blue-400 " : "border-slate-300 "}
                                w-20 py-2 flex-col flex items-center justify-center transition-all duration-200 text-slate-500 font-bold text-2xl font-nunito`}
                            onClick={() => setActiveTier(index)}
                        >
                            <p className="text-sm font-normal">Tier {index + 1}</p>
                            <div className="flex flex-col items-center h-16 justify-center">
                                <img
                                    className="w-6 object-cover" 
                                    src={charity.target_currency === "ICP" ? icpIcon : charity.target_currency === "ckBTC" ? btcIcon : ethIcon}
                                />
                                <p>{tier}</p>
                            </div>
                        </div>
                        ))
                    }
                    <div 
                        className={` bg-slate-200 rounded-xl border-2 opacity-70 bg-opacity-60 hover:opacity-100 cursor-pointer ${activeTier === 3 ? "border-blue-400 " : "border-slate-300 "}
                            w-40 py-2 flex-col flex items-start justify-center transition-all duration-200 text-slate-500 font-bold text-2xl font-nunito px-4`}
                        onClick={() => setActiveTier(3)}
                    >
                        <p className="text-sm font-normal">Choose your own</p>
                        <div className="flex items-center gap-3 h-16">
                            <Input placeholder="0" className="font-normal text-lg" type={"number"} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                            <p className="font-normal text-xl">{charity.target_currency}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 font-nunito">
                    <button className="w-full bg-primary text-white rounded-lg py-2 mt-4" onClick={donate}>Donate</button>
                    <button className="w-[40%] bg-primary text-white rounded-lg py-2 mt-4">Share</button>
                </div>
            </div>
    )
}

export default DetailPageInformation;