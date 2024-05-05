import Navbar from "@components/Navbar"
import Footer from "@components/footer/Footer"
import React, { ReactNode } from "react"

type Props = {
  children : ReactNode,
  className?: String
}

const MainLayout : React.FC<Props> = ({children, className}) => {
  return (
    <>
    <div className={`${className} p-6 w-full min-h-screen`}>
      <Navbar/>

      {children}
    </div>
    <Footer/>
    </>
  )
}

export default MainLayout;