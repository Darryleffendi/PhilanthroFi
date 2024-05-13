import { CharityEvent, Transaction, TransactionRequest } from "@lib/types/charity-types";
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"
import { useState } from "react";
import { Input } from "@components/ui/input";
import { useMutation } from "react-query";
import { useService } from "@lib/hooks/useService";
import { PiNoteBold } from "react-icons/pi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { Textarea } from "@components/ui/textarea";

type props = {
    charity : CharityEvent | null
    className : string
    style? : {}
}

const DetailPageInformation = ({charity, className, style = {}} : props) => {

    const tiers = [
        charity?.target_currency === "ICP" ? 10 : charity?.target_currency === "ckBTC" ? 0.002 : 0.05,
        charity?.target_currency === "ICP" ? 20 : charity?.target_currency === "ckBTC" ? 0.005 : 0.1,
        charity?.target_currency === "ICP" ? 50 : charity?.target_currency === "ckBTC" ? 0.01 : 0.25,
    ]

    const [amount, setAmount] = useState<any>("");
    const [activeTier, setActiveTier] = useState(0);
    const [notes, setNotes] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const {getCharityService} = useService()
    
    let transactionRequest : TransactionRequest = {
        amount: BigInt((activeTier < 3) ? tiers[activeTier] * 100000000 : isNaN(parseFloat(amount)) ? BigInt(0) : Math.floor(parseFloat(amount) * 100000000)), // Amount * 100000000
        types: "donation",
        notes: notes,
        charity_id: charity ? charity.id : "",
        charity_wallet_id: charity ? charity.charity_owner_id : ""
    }

    /* ======= FUNCTION UNTUK RECORD DONATION DATA ====== */
    const { mutate: recordTransaction, isLoading: recordLoading, error: recordError, isSuccess } = useMutation(
        async () => {
            const charityService = await getCharityService();
            //@ts-ignore
            const response = await charityService.addTransaction(transactionRequest)

            return response
        }, {
        onError: (error: Error) => {
            console.error('Error during recording charity:', error.message);
        },
        onSuccess: (data : any) => {
            console.log('recording charity successfully:', data);
        }
    });

    const donate = async () => {
        setLoading(true)
        if(transactionRequest.amount <= BigInt(0)) {
            setLoading(false)
            return setErrorMsg("Please input a valid amount");
        }

        setErrorMsg("");
        try {
            console.log(transactionRequest)
            // @ts-ignore
            const response = await window.ic?.plug?.requestTransfer({
                to: "byj7a-cglbt-z3aor-vuggh-7kayt-6ld7z-x4sla-evezh-gw4ka-jl4ta-iqe",// alden
                // to:"ucjau-tkzza-uey4m-qepzh-hhp2m-sjlcv-mlsqm-kuvxz-tz3mz-ivs6r-uqe",//darryl
                amount: Number(transactionRequest.amount),
            })
            
            // If transaction succeeded, record donation
            if(response) {
                recordTransaction();
            }
        }
        catch(e) {
            console.log(e);
        }
        setLoading(false)

    }

    if(charity == null) return <></>

    return (
        <Dialog>
            <div className={`w-[40vw] h-[65vh] z-10 bg-white rounded-xl shadow-lg p-10 flex-col gap-4 ${className}`} style={style}>
                <div className="flex gap-2 font-nunito items-center font-black text-2xl text-slate-600 mb-2">
                    <img
                        className="h-6 object-cover mr-2" 
                        src={charity?.target_currency === "ICP" ? icpIcon : charity?.target_currency === "ckBTC" ? btcIcon : ethIcon}
                    />
                    <div className="flex items-end gap-2">
                        <p>{charity?.current_donation}</p>
                        <p className="text-sm mb-[0.25rem] font-normal">{charity?.target_currency} raised of {charity?.target_donation} {charity?.target_currency} goal</p>
                    </div>
                </div>

                <div className="w-full h-1 rounded bg-slate-500 bg-opacity-20 shadow-md">
                    <div className="h-full rounded bg-primary" style={{width: charity?.current_donation / charity?.target_donation * 100 + "%"}}></div>
                </div>
                <p className="text-sm text-slate-400">{charity?.transactions?.length} donations</p>
                
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
                {
                    errorMsg !== "" ? (
                        <p className="text-red-500 text-sm font-nunito">{errorMsg}</p>
                    ) : <></>
                }
                <div className="flex items-center gap-2 font-nunito">
                    {
                        loading ? (
                            <button className="w-full bg-primary text-white rounded-lg py-2 mt-4" disabled onClick={donate}>Loading...</button>
                        ) : (
                            <button className="w-full bg-primary text-white rounded-lg py-2 mt-4" onClick={donate}>Donate</button>
                        )
                    }
                    <DialogTrigger className="w-[35%] bg-primary text-white rounded-lg py-2 mt-4 flex items-center gap-2 justify-center"><PiNoteBold />Note</DialogTrigger>
                </div>
            </div>
            <DialogContent className="font-nunito">
                <DialogHeader>
                    <DialogTitle>
                        Notes
                    </DialogTitle>
                    <DialogDescription>
                        Provide kind words to support the fund receiver
                    </DialogDescription>
                </DialogHeader>
                <Textarea 
                    className="w-full max-h-40 h-36" placeholder="Your message here" 
                    value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </DialogContent>
        </Dialog>
    )
}

export default DetailPageInformation;