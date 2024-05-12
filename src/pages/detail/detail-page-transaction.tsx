import TransactionTableCell from "@components/transaction-table-cell";
import { CharityEvent, Transaction } from "@lib/types/charity-types";
import { useState } from "react";
import { CgNotes } from "react-icons/cg";

type props = {
    charity : CharityEvent | null
}

const DetailPageTransaction = ({charity} : props) => {

    const [tab, setTab] = useState<'Donations' | 'Withdrawals'>('Donations');

    const exampleDonation : Transaction = {
        amount : 10,
        from : "0xf13e1gf4a13fds9cs1dafdbb31fg1x0",
        notes : "Cepat sembuh ya bang",
        id : "0xf13e1gf4a13fds9cs1dafdbb31fg1x0",
        time : new Date("5/10/2024"),
        to : "0xfe4a13fds9cs1dx0",
        types: "donation"
    }

    if(charity == null) return <></>

    return (
        <>
        <div className="w-full h-20 flex">
            <div className="flex flex-col items-end cursor-pointer" onClick={() => setTab('Donations')}>
                <div className="px-10 py-2">Donations</div>
                <div className={`bg-primary h-[0.15rem] transition-all duration-300 ${tab === 'Donations' ? "w-full" : "w-0"}`}></div>
            </div>
            <div className="flex flex-col items-start cursor-pointer" onClick={() => setTab('Withdrawals')}>
                <div className="px-10 py-2">Withdrawals</div>
                <div className={`bg-primary h-[0.15rem] transition-all duration-300 ${tab === 'Withdrawals' ? "w-full" : "w-0"}`}></div>
            </div>
        </div>

        <div className="w-full flex flex-col gap-4 mb-40">
            {
                tab === 'Donations' ? (
                    charity?.transactions?.map((donation, index) => (
                        donation.types === 'donation' ? (
                            <TransactionTableCell currency={charity.target_currency} transaction={donation} key={index} />
                        ) : <></>
                    ))
                ) : (
                    charity?.transactions?.map((donation, index) => (
                        donation.types === 'withdraw' ? (
                            <TransactionTableCell currency={charity.target_currency} transaction={donation} key={index} />
                        ) : <></>
                    ))
                )
            }
        </div>
        </>
    )
}

export default DetailPageTransaction;