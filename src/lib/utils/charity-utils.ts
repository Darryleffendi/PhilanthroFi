import { convertToDate } from "@lib/service/date-service";
import { CharityEvent } from "@lib/types/charity-types";

export function cleanseCharity(charity : CharityEvent | any) : CharityEvent {

    charity.end_date = new Date(convertToDate(charity.end_date, "date"))
    charity.start_date = new Date(convertToDate(charity.end_date, "date"))

    charity.current_donation = Number(charity.current_donation) / 100000000
    charity.target_donation = Number(charity.target_donation)

    return charity
}

export function cleanseTransaction(transaction : any) : any {
    transaction.amount = Number(transaction.amount) / 100000000
    transaction.date = new Date(convertToDate(transaction.date, "datetime"))

    return transaction
}