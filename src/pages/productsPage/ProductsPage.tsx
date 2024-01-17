import { Product } from "../../components/product/Product";
import { Category } from "../../components/category/Category";

import styles from "./ProductsPage.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from 'react-router-dom';

const baseUrl = "http://localhost:8080"

export function ProductPage() {
    const [ categories, setCategories ] = useState<Category[]>([])
    const [ selectedCategory, setSelectedCategory ] = useState<string | undefined>(undefined)
    const { categoria } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCategories() {
            const response = await axios.get(baseUrl+"/api/category")
            setCategories(response.data)

            // Se uma categoria foi fornecida na URL, defina-a como a categoria selecionada
            if (categoria) {
                setSelectedCategory(categoria)
            }
        }

        fetchCategories()
    }, [categoria]) // Adicione 'categoria' como uma dependência para que o useEffect seja executado novamente quando ela mudar

    const handleRadioChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(e.target.value)
        navigate(`/${e.target.value}/produtos`)
    }

    const clearSelection = () => {
        setSelectedCategory(undefined)
        navigate('/produtos')
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