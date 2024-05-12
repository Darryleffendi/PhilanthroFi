import React, { ReactNode } from "react"

const MyProfile = React.lazy(()=>import ('@pages/profile/my-profile'))
const MyCharities = React.lazy(()=>import ('@pages/profile/my-charities'))
const MyTransactions = React.lazy(()=>import ('@pages/profile/my-transactions'))

export const ProfileRoutes:ProfileRouteTypes[] = [
    {
        name:"Profile",
        element: <MyProfile/>,
        description:"Manage your profile and your preferences",
        altRoute:"profile"
    },
    {
        name:"My Charities",
        element: <MyCharities/>,
        description:"View and manage your personal charity events",
        altRoute:"my-charities"
    },
    {
        name:"Transactions",
        element: <MyTransactions/>,
        description:"View a detailed log of your past transactions",
        altRoute:"my-transactions"
    },
]

export interface ProfileRouteTypes{
    name:string,
    element:ReactNode,
    description:string,
    altRoute:string,
}
