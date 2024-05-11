import Chip from "@components/chip"
import { CharityEvent } from "@lib/types/charity-types"
import MainLayout from "@pages/layout/main-layout"
import { useParams } from "react-router-dom"

const CharityDetail = () => {

    // id charity nanti diambil dari url
    const {id} = useParams<{id: string}>()

    // Ini dummy data, nanti fetch dari backend
    const charity : CharityEvent = {
        id: "1",
        title: "Help a down syndrome child pay for his medical bills",
        target_donation: 1000000,
        current_donation: 500000,
        image_urls: ["https://images.unsplash.com/photo-1645364093800-d0796f7e9776?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        description: "A down syndrome child needs help to pay for his medical bills. He is currently in the hospital and needs to pay for his medical bills. Please help him.",
        end_date: new Date("2022-12-31"),
        charity_owner_id: "1",
        start_date: new Date("2022-12-31"),
        tags: ["medical"],
        location: "Jakarta, Indonesia",
        target_currency: "ICP"
    }

    return (
        <MainLayout>
            <div className="h-screen w-full flex justify-between items-center px-6 gap-4">
            <div className="flex flex-col gap-5">
                        <h1 className="text-3xl font-nbinter">{charity.title}</h1>
                        <div className="flex w-full">
                        {
                            charity.tags.map((tag, idx) => (
                                <Chip key={idx} text={tag}/>
                            ))
                        }
                        </div>
                    </div>
                <div className="w-[65%]">
                    
                    <img src={charity.image_urls[0]} className=" w-full h-[60vh]"/>
                </div>
            </div>
        </MainLayout>
    )
}

export default CharityDetail