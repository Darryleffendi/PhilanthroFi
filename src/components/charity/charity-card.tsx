import React from 'react';
import ICPLogo from '@assets/logo/icp.png';
import ProgressBar from '@components/progress_bar/progress-bar';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '@lib/utils/utils';
import { Skeleton } from '@components/ui/skeleton';

interface CharityCardProps {
  charity: BackendCharityEvent;
}
const CharityCardSkeleton = () =>{
  return(
      <Skeleton className='w-full min-h-[55vh] bg-gray-200'>
      </Skeleton>
  )
}
const CharityCard: React.FC<CharityCardProps> = ({ charity }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg min-h-[55vh] max-h-[60vh] cursor-pointer shadow-sm"
      onClick={() => navigate(`/fundraise/${charity.id}`)}
    >
      <div className="w-full h-[60%]">
        <img
          src={charity.image_urls}
          alt=""
          className="rounded-t-lg object-cover w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 h-[40%] justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-2">
            {charity.tags.map((tag, index) => {
              if (index == 2) {
                return (
                  <div className="rounded-xl text-blue-800 border border-blue-800 bg-white text-xs inline-block font-medium px-4 py-1" key={index}>
                    +{charity.tags.length - 1} more
                  </div>
                );
              }
              else if(index < 2){
                return(
                  <div className="rounded-xl text-blue-800 border border-blue-800 bg-blue-200 text-xs inline-block font-medium px-4 py-1" key={index}>
                    {capitalizeFirstLetter(tag)}
                  </div>
                )
              }
            })}
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
          <ProgressBar className="bg-blue-200" progress={Number(charity.current_donation)} />
        </div>
      </div>
    </div>
  );
};

export {CharityCard, CharityCardSkeleton};
