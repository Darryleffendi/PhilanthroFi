import { CharityEvent } from "@lib/types/charity-types";
import { useState } from "react";

type props = {
    charity : CharityEvent
}

const DetailPageTransaction = ({charity} : props) => {

    const [tab, setTab] = useState<'Donations' | 'Withdrawals'>('Donations');

    return (
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
    )
}

export default DetailPageTransaction;