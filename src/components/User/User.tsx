import {FC, useState, } from 'react'
import s from './User.module.scss'
import ava from '../../assets/images/userAva.svg'
import menuIcon from '../../assets/images/menu-icon.svg'
import cartIcon from '../../assets/images/cart-icon.svg'
import userIcon from '../../assets/images/userIcon.svg'
import logoutIcon from '../../assets/images/logout.svg'
import useStore from '../../store/userStore'
import { useNavigate } from 'react-router-dom'
import UserSkeleton from './UserSkeleton'
import { useAddAvatar } from '../../services/auth'
import { NavLink } from 'react-router-dom'
import CustomBtn from '../UI/CustomBtn'
import cartStore from '../../store/cartStore'
import useWindowSize from "../../hooks/hooks";
import Modal from './Modal'



const User:FC = () => {
  
  const logout = useStore(state => state.logout); 
  const user = useStore(state => state.user); 
  const { cart } = cartStore()
  const { width } = useWindowSize();
  

  const totalCount = cart.reduce((sum: number,item: any) => sum + item.amount, 0)
  
  
  const navigate = useNavigate()
  const [avatarUrl, setAvatarUrl] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const links = [
    { url: '/', name: 'Меню', icon: menuIcon },
    { url: '/cart', name: 'Корзина', icon: cartIcon },
    { url: '/profile', name: 'Профиль', icon: userIcon },
  ]

  const addAvatarMutation = useAddAvatar();

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  const logoutUser = () => {
      closeModal()
      logout()
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/login')
      
  }


  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      let response =   await addAvatarMutation.mutateAsync({id:user?.id, formData});
      const newAvatarUrl = response.data.avatar; // Предположим, что сервер возвращает новый URL изображения
      setAvatarUrl(newAvatarUrl); // Обновляем URL изображения в состоянии
      console.log('Картинка добавлена');
      
    } catch (error) {
      console.error('Ошибка загрузки картинки:', error);
    }
  };



  
  
  return (
    <>
     <div className={s.user}>
       {user ?  (
        <>
         <div className={s.user_info}>
          <div  className={s.user_avatar}>
          <input type="file" className={s.user_file} onChange={handleFileChange}/>
          { !user?.avatar  && <img src={ava} alt=""/>}
          { user?.avatar && <img src={avatarUrl || `https://reactapi.pythonanywhere.com${user?.avatar}`} alt="" className={s.user_img} />}
          
          </div>
          <h2 className={s.user_name}>{user?.username}</h2>
          <a href="#" className={s.user_mail}>{user?.email}</a>
          </div>
        <ul className={s.list}>
          {links.map((link) => (
            <NavLink key={link.url} to={link.url} className={s.list_link}>
              <img src={link.icon} alt="" />
              {link.name}
              {link.url == '/cart' && totalCount > 0  && <span>{totalCount}</span>}
            </NavLink>
          ))}
        </ul>
        <CustomBtn 
            onClick={() => openModal()} 
            text="Выйти" 
            icon={logoutIcon}
            width={117}
            height={43}
            mt='auto'
          />
          </>
      ) : width > 1000 && <UserSkeleton/>}
    
     
      
    </div>
    { isModalOpen &&  <Modal no={closeModal} yes={logoutUser}/>}
    </>
   

  )
}

export default User