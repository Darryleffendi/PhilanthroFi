import React from 'react'
import { Skeleton } from './ui/skeleton'
import { Transaction } from 'src/declarations/charity/charity.did';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@components/ui/table"
  

interface TransactionTabProps {
    transaction: Transaction;
}


const TransactionTabSkeleton = () =>{
    return(
        <Skeleton className='w-full h-32 bg-gray-200'>

        </Skeleton>
    )
}

function TransactionTab({transaction}:TransactionTabProps) {
    return (
        <Table>
            <TableCaption>List of transactions</TableCaption>
        </Table>
    )
}

export {TransactionTab, TransactionTabSkeleton}


//   export function TableDemo() {
//     return (
//       <Table>
//         <TableCaption>A list of your recent invoices.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Invoice</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Method</TableHead>
//             <TableHead className="text-right">Amount</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {invoices.map((invoice) => (
//             <TableRow key={invoice.invoice}>
//               <TableCell className="font-medium">{invoice.invoice}</TableCell>
//               <TableCell>{invoice.paymentStatus}</TableCell>
//               <TableCell>{invoice.paymentMethod}</TableCell>
//               <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={3}>Total</TableCell>
//             <TableCell className="text-right">$2,500.00</TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     )
//   }
  