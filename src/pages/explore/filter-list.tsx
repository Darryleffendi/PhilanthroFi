import { Button } from "@components/ui/button";
import React from "react";
import { MdClear } from "react-icons/md";

interface FilterListProps {
    tags: string[];
    filterName: string;
    handleClearFilter: () => void;
}

const FilterList: React.FC<FilterListProps> = ({ filterName, tags, handleClearFilter }) => {

    return (
        <div className="bg-gray-50 h-12 flex font-medium items-center gap-2  px-4 py-1 rounded-full">
            <div className="text-gray-400">{filterName}: </div>
            <div className="flex gap-2">
                {tags.map((tag, index) => (
                    <span key={tag} className="text-black">
                        {tag}{index < tags.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>
            {tags.length>0 && (
                <Button onClick={handleClearFilter} className="bg-transparent rounded-full text-sm p-3 py-1">
                <MdClear />
            </Button>
            )}
        </div>
    );
}

export default FilterList;
