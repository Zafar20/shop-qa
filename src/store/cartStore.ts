import { create } from 'zustand';
import {  devtools  } from 'zustand/middleware'
import { IProduct } from '../types/types';
import { calcTotalPrice } from '../utils/calcTotalPrice';
import { getCartFromLS } from '../utils/getCartFromLs';



export interface ICartStore extends IProduct {
    amount?: number;
}

interface IProductStore {
    cart: ICartStore[];
    totalPrice: number;
    addToCart: (product: IProduct) =>  void;
    minusItem: (id:number) => void;
    removeItem: (id:number) => void;
}



const { totalPrice, carts  } = getCartFromLS()

const cartStore = create<IProductStore>()(
  devtools(
    (set, get) => ({
        cart: carts,
        totalPrice: totalPrice,
        addToCart: (product) => {
          const { cart} = get();
          const findItem = cart.find(obj => obj.id == product.id)
          if(findItem) {
            const updatedCart = cart.map(item =>
              item.id === product.id ? { ...item, amount: item.amount! + 1 } : item
            );
            set({ cart: updatedCart });
          }else {
            set({cart: [...cart, {...product, amount: 1}]})
          }
          const newCart = get().cart; // Получаем обновленное значение корзины
          set({totalPrice: calcTotalPrice(newCart)})
        },
        minusItem: (id: number) => {
          let { cart } = get();
          const updatedCart = cart.map((item) =>
            item.id === id && item.amount && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
          );
          set({ cart: updatedCart });
          const newCart = get().cart; // Получаем обновленное значение корзины
          set({ totalPrice: calcTotalPrice(newCart) }); // Пересчитываем totalPrice
        },
        removeItem: (id:number) => {
          let { cart} = get()
          let filteredCart = cart.filter(obj => obj.id !== id)
          set({cart: filteredCart})
          set({totalPrice: calcTotalPrice(filteredCart)})
        }
  }))
);

export default cartStore;
