import React, { useState, ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible';
import { FaChevronDown } from "react-icons/fa";


interface CustomCollapsibleProps {
  title: string;
  count: number;
  children: ReactNode; 
  status?: boolean;
}

const CustomCollapsible: React.FC<CustomCollapsibleProps> = ({ title, count, children , status = false}) => {
  const [isOpen, setIsOpen] = useState(status);

  const toggleCollapsible = () => {
    console.log(isOpen)
    setIsOpen(!isOpen);
  };

  return (
    <Collapsible open={isOpen}>
      <CollapsibleTrigger onClick={toggleCollapsible} className="w-full flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-medium">{title}</div>
          <div className="text-gray-400">({count})</div>
        </div>
        <FaChevronDown
          className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        className="transition-height duration-300 ease-in-out overflow-hidden"
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CustomCollapsible;
