import { useContext } from "react"
import styles from "./Profile.module.css"
import { CartContext } from "../../context/CartContext"
import { baseUrl } from "../../main"

export function ProfileShopping() {
    const { cartItem, isLoading } = useContext(CartContext)

    return (
        <div className={styles.shoppingContent}>
            <h2>Minhas compras</h2>
            
            { isLoading ? (
                <div className={styles.loadingPopUp}>Carregando...</div>
            ) : cartItem.filter(item => item.status === "COMPLETED").length > 0 ?
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
                            { cartItem.filter(item => item.status === "COMPLETED").map(item => {
                                const imageUrl = `${baseUrl}/api/product/image/${item.product.nameImage}`;
                                return (
                                    <tr key={item.product.id}>
                                        <td>
                                            <img src={imageUrl}/>
                                            <div>
                                                <p>{item.product.name}</p>
                                                <p>R${item.product.price?.toFixed(2)}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>
                                                {item.quantity} 
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
            : (
                <div className={styles.emptyShopping}>
                    <img src="/public/box.svg" alt="" />
                    <p>Nenhuma compra feita</p>
                </div>
            )}  
            
            </div>
    )
}