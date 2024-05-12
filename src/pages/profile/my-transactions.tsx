import { useService } from '@lib/hooks/useService';
import { Transaction } from 'src/declarations/charity/charity.did';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { convertDateToBigInt } from '@lib/service/date-service';

export const dummyBackendDonation : Transaction = {
    amount : BigInt(10),
    from : "0xf13e1gf4a13fds9cs1dafdbb31fg1x0",
    notes : "Cepat sembuh ya bang",
    id : "0xf13e1gf4a13fds9cs1dafdbb31fg1x0",
    time : convertDateToBigInt(new Date("5/10/2024")),
    to : "0xfe4a13fds9cs1dx0",
    currency:'ICP',
    types:'donation'
    
}

export default function MyTransactions() {

    const {getCharityService} = useService();
    const [transactions, setTransactions] = useState<Transaction[]>()

    const getUserTransactions = async () => {
        const charityService = await getCharityService();
        return await charityService.getUserDonations()
    }


    //nanti ubah fetcch dari bekend
    const { error, isLoading, isSuccess , isFetching} = useQuery(['getUserTransactions'], getUserTransactions, {
        retry: false,
        refetchOnWindowFocus:false, 
        onSuccess: (transactions:Transaction[]) => {
            // @ts-ignore emg asu ni motoko
            setTransactions([...transactions.ok])
        },
        onError: (error:Error) => {
            console.error("Error while fetching user transactions", error)
        }
    });

    // console.log(transactions)
    return (
        <div>
        </div>
    )
}
