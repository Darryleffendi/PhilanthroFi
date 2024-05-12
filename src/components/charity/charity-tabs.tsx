import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { convertToDate } from '@lib/service/date-service';
import { isExpired, timeLeftUntil } from '@lib/utils/date-utils';
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';

interface CharityCardProps {
    charity: BackendCharityEvent;
}

const CharityTabSkeleton = () =>{
    return(
        <Skeleton className='w-full h-32 bg-gray-200'>
        </Skeleton>
    )
}

function CharityTabs({charity}:CharityCardProps) {


    const evaluateDuration = (endDate:BigInt):string => {
        const date = new Date(convertToDate(endDate, 'date'))
        console.log(date)
        const expired = isExpired(date);

        if(expired) return 'Event Finished'
        
        return timeLeftUntil(date)
    }


  return (
    <div className='flex w-full min-h-32 h-32  bg-white rounded-md px-8 p-4'>
        <div className='flex flex-col gap-2 w-[70%]'>
            <div>
                <h1 className='text-xl font-medium'>{charity.title}</h1>
                <h1 className='text-sm'>{evaluateDuration(charity.end_date)}</h1>
            </div>
            <p className='text-sm text-gray-400 w-[80%] max-w-[80%]  line-clamp-2 '>{charity.description}</p>
        </div>
        <div className='flex w-[30%] gap-8 h-full justify-end items-center '>
            <Link to={`/fundraise/${charity.id}`}>
                <Button variant={'outline'}>Details</Button>
            </Link>
            <Link to={`/withdraw/${charity.id}`}>
                <Button >Withdraw</Button>
            </Link>
        </div>
    </div>
  );
}


export {CharityTabSkeleton, CharityTabs}