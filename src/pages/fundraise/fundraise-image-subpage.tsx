import CryptoButton from "@components/crypto-button"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { FundraiseSubpage } from "@lib/types/fundraise-subpage-types"
import { useEffect, useState } from "react"
import imgIcon from "@assets/images/image.png"

const FundraiseImageSubpage = ({changeTitle, changeData, data, submitForm = ()=>{}} : FundraiseSubpage) => {

    const [usdValue, setUsdValue] = useState(0);

    useEffect(() => {
        changeTitle(
            <>
                <p>Provide Images of Your&nbsp;</p>
                <p className="bg-yellow-100">Target</p>
                <p>&nbsp;</p>
                <p className="bg-fuchsia-100 ">Charity</p>
            </>,
            "Visuals often provide better presentation than words."
        )
    }, [])

    useEffect(() => {
        (async function(){})()
    }, [data.target_currency, data.target_amount])

    //@ts-ignore
    return (
        <>
            <div className="w-full h-[70%] relative border rounded-lg border-dashed border-slate-400 flex flex-col justify-center items-center cursor-pointer">
                <input type="file" className="absolute w-full h-full opacity-0 cursor-pointer" onChange={(event) => changeData("project_image", event.target.files ? event.target.files[0] : null)}/>
                <img src={imgIcon} className="w-6 opacity-40"/>
                <div className="text-sm mt-2 opacity-60">Click to upload Image</div>
            </div>

            <Button className="text-white" onClick={() => submitForm()}>Create</Button> 
            {/* Goofy ass button */}
        </>
    )
}

export default FundraiseImageSubpage;