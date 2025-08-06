import React from 'react'
import logoIcon from '../assets/images/logo.svg'


type Props = {
  children: React.ReactNode
}

const Layout:React.FC<Props> = ({children}) => {

  return (
    <div className="main" style={{height: '100vh'}}>
        <div className="logo">
          <img src={logoIcon} alt="" className="logo_img" />
        </div>
          <div className="form">
            {children}
          </div>
    </div>
  )
}

export default Layout