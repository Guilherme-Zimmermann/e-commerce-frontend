import { Minus, Plus, X } from "phosphor-react"
import { useCart } from "../../hooks/useCart"
import { baseUrl } from "../../main"
import styles from "./Cart.module.css"
import { CartItemPK } from "../../context/CartContext"

export function Cart() {
    const { cart, cartItem, isLoading, updateToCart, removeFromCart, checkout } = useCart()

    const handleAddCart = (productId: string, e: React.MouseEvent) => {
        e.preventDefault()

        const item = cartItem.find(item => item.product.id === productId)

        if (!productId || !cart || !item) {
            return
        }


        updateToCart(item.quantity + 1, item.price, cart.id, item.product.id);
    }

    const handleRemoveCart = (productId: string, e: React.MouseEvent) => {
        e.preventDefault()

        const item = cartItem.find(item => item.product.id === productId)

        if (!productId || !cart || !item) {
            return
        }


        updateToCart(item.quantity -1, item.price, cart.id, item.product.id);
    }

    const handleDeleteItem = (productId: string, e: React.MouseEvent) => {
        e.preventDefault()

        const userConfirmation = window.confirm("Deseja remover o produto do carrinho?")

        if (!userConfirmation) {
            return
        }

        const item = cartItem.find(item => item.product.id === productId)

        if (!productId || !cart || !item) {
            return
        }

        removeFromCart(cart.id, item.product.id);
    }

    const handleCheckout = (e: React.MouseEvent) => {
        e.preventDefault()

        const items: CartItemPK[] = cartItem.map(item => ({
            cart: {id: item.cart.id},
            product: {id: item.product.id}
        }))

        checkout(items)
    }

    const totalPricePending = cartItem
    .filter(item => item.status === "PENDING")
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);


    return (
        <div className={styles.container}>
            <h1>Meu carrinho</h1>

            <div className={styles.cartContent}>
                { isLoading && <div className={styles.loadingPopUp}>Carregando...</div>}
                <div className={styles.tableContent}>
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { isLoading ? (
                                <div className={styles.loadingPopUp}>Carregando...</div>
                            ) : cartItem.filter(item => item.status === "PENDING").length === 0 ? (
                                <div>Seu carrinho está vazio</div>
                            ) : cartItem.filter(item => item.status === "PENDING").map(item => {
                                const imageUrl = `${baseUrl}/api/product/image/${item.product.nameImage}`;
                                return (
                                    <tr key={item.product.id}>
                                        <td>
                                            <button onClick={(e) => handleDeleteItem(item.product.id, e)} title="Remover"><X /></button>
                                            <img src={imageUrl}/>
                                            <div>
                                                <p>{item.product.name}</p>
                                                <p>R${item.product.price?.toFixed(2)}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>
                                                <button onClick={(e) => handleRemoveCart(item.product.id, e)}><Minus /></button> 
                                                    {item.quantity} 
                                                <button onClick={(e) => handleAddCart(item.product.id, e)}><Plus /></button>
                                            </p>
                                        </td>
                                        <td>
                                            <p>R${item.subTotal?.toFixed(2)}</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className={styles.totalContainer}>
                    <div className={styles.total}>
                        <p>Total</p>
                        <p>R${totalPricePending.toFixed(2)}</p>
                    </div>
                    <button onClick={handleCheckout}>Finalizar compra</button>
                </div>

            </div>
        </div>
    )
}