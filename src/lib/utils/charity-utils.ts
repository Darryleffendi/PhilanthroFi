import { convertToDate } from "@lib/service/date-service";
import { CharityEvent } from "@lib/types/charity-types";

export function cleanseCharity(charity : CharityEvent | any) : CharityEvent {

    charity.end_date = new Date(convertToDate(charity.end_date, "date"))
    charity.start_date = new Date(convertToDate(charity.end_date, "date"))

    charity.current_donation = Number(charity.current_donation) / 100000000
    charity.target_donation = Number(charity.target_donation)

    console.log(charity.end_date)
    return charity
}

export function cleanseTransaction(transaction : any) : any {
    transaction.amount = Number(transaction.amount) // Dibagi  100000000.0 dulu
    transaction.date = new Date(convertToDate(transaction.date, "date"))
    transaction.time = new Date(convertToDate(transaction.time, "date"))
    
    return transaction
}