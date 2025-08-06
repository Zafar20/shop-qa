import { ICartStore } from "../store/cartStore"


export const calcTotalPrice = (items: ICartStore[]) => {
   return items.reduce((sum, obj) => +obj.price * obj.amount! + sum,0)
}