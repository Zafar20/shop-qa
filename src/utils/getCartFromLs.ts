import { ICartStore } from "../store/cartStore" 
import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const carts = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(carts)
    
    return {
        carts: carts as ICartStore[],
        totalPrice: totalPrice,
        totalCount: 0
    }

}