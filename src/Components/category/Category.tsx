import axios from "axios"
import styles from "./Category.module.css"
import { useQuery } from "react-query"
import { baseUrl, baseUrlImages } from "../../main";

export interface Category {
    id: string;
    name: string;
    nameImage: string
}

export function Category() {

    const { data } = useQuery<Category[]>("categories", async () => {
        const response = await axios.get(baseUrl+"/api/category")
        
        return response.data
    })

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2>Categorias</h2>
            </header>
            <ul className={styles.listCategory}>
                { data?.map(category => {
                    const imageUrl = `${baseUrlImages}/category/${category.nameImage}`;
                    return (
                        <a href={`/${category.name}/produtos`} key={category.id}>
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