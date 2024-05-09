import CryptoButton from "@components/crypto-button"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { FundraiseSubpage } from "@lib/types/fundraise-subpage-types"
import { useEffect } from "react"
import btcIcon from "@assets/images/Bitcoin.png"
import icpIcon from "@assets/images/icp.png"
import ethIcon from "@assets/images/eth.png"

const FundraiseTargetSubpage = ({changeTitle, changeData, data} : FundraiseSubpage) => {

    useEffect(() => {
        changeTitle(
            <>
                <p>Set Your&nbsp;</p>
                <p className="bg-yellow-100">Target</p>
                <p>&nbsp;</p>
                <p className="bg-fuchsia-100 ">Funds</p>
            </>,
            "Choose your token of choice and the amount needed to be raised"
        )
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                    <CryptoButton icon={icpIcon} onClick={() => changeData("target_currency", "ICP")} ticker="ICP" active={data.target_currency === "ICP"}/>
                    <CryptoButton icon={btcIcon} onClick={() => changeData("target_currency", "ckBTC")} ticker="ckBTC" active={data.target_currency === "ckBTC"}/>
                    <CryptoButton icon={ethIcon} onClick={() => changeData("target_currency", "ckETH")} ticker="ckETH" active={data.target_currency === "ckETH"}/>
                </div>
                <div>
                    <p className="text-sm mb-1 text-slate-600 font-light">Donation Target</p>
                    <div className="w-full h-12 flex items-center justify-end">
                        <h1 className="absolute mr-6 text-sm text-slate-400">{data.target_currency}</h1>
                        <Input placeholder="0" className="h-12" value={data.target_amount} onChange={(e) => changeData("target_amount", e.target.value)}/>
                    </div>
                </div>  
            </div>
            <Button className="text-white">Next</Button> 
            {/* Goofy ass button */}
        </>
    )
}

export default FundraiseTargetSubpage;