import React from 'react'
import { IProduct } from '../../types/types'
import s from './Products.module.scss'
import { Link } from 'react-router-dom'
import cartStore from '../../store/cartStore'
import { toast } from 'react-toastify';
import { nonameIcon, starIcon } from '../../utils'



const Product:React.FC<IProduct> = (item) => {
  
  const { addToCart } = cartStore()
  
  const addToCartHandler = (e:React.MouseEvent,item:IProduct) => {
    e.stopPropagation(); // ⛔ Остановить всплытие
    e.preventDefault();  // ⛔ Не переходить по ссылке
    addToCart(item)
    toast.success('Товар добавлен в корзину', {
      position: "top-right",
      autoClose: 2000, // Закрытие уведомления через 3 секунды
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  
  return (
    <Link to={`/product/${item.id}`} className={s.products_item}>
        <img src={item.image} alt="" className={s.products_item_img} />
        <h2 className={s.products_item_price}>{item.price} <span>$</span> </h2>
        <button onClick={(e) => addToCartHandler(e,item)} className={s.products_item_btn}>
          <img src={nonameIcon} alt="" />
        </button>
        <div className={s.products_item_info}>
          <h2 className={s.products_item_rating}>
            {item.rating}
            <img src={starIcon} alt="" />  
          </h2>
          <h2 className={s.products_item_title}>{item.title}</h2>
          <p className={s.products_item_text}>{item.description}</p>
        </div>
    </Link>
  )
}

export default Product