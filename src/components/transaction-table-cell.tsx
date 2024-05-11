import { Transaction } from "@lib/types/charity-types"
import { formatTime, timeAgo } from "@lib/utils/date-utils"
import { useState } from "react"
import { CgNotes } from "react-icons/cg"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import btcIcon from "@assets/images/btc_transparent.png"
import icpIcon from "@assets/images/icp_transparent.png"
import ethIcon from "@assets/images/eth_transparent.webp"

type params = {
    transaction : Transaction
    currency : string
}

export default function TransactionTableCell({transaction, currency} : params) {

    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <div className="h-20 border-b border-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-200 hover:bg-opacity-60 rounded-lg" onClick={() => setDialogOpen(true)}>
                <div className="h-full flex items-center gap-3 w-48">
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-slate-200 bg-opacity-60 flex-shrink-0">
                        <CgNotes className="w-6 h-6 text-slate-400"/>
                    </div>
                    <div className="w-full overflow-hidden">
                        <p className="text-ellipsis overflow-hidden ... text-sky-500 cursor-pointer">{transaction.id}</p>
                        <p className="text-sm text-slate-400">{timeAgo(transaction.time)}</p>
                    </div>
                </div>

                <div className="w-40 overflow-hidden">
                    <div className="flex items-center gap-2">
                        <p>From</p>
                        <p className="text-ellipsis overflow-hidden ... text-sky-500">{transaction.from}</p>
                    </div>
                    <p className="text-sm text-slate-400 text-nowrap text-ellipsis overflow-hidden ...">{transaction.notes}</p>
                </div>

                <div className="px-3 h-8 border-2 border-slate-300 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-slate-500">{transaction.amount} {currency}</p>
                </div>
            </div>
            <DialogContent className="font-nunito">
                <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogDescription className="text-slate-500">
                        View the details of this transaction
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <p className="text-slate-500">Transaction ID</p>
                        <p className="text-sky-500">{transaction.id}</p>
                    </div>
                    <div className="flex">
                        <div className="flex items-center w-[40%]">
                            <img
                                className="h-12 mr-2" 
                                src={currency === "ICP" ? icpIcon : currency === "ckBTC" ? btcIcon : ethIcon}
                            />
                            <p className="text-slate-500 font-bold text-lg">{transaction.amount} {currency}</p>
                        </div>
                        <div className="w-72">
                            <p className="text-slate-400 text-sm">From</p>
                            <p className="text-slate-700 break-words">{transaction.from}</p>
                            <p className="text-slate-400 text-sm mt-4">To</p>
                            <p className="text-slate-700 break-words">{transaction.to}</p>
                            <p className="text-slate-400 text-sm mt-4">Time</p>
                            <p className="text-slate-700 break-words">{transaction.time.toDateString()}, {formatTime(transaction.time)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm mb-1">Notes</p>
                        <p className="text-slate-700">{transaction.notes}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}