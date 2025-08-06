import UserLayout from '../../layouts/UserLayout'
import Products from '../../components/Products/Products'
import { useEffect } from "react"

const Menu:React.FC = () => {
  


  return (
    <>
      <UserLayout>
          <Products/>
      </UserLayout>
    </>
  )
}

export default Menu