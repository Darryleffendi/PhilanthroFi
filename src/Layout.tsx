import React, { ReactNode } from "react"

type Props = {
  children : ReactNode
}

const Layout = ({children}:Props) => {
  return (
    <div>asdasdas {children}</div>
  )
}

export default Layout