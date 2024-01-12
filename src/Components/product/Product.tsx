import { useQuery } from "react-query"
import styles from "./Product.module.css"
import axios from "axios"

export interface Product {
    id: string
    name: string
    description: string
    price: number
    size: string
    nameImage: string
    category: {id: string, name: string, nameImage: string}
}

const API_URL = 'http://localhost:8080/api/product'

export function Product({ filtered }: { filtered?: string}) {
    const { data } = useQuery<Product[]>("products", async () => {
        const response = await axios.get(API_URL)

        return response.data
    })

    const filteredData = filtered ? data?.filter(product => product.category.name === filtered) : data

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2>Nossos produtos</h2>
                <a href="">Ver todos</a>
            </header>
            <ul className={styles.itemList}> 
                { filteredData?.map(product => {
                    const imageUrl = `http://localhost:8080/api/product/image/${product.nameImage}`;
                    return (
                        <a href="" key={product.id}>
                            <li className={styles.itemProduct}>
                                <img src={imageUrl} alt="" />
                                <div className={styles.productContent}> 
                                    <p>{product.name}</p>
                                    <div className={styles.price}>
                                        <p>R${(product.price * 1.5).toFixed(2).replace('.', ',')}</p>
                                        <p>R${product.price.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                }}>
                                    Adicionar ao carrinho
                                </button>
                            </li>
                        </a>
                    )
                })}
            </ul>
        </div>
    )
}