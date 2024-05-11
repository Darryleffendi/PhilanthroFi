import { ReactNode } from "react"

export const ProfileRoutes:ProfileRouteTypes[] = [
    {
        name:"Profile",
        component: <></>,
        description:"Manage your profile and your preferences"
    },
    {
        name:"My Charity",
        component: <></>,
        description:"View and manage your personal charity events"
    },
    {
        name:"Transactions",
        component: <></>,
        description:"View a detailed log of your past transactions"
    },
]

export interface ProfileRouteTypes{
    name:string,
    component:ReactNode,
    description:string,
}