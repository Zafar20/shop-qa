import { FC, useEffect, useRef } from 'react'
import User from '../components/User/User'
import cartStore from '../store/cartStore'

interface IUserLayoutProps {
  children: JSX.Element
}


const UserLayout: FC<IUserLayoutProps> = ({ children }) => {

  const { cart } = cartStore()

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cart);
      localStorage.setItem('cart', json)
    }
    isMounted.current = true

  }, [cart])



  return (
    <div className="main">
      <User />
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default UserLayout