import { FC } from "react";
import cartStore from "../../store/cartStore";
import s from "./CartBlock.module.scss";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { arrowLeft } from "../../utils";

const CartBlock: FC = () => {
  const { cart, totalPrice } = cartStore();

  return (
    <div className={s.cart}>
      <div className={s.cart_top}>
        <Link to="/" className={s.cart_top_link}>
          <img src={arrowLeft} alt="" />
        </Link>
        <h1 className={s.cart_title}>
          {cart.length > 0 ? "Корзина" : "Корзина Пуста"}
        </h1>
      </div>

      <ul className={s.cart_list}>
        {cart && cart.map((item) => <CartItem key={item.id} {...item} />)}
      </ul>
      {cart.length > 0 && (
        <div className={s.cart_total}>
          <h2 className={s.cart_total_text}>Итог</h2>
          <span className={s.cart_total_price}>
            {totalPrice}
            <span>$</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default CartBlock;
