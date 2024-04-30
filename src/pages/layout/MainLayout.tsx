import Navbar from "@components/Navbar"
import Footer from "@components/footer/Footer"
import React, { ReactNode } from "react"

type Props = {
  children : ReactNode
}

const MainLayout = ({children}:Props) => {
  return (
    <div>
      <Navbar />

      {children}
      <Footer/>
    </div>
  )
}

export default MainLayout;