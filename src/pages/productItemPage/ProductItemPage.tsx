import { useEffect, useState } from "react"
import styles from "./ProductIemPage.module.css"
import axios from "axios";
import { Product } from "../../components/product/Product";
import { useParams } from "react-router-dom";
import { baseUrl, baseUrlImages } from "../../main";
import { useCart } from "../../hooks/useCart";
import { Minus, Plus } from "phosphor-react";
import { useAuth } from "../../hooks/useAuth";

export function ProductItemPage() {
    const { id } = useParams() 
    const { cart, addToCart, isLoading } = useCart()
    const { signed } = useAuth()
    
    const [ product, setProduct ] = useState<Product>();
    const [ quantity, setQuantity ] = useState(1)

    useEffect(() => {
        async function fecthProducts() {
            const response = await axios.get(baseUrl+`/api/product/${id}`)
            setProduct(response.data)
        }
        
        fecthProducts()
    }, [])

    const handleAddCart = (e: React.FormEvent) => {
        e.preventDefault()
    
        if (!product) {
            return null
        }
    
        if (!signed) {
            let currentCartItems = []
            const cartItemsDataString = localStorage.getItem("cart-items")
            if (cartItemsDataString) {
                currentCartItems = JSON.parse(cartItemsDataString)
            }
    
            const newCartItem = {
                quantity: quantity,
                price: product.price,
                cart: null,
                product: product.id,
                status: "PENDING"
            }
    
            const itemExists = currentCartItems.some((item: any) => item.product === newCartItem.product)
    
            if (!itemExists) {
                const updatedCartItems = [...currentCartItems, newCartItem]
    
                localStorage.setItem("cart-items", JSON.stringify(updatedCartItems))
            } else {
                alert("Item já adicionado ao carrinho")
            }
        }

        if(!cart) {
            return null
        }

        addToCart(quantity, product.price, cart.id, product.id)
        setQuantity(1)
    }

    const handleAddQuantity = () => {
        setQuantity(quantity+1)
    } 

    const handleRemoveQuantity = () => {
        if (quantity <= 1 ) {
            return
        }

        setQuantity(quantity-1)
    }

    return (
        <div className={styles.container}>
            { isLoading && <div className={styles.loadingPopUp}>Carregando...</div>}
            <div className={styles.productContent}>
                {product && (
                        <>
                            <div className={styles.productImage}>
                                <img src={baseUrlImages+`/product/${product.nameImage}`} alt="" />
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
                                <div className={styles.quantityContent}>
                                    <p>
                                        Quantidade:
                                    </p>
                                    <div className={styles.addRemove}>
                                        <span>
                                            <Minus onClick={handleRemoveQuantity}/>
                                        </span>
                                        <input 
                                            type="number" 
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))} 
                                        />
                                        <span>
                                            <Plus onClick={handleAddQuantity}/> 
                                        </span> 
                                    </div> 
                                </div>
                                
                                <button onClick={handleAddCart}>Adicionar ao carrinho</button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}