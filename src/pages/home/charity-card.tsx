import { CharityEvent } from '@lib/types/charity-types';
import React from 'react';
import ICPLogo from '@assets/logo/icp.png';
import ProgressBar from '@components/progress_bar/progress-bar';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';

interface CharityCardProps {
  charity: BackendCharityEvent;
}

const CharityCard: React.FC<CharityCardProps> = ({
  charity,
}) => {
  return (
    <div className="bg-white rounded-lg h-[60vh]">
      <div className="w-full h-[60%]">
        <img src={charity.image_urls[0]} alt="" className="rounded-t-lg object-cover w-full h-full" />
      </div>
      <div className="p-4 flex flex-col gap-2 h-[40%] justify-between">
        <div className='w-full flex flex-col gap-2'>
          <div className="flex gap-2">
              {charity.tags.map((tag) => (
                <div className="rounded-xl text-blue-800 border border-blue-800 bg-blue-200 text-xs inline-block font-medium px-4 py-1">
                    {tag}
                </div>
              ))} 
          </div>
          <div className="text-xl w-[75%] font-medium leading-6">
            {charity.title}
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-2">
          <div className="w-full items-center gap-1 flex text-gray-400">
            {Number(charity.current_donation)}/{Number(charity.target_donation)} 
            <img className="h-5" src={ICPLogo} alt="" />
          </div>
          <ProgressBar className="bg-blue-200" progress={69} />
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
