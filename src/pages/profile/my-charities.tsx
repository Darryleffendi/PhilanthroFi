import { useService } from '@lib/hooks/useService'
import CharityCard from '@pages/home/charity-card';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { CharityEvent as BackendCharityEvent } from 'src/declarations/charity/charity.did';

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


    console.log(ownedCharities)

    if(isLoading)return <>Loading</>
    if(isFetching)return<>fetching from idk where</>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {ownedCharities?.map((c,i)=>{
                return(
                    <div className='flex flex-col'>
                        <CharityCard charity={c} key={i}/>
                    </div>
                )
            })}
        </div>
    )
}
