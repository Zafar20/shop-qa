import { createBrowserRouter} from "react-router-dom";
import { Paths } from './paths';
import Menu from '../pages/Menu/Menu'
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import PrivateRoute from '../HOC/PrivateRoute';
import PublicRoute from '../HOC/PublicRoute'
import Cart from '../pages/Cart/Cart';
import MenuProduct from '../pages/MenuProduct/MenuProduct';

export const router = createBrowserRouter([
    {
      path: Paths.menu,
      element: <PrivateRoute/>,
      children: [
        {
          index: true,
          element: <Menu/>
        }
      ]
    },
    {
      path: Paths.login,
      element: <PublicRoute/>,
      children: [
        {
          index:true,
          element: <Login/>
        }
      ]
    },
    {
      path: Paths.register,
      element: <PublicRoute/>,
      children: [
        {
          index: true,
          element: <Register/>
        }
      ]
    },
    {
      path: Paths.cart,
      element: <PrivateRoute/>,
      children: [
        {
          index: true,
          element: <Cart/>
        }
      ]
    },
    {
      path: Paths.profile,
      element: <PrivateRoute/>,
      children: [
        {
          index: true,
          element: <Profile/>
        }
      ]
    },
    {
      path: Paths.menuProduct,
      element:<PrivateRoute/>,
      children: [
        {
          index: true,
          element: <MenuProduct/>
        }
      ]
    },
  ])


