export interface User extends UserBase{
    identity: any; 
    timestamp: bigint; 
    role:string;
}

export interface UserBase {
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string;
}


export enum AuthState {
    Authenticated = "Authenticated",
    Nope = "Not Authenticated",
    NotRegistered = "NotRegistered",
    Loading = "Loading",
}

export const ADMIN:string = "admin" //biar di codenya terlihat LEGIT