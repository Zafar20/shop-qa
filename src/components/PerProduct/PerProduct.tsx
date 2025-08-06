import { FC } from 'react'
import s from './PerProduct.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useGetProductById } from '../../services/products'
import CustomBtn from '../UI/CustomBtn'
import { arrowLeft, cartIcon, nonameIcon, starIcon } from '../../utils'
import { toast } from 'react-toastify';
import cartStore from '../../store/cartStore'
import Skeleton from './Skeleton'

const PerProduct: FC = () => {

    let params = useParams()


    const { data } = useGetProductById(+params.id!)

    const { addToCart } = cartStore()
    const addToCartHandler = () => {

        addToCart(data!)
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
        <div className={s.product}>
            {data ? (
                <>
                    <div className={s.product_top}>
                        <Link to="/" className={s.product_top_link}>
                            <img src={arrowLeft} alt="" />
                        </Link>
                        <CustomBtn onClick={() => addToCartHandler()} text="В корзину" icon={nonameIcon} width={143} height={43} />
                    </div>
                    <div className={s.product_item}>
                        
                        <div className={s.product_item_left}>
                            <img src={data.image} alt="" className={s.product_item_left_img} />
                        </div>
                        <div className={s.product_item_right}>
                            <div className={s.product_item_info}>
                                <h2 className={s.product_item_right_title}>{data.title}</h2>
                                <p className={s.product_item_right_text}>{data.description}</p>
                            </div>
                            <div className={s.product_item_info2}>
                                <div className={s.product_item_right_price}>
                                    <p className={s.product_item_right_price_text}>Цена</p>
                                    <p className={s.product_item_right_price_number}>
                                        {data.price}
                                        <span>$</span>
                                    </p>
                                </div>
                                <div className={s.product_item_right_rating}>
                                <p className={s.product_item_right_rating_text}>Рейтинг</p>
                                <p className={s.product_item_right_rating_number}>
                                    {data.rating}
                                    <img src={starIcon} alt="" />
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : ''}



        </div>
    )
}

export default PerProduct