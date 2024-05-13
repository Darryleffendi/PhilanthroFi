import React, { ReactNode } from "react"
import { RouteTypes } from "./profile-routes"
import AdminWithdrawalRequest from "@pages/admin/admin-withdrawal-requests"

export const AdminRoutes:RouteTypes[] = [
    {
        name:"Withdrawal Requests",
        element: <AdminWithdrawalRequest/>,
        description:"Approve Withdrawal Requests",
        altRoute:"ph1l4ntr0F1/admin/manage"
    },

]


