import Navbar from "@components/navbar"
import Footer from "@components/footer/footer"
import React, { ReactNode } from "react"
import SmoothScrollbar from "@components/smooth_scrollbar/smooth-scrollbar"

type Props = {
  children : ReactNode,
  className?: String
  navbarClassName?: string
}

const MainLayout : React.FC<Props> = ({children, className = "p-6", navbarClassName}) => {
  return (
    <>
    
      <div className={`p-6 fixed z-40 w-screen`}>
        <Navbar className={navbarClassName}/>
      </div>
      
      <div className={`${className} w-full min-h-screen`}>
          {children}
      </div>
      <Footer className={`${className} `}/>
    </>
  )
}

export default MainLayout;