import { CharityEvent } from "@lib/types/charity-types";
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"

type props = {
    charity : CharityEvent
    className : string
}

const DetailPageInformation = ({charity, className} : props) => {
    return (
        <div className={`w-[40vw] h-[65vh] z-10 bg-white rounded-xl shadow-lg p-10 flex-col gap-4 ${className}`}>
                
                <div className="flex gap-2 font-nunito items-center font-black text-2xl text-slate-600">
                    <img
                        className="w-8 object-cover mr-2" 
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
            </div>
    )
}

export default DetailPageInformation;