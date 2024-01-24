import { Minus, Plus, X } from "phosphor-react"
import { useCart } from "../../hooks/useCart"
import { baseUrl } from "../../main"
import styles from "./Cart.module.css"

export function Cart() {
    const { cart, cartItem, isLoading, updateToCart, removeFromCart } = useCart()

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
                            {cartItem.length === 0 ? (
                                <div>Carregando...</div>
                            ) : cartItem.map(item => {
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
                                            <p>{item.subTotal?.toFixed(2)}</p>
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
                        <p>R${cart?.totalPrice.toFixed(2)}</p>
                    </div>
                    <button>Finalizar compra</button>
                </div>

            </div>
        </div>
    )
}