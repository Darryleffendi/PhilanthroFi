export interface PlugBalance{
    name:string,
    symbol:string,
    amount:number,
    canisterId:string,
    logo:string,
}

export interface TransferTransaction{
    to?:string,
    amount:number,
}