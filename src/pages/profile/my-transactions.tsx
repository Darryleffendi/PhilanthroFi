import { useService } from '@lib/hooks/useService';
import { Transaction } from 'src/declarations/charity/charity.did';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { convertDateToBigInt, convertToDate } from '@lib/service/date-service';
import { ScrollArea } from '@components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table"


export default function MyTransactions() {

    const {getCharityService} = useService();
    const [transactions, setTransactions] = useState<Transaction[]>([])

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
            <ScrollArea className='w-full h-full max-h-[80%] '>
            <div className='w-full h-full  flex-col flex gap-8'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction Hash</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody  >
                {(isLoading||isFetching || !transactions) ? 
                    (
                       <>
                       </>
                    )
                    :
                    (
                        <>
                        {transactions.map(transaction=>{
                            return(
                                <TableRow>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.to}</TableCell>
                                    <TableCell>{`${convertToDate(transaction.time, 'date')}`}</TableCell>
                                    <TableCell>{transaction.types}</TableCell>
                                    <TableCell>{Number(transaction.amount)* 1.0 / 100000000.0} {transaction.currency}</TableCell>
                                </TableRow>
                            )
                        })}
                        </>
                    )
                }
                </TableBody>
                    <TableFooter>
                        <TableCell colSpan={4}>Donations</TableCell>
                        <TableCell>{transactions.length}</TableCell>
                    </TableFooter>
                    </Table>
                </div>

            </ScrollArea>
    )
}
