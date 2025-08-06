import { FC, useState, useEffect } from "react";
import s from "./CartBlock.module.scss";
import { closeIcon, krestikIcon, minusIcon, plusIcon } from "../../utils";
import cartStore, { ICartStore } from "../../store/cartStore";
import { IProduct } from "../../types/types";
import { toast } from "react-toastify";

const CartItem: FC<ICartStore> = ({ id, image, price, title, amount }) => {
  const { addToCart, minusItem, removeItem } = cartStore();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const remove = () => {
    removeItem(id);
    toast.success("Товар удален из корзины", {
      position: "top-right",
      autoClose: 2000, // Закрытие уведомления через 3 секунды
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1100); // Устанавливаем флаг в зависимости от ширины экрана
    };

    window.addEventListener("resize", handleResize); // Добавляем слушатель события изменения размера окна

    // Удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className={s.cart_item}>
      <div className={s.cart_item_left}>
        <div className={s.cart_item_left_img}>
          <img src={image} alt="" />
        </div>
        <div className={s.cart_item_left_box}>
          <h2>{title}</h2>
          <span>{price}$</span>
        </div>
      </div>
      <div className={s.cart_item_right}>
        <button
          className={s.cart_item_right_minus}
          onClick={() => minusItem(id)}
        >
          <img src={minusIcon} alt="" />
        </button>
        <span className={s.cart_item_right_amount}>{amount}</span>
        <button
          className={s.cart_item_right_plus}
          onClick={() => addToCart({ id: id } as IProduct)}
        >
          <img src={plusIcon} alt="" />
        </button>
        <button className={s.cart_item_right_delete} onClick={() => remove()}>
          <img src={krestikIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
