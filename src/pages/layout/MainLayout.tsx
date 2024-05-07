import Navbar from "@components/Navbar"
import Footer from "@components/footer/Footer"
import React, { ReactNode } from "react"

type Props = {
  children : ReactNode,
  className?: String
  navbarClassName?: string
}

const MainLayout : React.FC<Props> = ({children, className = "p-6", navbarClassName}) => {
  return (
    <>
    <div className={`p-6 fixed z-40`}>
      <Navbar className={navbarClassName}/>
    </div>
    <div className={`${className} w-full min-h-screen`}>
      {children}
    </div>
    <Footer/>
    </>
  )
}

export default MainLayout;