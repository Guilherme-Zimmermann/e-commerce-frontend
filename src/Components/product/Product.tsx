import { useQuery } from "react-query"
import styles from "./Product.module.css"
import axios from "axios"
import { useParams } from "react-router-dom"

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

export function Product({ filtered } : { filtered?: string }) {
    const { query } = useParams()

    const { data } = useQuery<Product[]>("products", async () => {
        const response = await axios.get(API_URL)

        return response.data
    })

    const keywords = query ? query.split(' ') : []
    const filteredData = data?.filter(product =>
            // Se a consulta de pesquisa estiver presente, ignore o filtro de categoria
            (!query || keywords.some(keyword => 
                product.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))) &&
            // Se a consulta de pesquisa não estiver presente, aplique o filtro de categoria
            (!query && filtered ? product.category.name === filtered : true)
        )

    return (
        <div className={styles.container}>
            { query ? <p>Resultados da pesquisa: {query}</p> : null}
            <header className={styles.header}>
                {filtered ? <h2>{filtered}</h2> : <h2>Nossos produtos</h2>}
                { query ? null : <a href="/produtos">Ver todos</a>}
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
                                        <p>R${(product.price * 1.3).toFixed(2).replace('.', ',')}</p>
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