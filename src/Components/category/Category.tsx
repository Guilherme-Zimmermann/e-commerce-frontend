import axios from "axios"
import styles from "./Category.module.css"
import { useQuery } from "react-query"

export interface Category {
    id: string;
    name: string;
    nameImage: string
}

const API_URL = 'http://localhost:8080/api/category'

export function Category() {
    const { data } = useQuery<Category[]>("categories", async () => {
        const response = await axios.get(API_URL)
        
        return response.data
    })

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2>Categorias</h2>
            </header>
            <ul className={styles.listCategory}>
                { data?.map(category => {
                    const imageUrl = `http://localhost:8080/api/category/image/${category.nameImage}`;
                    return (
                        <a href="" key={category.id}>
                            <li className={styles.itemCategory}>
                                <img src={imageUrl} alt="" />
                                <p>{category.name}</p>
                            </li>
                        </a>
                    )
                })}
            </ul> 
        </div>
    )
}