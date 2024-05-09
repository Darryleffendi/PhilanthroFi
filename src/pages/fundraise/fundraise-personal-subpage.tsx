import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { FundraiseSubpage } from "@lib/types/fundraise-subpage-types"
import { useEffect } from "react"

const FundraisePersonalSubpage = ({changeStep, changeTitle, changeData, data} : FundraiseSubpage) => {

    useEffect(() => {
        changeTitle(
            <>
                <p>Introduce Yourself,&nbsp;</p>
                <p>as the&nbsp;</p>
                <p className="bg-yellow-100">Charity's</p>
                <p>&nbsp;</p>
                <p className="bg-fuchsia-100 ">Fundraiser</p>
            </>,
            "Provide personal information, KYC is required for fundraising."
        )
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                    <div className="w-full">
                        <p className="text-sm mb-1 text-slate-600 font-light">First Name</p>
                        <Input placeholder="John" value={data.first_name} onChange={(e) => changeData("first_name", e.target.value)}/>
                    </div>
                    <div className="w-full">
                        <p className="text-sm mb-1 text-slate-600 font-light">Last Name</p>
                        <Input placeholder="Doe" value={data.last_name} onChange={(e) => changeData("last_name", e.target.value)}/>
                    </div>
                </div>
                <div>
                    <p className="text-sm mb-1 text-slate-600 font-light">Phone Number</p>
                    <Input placeholder="+10 1112223" value={data.phone_number} onChange={(e) => changeData("phone_number", e.target.value)}/>
                </div>
                <div className="flex gap-4 w-full">
                    <div className="w-[70%]">
                        <p className="text-sm mb-1 text-slate-600 font-light">Address</p>
                        <Input placeholder="Address 13th Street" value={data.address} onChange={(e) => changeData("address", e.target.value)}/>
                    </div>
                    <div className="w-[30%]">
                        <p className="text-sm mb-1 text-slate-600 font-light">Zip Code</p>
                        <Input placeholder="11230" value={data.zip_code} onChange={(e) => changeData("zip_code", e.target.value)}/>
                    </div>
                </div>
            </div>
            <Button className="text-white" onClick={() => changeStep(2)}>Next</Button> 
            {/* Goofy ass button */}
        </>
    )
}

export default FundraisePersonalSubpage;