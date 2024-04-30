import Navbar from "@components/Navbar"
import React, { ReactNode } from "react"

type Props = {
  children : ReactNode
}

const MainLayout = ({children}:Props) => {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  )
}

export default MainLayout;