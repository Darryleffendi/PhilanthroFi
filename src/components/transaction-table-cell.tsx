import { Donation } from "@lib/types/charity-types"
import { timeAgo } from "@lib/utils/date-utils"
import { CgNotes } from "react-icons/cg"

type params = {
    transaction : Donation
    currency : string
}

export default function TransactionTableCell({transaction, currency} : params) {

    return (
        <div className="h-20 border-b border-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-200 hover:bg-opacity-60 rounded-lg">
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
    )
}