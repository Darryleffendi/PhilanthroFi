import { useState } from "react";
import { Button } from "./ui/button";

type props = {
    ticker : string
    icon : any
    onClick : () => any
    active : boolean
}

const CryptoButton = ({ticker, icon, onClick, active} : props) => {

    const [hovered, setHovered] = useState(false);

    return (
        <Button 
            className={`bg-transparent w-20 h-20 border transition-all duration-200 hover:bg-slate-200 ${hovered ? "w-28" : ""} ${active ? "border-2 border-primary shadow-md" : ""}`} 
            onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <img src={icon} className={`absolute transition-all z-10 duration-200 cover ${hovered ? "w-8 mr-16" : "w-12"}`}/>
            <div className="w-full h-full flex justify-end">
                <h1 className={`transition-all duration-200 self-end font-nbinter text-2xl font-bold  ${hovered ? "opacity-10" : "opacity-0"}`}>{ticker}</h1>
            </div>
        </Button>
    )
}

export default CryptoButton;