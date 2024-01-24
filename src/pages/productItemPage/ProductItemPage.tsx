import { useEffect, useState } from "react"
import styles from "./ProductIemPage.module.css"
import axios from "axios";
import { Product } from "../../components/product/Product";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../main";
import { useCart } from "../../hooks/useCart";

export function ProductItemPage() {
    const { id } = useParams() 
    const [ product, setProduct ] = useState<Product>();
    const { cart, addToCart, isLoading } = useCart()

    useEffect(() => {
        async function fecthProducts() {
            const response = await axios.get(baseUrl+`/api/product/${id}`)
            setProduct(response.data)
        }
        
        fecthProducts()
    }, [])

    const handleAddCart = (e: React.FormEvent) => {
        e.preventDefault()

        if(!product || !cart) {
            return null
        }

        addToCart(1, product.price, cart.id, product.id)
    }

    return (
        <div className={styles.container}>
            { isLoading && <div className={styles.loadingPopUp}>Carregando...</div>}
            <div className={styles.productContent}>
                {product && (
                        <>
                            <div className={styles.productImage}>
                                <img src={baseUrl+`/api/product/image/${product.nameImage}`} alt="" />
                            </div>

                            <div className={styles.productDescription}>

                                <h2>{product.name}</h2>
                                
                                <div >
                                    <p>Tamanho: {product.sizeP}</p>
                                    <div style={{display: "flex", gap: "0.5rem"}}>
                                        <div>
                                            <p>
                                                Preço:
                                            </p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column", gap: "0.25rem"}}>
                                            <p style={{fontSize: "1.5rem"}}>
                                                R${product.price.toFixed(2)}
                                            </p>
                                            <p style={{color: "var(--gray-300)"}}>
                                                Ou em até 3x de {" "}
                                                <span style={{color: "var(--gray-700)"}}> 
                                                    R${(product.price /3).toFixed(2)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p>{product.description}</p>
                                
                                {cart?.id && <button onClick={handleAddCart}>Adicionar ao carrinho</button>}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}