import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import { FundraiseSubpage } from "@lib/types/fundraise-subpage-types"
import { useEffect, useMemo } from "react"
import { CHARITY_TAGS } from "@lib/settings/tags-settings"
import Chip from "@components/chip"

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

    const setTag = (tag : string) => {

        if(data.tags.includes(tag)) {
            changeData("tags", data.tags.filter((t) => t !== tag));
        } else {
            changeData("tags", [...data.tags, tag]);
        }
    }

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

                <div>
                    <p className="text-sm mb-1 text-slate-600 font-light">Tags that best describe your project's purpose</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {
                            CHARITY_TAGS.map((tag, index) => {
                                return data.tags.includes(tag) ? (
                                    <Chip 
                                        text={tag} key={index} onClick={() => setTag(tag)}
                                    /> 
                                ) : (
                                    <Chip 
                                        text={tag} key={index} onClick={() => setTag(tag)}
                                        className="bg-slate-400 border-slate-700 opacity-30 text-black hover:opacity-50"
                                    /> 
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Button className="text-white" onClick={() => changeStep(2)}>Next</Button> 
            {/* Goofy ass button */}
        </>
    )
}

export default FundraiseDescriptionSubpage;