import { useQuery } from "react-query"
import styles from "./Product.module.css"
import axios from "axios"
import { Link, useLocation, useParams } from "react-router-dom"

export interface Product {
    id: string
    name: string
    description: string
    price: number
    sizeP: string
    nameImage: string
    category: {id: string, name: string, nameImage: string}
}

const baseUrl = "http://localhost:8080"

export function Product({ filtered, quantityInView, lessGap } : { filtered?: string, quantityInView?: number, lessGap? : boolean }) {
    const { query, categoria } = useParams()
    const location = useLocation()

    const { data } = useQuery<Product[]>("products", async () => {
        const response = await axios.get(baseUrl+"/api/product")

        return response.data
    })

    const keywords = query ? query.split(' ') : []
    const filteredData = data?.filter(product => 
            // Filtro de acordo com a categoria da url
            (!categoria || product.category.name === categoria) &&
            // Se a consulta de pesquisa estiver presente, ignore o filtro de categoria
            (!query || keywords.some(keyword => 
                product.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || 
                product.category.name.toLocaleLowerCase().includes(keyword))) &&
            // Se a consulta de pesquisa não estiver presente, aplique o filtro de categoria
            (!query && filtered ? product.category.name === filtered : true)
        )

    const itemProductClass = lessGap ? `${styles.itemList} ${styles.itemProductWithLessGap}` : styles.itemList;

    return (
        <div className={styles.container}>
            { query ? <p>Resultados da pesquisa: {query}</p> : null}
            <header className={styles.header}>
                {filtered ? <h2>{filtered}</h2> : <h2>Nossos produtos</h2>}
                { !query && location.pathname === "/" 
                && (filtered ? <Link to={`/${filtered}/produtos`}>Ver todos</Link> 
                : <Link to="/produtos">Ver todos</Link>)}
            </header>
            <ul className={itemProductClass}> 
                { filteredData?.slice(0, quantityInView).map(product => {
                    const imageUrl = `${baseUrl}/api/product/image/${product.nameImage}`;
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