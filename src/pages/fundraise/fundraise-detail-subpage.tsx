import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import { FundraiseSubpage } from "@lib/types/fundraise-subpage-types"
import { useEffect, useMemo } from "react"
import countryList from 'react-select-country-list'

const FundraiseDetailSubpage = ({changeTitle, changeData, data, changeStep} : FundraiseSubpage) => {

    useEffect(() => {
        changeTitle(
            <>
                <p>Tell us more about your </p>
                <p className="bg-yellow-100">Fundraising</p>
                <p>&nbsp;</p>
                <p className="bg-fuchsia-100 ">Charity</p>
                <p>Project</p>
            </>,
            "Provide insights about your project title and purpose"
        )
    }, [])

    
    const options = useMemo(() => countryList().getData(), [])

    return (
        <>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="text-sm mb-1 text-slate-600 font-light">Project Name</p>
                    <Input placeholder="Enter project name" value={data.project_name} onChange={(e) => changeData("project_name", e.target.value)}/>
                </div>
                <div>
                    <p className="text-sm mb-1 text-slate-600 font-light">Location</p>
                    <Select onValueChange={(e) => changeData("project_location", e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                        {
                            options.map((option : any) => (
                                <SelectItem 
                                    key={option.value} value={option.value}
                                    className="hover:bg-gray-100 rounded-md cursor-pointer"
                                >
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <p className="text-sm mb-1 text-slate-600 font-light">Description</p>
                    <Textarea 
                        placeholder="Describe your project" className="max-h-48" 
                        value={data.project_description} onChange={(e) => changeData("project_description", e.target.value)}
                    />
                </div>
            </div>
            <Button className="text-white" onClick={() => changeStep(1)}>Next</Button> 
            {/* Goofy ass button */}
        </>
    )
}

export default FundraiseDetailSubpage;