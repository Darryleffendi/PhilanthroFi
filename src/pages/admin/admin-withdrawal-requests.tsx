import { useAuth } from '@lib/hooks/useAuth'
import { useService } from '@lib/hooks/useService'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { CharityEvent, Transaction } from 'src/declarations/charity/charity.did'
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
import { convertToDate } from '@lib/service/date-service'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'

export default function AdminWithdrawalRequest() {

    const {getCharityService} = useService()
    const [withdrawalRequests, setWithdrwalRequests] = useState<Transaction[]>([]);
    const [processRequest, setProcessRequest] = useState<Transaction>();
    const [chosenCharity, setChosenCharity] = useState<CharityEvent|null>(null);
    const {getAdmin} = useAuth()

    const {mutate: getAllWithdrawal, isLoading:withdrawalIsLoading, error: withdrawalError} = useMutation(
        async()=>{
            const charityService = await getCharityService();
            const admin = await getAdmin()
            if(!admin) throw new Error("Not admin")

            const response = await charityService.getAllWithdrawal(admin.email);
            console.log(response)
            //@ts-ignore
            return response.ok
        },
        {
            onSuccess: (data) =>{
                const filteredData = data.filter((request:Transaction) => request.request_status !== 'completed');
                setWithdrwalRequests(filteredData);
        
            },
            onError:(error) =>{
                console.error(error)
            }
        }
    )

    const {mutate: getWithdrawCharityDetail, isLoading:isWithdrawCharityDetailLoading, error: withdrawChairityDetailError} = useMutation(
        async()=>{
            const charityService = await getCharityService()
            if(!processRequest?.from)return
            const charity = await charityService.getCharity(processRequest.from)

            //@ts-ignore
            return charity.ok
        },
        {
            onSuccess: (data) =>{
                setChosenCharity(data||null);
            },
            onError:(error) =>{
                console.error(error)
            }
        }
    )

    const {mutate: updateWithdrawalStatus, isLoading:isUpdateWithdrawalStatusLoading, error: updateWithdrawalStatusError} = useMutation(
        async()=>{
            const charityService = await getCharityService()
            const admin = await getAdmin()
            if(!processRequest || !chosenCharity|| !admin)return
            const res = await charityService.updateWithdrawalStatus(admin.email,processRequest.from, processRequest.id)
            
            //@ts-ignore
            if(res.err)throw new Error("Failed to approve request")
            //@ts-ignore
            return res.ok
        },
        {
            onSuccess: (data) =>{
                console.log(data)
            },
            onError:(error) =>{
                console.log(error)
            }
        }
    )
    

    useEffect(() => {
        getWithdrawCharityDetail()
    }, [processRequest])
    
    useEffect(() => {
        getAllWithdrawal()

    }, [])
    
  return (
    <div>
        <Sheet>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction Hash</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody  >
                    {(isWithdrawCharityDetailLoading || !withdrawalRequests) ?
                    (
                        <TableRow className=''>
                            <TableCell  colSpan={5}>No Data</TableCell>
                        </TableRow>
                    ):
                    (
                        <>
                        {withdrawalRequests.map((withdrawalRequest, i)=>{
                            return(
                                <TableRow key={i}>
                                    <TableCell>{withdrawalRequest.id}</TableCell>
                                    <TableCell>{`${convertToDate(withdrawalRequest.time, 'date')}`}</TableCell>
                                    <TableCell>{`${withdrawalRequest.request_status == '' ? 'Pending' : withdrawalRequest.request_status }`}</TableCell>
                                    <TableCell>{Number(withdrawalRequest.amount)* 1.0 / 100000000.0} {withdrawalRequest.currency}</TableCell>
                                    <TableCell><SheetTrigger ><Button onClick={()=>{setProcessRequest(withdrawalRequest)}} variant={'outline'} className='bg-transparent outline outline-1 outline-gray-300'>Process</Button></SheetTrigger></TableCell>
                                </TableRow>
                            )
                            })}
                        </> 
                    )
                    }
                </TableBody>
                <TableFooter>
                    <TableCell colSpan={4}>Withdrawal Requests</TableCell>
                    <TableCell>{withdrawalRequests.length}</TableCell>
                </TableFooter>
            </Table>
            <SheetContent className='flex flex-col justify-between'>
                <div>
                    <SheetHeader>
                        <SheetTitle className='mb-8 '>Do you want to approve this request</SheetTitle>
                    </SheetHeader>
                    <SheetDescription>
                        {processRequest && (
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>Transaction Hash</p>
                                        <p>{processRequest.id}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>


                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>Charity</p>
                                        <p>{chosenCharity?.title}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>Charity Description</p>
                                        <p className='line-clamp-3'>{chosenCharity?.description}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>Withdrawal Cause</p>
                                        <p>{processRequest.notes}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>Charity</p>
                                        <p>{Number(processRequest.amount) * 1.0 / 100000000.00} {processRequest.currency}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>From</p>
                                        <p>{processRequest.from}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>To</p>
                                        <p>{processRequest.to}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>
                                

                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-base font-medium'>Time</p>
                                        <p>{convertToDate(processRequest.time, 'date')}</p>
                                        <p>{convertToDate(processRequest.time, 'seconds')}</p>
                                    </div>
                                    <Separator className='bg-gray-300'/>
                                </div>
                            </div>
                        )}
                    </SheetDescription>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button  onClick={()=>{updateWithdrawalStatus()}} className='w-full' type="submit">Approve</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
  )
}
