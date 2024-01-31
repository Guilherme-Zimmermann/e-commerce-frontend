import { createContext, useEffect, useState } from "react"
import { Product } from "../components/product/Product"
import { useAuth } from "../hooks/useAuth"
import axios from "axios"
import { baseUrl } from "../main"
import { User } from "./AuthContext"

export interface Cart {
    id: string
    date: string
    user: User
    totalPrice: number
}

export interface CartItem {
    cart: Cart
    product: Product
    quantity: number
    price: number
    subTotal?: number
    status?: string
}

export interface CartItemPK{
    cart: {id: string}
    product: {id: string}
}

type CartContextType = {
    cart: Cart | undefined
    cartItem: CartItem[]
    isLoading: boolean
    addToCart: (quantity: number, price: number, cartId: string, productId: string) => void
    updateToCart: (quantity: number, price: number, cartId: string, productId: string) => void
    removeFromCart: (cartId: string, productId: string) => void
    checkout : (items: CartItemPK[]) => void
}

export const CartContext = createContext<CartContextType>({ 
    cart: undefined,   
    cartItem: [], 
    isLoading: false,
    addToCart: () => {},
    updateToCart: () => {},
    removeFromCart: () => {},
    checkout: () => {}
})

export const CartProvider = ({ children }: any) => {
    const { user } = useAuth()

    const [ cart, setCart ] = useState<Cart>() 
    const [ cartItem, setCartItem ] = useState<CartItem[]>([])
    const [ isLoading, setIsLoading ] = useState(false)

    // Fetch Cart
    useEffect(() => {
        async function fetchCart() {
            const response = await axios.get(baseUrl+`/api/cart/user/${user?.id}`)
            setCart(response.data)
        }

        fetchCart()
    }, [user])

    // Fetch CartItem
    useEffect(() => {
        async function fetchCartItem() {
            const response = await axios.get(baseUrl+`/api/cartitem/${cart?.id}`)
            setCartItem(response.data)
        }

        fetchCartItem()
    }, [cart])

    const addToCart = async (quantity: number, price: number, cartId: string, productId: string) => {3
        setIsLoading(true)
        const cart = { id: cartId}
        const product = { id: productId }
        const existCartItem = cartItem.find(item => item.product.id === productId && item.status === "PENDING")
        
        if (existCartItem) {
            window.alert("Esse produto já foi adicionado ao carrinho")
        } else {

            await axios.post(baseUrl+"/api/cartitem", {quantity, price, cart, product})
            .then( async (response) => {
                console.log(response.data)
                window.alert("Produto adicionado com sucesso!")
            })
            .catch(() =>{
                console.log("Deu ruim")
            })
        }
        setIsLoading(false)
    }

    const updateToCart = async (quantity: number, price: number, cartId: string, productId: string) => {
        setIsLoading(true)
        const cart = { id: cartId}
        const product = { id: productId }
        const existCartItem = cartItem.find(item => item.product.id === productId)

        if (existCartItem) {
            await axios.put(baseUrl+`/api/cartitem/${cartId}/${productId}`, {quantity, price, cart, product}) 
            .then((response) => {
                console.log(response.data)
                setCartItem(currentCart => currentCart.map(item => item.product.id === productId ? {...item, quantity} : item));
                const total = cartItem.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                setCart(currentCart => currentCart ? { ...currentCart, totalPrice: total } : undefined);
            })
        }
        setIsLoading(false)
    }

    const removeFromCart = async (cartId: string, productId: string) => {
        setIsLoading(true)
        await axios.delete(baseUrl+`/api/cartitem/${cartId}/${productId}`)
        .then (() => {
            setCartItem(currentItems => currentItems.filter(item => item.product.id !== productId));
            const total = cartItem.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setCart(currentCart => currentCart ? { ...currentCart, totalPrice: total } : undefined);
            window.alert("Produto removido com sucesso!")
        })
        setIsLoading(false)
    }

    const checkout = async (items: CartItemPK[]) => {
        setIsLoading(true)
        if (items.length > 0) {
            await axios.put(baseUrl+"/api/cartitem/checkout", items)
            .then (() => {
                setCartItem([])
                window.alert("Compra finalizada com sucesso!")
            })
            .catch((error) => {
                console.error("Erro ao finalizar a compra: ", error);
            });
            } else {
                window.alert("Não há itens pendentes no carrinho para finalizar a compra.");
            }
        setIsLoading(false)
    }

    return (
        <CartContext.Provider value={{ cart, cartItem, isLoading, addToCart, updateToCart, removeFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    )
}