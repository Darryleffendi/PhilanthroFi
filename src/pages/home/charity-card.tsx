import { Charity } from "@lib/types/charity-types";
import React from "react";


interface CharityCardProps {
    charity: Charity;
    className?: string;
}

const CharityCard : React.FC<CharityCardProps> = ({charity, className ="basis-1/4"}) => {
    return (
        <div className={`flex flex-col h-`}>
            
        </div>
    )
}

export default CharityCard;