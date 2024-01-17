import { useEffect, useState } from "react"
import styles from "./ProductIemPage.module.css"
import axios from "axios";
import { Product } from "../../components/product/Product";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:8080"

export function ProductItemPage() {
    const { id } = useParams() 
    const [ products, setProducts ] = useState<Product[]>([]);

    useEffect(() => {
        async function fecthProducts() {
            const response = await axios.get(baseUrl+"/api/product")
            setProducts(response.data)
        }
        
        fecthProducts()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.productContent}>
                {products.map(product => {
                    if (product.id === id) {
                        const imageUrl = `${baseUrl}/api/product/image/${product.nameImage}`;
                        return (
                            <>

                            <div className={styles.productImage}>
                                <img src={imageUrl} alt="" />
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
                                                    R${(product.price/3).toFixed(2)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p>{product.description}</p>
                                
                                <button>Adicionar ao carrinho</button>
                            </div>
                        </>
                        )
                    }
                })}
            </div>
        </div>
    )
}