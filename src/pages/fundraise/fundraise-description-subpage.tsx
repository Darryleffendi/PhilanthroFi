import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import { FundraiseSubpage } from "@lib/types/fundraise-subpage-types"
import { useEffect, useMemo } from "react"

const FundraiseDescriptionSubpage = ({changeTitle, changeData, data, changeStep} : FundraiseSubpage) => {

    useEffect(() => {
        changeTitle(
            <>
                <p>Briefly</p>
                <p>&nbsp;</p>
                <p className="bg-yellow-100">Describe</p>
                <p>&nbsp;</p>
                <p>Your</p>
                <p className="bg-fuchsia-100 ">Charity</p>
                <p>&nbsp;</p>
                <p>Project</p>
            </>,
            "Tags will give a brief knowledge to donors"
        )
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4">
                
                <div>
                    <p className="text-sm mb-1 text-slate-600 font-light">Description</p>
                    <Textarea 
                        placeholder="Describe your project" className="max-h-32" 
                        value={data.project_description} onChange={(e) => changeData("project_description", e.target.value)}
                    />
                </div>

                {/* Nanti tags disini, besok gw lanjut */}
            </div>
            <Button className="text-white" onClick={() => changeStep(2)}>Next</Button> 
            {/* Goofy ass button */}
        </>
    )
}

export default FundraiseDescriptionSubpage;