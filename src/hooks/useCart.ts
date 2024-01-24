import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export const useCart = () => {
    const context = useContext(CartContext) || {
        cart: undefined,   
        cartItem: [], 
        addToCart: () => {},
        removeFromCart: () => {} 
    }

    return context
}