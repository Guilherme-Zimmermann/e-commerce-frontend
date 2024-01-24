import { useContext } from "react"
import styles from "./Profile.module.css"
import { CartContext } from "../../context/CartContext"

export function ProfileShopping() {
    const { cart } = useContext(CartContext)

    console.log(cart?.id)

    return (
        <div className={styles.shoppingContent}>
            <h2>Minhas compras</h2>
            <div className={styles.emptyShopping}>
                <img src="/public/box.svg" alt="" />
                <p>Nenhuma compra feita</p>
            </div>
            <div>
                <p>{cart?.id}</p>
            </div>
        </div>
    )
}