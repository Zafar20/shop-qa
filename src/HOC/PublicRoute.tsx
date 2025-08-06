import {useEffect, FC} from 'react'
import { useCurrentQuery } from '../services/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import useStore from '../store/userStore'



const Auth:FC = () => {

  let access_token = localStorage.getItem('access_token')
  
  const navigate = useNavigate()
  const setUser = useStore(state => state.setUser); 
  const { isLoading, data } = useCurrentQuery()
  
  
  useEffect(() => {
    if(access_token) {
      navigate('/')
    }
  }, [access_token,navigate])
  
 
  


  return <Outlet/>
}

export default Auth