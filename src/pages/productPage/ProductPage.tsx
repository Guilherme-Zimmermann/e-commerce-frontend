import { Product } from "../../components/product/Product";
import { Category } from "../../components/category/Category";

import styles from "./ProductPage.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

export function ProductPage() {
    const [ categories, setCategories ] = useState<Category[]>([])
    const [ selectedCategory, setSelectedCategory ] = useState<string | undefined>(undefined)

    useEffect(() => {
        async function fetchCategories() {
            const response = await axios.get("http://localhost:8080/api/category")
            setCategories(response.data)
        }

        fetchCategories()
    }, [])

    const handleRadioChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(e.target.value)
    }

    const clearSelection = () => {
        setSelectedCategory(undefined)
    }
    return (
        <div className={styles.container}>
            <aside className={styles.selectCategory}>
                <h2>Categorias</h2>
                <ul className={styles.listContent}>
                    <li>
                        {categories.map(category => {
                            return (
                                <div key={category.id} className={styles.itemCategory}>
                                    <input 
                                        id={category.id}
                                        type="radio" 
                                        name="category"
                                        value={category.name}
                                        checked={selectedCategory === category.name}
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor={category.id}>{category.name}</label>
                                </div>
                            )
                        })}
                    </li>
                </ul>
                <button onClick={clearSelection}>Limpar seleção</button>
            </aside>
            <div className={styles.productsContainer}>
                <Product filtered={selectedCategory} lessGap/>
            </div>
        </div>
    )
}