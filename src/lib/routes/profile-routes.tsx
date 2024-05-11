import React, { ReactNode } from "react"

const MyProfile = React.lazy(()=>import ('@pages/profile/my-profile'))
const MyCharities = React.lazy(()=>import ('@pages/profile/my-charities'))
const MyTransactions = React.lazy(()=>import ('@pages/profile/my-transactions'))

export const ProfileRoutes:ProfileRouteTypes[] = [
    {
        name:"Profile",
        component: <MyProfile/>,
        description:"Manage your profile and your preferences"
    },
    {
        name:"My Charities",
        component: <MyCharities/>,
        description:"View and manage your personal charity events"
    },
    {
        name:"Transactions",
        component: <MyTransactions/>,
        description:"View a detailed log of your past transactions"
    },
]

export interface ProfileRouteTypes{
    name:string,
    component:ReactNode,
    description:string,
}