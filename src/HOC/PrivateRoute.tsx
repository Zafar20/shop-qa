import {useEffect, FC} from 'react'
import { useCurrentQuery } from '../services/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import useStore from '../store/userStore'



const Auth:FC = () => {

  let access_token = localStorage.getItem('access_token')
  
  const navigate = useNavigate()
  const setUser = useStore(state => state.setUser); 
  const {  data } = useCurrentQuery()
  
  
  useEffect(() => {
    if(!access_token) {
      navigate('/login')
    }
  }, [access_token,navigate])
  
  useEffect(() => {
    if(data) {
      setUser(data)
    }
  }, [data,setUser])
  


  return <Outlet/>
}

export default Auth