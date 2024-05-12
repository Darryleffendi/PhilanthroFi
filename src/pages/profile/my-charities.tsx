import { useService } from '@lib/hooks/useService'
import CharityCard from '@components/charity/charity-card';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';
import { CharityTabs, CharityTabSkeleton } from '@components/charity/charity-tabs';import { ScrollArea } from '@components/ui/scroll-area';
 '@components/charity/charity-tabs';

export default function MyCharities() {

    const {getCharityService} = useService();
    const [ownedCharities, setOwnedCharities] = useState<BackendCharityEvent[]>();

    const getOwnedCharities = async () => {
        const charityService = await getCharityService();
        return await charityService.getOwnedCharities()
    }

    const { error, isLoading, isSuccess , isFetching} = useQuery(['getOwnedCharities'], getOwnedCharities, {
        retry: false,
        refetchOnWindowFocus:false, //ini bebas ya dia by default on refocus refetch
        // staleTime:0,
        onSuccess: (charity:BackendCharityEvent[]) => {
            // @ts-ignore emg asu ni motoko
            setOwnedCharities([...charity.ok])
        },
        onError: (error:Error) => {
        console.error("Error while fetching charity", error)
        }
    });


   
    return (
        <ScrollArea className=' w-full max-h-[80%]'>
            <div className='w-full h-full flex-col flex gap-8'>
                {(isLoading||isFetching || !ownedCharities) ? 
                    (
                    <>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                        <CharityTabSkeleton/>
                    </>

                    )
                :
                    (
                    <>
                        {ownedCharities?.map((c,i)=>{
                            return(
                                <CharityTabs charity={c} key={i}/>
                            )
                        })}
                    </>
                    )
                }
                </div>

                </ScrollArea>
    )
}

